import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_BASE_URL } from '../../common/CommonUrl';

function AdminCourseScheduleModal() {

    const [isModalOpen, setModalOpen] = useState(false);






  return (
    <div>
        <Button
            type="button"
            onClick={() => setModalOpen(!isModalOpen)}
        >
            {isModalOpen ? 'X' : 'New Schedule'}
        </Button>

        <div className={`modal z-50 backdrop-blur-sm border-2 p-5 rounded-2xl ${isModalOpen ? 'flex justify-center items-center fixed top-1/2 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto sm:inset-0 h-[calc(100%-1rem)] max-h-full' : 'hidden'}`}>
            <div className="modal-overlay z-50" ></div>
                <div className="modal-container">
                    <div className="modal-content">
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-black mb-4">Make New Schedule</h3>
                        <form>
                            <div className="mb-4">
                              <label htmlFor="courseName" className="block text-gray-700 dark:text-black">Select Course</label>
                              <input
                                type="text"
                                id="courseName"
                                className="mt-1 block p-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                             

                              />
                            </div>
                            <div className="mb-4">
                              <label htmlFor="description" className="block text-gray-700 dark:text-black">Select Trainer</label>
                              <textarea
                                id="description"
                                className="mt-1 block p-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                             

                              ></textarea>
                            </div>
                            <div className="mb-4">
                              <label htmlFor="courseFee" className="block text-gray-700 dark:text-black">Time slot</label>
                              <input
                                type="text"
                                id="courseFee"
                                className="mt-1 block p-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                
                              />
                            </div>
                            <div className="mb-4">
                              <label htmlFor="courseImage" className="block text-gray-700 dark:text-white">Course Image</label>
                              <input
                                type="file"
                                id="courseImage"
                                accept="image/*"                                       

                              />

                            </div>
                            <div className="flex justify-end mt-6">
                              <button
                                type="button"
                                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                                onClick={()=>setModalOpen(false)}
                                
                              >
                                Close
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                              >
                                Submit
                              </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AdminCourseScheduleModal
