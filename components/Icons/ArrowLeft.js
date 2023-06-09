export default function ArrowLeft (props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={21}
      height={21}
      {...props}
    >
      <g
        fill='none'
        fillRule='evenodd'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        transform='translate(3 2)'
      >
        <circle cx={8.5} cy={8.5} r={8} />
        <path d='m7.5 11.5-3-3 3-3M12.5 8.5h-8' />
      </g>
    </svg>
  )
}
