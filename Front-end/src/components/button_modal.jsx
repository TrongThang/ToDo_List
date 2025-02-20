export default function ButtonModal({ target, title, action, color = "primary", onClick }) {
    return (
        <button
            type="button"
            class={`btn btn-${color} mx-2`}
            data-bs-toggle="modal"
            data-bs-target={`#${target}`}
            onClick={onClick}
        >
            {title}
        </button>
    )
}