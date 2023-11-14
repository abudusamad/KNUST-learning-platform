import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";

const ChapterIdPage = async ({ params }: {
    params: {
        courseId: string, chapterId: string
    }
}
) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const { chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase
    } = await getChapter({
        userId,
        courseId: params.courseId,
        chapterId: params.chapterId,
    })

    if (!course || !chapter) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;


    return (<div>
        {userProgress?.isCompleted && (
            <Banner
                variant="success"
                label="You have already completed this chapter"
            />
            )}
            {isLocked && (
            <Banner
                variant="warning"
                label="You need to purchase this course to access this chapter"
            />
        )}
        <div>
            <div>
                <VideoPlayer
                    title={chapter.title}
                    chapterId={params.chapterId}
                    courseId={params.courseId}
                    nextChapterId={nextChapter?.id}
                    playbackId={muxData?.playbackId!}
                    isLocked={isLocked}
                    completeOnEnd={completeOnEnd}
                />
            </div>
        </div>
    
    </div>);
}
 
export default ChapterIdPage;