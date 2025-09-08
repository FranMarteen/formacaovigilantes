export function FAQ({ items }) {
  return (
    <div className='faq-container'>
      {items.map((faq, i) => (
        <details key={i} className='faq-item'>
          <summary className='faq-question'>
            <span>{faq.question}</span>
          </summary>
          <div className='faq-answer'>
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
