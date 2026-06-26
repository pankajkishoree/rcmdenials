(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    addDenialCodesButton();
    enhanceNavigation();
    addQuickAccessMenu();
  }

  function addDenialCodesButton() {
    const headerNav = document.querySelector('.header-nav');
    if (!headerNav) return;
    if (document.querySelector('.nav-link-denial-codes')) return;

    const denialCodesLink = document.createElement('a');
    denialCodesLink.href = 'denial-codes/index.html';
    denialCodesLink.className = 'nav-link nav-link-denial-codes';
    denialCodesLink.innerHTML = '<span style="margin-right:0.5rem">📋</span>Denial Codes';
    denialCodesLink.title = 'Browse all denial code guides';

    const faqLink = Array.from(headerNav.querySelectorAll('.nav-link')).find(link =>
      link.textContent.includes('FAQ')
    );

    if (faqLink) {
      headerNav.insertBefore(denialCodesLink, faqLink);
    } else {
      headerNav.appendChild(denialCodesLink);
    }
  }

  function enhanceNavigation() {
    if (window.location.pathname.includes('denial-codes/') &&
        !window.location.pathname.includes('denial-codes/index.html')) {
      addBackButton();
    }
    highlightActiveNav();
  }

  function addBackButton() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb || document.querySelector('.back-button')) return;

    const backButton = document.createElement('a');
    backButton.href = 'index.html';
    backButton.className = 'back-button';
    backButton.innerHTML = '← Back to All Denial Codes';
    backButton.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 1rem;
      color: var(--brand-400);
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
      transition: all 0.15s ease;
    `;

    backButton.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(-4px)';
    });

    backButton.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });

    breadcrumb.parentNode.insertBefore(backButton, breadcrumb);
  }

  function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.header-nav .nav-link, .static-nav a');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      if (currentPath === linkPath ||
          (currentPath.includes('denial-codes') && linkPath.includes('denial-codes'))) {
        link.classList.add('active');
        link.style.fontWeight = '700';
      }
    });
  }

  function addQuickAccessMenu() {
    if (!window.location.pathname.endsWith('index.html') &&
        window.location.pathname !== '/') return;

    const navSection = document.querySelector('.nav-section');
    if (!navSection || document.querySelector('.quick-denial-access')) return;

    const quickAccessHTML = `
      <div class="nav-section quick-denial-access" style="margin-top: 1.5rem;">
        <div class="nav-section-label">Quick Access</div>
        <a href="denial-codes/index.html" class="nav-item" style="text-decoration: none; color: inherit;">
          <span class="nav-item-icon">📋</span>
          All Denial Codes
        </a>
        <a href="denial-codes/co-16-denial-code.html" class="nav-item" style="text-decoration: none; color: inherit;">
          <span class="nav-item-icon">📝</span>
          CO-16: Missing Info
        </a>
        <a href="denial-codes/co-29-denial-code.html" class="nav-item" style="text-decoration: none; color: inherit;">
          <span class="nav-item-icon">⏱️</span>
          CO-29: Timely Filing
        </a>
        <a href="denial-codes/co-50-denial-code.html" class="nav-item" style="text-decoration: none; color: inherit;">
          <span class="nav-item-icon">🩺</span>
          CO-50: Medical Necessity
        </a>
      </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = quickAccessHTML;
    const quickAccessSection = tempDiv.firstElementChild;

    const navSections = document.querySelectorAll('.nav-section');
    const lastSection = navSections[navSections.length - 1];
    if (lastSection) {
      lastSection.parentNode.insertBefore(quickAccessSection, lastSection.nextSibling);
    }
  }

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      window.location.href = 'denial-codes/index.html';
    }
  });

})();
