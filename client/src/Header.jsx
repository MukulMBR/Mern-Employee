import React from 'react';
import dpImage from './assets/dp.jpeg'; // Import the image

function Header({ username, onLogout }) {
    const handleLogout = () => {
        // Call the logout function passed from the parent component
        onLogout();
    };

    return (
        <header style={styles.header}>
            <div className="logo">
                <img src={dpImage} alt="Logo" style={styles.logoImage} /> {/* Use imported image */}
            </div>
            <nav>
                <ul style={styles.navList}>
                    <li style={styles.navItem}><a href="/home" style={styles.link}>Home</a></li>
                    <li style={styles.navItem}><a href="/employees" style={styles.link}>Employee List</a></li>
                </ul>
            </nav>
            <div className="user-info" style={styles.userInfo}>
                <span style={styles.userInfoText}>Welcome, {username}</span>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
}

export default Header;

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#333',
        padding: '10px'
    },
    logoImage: {
        width: '50px',
        height: '50px',
        marginRight: '10px'
    },
    navList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0
    },
    navItem: {
        display: 'inline',
        marginRight: '90px'
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center'
    },
    userInfoText: {
        color: '#fff',
        marginRight: '10px'
    },
    logoutButton: {
        backgroundColor: '#ff0000',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px'
    }
};
