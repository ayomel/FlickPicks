import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components'
import { Button } from '@/components/ui/button'
import { getYoutubeEmbedUrl } from '@/utils/formatMovie'
import { cn } from '@/lib/utils'

type VideoModalProps = {
  videoId: string | null
  title: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const VideoModal = ({
  videoId,
  title,
  isOpen,
  onOpenChange,
}: VideoModalProps) => {
  const dialogRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    dialogRef.current?.setAttribute('aria-modal', 'true')
  }, [isOpen])

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
      className={cn(
        'fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm',
        'entering:animate-in entering:fade-in entering:duration-150',
        'exiting:animate-out exiting:fade-out exiting:duration-100',
      )}
    >
      <Modal
        className={cn(
          'w-full max-w-4xl outline-none',
          'entering:animate-in entering:zoom-in-95 entering:duration-150',
          'exiting:animate-out exiting:zoom-out-95 exiting:duration-100',
        )}
      >
        <Dialog
          aria-label={title}
          className="outline-none"
          ref={(node) => {
            dialogRef.current = node
            if (node) node.setAttribute('aria-modal', 'true')
          }}
        >
          {({ close }) => (
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div className="min-w-0">
                  <Heading
                    slot="title"
                    className="m-0 truncate text-sm font-semibold text-foreground"
                  >
                    {title}
                  </Heading>
                  <p className="m-0 mt-0.5 font-mono text-xs text-muted-foreground">
                    Esc or Close
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Close trailer"
                  onPress={close}
                >
                  <X />
                </Button>
              </div>
              <div className="aspect-video w-full bg-black">
                {isOpen && videoId ? (
                  <iframe
                    title={title}
                    src={getYoutubeEmbedUrl(videoId)}
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="size-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : null}
              </div>
            </div>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
