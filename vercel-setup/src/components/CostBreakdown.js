export function CostBreakdown({ groups, total }) {
  return (
    <div className='cost-breakdown'>
      {groups.map((g, i) => (
        <div className='cost-category' key={i}>
          <h4>{g.icon && <span>{g.icon} </span>}{g.title}</h4>
          <div className='cost-items'>
            {g.items.map((it, j) => (
              <div className='cost-item' key={j}>
                <span>{it.label}</span>
                <span>{it.range}</span>
              </div>
            ))}
          </div>
          <div className='category-total'>Subtotal: {g.subtotal}</div>
        </div>
      ))}
      {total && (
        <div className='total-investment'>
          <h4>💸 Investimento Total</h4>
          <div className='investment-range'>
            <span className='min-cost'>Mínimo: {total.min}</span>
            <span className='max-cost'>Máximo: {total.max}</span>
          </div>
          {total.note && <p><em>{total.note}</em></p>}
        </div>
      )}
    </div>
  )
}
