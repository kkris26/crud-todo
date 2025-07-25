const Accordion = ({ children, heading, open, action, def }) => {
  return (
    <div
      className={`collapse rounded-none  collapse-arrow join-item border-base-200 border-t`}
    >
      <input
        type="radio"
        checked={open}
        name="my-accordion-4"
        onClick={action}
        readOnly
      />
      <div className="collapse-title font-semibold border-b border-base-200">{heading}</div>
      <div className="collapse-content p-0 text-sm">{children}</div>
    </div>
  );
};

export default Accordion;
