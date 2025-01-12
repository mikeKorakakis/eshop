'use client'
import { FC, useRef, useEffect, useCallback, ReactNode } from 'react'
import s from './modal.module.css'
import FocusTrap from '@/lib/focus-trap'
import { Cross } from '@/components/icons'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Transition } from '@headlessui/react'

interface ModalProps {
  className?: string
  children?: ReactNode
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    const modal = ref.current

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true })
      window.addEventListener('keydown', handleKey)
    }
    return () => {
      clearAllBodyScrollLocks()
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  return (
    <div className={s.root}>
      <div className={s.backdrop} onClick={onClose} />
      <Transition
        appear={true}
        show={true}
        enter="transition duration-500 ease-out"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-500 ease-out"
        leaveFrom="transform opacity-100"
        leaveTo="transform  opacity-0"
      >
        <div className={s.modal} role="dialog">
          {/* <div className={s.modal} role="dialog" ref={ref}> */}
          <button
            onClick={() => onClose()}
            aria-label="Close panel"
            className={s.close}
          >
            <Cross className="h-6 w-6" />
          </button>
          <FocusTrap focusFirst>{children}</FocusTrap>
        </div>
      </Transition>
    </div>
  )
}

export default Modal
