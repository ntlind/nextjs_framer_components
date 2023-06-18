import React, { useEffect } from "react";
import type p5Type from "p5";
import dynamic from "next/dynamic";
import { useWindowSize } from "../CustomHooks";

const Sketch = dynamic(import("react-p5"), { ssr: false });

const color2Hex = (color: string | number) => {
  if (typeof color == "number") {
    return "#" + ("00000" + color.toString(16)).slice(-6);
  } else return color;
};

const color2Rgb = (color: string | number, alpha: number = 1) => {
  const hex = color2Hex(color);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const obj = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
  return "rgba(" + obj.r + "," + obj.g + "," + obj.b + "," + alpha + ")";
};

interface TopologyProps {
  color?: number;
  backgroundColor?: number;
  dispersion?: number;
  opacity?: number;
  num_iterations?: number;
  number_of_particles?: number;
}

export default function Topology({
  color = 0x3c7cff,
  backgroundColor = 0x111111,
  dispersion = 90,
  number_of_particles = 2000,
  opacity = 0.03,
  num_iterations = 50,
}: TopologyProps) {
  // Original author
  // https://github.com/kgolid/p5ycho/blob/master/topology3/sketch.js
  // https://generated.space/

  // Vanta version
  // https://github.com/tengbao/vanta/blob/master/src/vanta.topology.js
  // https://www.vantajs.com/?effect=topology
  let size = useWindowSize();
  let width = size.width * 0.98;
  let height = size.height;
  let offset = 100;

  let noise_size = 0.003;
  let noise_radius = 0.1;

  function flow_value(height_or_width) {
    return (height_or_width + offset * 2) / dispersion;
  }

  let flow_grid = [];

  let particles = [];

  let tick = 0;

  useEffect(() => {
    // Update the document title using the browser API
    // @ts-ignore
    let p5 = typeof window == "object" && window.p5;
  });

  const setup = (p: p5Type, canvasParentRef: Element): void => {
    let c = p.createCanvas(width, height);
    c.parent("topology");
    p.background(color2Rgb(backgroundColor));
    c.position(0, 0, "absolute");

    p.smooth();
    p.noStroke();

    init_particles({ p });
    init_flow({ p });

    p.fill(20);
    p.strokeWeight(2);
    p.stroke(255, 5);
  };

  const draw = (p: p5Type): void => {
    p.translate(-offset, -offset);
    update_particles({ p });
    display_particles({ p });
    tick += 0.002;
  };

  function init_particles({ p }) {
    for (var i = 0; i < number_of_particles; i++) {
      let r = p.random(width + 2 * offset);
      let q = p.random(height + 2 * offset);
      particles.push({
        prev: p.createVector(r, q),
        pos: p.createVector(r, q),
        vel: p.createVector(0, 0),
        acc: p.createVector(0, 0),
        col: p.random(255),
        seed: i,
      });
    }
  }

  function update_particles({ p }) {
    function get_flow(xpos, ypos) {
      xpos = p.constrain(xpos, 0, width + offset * 2);
      ypos = p.constrain(ypos, 0, height + offset * 2);
      return flow_grid[p.floor(ypos / dispersion)][p.floor(xpos / dispersion)];
    }

    for (var i = 0; i < number_of_particles; i++) {
      let prt = particles[i];

      if (prt) {
        let flow = get_flow(prt.pos.x, prt.pos.y);

        prt.prev.x = prt.pos.x;
        prt.prev.y = prt.pos.y;

        prt.pos.x = mod(prt.pos.x + prt.vel.x, width + 2 * offset);
        prt.pos.y = mod(prt.pos.y + prt.vel.y, height + 2 * offset);

        prt.vel.add(prt.acc).normalize().mult(2.2);

        //prt.acc = p.Vector.fromAngle(p.noise(prt.seed * 10, tick) * p.TAU).mult(0.01);
        prt.acc = p.createVector(0, 0);
        prt.acc.add(flow).mult(3);
      }
    }
  }

  function init_flow({ p }) {
    function calculate_flow(x, y, r) {
      let high_val = 0;
      let low_val = 1;
      let high_pos = p.createVector(0, 0);
      let low_pos = p.createVector(0, 0);

      for (let i = 0; i < num_iterations; i++) {
        let angle = (i / 100) * p.TAU;
        let pos = p.createVector(x + p.cos(angle) * r, y + p.sin(angle) * r);
        let val = p.noise(pos.x, pos.y);

        if (val > high_val) {
          high_val = val;
          high_pos.x = pos.x;
          high_pos.y = pos.y;
        }
        if (val < low_val) {
          low_val = val;
          low_pos.x = pos.x;
          low_pos.y = pos.y;
        }
      }

      let flow_angle = p.createVector(
        low_pos.x - high_pos.x,
        low_pos.y - high_pos.y
      );
      flow_angle.normalize().mult(high_val - low_val);

      return flow_angle;
    }

    for (let i = 0; i < flow_value(height); i++) {
      let row = [];
      for (let j = 0; j < flow_value(width); j++) {
        row.push(calculate_flow(j * noise_size, i * noise_size, noise_radius));
      }
      flow_grid.push(row);
    }
  }

  function display_particles({ p }) {
    p.strokeWeight(1);
    p.stroke(color2Rgb(color, opacity));
    for (let i = 0; i < particles.length; i++) {
      //p.stroke(particles[i].col)
      //p.point(particles[i].pos.x, particles[i].pos.y)
      // @ts-ignore
      if (p5.Vector.dist(particles[i].prev, particles[i].pos) < 10)
        p.line(
          particles[i].prev.x,
          particles[i].prev.y,
          particles[i].pos.x,
          particles[i].pos.y
        );
    }
  }

  function windowResized({ p }) {
    if (p) {
      p.resizeCanvas(width, height);
    }
  }

  function mod(x, n) {
    return ((x % n) + n) % n;
  }

  return (
    <>
      {size.width > 1023 && (
        // @ts-ignore
        <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      )}
    </>
  );
}
