import React from "react";

interface DashboardIconProps {
  isActive?: boolean;
  className?: string;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({
  isActive = false,
}) => {
  if (isActive) {
    // Active state - filled dashboard with different styling
    return (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.75 6.5C3.75 5.25736 4.75736 4.25 6 4.25H8.25C9.49264 4.25 10.5 5.25736 10.5 6.5V8.75C10.5 9.99264 9.49264 11 8.25 11H6C4.75736 11 3.75 9.99264 3.75 8.75V6.5Z"
          fill="#3B100C"
        />
        <path
          d="M3.75 16.25C3.75 15.0074 4.75736 14 6 14H8.25C9.49264 14 10.5 15.0074 10.5 16.25V18.5C10.5 19.7426 9.49264 20.75 8.25 20.75H6C4.75736 20.75 3.75 19.7426 3.75 18.5V16.25Z"
          fill="#3B100C"
        />
        <path
          d="M13.5 6.5C13.5 5.25736 14.5074 4.25 15.75 4.25H18C19.2426 4.25 20.25 5.25736 20.25 6.5V8.75C20.25 9.99264 19.2426 11 18 11H15.75C14.5074 11 13.5 9.99264 13.5 8.75V6.5Z"
          fill="#3B100C"
        />
        <path
          d="M13.5 16.25C13.5 15.0074 14.5074 14 15.75 14H18C19.2426 14 20.25 15.0074 20.25 16.25V18.5C20.25 19.7426 19.2426 20.75 18 20.75H15.75C14.5074 20.75 13.5 19.7426 13.5 18.5V16.25Z"
          fill="#3B100C"
        />
        <path
          d="M3.75 6.5C3.75 5.25736 4.75736 4.25 6 4.25H8.25C9.49264 4.25 10.5 5.25736 10.5 6.5V8.75C10.5 9.99264 9.49264 11 8.25 11H6C4.75736 11 3.75 9.99264 3.75 8.75V6.5Z"
          stroke="#3B100C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.75 16.25C3.75 15.0074 4.75736 14 6 14H8.25C9.49264 14 10.5 15.0074 10.5 16.25V18.5C10.5 19.7426 9.49264 20.75 8.25 20.75H6C4.75736 20.75 3.75 19.7426 3.75 18.5V16.25Z"
          stroke="#3B100C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.5 6.5C13.5 5.25736 14.5074 4.25 15.75 4.25H18C19.2426 4.25 20.25 5.25736 20.25 6.5V8.75C20.25 9.99264 19.2426 11 18 11H15.75C14.5074 11 13.5 9.99264 13.5 8.75V6.5Z"
          stroke="#3B100C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.5 16.25C13.5 15.0074 14.5074 14 15.75 14H18C19.2426 14 20.25 15.0074 20.25 16.25V18.5C20.25 19.7426 19.2426 20.75 18 20.75H15.75C14.5074 20.75 13.5 19.7426 13.5 18.5V16.25Z"
          stroke="#3B100C"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }

  // Inactive state - outlined dashboard
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 6C3.75 4.75736 4.75736 3.75 6 3.75H8.25C9.49264 3.75 10.5 4.75736 10.5 6V8.25C10.5 9.49264 9.49264 10.5 8.25 10.5H6C4.75736 10.5 3.75 9.49264 3.75 8.25V6Z"
        stroke="#EAEAEA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.75 15.75C3.75 14.5074 4.75736 13.5 6 13.5H8.25C9.49264 13.5 10.5 14.5074 10.5 15.75V18C10.5 19.2426 9.49264 20.25 8.25 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V15.75Z"
        stroke="#EAEAEA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 6C13.5 4.75736 14.5074 3.75 15.75 3.75H18C19.2426 3.75 20.25 4.75736 20.25 6V8.25C20.25 9.49264 19.2426 10.5 18 10.5H15.75C14.5074 10.5 13.5 9.49264 13.5 8.25V6Z"
        stroke="#EAEAEA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 15.75C13.5 14.5074 14.5074 13.5 15.75 13.5H18C19.2426 13.5 20.25 14.5074 20.25 15.75V18C20.25 19.2426 19.2426 20.25 18 20.25H15.75C14.5074 20.25 13.5 19.2426 13.5 18V15.75Z"
        stroke="#EAEAEA"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default DashboardIcon;
