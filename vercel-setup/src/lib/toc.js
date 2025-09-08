// Utilitário para construir Table of Contents a partir de HTML renderizado
// Captura <section id> com <h2>/<h3>. Remove emojis/símbolos iniciais e normaliza texto.
export function buildTOC(html, { costGroups, timelineSteps } = {}) {
  if (!html) return []
  const items = []
  const sectionRegex = /<section[^>]*id="([^"]+)"[^>]*>([\s\S]*?)(?:<\/section>|$)/gi
  let match
  while ((match = sectionRegex.exec(html)) !== null) {
    const id = match[1]
    const sectionInner = match[2]
    const h2Match = sectionInner.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)
    if (!h2Match) continue
    let h2Label = h2Match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/^[^\p{L}\d]+/u, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (!h2Label) continue
    const sectionItem = { id, label: h2Label, children: [] }

    // Capturar h3 subsequentes dentro da mesma section
    const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi
    let h3
    let h3Index = 0
    while ((h3 = h3Regex.exec(sectionInner)) !== null) {
      let h3Label = h3[1]
        .replace(/<[^>]+>/g, '')
        .replace(/^[^\p{L}\d]+/u, '')
        .replace(/\s+/g, ' ')
        .trim()
      if (!h3Label) continue
      const h3Id = `${id}-sub-${++h3Index}`
      sectionItem.children.push({ id: h3Id, label: h3Label })
    }

    items.push(sectionItem)
  }
  // Complementar com seções de componentes que não ficaram no HTML (custos / cronograma)
  if (costGroups && costGroups.length && !items.find(i => i.id === 'custos-investimento')) {
    items.push({ id: 'custos-investimento', label: 'Custos e Investimento' })
  }
  if (timelineSteps && timelineSteps.length && !items.find(i => i.id === 'cronograma-processo')) {
    items.push({ id: 'cronograma-processo', label: 'Cronograma do Processo' })
  }
  return items
}
