import timeline from './DUMMY_timeline'

export default function statuses (req, res) {
  res.status(200).json(timeline)
}
