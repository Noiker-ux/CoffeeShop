export interface IGridConfig {
  id: string;
  mask: string;
  video: string;
}
export const grids_config: IGridConfig[] = [
  {
    id: "heart",
    mask: `heart.jpg`,
    video: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
  },
  {
    id: "codrops",
    mask: `codrops.jpg`,
    video: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
  },
  {
    id: "smile",
    mask: `smile.jpg`,
    video: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
  },
];
