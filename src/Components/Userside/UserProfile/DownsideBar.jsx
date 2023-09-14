import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";




function DownsideBar() {


    const data = [
        {
          label: "DashBoard",
          value: "html",
          desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people
          who are like offended by it, it doesn't matter.`,
        },
      
        {
          label: "My Schedules",
          value: "vue",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
     
        {
          label: "Change Password",
          value: "angular",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
     
        // {
        //   label: "Svelte",
        //   value: "svelte",
        //   desc: `We're not always in the position that we want to be at.
        //   We're constantly growing. We're constantly making mistakes.`,
          
        // },
    ];




  return (
    <div>
        <div className='w-full h-full mt-10 lg:px-44'>
            <Tabs id="custom-animation" value="html">
              <TabsHeader>
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
            
        </div>
    </div>
  )
}

export default DownsideBar
