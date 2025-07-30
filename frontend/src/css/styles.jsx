 export const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '40px',
      width: '100%',
      maxWidth: '420px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    iconContainer: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      width: '70px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '16px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    inputContainer: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      background: '#f9fafb'
    },
    inputError: {
      borderColor: '#ef4444',
      background: '#fef2f2'
    },
    inputWithIcon: {
      paddingLeft: '50px'
    },
    inputWithIconAndButton: {
      paddingLeft: '50px',
      paddingRight: '50px'
    },
    icon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    eyeButton: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#6b7280',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '6px',
      transition: 'color 0.2s'
    },
    error: {
      color: '#ef4444',
      fontSize: '14px',
      marginTop: '6px',
      fontWeight: '500'
    },
    rememberSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '8px 0'
    },
    rememberMe: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      accentColor: '#667eea'
    },
    checkboxLabel: {
      fontSize: '14px',
      color: '#4b5563',
      cursor: 'pointer'
    },
    forgotPassword: {
      fontSize: '14px',
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'color 0.2s'
    },
    button: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    buttonEnabled: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      transform: 'translateY(0)',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    buttonDisabled: {
      background: '#d1d5db',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },
    footer: {
      marginTop: '32px',
      textAlign: 'center'
    },
    footerText: {
      color: '#6b7280',
      fontSize: '15px'
    },
    footerLink: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'color 0.2s'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '24px 0',
      color: '#9ca3af',
      fontSize: '14px'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: '#e5e7eb'
    },
    dividerText: {
      padding: '0 16px'
    }
  };