// @ts-nocheck
import React from "react";

export default function Value({ container = true }) {
    return (
        <div className='flex flex-row items-center justify-center bg-transparent section bg-slate-100'>
            <div className={container ? 'container max-w-screen-2xl mx-8 xl:mx-16' : 'mt-8'}>
                <div className='flex flex-col space-y-12 text-center sm:flex-row sm:space-y-0 sm:space-x-12'>
                    <div className='mb-auto space-y-3 sm:w-4/12'>
                        <div className='flex items-center justify-center'>
                            <lord-icon
                                src="/lordicons/celebrate.json"
                                style={{ height: 'auto', width: "5rem" }}
                                trigger="loop"
                                delay="2000"
                                colors="primary:#999,secondary:#3c7cff"
                                stroke="30"
                            ></lord-icon>
                        </div>
                        <div className='text-2xl font-bold'>
                            Streamlined UX
                        </div>
                        <div>
                            Simple enough for business analysts to use, with modern algorithms and strict evaluation standards behind-the-scenes.
                        </div>
                    </div>
                    <div className='mb-auto space-y-3 sm:w-4/12'>
                        <div className='flex items-center justify-center'>
                            <lord-icon
                                src="https://cdn.lordicon.com/gqdnbnwt.json"
                                style={{ height: 'auto', width: "5rem" }}
                                trigger="loop"
                                delay="2000"
                                colors="primary:#999,secondary:#3c7cff"
                                stroke="30"
                            ></lord-icon>
                        </div>
                        <div className='text-2xl font-bold'>
                            Rich Analytics
                        </div>
                        <div>
                            Clean visualizations, summarized alerts, and probabilistic guardrails explain results and highlight edge cases.
                        </div>
                    </div>
                    <div className='mb-auto space-y-3 sm:w-4/12'>
                        <div className='flex items-center justify-center'>
                            <lord-icon
                                src="lordicons/computer.json"
                                style={{ height: 'auto', width: "5rem" }}
                                trigger="loop"
                                delay="2000"
                                colors="primary:#999,secondary:#3c7cff"
                                stroke="30"
                            ></lord-icon>
                        </div>
                        <div className='text-2xl font-bold'>
                            Secure, Scalable Design
                        </div>
                        <div>
                            Self-host in any cloud environment. Scale your compute when needed using Docker or Kubernetes.
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
