import React from 'react'

export const useKeyboard = (keyboardHandler: (event: KeyboardEvent) => void): void => {
    React.useEffect(() => {
        document.addEventListener('keydown', keyboardHandler, false)
        document.addEventListener('keyup', keyboardHandler, false)
        return () => {
            document.removeEventListener('keydown', keyboardHandler)
            document.removeEventListener('keyup', keyboardHandler)
        }
    })    
}
