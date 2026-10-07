// Format currency in INR
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

// Format date
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Get status color class
export const getStatusColor = (status) => {
  const colors = {
    submitted: 'status-submitted',
    under_review: 'status-review',
    discussion: 'status-discussion',
    design: 'status-design',
    development: 'status-development',
    review: 'status-review-final',
    completed: 'status-completed',
    cancelled: 'status-cancelled',
  };
  return colors[status] || 'status-default';
};

// Get status label
export const getStatusLabel = (status) => {
  const labels = {
    submitted: 'Submitted',
    under_review: 'Under Review',
    discussion: 'In Discussion',
    design: 'Design Phase',
    development: 'Development',
    review: 'Under Review',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
};

// Truncate text
export const truncate = (str, n) => str?.length > n ? str.substring(0, n) + '...' : str;

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};
