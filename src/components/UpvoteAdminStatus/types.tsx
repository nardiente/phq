import { Roadmap } from '@pages/RoadmapPublicView/types'

export interface UpvoteAdminStatusProps {
  active_status: string
  roadmaps: Roadmap[]
  setActiveStatus: React.Dispatch<React.SetStateAction<string>>
}
