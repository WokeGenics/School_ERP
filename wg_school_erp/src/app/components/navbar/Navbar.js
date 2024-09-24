'use client';

import { useState } from 'react';
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);  // Collapsed state
  const [openMenu, setOpenMenu] = useState(null);  // Track which menu is open

  // Toggle the collapse/expand state
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle which menu is open
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className={`${styles.navbar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Collapse/Expand Button */}
      
      <div className={styles.navHeader}>
        {isCollapsed ? <button className={styles.toggleButton} onClick={toggleNavbar}>
            <img src="/images/option-logo.png" alt="Option Logo" className={styles.logo} /> </button> : 
          <div className={styles.headerContainer}>
            <img src='/images/app-logo.png' alt='App Logo' className={styles.appLogo} />
            <button className={styles.toggleButton} onClick={toggleNavbar}>
              <img src="/images/x-logo.png" alt="X Logo" className={styles.logo} />
            </button>
          </div>
        } 
      </div>
      

      <ul className={styles.navList}>
        {/* Dashboard Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader} onClick={() => toggleMenu('dashboard')}>
            <img src="/images/dashboard.png" alt="Dashboard Logo" className={styles.logo} />
            {!isCollapsed && (
              <div className={styles.itemName}>
                <div>Dashboard</div>
                <div className={styles.arrowContainer}>
                  <div className={`${styles.arrow} ${openMenu === 'dashboard' ? styles.down : styles.right}`}></div>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && openMenu === 'dashboard' && (
            <ul className={styles.subMenu}>
              <li>Admin</li>
              <li>Students</li>
              <li>Parents</li>
              <li>Teachers</li>
            </ul>
          )}
        </li>

        {/* Students Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader} onClick={() => toggleMenu('students')}>
            <img src="/images/students.png" alt="Students Logo" className={styles.logo} />
            {!isCollapsed && (
              <div className={styles.itemName}>
                <div>Students</div>
                <div className={styles.arrowContainer}>
                  <div className={`${styles.arrow} ${openMenu === 'students' ? styles.down : styles.right}`}></div>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && openMenu === 'students' && (
            <ul className={styles.subMenu}>
              <li>Option1</li>
              <li>Option2</li>
              <li>Option3</li>
            </ul>
          )}
        </li>

        {/* Teachers Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader} onClick={() => toggleMenu('teachers')}>
            <img src="/images/teachers.png" alt="Teachers Logo" className={styles.logo} />
            {!isCollapsed && (
              <div className={styles.itemName}>
                <div>Teachers</div>
                <div className={styles.arrowContainer}>
                  <div className={`${styles.arrow} ${openMenu === 'teachers' ? styles.down : styles.right}`}></div>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && openMenu === 'teachers' && (
            <ul className={styles.subMenu}>
              <li>Option1</li>
              <li>Option2</li>
              <li>Option3</li>
            </ul>
          )}
        </li>

        {/* Parents Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader} onClick={() => toggleMenu('parents')}>
            <img src="/images/parents.png" alt="Parents Logo" className={styles.logo} />
            {!isCollapsed && (
              <div className={styles.itemName}>
                <div>Parents</div>
                <div className={styles.arrowContainer}>
                  <div className={`${styles.arrow} ${openMenu === 'parents' ? styles.down : styles.right}`}></div>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && openMenu === 'parents' && (
            <ul className={styles.subMenu}>
              <li>Option1</li>
              <li>Option2</li>
              <li>Option3</li>
            </ul>
          )}
        </li>


        {/* Library Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader} onClick={() => toggleMenu('library')}>
            <img src="/images/library.png" alt="Library Logo" className={styles.logo} />
            {!isCollapsed && (
              <div className={styles.itemName}>
                <div>Library</div>
                <div className={styles.arrowContainer}>
                  <div className={`${styles.arrow} ${openMenu === 'library' ? styles.down : styles.right}`}></div>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && openMenu === 'library' && (
            <ul className={styles.subMenu}>
              <li>Option1</li>
              <li>Option2</li>
              <li>Option3</li>
            </ul>
          )}
        </li>

        {/* Accounts Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader} onClick={() => toggleMenu('accounts')}>
            <img src="/images/accounts.png" alt="Accounts Logo" className={styles.logo} />
            {!isCollapsed && (
              <div className={styles.itemName}>
                <div>Accounts</div>
                <div className={styles.arrowContainer}>
                  <div className={`${styles.arrow} ${openMenu === 'accounts' ? styles.down : styles.right}`}></div>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && openMenu === 'accounts' && (
            <ul className={styles.subMenu}>
              <li>Option1</li>
              <li>Option2</li>
              <li>Option3</li>
            </ul>
          )}
        </li>

        {/* Class Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader} onClick={() => toggleMenu('class')}>
            <img src="/images/class.png" alt="Class Logo" className={styles.logo} />
            {!isCollapsed && (
              <div className={styles.itemName}>
                <div>Class</div>
                <div className={styles.arrowContainer}>
                  <div className={`${styles.arrow} ${openMenu === 'class' ? styles.down : styles.right}`}></div>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && openMenu === 'class' && (
            <ul className={styles.subMenu}>
              <li>Option1</li>
              <li>Option2</li>
              <li>Option3</li>
            </ul>
          )}
        </li>

        {/* Subject Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader}>
            <img src="/images/subject.png" alt="Subject Logo" className={styles.logo} />
            {!isCollapsed && <a href='#'>Subject</a>}
          </div>
        </li>

        {/* Class Routine Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader}>
            <img src="/images/class-routine.png" alt="Class Routine Logo" className={styles.logo} />
            {!isCollapsed && <a href='#'>Class Routine</a>}
          </div>
        </li>

        {/* Attendence Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader}>
            <img src="/images/attendence.png" alt="Attendence Logo" className={styles.logo} />
            {!isCollapsed && <a href='#'>Attendence</a>}
          </div>
        </li>

        {/* Exam Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader} onClick={() => toggleMenu('exam')}>
            <img src="/images/exam.png" alt="Exam Logo" className={styles.logo} />
            {!isCollapsed && (
              <div className={styles.itemName}>
                <div>Exam</div>
                <div className={styles.arrowContainer}>
                  <div className={`${styles.arrow} ${openMenu === 'exam' ? styles.down : styles.right}`}></div>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && openMenu === 'exam' && (
            <ul className={styles.subMenu}>
              <li>Option1</li>
              <li>Option2</li>
              <li>Option3</li>
            </ul>
          )}
        </li>

        {/* Transport Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader}>
            <img src="/images/transport.png" alt="Transport Logo" className={styles.logo} />
            {!isCollapsed && <a href='#'>Transport</a>}
          </div>
        </li>

        {/* Hostel Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader}>
            <img src="/images/hostel.png" alt="Hostel Logo" className={styles.logo} />
            {!isCollapsed && <a href='#'>Subject</a>}
          </div>
        </li>

        {/* Notice Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader} >
            <img src="/images/notice.png" alt="Notice Logo" className={styles.logo} />
            {!isCollapsed && <a href='#'>Notice</a>}
          </div>
        </li>

        {/* Message Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader}>
            <img src="/images/message.png" alt="Message Logo" className={styles.logo} />
            {!isCollapsed && <a href='#'>Message</a>}
          </div>
        </li>

        {/* Settings Section */}
        <li className={styles.navItem}>
          <div className={styles.navItemHeader}>
            <img src="/images/settings.png" alt="Settings Logo" className={styles.logo} />
            {!isCollapsed && <a href='#'>Settings</a>}
          </div>          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
