import { ArrowLeft } from "phosphor-react"
import { FormEvent, useState } from "react"
import { FeedbackType, feedbackType } from ".."
import { api } from "../../../lib/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading"
import { ScreenshotButton } from "../ScreenshotButton"

interface FeedbackContentStepProps {
    feedbackTypes: FeedbackType,
    onFeedBackRestartRequested: () => void
    onFeedbackSend: () => void
}

export function FeedbackContentStep({ feedbackTypes, onFeedBackRestartRequested, onFeedbackSend }: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [textFeedback, setTextFeedback] = useState<string>('')
    const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false)

    const feedBackTypeInfo = feedbackType[feedbackTypes]

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        setIsSendingFeedback(true)

        await api.post("/feedbacks", {
            type: feedbackTypes,
            comment: textFeedback,
            screenshot
        })

        setIsSendingFeedback(false)

        onFeedbackSend()
    }

    return (
        <>
            <header>
                <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 transition-all">
                    <ArrowLeft weight="bold"
                        className="w-4 h-4"
                        onClick={onFeedBackRestartRequested}
                    />
                </button>
                <span className="text-xl leading-6 flex items-center gap-1">
                    <img
                        src={feedBackTypeInfo.image.source}
                        alt={feedBackTypeInfo.image.alt}
                        className="w-6 h-6"
                    />
                    {feedBackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-neutral-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 
                    focus:ring-brand-500 focus:ring-1 resize-none p-3 focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={(event) => setTextFeedback(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />
                    <button
                        type="submit"
                        className="p-2 bg-brand-500 rounded-[4px] border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-all disabled:opacity-50 disabled:hover:bg-brand-500"
                        disabled={textFeedback.length == 0 || isSendingFeedback}
                    >
                        {isSendingFeedback ? <Loading /> : "Enviar feedback"}
                    </button>
                </footer>
            </form>
        </>

    )
}