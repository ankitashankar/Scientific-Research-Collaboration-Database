// Research Hub - Global Scientific Research Database
// Static data for demonstration purposes

window.ResearchData = {
    authors: [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            email: "sarah.johnson@university.edu",
            institution_id: 1,
            country: "USA",
            papers: 45,
            citations: 1234,
            h_index: 28,
            specializations: ["Machine Learning", "Healthcare", "AI Ethics"]
        },
        {
            id: 2,
            name: "Prof. Michael Chen",
            email: "michael.chen@tech.institute",
            institution_id: 2,
            country: "China",
            papers: 67,
            citations: 2345,
            h_index: 35,
            specializations: ["Quantum Computing", "Cryptography", "Algorithm Design"]
        },
        {
            id: 3,
            name: "Dr. Emily Rodriguez",
            email: "emily.rodriguez@research.org",
            institution_id: 3,
            country: "Spain",
            papers: 38,
            citations: 987,
            h_index: 22,
            specializations: ["Bioinformatics", "Genomics", "Data Science"]
        },
        {
            id: 4,
            name: "Prof. James Wilson",
            email: "james.wilson@science.edu",
            institution_id: 4,
            country: "UK",
            papers: 52,
            citations: 1876,
            h_index: 31,
            specializations: ["Climate Science", "Environmental Modeling", "Sustainability"]
        },
        {
            id: 5,
            name: "Dr. Lisa Anderson",
            email: "lisa.anderson@tech.university",
            institution_id: 5,
            country: "Canada",
            papers: 41,
            citations: 1456,
            h_index: 26,
            specializations: ["Robotics", "Computer Vision", "Automation"]
        },
        {
            id: 6,
            name: "Prof. David Kumar",
            email: "david.kumar@research.institute",
            institution_id: 6,
            country: "India",
            papers: 73,
            citations: 3456,
            h_index: 42,
            specializations: ["Blockchain", "Distributed Systems", "Cybersecurity"]
        },
        {
            id: 7,
            name: "Dr. Maria Garcia",
            email: "maria.garcia@medical.university",
            institution_id: 7,
            country: "Mexico",
            papers: 29,
            citations: 765,
            h_index: 19,
            specializations: ["Medical Imaging", "Radiology", "AI in Healthcare"]
        },
        {
            id: 8,
            name: "Prof. Robert Taylor",
            email: "robert.taylor@engineering.edu",
            institution_id: 8,
            country: "Australia",
            papers: 58,
            citations: 2234,
            h_index: 33,
            specializations: ["Materials Science", "Nanotechnology", "Engineering"]
        }
    ],

    institutions: [
        {
            id: 1,
            name: "Stanford University",
            country: "USA",
            established: 1885,
            researchers: 234,
            papers: 1234,
            collaborations: 89,
            ranking: 2,
            specializations: ["Computer Science", "Engineering", "Medicine"]
        },
        {
            id: 2,
            name: "Tsinghua University",
            country: "China",
            established: 1911,
            researchers: 456,
            papers: 2345,
            collaborations: 156,
            ranking: 1,
            specializations: ["Engineering", "Computer Science", "Physics"]
        },
        {
            id: 3,
            name: "University of Barcelona",
            country: "Spain",
            established: 1450,
            researchers: 178,
            papers: 987,
            collaborations: 67,
            ranking: 15,
            specializations: ["Life Sciences", "Chemistry", "Physics"]
        },
        {
            id: 4,
            name: "Oxford University",
            country: "UK",
            established: 1096,
            researchers: 345,
            papers: 1876,
            collaborations: 123,
            ranking: 3,
            specializations: ["Medicine", "Humanities", "Social Sciences"]
        },
        {
            id: 5,
            name: "University of Toronto",
            country: "Canada",
            established: 1827,
            researchers: 267,
            papers: 1456,
            collaborations: 98,
            ranking: 8,
            specializations: ["Computer Science", "Engineering", "Health Sciences"]
        },
        {
            id: 6,
            name: "Indian Institute of Technology",
            country: "India",
            established: 1950,
            researchers: 389,
            papers: 3456,
            collaborations: 234,
            ranking: 5,
            specializations: ["Engineering", "Technology", "Science"]
        },
        {
            id: 7,
            name: "National Autonomous University of Mexico",
            country: "Mexico",
            established: 1910,
            researchers: 156,
            papers: 765,
            collaborations: 45,
            ranking: 25,
            specializations: ["Medicine", "Engineering", "Humanities"]
        },
        {
            id: 8,
            name: "Australian National University",
            country: "Australia",
            established: 1946,
            researchers: 234,
            papers: 2234,
            collaborations: 112,
            ranking: 12,
            specializations: ["Science", "Engineering", "Social Sciences"]
        }
    ],

    papers: [
        {
            id: 1,
            title: "Deep Learning Applications in Medical Image Analysis",
            authors: [1, 7],
            year: 2023,
            citations: 89,
            journal: "Nature Medicine",
            topics: [1, 2, 7],
            abstract: "This paper explores the application of deep learning techniques in medical image analysis...",
            doi: "10.1038/s41591-023-01234",
            impact_factor: 82.9
        },
        {
            id: 2,
            title: "Quantum Supremacy: A New Era in Computing",
            authors: [2],
            year: 2023,
            citations: 156,
            journal: "Science",
            topics: [3, 4],
            abstract: "We demonstrate quantum supremacy using a programmable superconducting processor...",
            doi: "10.1126/science.abc1234",
            impact_factor: 56.9
        },
        {
            id: 3,
            title: "Genomic Data Analysis Using Machine Learning Approaches",
            authors: [3],
            year: 2022,
            citations: 67,
            journal: "Nature Genetics",
            topics: [5, 6, 1],
            abstract: "Advanced machine learning techniques for analyzing large-scale genomic datasets...",
            doi: "10.1038/s41588-022-01234",
            impact_factor: 41.8
        },
        {
            id: 4,
            title: "Climate Change Impact on Global Agriculture",
            authors: [4],
            year: 2023,
            citations: 234,
            journal: "Nature Climate Change",
            topics: [8, 9],
            abstract: "Comprehensive analysis of climate change effects on agricultural productivity worldwide...",
            doi: "10.1038/s41558-023-01234",
            impact_factor: 28.3
        },
        {
            id: 5,
            title: "Autonomous Robotics in Industrial Applications",
            authors: [5],
            year: 2022,
            citations: 123,
            journal: "IEEE Robotics and Automation Letters",
            topics: [10, 11],
            abstract: "Development of autonomous robotic systems for industrial manufacturing...",
            doi: "10.1109/LRA.2022.1234567",
            impact_factor: 3.7
        },
        {
            id: 6,
            title: "Blockchain Technology for Secure Healthcare Systems",
            authors: [6],
            year: 2023,
            citations: 178,
            journal: "IEEE Transactions on Engineering Management",
            topics: [12, 7],
            abstract: "Implementation of blockchain technology to enhance security in healthcare systems...",
            doi: "10.1109/TEM.2023.1234567",
            impact_factor: 6.4
        },
        {
            id: 7,
            title: "Advanced Materials for Renewable Energy Applications",
            authors: [8],
            year: 2023,
            citations: 145,
            journal: "Advanced Materials",
            topics: [13, 14],
            abstract: "Novel materials for improving efficiency in renewable energy systems...",
            doi: "10.1002/adma.202301234",
            impact_factor: 29.4
        },
        {
            id: 8,
            title: "AI Ethics in Healthcare: Challenges and Solutions",
            authors: [1, 7],
            year: 2022,
            citations: 98,
            journal: "Journal of Medical Ethics",
            topics: [2, 7, 15],
            abstract: "Ethical considerations in the implementation of AI systems in healthcare...",
            doi: "10.1136/medethics-2022-123456",
            impact_factor: 3.2
        }
    ],

    topics: [
        {
            id: 1,
            name: "Machine Learning",
            description: "Algorithms and statistical models that computer systems use to perform a specific task without using explicit instructions",
            papers: 234,
            researchers: 567,
            trend: "increasing",
            growth_rate: 23.4
        },
        {
            id: 2,
            name: "Healthcare",
            description: "Medical and health-related research and applications",
            papers: 456,
            researchers: 789,
            trend: "increasing",
            growth_rate: 18.7
        },
        {
            id: 3,
            name: "Quantum Computing",
            description: "Computing using quantum-mechanical phenomena such as superposition and entanglement",
            papers: 123,
            researchers: 234,
            trend: "increasing",
            growth_rate: 45.6
        },
        {
            id: 4,
            name: "Cryptography",
            description: "Techniques for secure communication in the presence of third parties called adversaries",
            papers: 167,
            researchers: 345,
            trend: "stable",
            growth_rate: 12.3
        },
        {
            id: 5,
            name: "Bioinformatics",
            description: "Interdisciplinary field that develops methods and software tools for understanding biological data",
            papers: 289,
            researchers: 456,
            trend: "increasing",
            growth_rate: 28.9
        },
        {
            id: 6,
            name: "Genomics",
            description: "Study of genomes, the complete set of genetic material within an organism",
            papers: 198,
            researchers: 378,
            trend: "increasing",
            growth_rate: 34.2
        },
        {
            id: 7,
            name: "AI Ethics",
            description: "Ethical issues related to artificial intelligence and machine learning systems",
            papers: 87,
            researchers: 156,
            trend: "increasing",
            growth_rate: 56.7
        },
        {
            id: 8,
            name: "Climate Science",
            description: "Study of climate system, including atmosphere, oceans, land surface, and ice",
            papers: 345,
            researchers: 567,
            trend: "increasing",
            growth_rate: 19.8
        },
        {
            id: 9,
            name: "Environmental Modeling",
            description: "Mathematical modeling of environmental systems and processes",
            papers: 123,
            researchers: 234,
            trend: "stable",
            growth_rate: 8.9
        },
        {
            id: 10,
            name: "Robotics",
            description: "Design, construction, operation, and use of robots",
            papers: 267,
            researchers: 445,
            trend: "increasing",
            growth_rate: 21.3
        },
        {
            id: 11,
            name: "Computer Vision",
            description: "Field dealing with how computers can gain high-level understanding from digital images or videos",
            papers: 189,
            researchers: 334,
            trend: "increasing",
            growth_rate: 26.7
        },
        {
            id: 12,
            name: "Blockchain",
            description: "Distributed ledger technology that maintains a secure and decentralized record of transactions",
            papers: 156,
            researchers: 278,
            trend: "increasing",
            growth_rate: 67.8
        },
        {
            id: 13,
            name: "Materials Science",
            description: "Interdisciplinary field focusing on the design and discovery of new materials",
            papers: 298,
            researchers: 489,
            trend: "stable",
            growth_rate: 11.2
        },
        {
            id: 14,
            name: "Nanotechnology",
            description: "Manipulation of matter on an atomic, molecular, and supramolecular scale",
            papers: 134,
            researchers: 256,
            trend: "increasing",
            growth_rate: 31.4
        },
        {
            id: 15,
            name: "Medical Ethics",
            description: "Applied ethics that examines ethical problems and moral issues in medicine",
            papers: 78,
            researchers: 145,
            trend: "increasing",
            growth_rate: 15.6
        }
    ],

    collaborations: [
        {
            id: 1,
            author1_id: 1,
            author2_id: 7,
            institution1_id: 1,
            institution2_id: 7,
            papers: 3,
            citations: 187,
            start_year: 2020,
            ongoing: true,
            topics: [1, 2, 7],
            description: "Collaboration on AI applications in medical imaging and healthcare ethics"
        },
        {
            id: 2,
            author1_id: 1,
            author2_id: 3,
            institution1_id: 1,
            institution2_id: 3,
            papers: 2,
            citations: 98,
            start_year: 2021,
            ongoing: false,
            topics: [1, 5, 6],
            description: "Joint research on machine learning applications in genomics"
        },
        {
            id: 3,
            author1_id: 2,
            author2_id: 6,
            institution1_id: 2,
            institution2_id: 6,
            papers: 5,
            citations: 456,
            start_year: 2019,
            ongoing: true,
            topics: [3, 4, 12],
            description: "International collaboration on quantum computing and blockchain security"
        },
        {
            id: 4,
            author1_id: 4,
            author2_id: 8,
            institution1_id: 4,
            institution2_id: 8,
            papers: 4,
            citations: 234,
            start_year: 2020,
            ongoing: true,
            topics: [8, 13, 14],
            description: "Research on climate change impacts on materials science and nanotechnology"
        },
        {
            id: 5,
            author1_id: 5,
            author2_id: 8,
            institution1_id: 5,
            institution2_id: 8,
            papers: 3,
            citations: 167,
            start_year: 2021,
            ongoing: false,
            topics: [10, 11, 13],
            description: "Collaboration on robotics applications in materials science"
        },
        {
            id: 6,
            author1_id: 6,
            author2_id: 2,
            institution1_id: 6,
            institution2_id: 2,
            papers: 7,
            citations: 789,
            start_year: 2018,
            ongoing: true,
            topics: [3, 4, 12],
            description: "Long-term partnership on quantum computing and distributed systems"
        }
    ],

    // Utility functions for data manipulation
    getAuthorById: function(id) {
        return this.authors.find(author => author.id === id);
    },

    getInstitutionById: function(id) {
        return this.institutions.find(inst => inst.id === id);
    },

    getPaperById: function(id) {
        return this.papers.find(paper => paper.id === id);
    },

    getTopicById: function(id) {
        return this.topics.find(topic => topic.id === id);
    },

    getCollaborationById: function(id) {
        return this.collaborations.find(collab => collab.id === id);
    },

    // Search functions
    searchAuthors: function(query) {
        const lowerQuery = query.toLowerCase();
        return this.authors.filter(author => 
            author.name.toLowerCase().includes(lowerQuery) ||
            author.email.toLowerCase().includes(lowerQuery) ||
            author.specializations.some(spec => spec.toLowerCase().includes(lowerQuery))
        );
    },

    searchPapers: function(query) {
        const lowerQuery = query.toLowerCase();
        return this.papers.filter(paper => 
            paper.title.toLowerCase().includes(lowerQuery) ||
            paper.abstract.toLowerCase().includes(lowerQuery) ||
            paper.journal.toLowerCase().includes(lowerQuery)
        );
    },

    searchInstitutions: function(query) {
        const lowerQuery = query.toLowerCase();
        return this.institutions.filter(inst => 
            inst.name.toLowerCase().includes(lowerQuery) ||
            inst.country.toLowerCase().includes(lowerQuery) ||
            inst.specializations.some(spec => spec.toLowerCase().includes(lowerQuery))
        );
    },

    // Statistics functions
    getTotalPapers: function() {
        return this.papers.length;
    },

    getTotalAuthors: function() {
        return this.authors.length;
    },

    getTotalInstitutions: function() {
        return this.institutions.length;
    },

    getTotalCollaborations: function() {
        return this.collaborations.length;
    },

    getTopAuthorsByCitations: function(limit = 10) {
        return this.authors.sort((a, b) => b.citations - a.citations).slice(0, limit);
    },

    getTopPapersByCitations: function(limit = 10) {
        return this.papers.sort((a, b) => b.citations - a.citations).slice(0, limit);
    },

    getTopInstitutionsByPapers: function(limit = 10) {
        return this.institutions.sort((a, b) => b.papers - a.papers).slice(0, limit);
    },

    // Data export functions
    exportToJSON: function() {
        return JSON.stringify(this, null, 2);
    },

    exportToCSV: function(dataType) {
        const data = this[dataType];
        if (!data || data.length === 0) return '';

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => row[header]).join(','))
        ].join('\n');

        return csvContent;
    }
};

// Initialize data when page loads
if (typeof window !== 'undefined') {
    console.log('Research Hub data loaded successfully');
    console.log(`Loaded ${window.ResearchData.authors.length} authors`);
    console.log(`Loaded ${window.ResearchData.papers.length} papers`);
    console.log(`Loaded ${window.ResearchData.institutions.length} institutions`);
    console.log(`Loaded ${window.ResearchData.topics.length} topics`);
    console.log(`Loaded ${window.ResearchData.collaborations.length} collaborations`);
}
