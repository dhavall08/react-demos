import React from 'react';
import Admins from './Persons/Admins'
import ComputerDept from './Persons/ComputerDept'
import Mechanical from './Persons/Mechanical'
import EC from './Persons/EC'

const ProfileRoutes = [
    {
        deptname:'Home',
        path:'/profile-info/home',
        component:()=><p className="profile-container">To see profiles, Please choose one of the categories.</p>,
        exact: true,
    },
    {
        deptname:'Administration',
        path:'/profile-info/admin',
        component:Admins,
        exact: true,
    },
    {
        deptname:'Mechanical',
        path:'/profile-info/mech',
        component:Mechanical,
        exact: true,
    },
    {
        deptname:'Computer Dept.',
        path:'/profile-info/comp',
        component:ComputerDept,
        exact: true,
    },
    {
        deptname:'EC',
        path:'/profile-info/ec',
        component:EC,
        exact: true,
    },
]

export default ProfileRoutes;