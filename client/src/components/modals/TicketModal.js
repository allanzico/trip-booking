import { DownloadIcon } from '@heroicons/react/outline'
import { Modal } from 'antd'
import React from 'react'
import TicketComponent from '../tickets/TicketComponent'

const TicketModal = ({ showModal, setShowModal, booking}) => {
  return (
   <Modal
   visible={showModal}
   title="Ticket for this order"
   onCancel={() => setShowModal(!showModal)}
   footer={false}
   style={{ width: "1000px"}}
   >
      <TicketComponent booking={booking} />
      <div className='mt-2'>
          <button className='flex items-center cursor-pointer border py-2 px-2'>
            <DownloadIcon className='w-4 h-4 mr-2'/>  Download Ticket
          </button>
      </div>
   </Modal>
  )
}

export default TicketModal