
interface TemplateProps { title: string; }

export function Template({ title }: TemplateProps) {
  return (
    <div style={{
      background: '#f8f8f8',  color: '#334155',
      width: '100%', height: '100%',
      display: 'flex',  alignItems: 'center', 
      justifyContent: 'center', padding: '24px',
    }}>
      <div style={{
        margin: '6px', padding: "24px", width: "100%",
        borderRadius: "24px", height: "100%", fontSize: 72, 
        display: "flex", flexDirection: "column",
        border: `#334155 2px solid`, color: '#334155'
      }}>
        {title.slice(0, 80)}
        <hr style={{ border: `#334155 1px solid`, width: "100%" }}></hr>
        <p style={{ fontSize: "52", fontWeight: "700", display: 'flex',
           justifyContent: 'center', color: '#334155' }}>Welcome To CommLink</p>
      </div>
    </div>
  )
}