export const DEFAULT_ZOOM_LEVEL = 4
export const DEFAULT_CENTER = [37.504512, 127.0468183]

export const COLOR_SCALE = [
  '#f7fbff',
  '#e1edf8',
  '#cadef0',
  '#abcfe6',
  '#82badb',
  '#59a1cf',
  '#3787c0',
  '#1c6aaf',
  '#0b4d94',
  '#08306b',
]

export const CLUSTER_SCALE = [
  {
    size: 30,
    color: COLOR_SCALE[6],
  },
  {
    size: 40,
    color: COLOR_SCALE[7],
  },
  {
    size: 50,
    color: COLOR_SCALE[8],
  },
  {
    size: 60,
    color: COLOR_SCALE[9],
  },
].map((style) => {
  return {
    width: `${style.size}px`,
    height: `${style.size}px`,
    borderRadius: '50%',
    backgroundColor: style.color,
    color: '#fff',
    textAlign: 'center',
    lineHeight: `${style.size}px`,
  }
})
