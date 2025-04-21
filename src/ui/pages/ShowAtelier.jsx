import React from 'react'
import { useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AtelierForm from '../components/AtelierForm';
import AtelierMachines from '../components/AtelierMachines';

function ShowAtelier() {
  const { id } = useParams()

  return (
    <div className='py-2'>
      <Tabs>
        <TabList>
          <Tab>Atelier</Tab>
          <Tab>Machines</Tab>
        </TabList>

        <TabPanel>
         
           <AtelierForm id={id} />
        </TabPanel>
        <TabPanel>
          <AtelierMachines id={id} />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default ShowAtelier