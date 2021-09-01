import Modal from 'react-modal'
import { FormEvent, useCallback, useState, VFC } from 'react'

// モーダルを開く処理
export let openModal
export let afterOpenModal
//モーダルを閉じる処理
export let closeModal
export let submitHandler
export let title
export let description

interface postMutationProp {
  userId: number
  shopId: string
}

interface Props {
  submitHandler: (
    props: postMutationProp
  ) => (e: FormEvent<HTMLFormElement>) => void
  postMutationProp: postMutationProp
}

export const Model: VFC<Props> = ({ submitHandler, postMutationProp }) => {
  Modal.setAppElement('#__next')

  const [modalIsOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submitWrap = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let temp = { ...postMutationProp, ...{ title, description } }
    submitHandler(temp)(e)
    closeModal()
  }
  // モーダルを開く処理
  openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  afterOpenModal = useCallback(() => {
    // モーダルが開いた後の処理
  }, [])

  //モーダルを閉じる処理
  closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  // スタイリング
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '800px',
      height: '500px',
      transform: 'translate(-50%, -50%)',
    },
  }

  return (
    <>
      <Modal
        // isOpenがtrueならモダールが起動する
        isOpen={modalIsOpen}
        // モーダルが開いた後の処理を定義
        onAfterOpen={afterOpenModal}
        // モーダルを閉じる処理を定義
        onRequestClose={closeModal}
        // スタイリングを定義
        style={customStyles}
      >
        <div className="flex justify-between items-center">
          <form onSubmit={submitWrap}>
            <label className="text-4xl">タイトル</label>
            <input
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              className="mb-16"
            />
            <br />
            <label className="text-4xl">詳細</label>
            <br />

            <textarea
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
              className="mb-16 max-w-screen-2xl w-full"
            />
            <br />
            <button className="text-4xl">登録</button>
          </form>
        </div>
      </Modal>
    </>
  )
}