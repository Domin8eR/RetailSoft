function EditForm({ editedItem, handleFormSubmit }) {
    const [formData, setFormData] = useState(editedItem);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit(formData);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
        />
        <label htmlFor="itemDescription">Item Description:</label>
        <input
          type="text"
          id="itemDescription"
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleChange}
        />
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <label htmlFor="unit">Unit:</label>
        <input
          type="text"
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        />
        <label htmlFor="reorderThreshold">Reorder Threshold:</label>
        <input
          type="text"
          id="reorderThreshold"
          name="reorderThreshold"
          value={formData.reorderThreshold}
          onChange={handleChange}
        />
        <label htmlFor="assignedTo">Assigned To:</label>
        <input
          type="text"
          id="assignedTo"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        />
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label htmlFor="reorderReminder">Reorder Reminder:</label>
        <input
          type="checkbox"
          id="reorderReminder"
          name="reorderReminder"
          checked={formData.reorderReminder}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    );
  }
  