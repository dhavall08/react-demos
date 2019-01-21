import React from 'react';

const collegeRoutes = [
    {
        path: "/college-info/gecrajkot",
        name: 'GEC Rajkot',
        exact: true,
        main: () => <p><h1>GEC Rajkot</h1> <br/> Government Engineering College, Rajkot (GECR) was established in the year 2004 with a vision to provide technical education to the students to make them technically competent and ethically sound to meet the growing demands of the industries and for benefit of the society as a whole.
        Government Engineering College, Rajkot is a Government institution affiliated to Gujarat Technological University(GTU) and recognized by All India Council for Technical Education (AICTE), New Delhi. We offer six UG level programmes Electronics and Communication Engineering, Computer Engineering, Instrumentation and Control Engineering, Mechanical Engineering, Civil Engineering and Automobile Engineering.</p>
    },
    {
        path: '/college-info/bvm',
        name: 'BVM VVNagar',
        exact: true,
        main: () => <p> <h1>BVM, Vallabh Vidhyanagar</h1> <br/>Birla Vishvakarma Mahavidyalaya Engineering College is a grant-aided engineering institution located in the educational town of Vallabh Vidyanagar, Gujarat, India. It is affiliated to Gujarat Technological University and became an autonomous institution in August 2015.</p>
    },
    {
        path: '/college-info/vvp',
        exact: true,
        name: 'V.V.P.',
        main: () => <p> <h1>VVP, Rajkot</h1> <br/> Vyavasayi Vidya Pratishthan is established by Rajkot Nagarik Sahakari Bank Ltd. to promote quality education in various technical fields. The trust was founded in 1996 with the, being objective of meeting technical educational needs of Gujarat.
        The trust prides itself of establishing the first engineering college in Rajkot, the central location of Saurashtra and Kutch region. V.V.P. Engineering College is a self-financed institution affiliated to Saurashtra University and Gujarat Technological University (GTU), recognized by All India Council for Technical Education (AICTE), New Delhi and the Government of Gujarat. </p>
    },
    {
        path: '/college-info/california',
        exact: true,
        name: 'CIT',
        main: () => <p> <h1>The California Institute of Technology</h1> <br/>The California Institute of Technology is a private doctorate-granting research university located in Pasadena, California, United States. Known for its strength in natural science and engineering, Caltech is often ranked as one of the world's top-ten universities. </p>
    },
    {
        path: '/college-info/atmiya',
        exact: true,
        name: 'Atmiya',
        main: () => <p><h1>Atmiya Institute of Technology and Science</h1> <br/>Atmiya Institute of Technology and Science is approved by All India Council for Technical Education (AICTE) and the State Government. It is affiliated to Gujarat Technological University(GTU).
        The institute provides technical and spiritual environment that is naturally conducive to the personal and professional development.Well developed library, computer center along with state of art infrastructure in all departments. </p>
    },
    {
        path: '/college-info/stanford-uni',
        name: 'Stanford Uni.',
        exact: true,
        main: () => <p><h1>Stanford University</h1> <br/> Stanford University </p>
    },
    {
        path: '/college-info/oxford',
        name: 'Oxford',
        exact: true,
        main: () => <p> <h1>Oxford University</h1> <br/>Oxford University </p>
    },
    {
        path: '/college-info/mit',
        name: 'MIT',
        exact: true,
        main: () => <p> <h1>MIT</h1> <br/>MIT </p>
    },
    {
        path: '/college-info/cambridge-uni',
        name: 'Cambridge Uni.',
        exact: true,
        main: () => <p> <h1>Cambridge University</h1> <br/>Cambridge University</p>
    },
    {
        path: '/college-info/princeton',
        name: 'Princeton Uni.',
        exact: true,
        main: () => <p> <h1>Princeton University</h1> <br/>Princeton University </p>
    },
    {
        path: '/college-info/imperial',
        name: 'London College',
        exact: true,
        main: () => <p> <h1>Imperial College, London</h1> <br/>Imperial College, London </p>
    },
    {
        path: '/college-info/nus',
        name: 'Singapore College',
        exact: true,
        main: () => <p> <h1>NUS, Singapore</h1> <br/>NUS, Singapore </p>
    }
]

export default collegeRoutes;