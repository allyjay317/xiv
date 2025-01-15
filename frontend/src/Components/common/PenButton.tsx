export function PenButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        height: '16px',
        marginLeft: '8px',
        width: '16px',
      }}
    >
      <img alt="edit job" src="/img/edit-pen-icon.svg" />
    </div>
  )
}
