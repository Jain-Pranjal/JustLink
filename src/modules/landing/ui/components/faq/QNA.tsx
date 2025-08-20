'use client'

import { ChevronDown, ChevronRight } from 'lucide-react'

interface Props {
    question: string
    answer: React.JSX.Element
    setOpen: (i: number) => void
    isOpen: boolean
    index: number
}

const QNA: React.FC<Props> = ({ question, answer, setOpen, isOpen, index }) => {
    return (
        <div>
            <button
                onClick={() => {
                    if (isOpen) {
                        setOpen(-1)
                    } else {
                        setOpen(index)
                    }
                }}
                className="w-full"
            >
                <div className="w-full rounded-2xl border border-[#313131] bg-[#fff] p-5 text-start lg:w-[600px] lg:p-6 xl:w-[900px]">
                    <div className="text-white-100 flex justify-between">
                        <h1 className="text-white-100 font-medium lg:text-lg">
                            {question}
                        </h1>
                        {isOpen ? <ChevronDown /> : <ChevronRight />}
                    </div>

                    <div
                        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen
                                ? 'mt-3 grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                        <div className="text-black-450 overflow-hidden text-start font-normal">
                            {answer}
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default QNA
