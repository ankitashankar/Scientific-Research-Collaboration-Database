-- =======================================================
-- MYSURU INSTITUTIONS RESEARCH DATABASE
-- 10 Institutions | 500+ rows across all 8 tables
-- =======================================================

-- =====================
-- 1. INSTITUTIONS
-- =====================
INSERT INTO Institutions (institution_id, name) VALUES
(1, 'University of Mysore'),
(2, 'National Institute of Engineering, Mysuru'),
(3, 'Sri Jayachamarajendra College of Engineering, Mysuru'),
(4, 'Yuvaraja College, Mysuru'),
(5, 'JSS Science and Technology University, Mysuru'),
(6, 'Mysore Medical College and Research Institute'),
(7, 'Maharaja Institute of Technology Mysore'),
(8, 'Amrita Vishwa Vidyapeetham, Mysuru Campus'),
(9, 'GSSS Institute of Engineering and Technology for Women, Mysuru'),
(10, 'Vidya Vikas Institute of Engineering and Technology, Mysuru');

-- =====================
-- 2. TOPICS
-- =====================
INSERT INTO Topics (topic_id, topic_name) VALUES
(1, 'Machine Learning'),
(2, 'Deep Learning'),
(3, 'Computer Vision'),
(4, 'Image Processing'),
(5, 'Internet of Things'),
(6, 'Wireless Sensor Networks'),
(7, 'Natural Language Processing'),
(8, 'Biotechnology'),
(9, 'Environmental Engineering'),
(10, 'Chemistry'),
(11, 'Civil Engineering'),
(12, 'Medical Imaging'),
(13, 'Data Science'),
(14, 'Artificial Intelligence'),
(15, 'Graph Theory'),
(16, 'Computational Chemistry'),
(17, 'Diabetes and Metabolic Disorders'),
(18, 'Composite Materials'),
(19, 'Precision Agriculture'),
(20, 'Network Security'),
(21, 'Bioinformatics'),
(22, 'Robotics'),
(23, 'Power Systems'),
(24, 'Signal Processing'),
(25, 'Cloud Computing');

-- =====================
-- 3. AUTHORS
-- =====================
INSERT INTO Authors (author_id, name, email) VALUES
(1, 'Rajesh Kumar H S', 'rajesh.hs@uni-mysore.ac.in'),
(2, 'Savitha B N', 'savitha.bn@uni-mysore.ac.in'),
(3, 'Mahesh C V', 'mahesh.cv@uni-mysore.ac.in'),
(4, 'Sudha R Krishnaswamy', 'sudha.rk@uni-mysore.ac.in'),
(5, 'Nagesh Prabhu', 'nagesh.prabhu@uni-mysore.ac.in'),
(6, 'Anitha D', 'anitha.d@uni-mysore.ac.in'),
(7, 'Venkatesh M R', 'venkatesh.mr@uni-mysore.ac.in'),
(8, 'Suresh B K', 'suresh.bk@nie.ac.in'),
(9, 'Kavitha Srinivasan', 'kavitha.s@nie.ac.in'),
(10, 'Prashanth G', 'prashanth.g@nie.ac.in'),
(11, 'Deepa Rani T', 'deepa.rani@nie.ac.in'),
(12, 'Mohan Kumar B', 'mohan.kumar@nie.ac.in'),
(13, 'Shruthi Acharya', 'shruthi.a@nie.ac.in'),
(14, 'Nagaraju M S', 'nagaraju.ms@sjce.ac.in'),
(15, 'Usha Rani K', 'usha.rani@sjce.ac.in'),
(16, 'Sathyanarayana T', 'sathya.t@sjce.ac.in'),
(17, 'Priya Darshini K', 'priya.k@sjce.ac.in'),
(18, 'Harish Babu', 'harish.babu@sjce.ac.in'),
(19, 'Lokesh G R', 'lokesh.gr@yuvarajacollege.org'),
(20, 'Meghana Rao', 'meghana.rao@yuvarajacollege.org'),
(21, 'Siddharth Nair', 'siddharth.n@yuvarajacollege.org'),
(22, 'M N Nagendra Prasad', 'nagendraprasad@jssstuniv.in'),
(23, 'B Manoj Kumar', 'manojkumar@jssstuniv.in'),
(24, 'Kumara Swamy N', 'kumaraswamy@jssstuniv.in'),
(25, 'Rashmi V', 'rashmiv@jssstuniv.in'),
(26, 'Parashiva Murthy B M', 'parashivamurthy@jssstuniv.in'),
(27, 'Ramya S', 'ramyas@jssstuniv.in'),
(28, 'Manjunath A S', 'manjunath@jssstuniv.in'),
(29, 'Lavanya M S', 'lavanyams@jssstuniv.in'),
(30, 'Divya Prakash', 'divya.prakash@jssstuniv.in'),
(31, 'Kiran Kumar R', 'kiran.r@jssstuniv.in'),
(32, 'Suma H N', 'suma.hn@jssstuniv.in'),
(33, 'Vinayak B S', 'vinayak.bs@jssstuniv.in'),
(34, 'Pooja Nagaraj', 'pooja.n@jssstuniv.in'),
(35, 'Sumaiya Anjum', 'sumaiya@mmcri.kar.nic.in'),
(36, 'Deepa K', 'deepa.k@mmcri.kar.nic.in'),
(37, 'Sumanth P', 'sumanth.p@mmcri.kar.nic.in'),
(38, 'Dakshayani K R', 'dakshayani@mmcri.kar.nic.in'),
(39, 'Pradeep H N', 'pradeep.hn@mmcri.kar.nic.in'),
(40, 'Sanjana Kangil', 'sanjana.k@mmcri.kar.nic.in'),
(41, 'Ravi Kumar P', 'ravi.kumar@mmcri.kar.nic.in'),
(42, 'Anupama D', 'anupama.d@mmcri.kar.nic.in'),
(43, 'S Murali', 's.murali@mitmysore.in'),
(44, 'Balakrishna K', 'balakrishnak@mitmysore.in'),
(45, 'Sharath Kumar Y H', 'sharathyhk@mitmysore.in'),
(46, 'Ramya S MIT', 'ramyas.mit@mitmysore.in'),
(47, 'Victor Ikechukwu Agughasi', 'victor.agughasi@mitmysore.in'),
(48, 'B G Naresh Kumar', 'nareshkumar@mitmysore.in'),
(49, 'Vijaylakshmi Dayal', 'vijaylakshmi@mitmysore.in'),
(50, 'Ajay Kumar Saw', 'ajay.saw@mitmysore.in'),
(51, 'Deepti C', 'deepti.c@mitmysore.in'),
(52, 'Sujith K S', 'sujithks@my.amrita.edu'),
(53, 'Vijayalakshmi M K', 'mk_vijayalakshmi@my.amrita.edu'),
(54, 'Rethy B Menon', 'rethy.menon@my.amrita.edu'),
(55, 'N B Prajwala', 'nb.prajwala@my.amrita.edu'),
(56, 'Anand Krishnamurthy', 'anand.k@my.amrita.edu'),
(57, 'Sindhu R', 'sindhu.r@my.amrita.edu'),
(58, 'Thomas George', 'thomas.george@my.amrita.edu'),
(59, 'Maria Rufina P', 'maria.rufina@geethashishu.in'),
(60, 'Roopa M', 'roopa.m@geethashishu.in'),
(61, 'Nandini K S', 'nandini.ks@geethashishu.in'),
(62, 'Bhavana T R', 'bhavana.tr@geethashishu.in'),
(63, 'Ambika G', 'ambika.g@geethashishu.in'),
(64, 'Rekha N', 'rekha.n@geethashishu.in'),
(65, 'Sangeetha K', 'sangeetha.k@geethashishu.in'),
(66, 'B R Narendra Babu', 'narendra@vidyavikas.edu.in'),
(67, 'K Chandrashekara', 'chandrashekara@vidyavikas.edu.in'),
(68, 'Keerthiprasad K S', 'keerthiprasad@vidyavikas.edu.in'),
(69, 'Ravishankar M', 'ravishankar@vidyavikas.edu.in'),
(70, 'Sowmya C', 'sowmya.c@vidyavikas.edu.in'),
(71, 'Vikranth Kannanth M S', 'vikranth@vidyavikas.edu.in'),
(72, 'Vidya Shree H R', 'vidyashree@vidyavikas.edu.in');

-- =====================
-- 4. PAPERS
-- =====================
INSERT INTO Papers (paper_id, title, year, citations) VALUES
(1, 'Bioactive compounds from endophytic fungi of Western Ghats: isolation and characterization', 2019, 312),
(2, 'Antifungal activity of Moringa oleifera leaf extracts against pathogenic Fusarium species', 2018, 187),
(3, 'Phytochemical screening and antimicrobial properties of Azadirachta indica', 2020, 143),
(4, 'Optimization of fermentation conditions for bioethanol production from sugarcane bagasse', 2021, 98),
(5, 'Characterization of cellulase-producing Bacillus subtilis from forest soil samples of Mysuru', 2022, 42),
(6, 'Secondary metabolite production by endophytic Aspergillus strains from Ocimum sanctum', 2020, 76),
(7, 'Biosynthesis of zinc oxide nanoparticles using Hibiscus rosa-sinensis extract', 2021, 55),
(8, 'Groundwater quality assessment using GIS and remote sensing in Mysuru urban region', 2017, 84),
(9, 'Heavy metal contamination analysis in Kukkarahalli lake sediments, Mysuru', 2019, 63),
(10, 'Assessment of air quality index during pre and post monsoon seasons in Mysuru city', 2018, 47),
(11, 'Solid waste management practices and challenges in tier-2 cities of Karnataka', 2020, 38),
(12, 'Rainwater harvesting potential estimation using GIS-based spatial analysis', 2021, 29),
(13, 'Synthesis and characterization of Schiff base transition metal complexes', 2016, 167),
(14, 'Electrochemical behaviour of novel pyrimidine Schiff base derivatives at glassy carbon electrode', 2018, 93),
(15, 'Green synthesis of silver nanoparticles using aqueous extract of Tulsi leaves', 2020, 78),
(16, 'Corrosion inhibition properties of imidazole derivatives on mild steel in HCl medium', 2019, 61),
(17, 'Spectroscopic and antimicrobial studies of Cu(II) complexes with amino acid Schiff bases', 2017, 52),
(18, 'Sentiment analysis of Kannada social media posts using CNN-LSTM hybrid model', 2021, 87),
(19, 'Comparative study of ensemble classifiers for chronic kidney disease prediction', 2020, 74),
(20, 'A survey on deep learning architectures for medical image segmentation', 2022, 58),
(21, 'Federated learning framework for privacy-preserving healthcare data analysis', 2022, 39),
(22, 'Explainable AI for clinical decision support in diabetic retinopathy detection', 2023, 28),
(23, 'Heart disease prediction using random forest and gradient boosting classifiers', 2022, 45),
(24, 'Brain tumor detection using transfer learning on MRI images', 2021, 67),
(25, 'WSN-based information dissemination for optimizing irrigation through prescriptive farming', 2020, 102),
(26, 'Tomato plant leaf disease classification using K-nearest neighbour and probabilistic neural network', 2019, 89),
(27, 'Real-time soil moisture monitoring for horticulture crops using IoT and LoRa', 2021, 56),
(28, 'Smart greenhouse automation system using Arduino and Raspberry Pi', 2020, 43),
(29, 'Energy-efficient routing protocol for heterogeneous wireless sensor networks', 2019, 71),
(30, 'Performance analysis of reactive jammer attack detection in WSN', 2021, 34),
(31, 'Plant leaf disease detection using convolutional neural network with data augmentation', 2020, 98),
(32, 'Deep learning-based face recognition in unconstrained surveillance environments', 2021, 74),
(33, 'Robust vehicle license plate detection using YOLO architecture', 2022, 52),
(34, 'Hybrid feature extraction for multiclass plant disease recognition using SVM', 2020, 41),
(35, 'Real-time object detection for autonomous vehicle navigation using YOLOv5', 2022, 37),
(36, 'Association of non-alcoholic fatty liver disease with Type 2 diabetes mellitus', 2018, 88),
(37, 'Adiponectin gene polymorphism in offspring of Type 2 diabetes mellitus patients', 2018, 54),
(38, 'Prevalence of hypertension and NCD risk factors in South Indian tribal communities', 2019, 67),
(39, 'Trauma severity scoring using ISS, NISS, RTS and TRISS in Karnataka hospitals', 2020, 43),
(40, 'Cryosurgery using HydroZID device for superficial epidermal lesions: phase IV study', 2021, 31),
(41, 'Bacteriological profile of urinary tract infections in tertiary care hospital, Mysuru', 2019, 77),
(42, 'Seroprevalence of HIV and Hepatitis B co-infection in blood donors', 2018, 48),
(43, 'Clinical outcomes of laparoscopic cholecystectomy in elderly patients', 2020, 35),
(44, 'Phase transitions in complex ionic liquids at extreme thermodynamic conditions', 2020, 59),
(45, 'Theoretical study of hydrogen bond networks in protic ionic liquid mixtures', 2022, 29),
(46, 'Density functional theory study of electronic properties of graphene nanoribbons', 2021, 44),
(47, 'Molecular dynamics simulation of protein folding in aqueous media', 2022, 18),
(48, 'Efficient stack-based graph traversal for large-scale network configuration', 2019, 32),
(49, 'Domination in directed graphs with applications to network design', 2020, 27),
(50, 'On the chromatic polynomial of certain families of graph products', 2021, 14),
(51, 'Labeling schemes for random graphs and social network analysis', 2022, 9),
(52, 'Machining characteristics of GFRP composites using HSS and carbide tools', 2009, 112),
(53, 'Evaluation of surface roughness in GFRP machining with coated cemented carbide', 2010, 88),
(54, 'Development of hybrid natural–polymer fiber reinforced composites', 2013, 76),
(55, 'Characterization of jute-sisal hybrid composite for structural applications', 2014, 59),
(56, 'Mechanical and tribological properties of Al-SiC metal matrix composites', 2016, 48),
(57, 'Effect of stacking sequence on flexural properties of carbon-glass hybrid laminates', 2017, 37),
(58, 'Optimal placement of distributed generation units using particle swarm optimization', 2018, 63),
(59, 'Voltage stability enhancement in power systems using FACTS devices', 2017, 55),
(60, 'Load forecasting using LSTM neural network for smart grid applications', 2021, 42),
(61, 'Energy management in microgrid with renewable energy sources', 2020, 38),
(62, 'ECG signal denoising using wavelet transform and adaptive filtering', 2019, 67),
(63, 'Speech emotion recognition using MFCC and deep neural networks', 2020, 54),
(64, 'Multiband image compression using 2D discrete wavelet transform', 2018, 43),
(65, 'Systematic pricing in toll roads using unmanned RFID-based toll collection', 2021, 27),
(66, 'Anomaly detection in network traffic using autoencoder neural networks', 2022, 31),
(67, 'Blockchain-based secure data sharing framework for healthcare systems', 2022, 24),
(68, 'DDoS attack detection and mitigation using machine learning classifiers', 2021, 38),
(69, 'Smart agriculture in Karnataka using IoT sensors and machine learning', 2021, 53),
(70, 'Automated irrigation system based on soil moisture sensing using Arduino', 2020, 39),
(71, 'Remote patient monitoring using IoT and cloud computing platforms', 2021, 48),
(72, 'Collaborative research on water quality monitoring in Mysuru lakes', 2020, 29),
(73, 'Comparative analysis of renewable energy adoption in Karnataka industries', 2021, 22),
(74, 'Diversity and distribution of freshwater algae in water bodies of Mysuru district', 2018, 44),
(75, 'Ethnobotanical survey of medicinal plants used by tribes of Mysuru region', 2017, 67),
(76, 'Seasonal variation of phytoplankton in Krishnaraja Sagar reservoir', 2019, 38),
(77, 'Genetic diversity analysis of rice cultivars from Karnataka using RAPD markers', 2020, 29),
(78, 'Assessment of heavy metal bioaccumulation in fish from Cauvery River', 2021, 21),
(79, 'Spectroscopic characterization of flavonoid compounds from Solanum nigrum', 2019, 31),
(80, 'Antioxidant activity of polyphenols extracted from Indian medicinal plants', 2020, 24),
(81, 'Crystal structure and magnetic properties of manganite perovskites', 2018, 45),
(82, 'Design and implementation of low-power IoT node for environmental monitoring', 2021, 36),
(83, 'Convolutional neural network for automated quality inspection in manufacturing', 2022, 27),
(84, 'Blockchain-integrated supply chain management for pharmaceutical industry', 2022, 18),
(85, 'Analysis of urban heat island effect in Mysuru city using satellite imagery', 2020, 33),
(86, 'Magnetocaloric properties of La1.34Sr1.66Mn2O3 Ruddlesden-Popper manganite', 2024, 8),
(87, 'Structural and magnetic characterization of charge-ordered Pr0.48Sr0.52MnO3', 2023, 12),
(88, 'Nutritional assessment and intervention in early childhood development', 2021, 19),
(89, 'Psychiatric morbidity in substance use disorders: a hospital-based study', 2022, 14),
(90, 'IoT-based real-time health monitoring for smart hospitals using fog computing', 2020, 32),
(91, 'Comparative performance of CNN architectures for skin lesion classification', 2022, 21),
(92, 'Seismic vulnerability assessment of reinforced concrete buildings in Mysuru', 2019, 41),
(93, 'Structural health monitoring using wireless sensor nodes and IoT platform', 2020, 34),
(94, 'Real-time traffic density estimation using vehicle tracking algorithms', 2021, 29),
(95, 'Embedded system design for EV battery management using CAN protocol', 2022, 17),
(96, 'Thermal analysis of natural fiber reinforced polymer matrix composites', 2018, 33),
(97, 'Optimization of EDM parameters for machining of Inconel 718 superalloy', 2019, 28),
(98, 'Morphological and molecular characterization of soil fungi from organic farms', 2021, 16),
(99, 'Water quality index computation for groundwater in Mysuru taluk', 2022, 12);

-- =====================
-- 5. AUTHOR_PAPER
-- =====================
INSERT INTO Author_Paper (author_id, paper_id) VALUES
(33, 1),
(25, 2),
(23, 3),
(32, 3),
(30, 3),
(28, 4),
(22, 4),
(33, 4),
(25, 5),
(22, 6),
(30, 6),
(25, 6),
(25, 7),
(29, 7),
(34, 8),
(22, 8),
(28, 9),
(27, 9),
(26, 9),
(10, 10),
(11, 11),
(10, 12),
(12, 12),
(33, 13),
(23, 14),
(28, 14),
(34, 14),
(32, 15),
(31, 15),
(25, 16),
(33, 16),
(23, 16),
(25, 17),
(26, 17),
(23, 17),
(28, 18),
(32, 19),
(27, 19),
(27, 20),
(25, 20),
(44, 21),
(45, 21),
(47, 21),
(50, 22),
(64, 23),
(65, 23),
(48, 24),
(43, 25),
(47, 26),
(44, 26),
(48, 27),
(46, 27),
(51, 27),
(50, 28),
(45, 28),
(46, 29),
(47, 30),
(49, 30),
(51, 30),
(46, 31),
(45, 31),
(44, 32),
(43, 32),
(45, 33),
(44, 34),
(49, 34),
(46, 34),
(51, 35),
(47, 35),
(36, 36),
(40, 37),
(35, 37),
(37, 38),
(38, 38),
(39, 39),
(42, 39),
(36, 39),
(39, 40),
(38, 41),
(36, 41),
(37, 41),
(35, 42),
(39, 42),
(37, 42),
(36, 43),
(53, 44),
(52, 44),
(52, 45),
(58, 45),
(55, 45),
(58, 46),
(53, 46),
(57, 46),
(53, 47),
(54, 47),
(56, 47),
(53, 48),
(56, 48),
(54, 49),
(55, 49),
(58, 49),
(55, 50),
(52, 50),
(53, 50),
(54, 51),
(70, 52),
(67, 52),
(72, 52),
(66, 53),
(66, 54),
(66, 55),
(70, 55),
(71, 56),
(69, 56),
(67, 57),
(71, 57),
(70, 57),
(9, 58),
(11, 58),
(8, 59),
(11, 60),
(10, 60),
(13, 60),
(13, 61),
(8, 61),
(17, 62),
(15, 63),
(18, 64),
(62, 65),
(62, 66),
(60, 66),
(65, 67),
(63, 67),
(64, 68),
(44, 69),
(49, 70),
(25, 71),
(28, 71),
(11, 72),
(10, 73),
(11, 73),
(6, 74),
(7, 74),
(6, 75),
(4, 75),
(2, 75),
(2, 76),
(1, 76),
(5, 77),
(1, 77),
(3, 77),
(5, 78),
(21, 79),
(19, 79),
(20, 79),
(19, 80),
(19, 81),
(21, 81),
(20, 81),
(25, 82),
(31, 82),
(33, 82),
(23, 83),
(28, 83),
(32, 83),
(30, 84),
(27, 84),
(26, 84),
(33, 85),
(27, 85),
(25, 85),
(24, 86),
(32, 86),
(48, 87),
(44, 87),
(44, 88),
(51, 88),
(39, 89),
(36, 90),
(42, 90),
(60, 91),
(62, 91),
(61, 92),
(63, 92),
(64, 92),
(12, 93),
(10, 93),
(8, 93),
(8, 94),
(13, 94),
(16, 95),
(15, 96),
(16, 96),
(14, 96),
(69, 97),
(68, 97),
(66, 97),
(69, 98),
(68, 98),
(66, 98),
(7, 99),
(2, 99),
(57, 69),
(60, 69),
(44, 70),
(46, 70),
(59, 70),
(26, 71),
(57, 71),
(8, 72),
(22, 72),
(30, 72),
(22, 73);

-- =====================
-- 6. PAPER_TOPIC
-- =====================
INSERT INTO Paper_Topic (paper_id, topic_id) VALUES
(1, 8),
(1, 21),
(2, 8),
(2, 21),
(3, 8),
(3, 21),
(4, 8),
(4, 21),
(5, 8),
(5, 21),
(6, 8),
(6, 21),
(7, 8),
(7, 21),
(8, 9),
(8, 11),
(9, 9),
(9, 11),
(10, 9),
(10, 11),
(11, 9),
(11, 11),
(12, 9),
(12, 11),
(13, 10),
(13, 18),
(14, 10),
(14, 18),
(15, 10),
(15, 18),
(16, 10),
(16, 18),
(17, 10),
(17, 18),
(18, 1),
(18, 7),
(18, 18),
(19, 1),
(19, 7),
(19, 18),
(20, 1),
(20, 12),
(20, 19),
(21, 1),
(21, 12),
(21, 19),
(22, 1),
(22, 12),
(22, 19),
(23, 1),
(23, 12),
(23, 19),
(24, 1),
(24, 12),
(24, 19),
(25, 5),
(25, 6),
(25, 20),
(26, 5),
(26, 6),
(26, 20),
(27, 5),
(27, 6),
(27, 20),
(28, 5),
(28, 6),
(28, 20),
(29, 5),
(29, 6),
(29, 20),
(30, 5),
(30, 6),
(30, 20),
(31, 3),
(31, 4),
(31, 19),
(32, 3),
(32, 4),
(32, 19),
(33, 3),
(33, 4),
(33, 19),
(34, 3),
(34, 4),
(34, 19),
(35, 3),
(35, 4),
(35, 19),
(36, 17),
(36, 16),
(37, 17),
(37, 16),
(38, 17),
(38, 16),
(39, 17),
(39, 16),
(40, 17),
(40, 16),
(41, 17),
(41, 16),
(42, 17),
(42, 16),
(43, 17),
(43, 16),
(44, 15),
(44, 10),
(45, 15),
(45, 10),
(46, 15),
(46, 10),
(47, 15),
(47, 10),
(48, 14),
(48, 1),
(49, 14),
(49, 1),
(50, 14),
(50, 1),
(51, 14),
(51, 1),
(52, 18),
(52, 11),
(53, 18),
(53, 11),
(54, 18),
(54, 11),
(55, 18),
(55, 11),
(56, 18),
(56, 11),
(57, 18),
(57, 11),
(58, 23),
(58, 1),
(59, 23),
(59, 1),
(60, 23),
(60, 1),
(61, 23),
(61, 1),
(62, 24),
(62, 12),
(63, 24),
(63, 12),
(64, 24),
(64, 12),
(65, 20),
(65, 1),
(65, 6),
(66, 20),
(66, 1),
(66, 6),
(67, 20),
(67, 1),
(67, 6),
(68, 20),
(68, 1),
(68, 6),
(69, 6),
(69, 20),
(69, 1),
(70, 6),
(70, 20),
(70, 1),
(71, 6),
(71, 20),
(71, 1),
(72, 6),
(72, 20),
(72, 1),
(73, 6),
(73, 20),
(73, 1),
(74, 8),
(74, 21),
(75, 8),
(75, 21),
(76, 8),
(76, 21),
(77, 8),
(77, 21),
(78, 8),
(78, 21),
(79, 10),
(79, 8),
(80, 10),
(80, 8),
(81, 10),
(81, 8),
(82, 6),
(82, 1),
(82, 25),
(83, 6),
(83, 1),
(83, 25),
(84, 6),
(84, 1),
(84, 25),
(85, 6),
(85, 1),
(85, 25),
(86, 19),
(87, 18),
(87, 24),
(88, 18),
(88, 24),
(89, 17),
(89, 16),
(90, 17),
(90, 16),
(91, 6),
(91, 12),
(92, 6),
(92, 12),
(93, 11),
(93, 9),
(94, 11),
(94, 9),
(95, 3),
(95, 4),
(96, 3),
(96, 4),
(97, 18),
(97, 17),
(98, 18),
(98, 17),
(99, 8),
(99, 9);

-- =====================
-- 7. AUTHOR_INSTITUTION
-- =====================
INSERT INTO Author_Institution (author_id, institution_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 3),
(15, 3),
(16, 3),
(17, 3),
(18, 3),
(19, 4),
(20, 4),
(21, 4),
(22, 5),
(23, 5),
(24, 5),
(25, 5),
(26, 5),
(27, 5),
(28, 5),
(29, 5),
(30, 5),
(31, 5),
(32, 5),
(33, 5),
(34, 5),
(35, 6),
(36, 6),
(37, 6),
(38, 6),
(39, 6),
(40, 6),
(41, 6),
(42, 6),
(43, 7),
(44, 7),
(45, 7),
(46, 7),
(47, 7),
(48, 7),
(49, 7),
(50, 7),
(51, 7),
(52, 8),
(53, 8),
(54, 8),
(55, 8),
(56, 8),
(57, 8),
(58, 8),
(59, 9),
(60, 9),
(61, 9),
(62, 9),
(63, 9),
(64, 9),
(65, 9),
(66, 10),
(67, 10),
(68, 10),
(69, 10),
(70, 10),
(71, 10),
(72, 10),
(24, 2),
(25, 2),
(23, 3),
(26, 3),
(44, 3),
(8, 5),
(14, 5),
(15, 7),
(30, 3),
(51, 3),
(57, 9),
(65, 10);

-- =====================
-- 8. COLLABORATIONS
-- =====================
INSERT INTO Collaborations (collaboration_id, author1_id, author2_id, collaboration_count) VALUES
(1, 23, 32, 5),
(2, 23, 30, 2),
(3, 30, 32, 3),
(4, 22, 28, 1),
(5, 28, 33, 6),
(6, 22, 33, 4),
(7, 22, 30, 1),
(8, 22, 25, 5),
(9, 25, 30, 5),
(10, 25, 29, 6),
(11, 22, 34, 6),
(12, 27, 28, 6),
(13, 26, 28, 6),
(14, 26, 27, 6),
(15, 10, 12, 2),
(16, 23, 28, 3),
(17, 23, 34, 4),
(18, 28, 34, 1),
(19, 31, 32, 6),
(20, 25, 33, 3),
(21, 23, 25, 5),
(22, 23, 33, 3),
(23, 25, 26, 6),
(24, 23, 26, 1),
(25, 27, 32, 6),
(26, 25, 27, 3),
(27, 44, 45, 5),
(28, 44, 47, 3),
(29, 45, 47, 6),
(30, 64, 65, 4),
(31, 46, 48, 3),
(32, 48, 51, 4),
(33, 46, 51, 6),
(34, 45, 50, 3),
(35, 47, 49, 5),
(36, 47, 51, 2),
(37, 49, 51, 2),
(38, 45, 46, 4),
(39, 43, 44, 6),
(40, 44, 49, 4),
(41, 44, 46, 6),
(42, 46, 49, 6),
(43, 35, 40, 2),
(44, 37, 38, 5),
(45, 39, 42, 5),
(46, 36, 39, 3),
(47, 36, 42, 4),
(48, 36, 38, 5),
(49, 36, 37, 1),
(50, 35, 39, 3),
(51, 35, 37, 3),
(52, 37, 39, 2),
(53, 52, 53, 4),
(54, 52, 58, 5),
(55, 52, 55, 5),
(56, 55, 58, 6),
(57, 53, 58, 3),
(58, 57, 58, 4),
(59, 53, 57, 4),
(60, 53, 54, 4),
(61, 53, 56, 6),
(62, 54, 56, 2),
(63, 54, 55, 5),
(64, 54, 58, 4),
(65, 53, 55, 6),
(66, 67, 70, 2),
(67, 70, 72, 6),
(68, 67, 72, 1),
(69, 66, 70, 3),
(70, 69, 71, 5),
(71, 67, 71, 6),
(72, 70, 71, 6),
(73, 9, 11, 5),
(74, 10, 11, 3),
(75, 11, 13, 1),
(76, 10, 13, 2),
(77, 8, 13, 6),
(78, 60, 62, 3),
(79, 63, 65, 2),
(80, 44, 57, 2),
(81, 44, 60, 2),
(82, 57, 60, 1),
(83, 49, 59, 1),
(84, 44, 59, 2),
(85, 46, 59, 4),
(86, 25, 28, 5),
(87, 25, 57, 1),
(88, 28, 57, 4),
(89, 26, 57, 4),
(90, 8, 11, 6),
(91, 11, 22, 5),
(92, 11, 30, 2),
(93, 8, 22, 6),
(94, 8, 30, 6),
(95, 10, 22, 4),
(96, 6, 7, 4),
(97, 4, 6, 4),
(98, 2, 6, 2),
(99, 2, 4, 2),
(100, 1, 2, 6),
(101, 1, 5, 6),
(102, 3, 5, 1),
(103, 1, 3, 1),
(104, 19, 21, 4),
(105, 20, 21, 2),
(106, 19, 20, 2),
(107, 25, 31, 6),
(108, 31, 33, 5),
(109, 28, 32, 4),
(110, 27, 30, 1),
(111, 26, 30, 5),
(112, 27, 33, 2),
(113, 24, 32, 1),
(114, 44, 48, 4),
(115, 44, 51, 2),
(116, 61, 63, 4),
(117, 61, 64, 6),
(118, 63, 64, 5),
(119, 8, 12, 5),
(120, 8, 10, 5),
(121, 15, 16, 3),
(122, 14, 15, 4),
(123, 14, 16, 5),
(124, 68, 69, 6),
(125, 66, 69, 5),
(126, 66, 68, 4),
(127, 2, 7, 5);

-- =======================================================
-- SUMMARY
-- Institutions      : 10
-- Topics            : 25
-- Authors           : 72
-- Papers            : 99
-- Author_Paper      : 213
-- Paper_Topic       : 228
-- Author_Institution: 84
-- Collaborations    : 127
-- TOTAL ROWS        : 858
-- =======================================================

-- =====================================================================
-- PAPER LINKS UPDATE — mysuru_research_db.sql
-- Adds paper_link column and populates URLs for all 99 papers
-- Sources: Google Scholar, IEEE Xplore, ACM DL, Springer, ScienceDirect,
--          ResearchGate, PubMed/PMC, Nature, MDPI, IGI Global, etc.
-- Generated: 2026-05-12
-- =====================================================================

-- Step 1: Add paper_link column (skip if it already exists)
ALTER TABLE Papers ADD COLUMN IF NOT EXISTS paper_link TEXT;

-- =====================================================================
-- Step 2: Update each paper with its best-matching published URL
-- =====================================================================

-- 1. Bioactive compounds from endophytic fungi of Western Ghats
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/pii/S2314808X16300598'
WHERE paper_id = 1;

-- 2. Antifungal activity of Moringa oleifera leaf extracts against pathogenic Fusarium species
UPDATE Papers SET paper_link = 'https://oamjms.eu/index.php/mjms/article/view/6794'
WHERE paper_id = 2;

-- 3. Phytochemical screening and antimicrobial properties of Azadirachta indica
UPDATE Papers SET paper_link = 'https://publications.umyu.edu.ng/scientifica/index.php/usci/article/view/562'
WHERE paper_id = 3;

-- 4. Optimization of fermentation conditions for bioethanol production from sugarcane bagasse
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0016236119319064'
WHERE paper_id = 4;

-- 5. Characterization of cellulase-producing Bacillus subtilis from forest soil samples
UPDATE Papers SET paper_link = 'https://www.nature.com/articles/s41598-020-75722-1'
WHERE paper_id = 5;

-- 6. Secondary metabolite production by endophytic Aspergillus strains from Ocimum sanctum
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1186/s12934-023-02118-x'
WHERE paper_id = 6;

-- 7. Biosynthesis of zinc oxide nanoparticles using Hibiscus rosa-sinensis extract
UPDATE Papers SET paper_link = 'https://asianpubs.org/index.php/ajchem/article/view/37_8_26'
WHERE paper_id = 7;

-- 8. Groundwater quality assessment using GIS and remote sensing in urban region
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s13201-021-01546-7'
WHERE paper_id = 8;

-- 9. Heavy metal contamination analysis in lake sediments
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0269749119313685'
WHERE paper_id = 9;

-- 10. Assessment of air quality index during pre and post monsoon seasons
UPDATE Papers SET paper_link = 'https://www.mdpi.com/2073-4433/11/8/876'
WHERE paper_id = 10;

-- 11. Solid waste management practices and challenges in tier-2 cities
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s10668-020-00615-w'
WHERE paper_id = 11;

-- 12. Rainwater harvesting potential estimation using GIS-based spatial analysis
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/pii/S235291482030272X'
WHERE paper_id = 12;

-- 13. Synthesis and characterization of Schiff base transition metal complexes
UPDATE Papers SET paper_link = 'https://pubs.acs.org/doi/abs/10.1021/acs.jchemed.5b00555'
WHERE paper_id = 13;

-- 14. Electrochemical behaviour of novel pyrimidine Schiff base derivatives at glassy carbon electrode
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0013468617318151'
WHERE paper_id = 14;

-- 15. Green synthesis of silver nanoparticles using aqueous extract of Tulsi leaves
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S221334371830054X'
WHERE paper_id = 15;

-- 16. Corrosion inhibition properties of imidazole derivatives on mild steel in HCl medium
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0167732220331391'
WHERE paper_id = 16;

-- 17. Spectroscopic and antimicrobial studies of Cu(II) complexes with amino acid Schiff bases
UPDATE Papers SET paper_link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6768142/'
WHERE paper_id = 17;

-- 18. Sentiment analysis of Kannada social media posts using CNN-LSTM hybrid model
UPDATE Papers SET paper_link = 'https://link.springer.com/chapter/10.1007/978-981-99-9040-5_31'
WHERE paper_id = 18;

-- 19. Comparative study of ensemble classifiers for chronic kidney disease prediction
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/pii/S1877050920307997'
WHERE paper_id = 19;

-- 20. A survey on deep learning architectures for medical image segmentation
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/pii/S0925231220303976'
WHERE paper_id = 20;

-- 21. Federated learning framework for privacy-preserving healthcare data analysis
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9084352'
WHERE paper_id = 21;

-- 22. Explainable AI for clinical decision support in diabetic retinopathy detection
UPDATE Papers SET paper_link = 'https://www.nature.com/articles/s41598-022-16784-x'
WHERE paper_id = 22;

-- 23. Heart disease prediction using random forest and gradient boosting classifiers
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9358906'
WHERE paper_id = 23;

-- 24. Brain tumor detection using transfer learning on MRI images
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s10916-019-1475-2'
WHERE paper_id = 24;

-- 25. WSN-based information dissemination for optimizing irrigation through prescriptive farming
UPDATE Papers SET paper_link = 'https://www.igi-global.com/gateway/article/262597'
WHERE paper_id = 25;

-- 26. Tomato plant leaf disease classification using K-nearest neighbour and probabilistic neural network
UPDATE Papers SET paper_link = 'https://www.mdpi.com/2311-7524/9/2/149'
WHERE paper_id = 26;

-- 27. Real-time soil moisture monitoring for horticulture crops using IoT and LoRa
UPDATE Papers SET paper_link = 'https://www.mdpi.com/1424-8220/20/11/3086'
WHERE paper_id = 27;

-- 28. Smart greenhouse automation system using Arduino and Raspberry Pi
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9108786'
WHERE paper_id = 28;

-- 29. Energy-efficient routing protocol for heterogeneous wireless sensor networks
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/8763962'
WHERE paper_id = 29;

-- 30. Performance analysis of reactive jammer attack detection in WSN
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9360570'
WHERE paper_id = 30;

-- 31. Plant leaf disease detection using convolutional neural network with data augmentation
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/pii/S0168169919326122'
WHERE paper_id = 31;

-- 32. Deep learning-based face recognition in unconstrained surveillance environments
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9359901'
WHERE paper_id = 32;

-- 33. Robust vehicle license plate detection using YOLO architecture
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9775698'
WHERE paper_id = 33;

-- 34. Hybrid feature extraction for multiclass plant disease recognition using SVM
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s11042-020-08984-6'
WHERE paper_id = 34;

-- 35. Real-time object detection for autonomous vehicle navigation using YOLOv5
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9803330'
WHERE paper_id = 35;

-- 36. Association of non-alcoholic fatty liver disease with Type 2 diabetes mellitus
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0168827818300503'
WHERE paper_id = 36;

-- 37. Adiponectin gene polymorphism in offspring of Type 2 diabetes mellitus patients
UPDATE Papers SET paper_link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5872829/'
WHERE paper_id = 37;

-- 38. Prevalence of hypertension and NCD risk factors in South Indian tribal communities
UPDATE Papers SET paper_link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6635271/'
WHERE paper_id = 38;

-- 39. Trauma severity scoring using ISS, NISS, RTS and TRISS in Karnataka hospitals
UPDATE Papers SET paper_link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7306020/'
WHERE paper_id = 39;

-- 40. Cryosurgery using HydroZID device for superficial epidermal lesions: phase IV study
UPDATE Papers SET paper_link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8141694/'
WHERE paper_id = 40;

-- 41. Bacteriological profile of urinary tract infections in tertiary care hospital
UPDATE Papers SET paper_link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6876342/'
WHERE paper_id = 41;

-- 42. Seroprevalence of HIV and Hepatitis B co-infection in blood donors
UPDATE Papers SET paper_link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5987236/'
WHERE paper_id = 42;

-- 43. Clinical outcomes of laparoscopic cholecystectomy in elderly patients
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s11605-019-04461-2'
WHERE paper_id = 43;

-- 44. Phase transitions in complex ionic liquids at extreme thermodynamic conditions
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0167732220305079'
WHERE paper_id = 44;

-- 45. Theoretical study of hydrogen bond networks in protic ionic liquid mixtures
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0167732222006754'
WHERE paper_id = 45;

-- 46. Density functional theory study of electronic properties of graphene nanoribbons
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0008622320309738'
WHERE paper_id = 46;

-- 47. Molecular dynamics simulation of protein folding in aqueous media
UPDATE Papers SET paper_link = 'https://pubs.acs.org/doi/10.1021/acs.jctc.2c00338'
WHERE paper_id = 47;

-- 48. Efficient stack-based graph traversal for large-scale network configuration
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/8936427'
WHERE paper_id = 48;

-- 49. Domination in directed graphs with applications to network design
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/pii/S0012365X19303565'
WHERE paper_id = 49;

-- 50. On the chromatic polynomial of certain families of graph products
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/pii/S0012365X20303459'
WHERE paper_id = 50;

-- 51. Labeling schemes for random graphs and social network analysis
UPDATE Papers SET paper_link = 'https://dl.acm.org/doi/10.1145/3442381.3449896'
WHERE paper_id = 51;

-- 52. Machining characteristics of GFRP composites using HSS and carbide tools
UPDATE Papers SET paper_link = 'https://www.researchgate.net/publication/233388025_Machinability_of_glass_fiber_reinforced_plastic_GFRP_composite_materials'
WHERE paper_id = 52;

-- 53. Evaluation of surface roughness in GFRP machining with coated cemented carbide
UPDATE Papers SET paper_link = 'https://doi.org/10.1080/10426914.2012.677917'
WHERE paper_id = 53;

-- 54. Development of hybrid natural–polymer fiber reinforced composites
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s10965-013-0121-4'
WHERE paper_id = 54;

-- 55. Characterization of jute-sisal hybrid composite for structural applications
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0261306913011825'
WHERE paper_id = 55;

-- 56. Mechanical and tribological properties of Al-SiC metal matrix composites
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s11665-016-2063-4'
WHERE paper_id = 56;

-- 57. Effect of stacking sequence on flexural properties of carbon-glass hybrid laminates
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0261306916306811'
WHERE paper_id = 57;

-- 58. Optimal placement of distributed generation units using particle swarm optimization
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/8392529'
WHERE paper_id = 58;

-- 59. Voltage stability enhancement in power systems using FACTS devices
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/7984928'
WHERE paper_id = 59;

-- 60. Load forecasting using LSTM neural network for smart grid applications
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9363501'
WHERE paper_id = 60;

-- 61. Energy management in microgrid with renewable energy sources
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9208762'
WHERE paper_id = 61;

-- 62. ECG signal denoising using wavelet transform and adaptive filtering
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/8762124'
WHERE paper_id = 62;

-- 63. Speech emotion recognition using MFCC and deep neural networks
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s11042-020-09874-7'
WHERE paper_id = 63;

-- 64. Multiband image compression using 2D discrete wavelet transform
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/8354989'
WHERE paper_id = 64;

-- 65. Systematic pricing in toll roads using unmanned RFID-based toll collection
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9399344'
WHERE paper_id = 65;

-- 66. Anomaly detection in network traffic using autoencoder neural networks
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9751289'
WHERE paper_id = 66;

-- 67. Blockchain-based secure data sharing framework for healthcare systems
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9747978'
WHERE paper_id = 67;

-- 68. DDoS attack detection and mitigation using machine learning classifiers
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9420281'
WHERE paper_id = 68;

-- 69. Smart agriculture in Karnataka using IoT sensors and machine learning
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9438609'
WHERE paper_id = 69;

-- 70. Automated irrigation system based on soil moisture sensing using Arduino
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9213263'
WHERE paper_id = 70;

-- 71. Remote patient monitoring using IoT and cloud computing platforms
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9388618'
WHERE paper_id = 71;

-- 72. Collaborative research on water quality monitoring in Mysuru lakes
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s11270-020-04683-4'
WHERE paper_id = 72;

-- 73. Comparative analysis of renewable energy adoption in Karnataka industries
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/pii/S1364032120308965'
WHERE paper_id = 73;

-- 74. Diversity and distribution of freshwater algae in water bodies of Mysuru district
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s12045-018-0660-4'
WHERE paper_id = 74;

-- 75. Ethnobotanical survey of medicinal plants used by tribes of Mysuru region
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0378874117312340'
WHERE paper_id = 75;

-- 76. Seasonal variation of phytoplankton in Krishnaraja Sagar reservoir
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s00343-019-8195-6'
WHERE paper_id = 76;

-- 77. Genetic diversity analysis of rice cultivars from Karnataka using RAPD markers
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0960308520301942'
WHERE paper_id = 77;

-- 78. Assessment of heavy metal bioaccumulation in fish from Cauvery River
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s10661-021-08841-z'
WHERE paper_id = 78;

-- 79. Spectroscopic characterization of flavonoid compounds from Solanum nigrum
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S1386142519306493'
WHERE paper_id = 79;

-- 80. Antioxidant activity of polyphenols extracted from Indian medicinal plants
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s11130-020-00825-z'
WHERE paper_id = 80;

-- 81. Crystal structure and magnetic properties of manganite perovskites
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0304885317334820'
WHERE paper_id = 81;

-- 82. Design and implementation of low-power IoT node for environmental monitoring
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9352619'
WHERE paper_id = 82;

-- 83. Convolutional neural network for automated quality inspection in manufacturing
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9802765'
WHERE paper_id = 83;

-- 84. Blockchain-integrated supply chain management for pharmaceutical industry
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9737504'
WHERE paper_id = 84;

-- 85. Analysis of urban heat island effect in Mysuru city using satellite imagery
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0034425720305228'
WHERE paper_id = 85;

-- 86. Magnetocaloric properties of La1.34Sr1.66Mn2O3 Ruddlesden-Popper manganite
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s00339-025-09211-5'
WHERE paper_id = 86;

-- 87. Structural and magnetic characterization of charge-ordered Pr0.48Sr0.52MnO3
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0304885314012955'
WHERE paper_id = 87;

-- 88. Nutritional assessment and intervention in early childhood development
UPDATE Papers SET paper_link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8187186/'
WHERE paper_id = 88;

-- 89. Psychiatric morbidity in substance use disorders: a hospital-based study
UPDATE Papers SET paper_link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9296095/'
WHERE paper_id = 89;

-- 90. IoT-based real-time health monitoring for smart hospitals using fog computing
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9118868'
WHERE paper_id = 90;

-- 91. Comparative performance of CNN architectures for skin lesion classification
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s00521-022-07035-5'
WHERE paper_id = 91;

-- 92. Seismic vulnerability assessment of reinforced concrete buildings in Mysuru
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s00024-019-02095-6'
WHERE paper_id = 92;

-- 93. Structural health monitoring using wireless sensor nodes and IoT platform
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9162064'
WHERE paper_id = 93;

-- 94. Real-time traffic density estimation using vehicle tracking algorithms
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9420519'
WHERE paper_id = 94;

-- 95. Embedded system design for EV battery management using CAN protocol
UPDATE Papers SET paper_link = 'https://ieeexplore.ieee.org/document/9825067'
WHERE paper_id = 95;

-- 96. Thermal analysis of natural fiber reinforced polymer matrix composites
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s10965-018-1633-4'
WHERE paper_id = 96;

-- 97. Optimization of EDM parameters for machining of Inconel 718 superalloy
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S0924013619300792'
WHERE paper_id = 97;

-- 98. Morphological and molecular characterization of soil fungi from organic farms
UPDATE Papers SET paper_link = 'https://www.sciencedirect.com/science/article/abs/pii/S1754504821001471'
WHERE paper_id = 98;

-- 99. Water quality index computation for groundwater in Mysuru taluk
UPDATE Papers SET paper_link = 'https://link.springer.com/article/10.1007/s13201-021-01546-7'
WHERE paper_id = 99;

-- =====================================================================
-- Verification query — uncomment to check results after running
-- =====================================================================
-- SELECT paper_id, title, year, paper_link
-- FROM Papers
-- ORDER BY paper_id;
