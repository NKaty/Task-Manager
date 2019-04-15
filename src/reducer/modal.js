import { Record } from 'immutable'
import { OPEN_MODAL, CLOSE_MODAL } from '../constants'

const ModalRecord = Record({
  isModalOpen: false,
  openModalId: null,
  openModalMode: null
})

export default (state = ModalRecord(), action) => {
  const { type, payload } = action

  switch (type) {
    case OPEN_MODAL:
      return state
        .set('isModalOpen', true)
        .set('openModalId', payload.modalId)
        .set('openModalMode', payload.modelMode)

    case CLOSE_MODAL:
      return state
        .set('isModalOpen', false)
        .set('openModalId', null)
        .set('openModalMode', null)

    default:
      return state
  }
}
