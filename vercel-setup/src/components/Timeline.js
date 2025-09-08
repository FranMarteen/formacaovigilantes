export function Timeline({ steps }) {
  return (
    <div className='timeline'>
      {steps.map((s, idx) => (
        <div className='timeline-item' key={idx}>
          <div className='timeline-marker'>{idx + 1}</div>
          <div className='timeline-content'>
            <h4>{s.title}</h4>
            {s.items && (
              <ul>{s.items.map((li,i) => <li key={i}>{li}</li>)}</ul>
            )}
            {s.duration && <div className='timeline-duration'>{s.duration}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
