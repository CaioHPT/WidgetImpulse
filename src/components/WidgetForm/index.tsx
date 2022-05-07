import bugIcon from '../../assets/bug.svg'
import ideaIcon from '../../assets/idea.svg'
import thoughtIcon from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Staps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Staps/FeedbackContentStep";
import { FeedbackSucessStep } from './Staps/FeedbackSucessStep';

export const feedbackType = {
    BUG: {
        title: "Problema",
        image: {
            source: bugIcon,
            alt: 'Icon de Suport',
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaIcon,
            alt: 'Icon de ideia',
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtIcon,
            alt: 'Icon de Colaboração',
        }
    }
}

export type FeedbackType = keyof typeof feedbackType

export function WidgetForm() {

    const [typeFeedback, setTypeFeedback] = useState<FeedbackType | null>(null)
    const [feedbackSend, setFeedbackSend] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSend(false)
        setTypeFeedback(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl 
        mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSend ? (
                <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ) :
                (
                    <>
                        {!typeFeedback ? (
                            <FeedbackTypeStep onFeedBackTypeChange={setTypeFeedback} />
                        ) :
                            (
                                <FeedbackContentStep
                                    feedbackTypes={typeFeedback}
                                    onFeedBackRestartRequested={handleRestartFeedback}
                                    onFeedbackSend={() => setFeedbackSend(true)}
                                />
                            )
                        }
                    </>
                )
            }
            <footer className="text-xs text-neutral-400">
                Feito com S2 por <span className="underline underline-offset-2">Caio</span>
            </footer>
        </div>
    )
}