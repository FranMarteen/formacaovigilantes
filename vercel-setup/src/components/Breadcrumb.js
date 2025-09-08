export function Breadcrumb({ items }) {
  return (
    <nav className='breadcrumb'>
      <div className='container'>
        <ol>
          {items.map((item,i) => (
            <li key={i}>
              {item.href ? <a href={item.href}>{item.label}</a> : item.label}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
