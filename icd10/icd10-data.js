'use strict';
var ICD10_DB = (function() {

  var chapters = [
    { code: "I", name: "Certain infectious and parasitic diseases", range: "A00-B99" },
    { code: "II", name: "Neoplasms", range: "C00-D49" },
    { code: "III", name: "Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism", range: "D50-D89" },
    { code: "IV", name: "Endocrine, nutritional and metabolic diseases", range: "E00-E89" },
    { code: "V", name: "Mental, Behavioral and Neurodevelopmental disorders", range: "F01-F99" },
    { code: "VI", name: "Diseases of the nervous system", range: "G00-G99" },
    { code: "VII", name: "Diseases of the eye and adnexa", range: "H00-H59" },
    { code: "VIII", name: "Diseases of the ear and mastoid process", range: "H60-H95" },
    { code: "IX", name: "Diseases of the circulatory system", range: "I00-I99" },
    { code: "X", name: "Diseases of the respiratory system", range: "J00-J99" },
    { code: "XI", name: "Diseases of the digestive system", range: "K00-K93" },
    { code: "XII", name: "Diseases of the skin and subcutaneous tissue", range: "L00-L99" },
    { code: "XIII", name: "Diseases of the musculoskeletal system and connective tissue", range: "M00-M99" },
    { code: "XIV", name: "Diseases of the genitourinary system", range: "N00-N99" },
    { code: "XV", name: "Pregnancy, childbirth and the puerperium", range: "O00-O9A" },
    { code: "XVI", name: "Certain conditions originating in the perinatal period", range: "P00-P96" },
    { code: "XVII", name: "Congenital malformations, deformations and chromosomal abnormalities", range: "Q00-Q99" },
    { code: "XVIII", name: "Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified", range: "R00-R99" },
    { code: "XIX", name: "Injury, poisoning and certain other consequences of external causes", range: "S00-T88" },
    { code: "XX", name: "External causes of morbidity", range: "V00-Y99" },
    { code: "XXI", name: "Factors influencing health status and contact with health services", range: "Z00-Z99" }
  ];

  var categories0 = {
    "A00": { code: "A00", description: "Cholera", chapter: "I", range: "A00-A00" },
    "A09": { code: "A09", description: "Infectious gastroenteritis and colitis, unspecified", chapter: "I", range: "A09-A09" },
    "B07": { code: "B07", description: "Viral warts", chapter: "I", range: "B07-B07" },
    "B20": { code: "B20", description: "Human immunodeficiency virus [HIV] disease", chapter: "I", range: "B20-B20" },
    "B25": { code: "B25", description: "Cytomegaloviral disease", chapter: "I", range: "B25-B25" },
    "B34": { code: "B34", description: "Other viral disease, unspecified", chapter: "I", range: "B34-B34" },
    "B35": { code: "B35", description: "Dermatophytosis", chapter: "I", range: "B35-B35" },
    "B37": { code: "B37", description: "Candidiasis", chapter: "I", range: "B37-B37" },
    "B54": { code: "B54", description: "Unspecified malaria", chapter: "I", range: "B54-B54" },
    "B76": { code: "B76", description: "Diseases due to other intestinal helminths", chapter: "I", range: "B76-B76" },
    "B82": { code: "B82", description: "Unspecified intestinal parasitism", chapter: "I", range: "B82-B82" },
    "B97": { code: "B97", description: "Viral agents as the cause of diseases classified elsewhere", chapter: "I", range: "B97-B97" },
    "C00": { code: "C00", description: "Malignant neoplasm of lip", chapter: "II", range: "C00-C00" },
    "C01": { code: "C01", description: "Malignant neoplasm of base of tongue", chapter: "II", range: "C01-C01" },
    "C02": { code: "C02", description: "Malignant neoplasm of other and unspecified parts of tongue", chapter: "II", range: "C02-C02" },
    "C15": { code: "C15", description: "Malignant neoplasm of esophagus", chapter: "II", range: "C15-C15" },
    "C16": { code: "C16", description: "Malignant neoplasm of stomach", chapter: "II", range: "C16-C16" },
    "C18": { code: "C18", description: "Malignant neoplasm of colon", chapter: "II", range: "C18-C18" },
    "C20": { code: "C20", description: "Malignant neoplasm of rectum", chapter: "II", range: "C20-C20" },
    "C22": { code: "C22", description: "Malignant neoplasm of liver and intrahepatic bile ducts", chapter: "II", range: "C22-C22" },
    "C25": { code: "C25", description: "Malignant neoplasm of pancreas", chapter: "II", range: "C25-C25" },
    "C34": { code: "C34", description: "Malignant neoplasm of bronchus and lung", chapter: "II", range: "C34-C34" },
    "C43": { code: "C43", description: "Malignant melanoma of skin", chapter: "II", range: "C43-C43" },
    "C44": { code: "C44", description: "Other and unspecified malignant neoplasm of skin", chapter: "II", range: "C44-C44" },
    "C50": { code: "C50", description: "Malignant neoplasm of breast", chapter: "II", range: "C50-C50" },
    "C53": { code: "C53", description: "Malignant neoplasm of cervix uteri", chapter: "II", range: "C53-C53" },
    "C56": { code: "C56", description: "Malignant neoplasm of ovary", chapter: "II", range: "C56-C56" },
    "C61": { code: "C61", description: "Malignant neoplasm of prostate", chapter: "II", range: "C61-C61" },
    "C64": { code: "C64", description: "Malignant neoplasm of kidney, except renal pelvis", chapter: "II", range: "C64-C64" },
    "C67": { code: "C67", description: "Malignant neoplasm of bladder", chapter: "II", range: "C67-C67" },
    "C71": { code: "C71", description: "Malignant neoplasm of brain", chapter: "II", range: "C71-C71" },
    "C73": { code: "C73", description: "Malignant neoplasm of thyroid gland", chapter: "II", range: "C73-C73" },
    "C81": { code: "C81", description: "Hodgkin lymphoma", chapter: "II", range: "C81-C81" },
    "C82": { code: "C82", description: "Follicular lymphoma", chapter: "II", range: "C82-C82" },
    "C83": { code: "C83", description: "Non-follicular lymphoma", chapter: "II", range: "C83-C83" },
    "C85": { code: "C85", description: "Other specified and unspecified types of non-Hodgkin lymphoma", chapter: "II", range: "C85-C85" },
    "C90": { code: "C90", description: "Multiple myeloma and malignant plasma cell neoplasms", chapter: "II", range: "C90-C90" },
    "C91": { code: "C91", description: "Lymphoid leukemia", chapter: "II", range: "C91-C91" },
    "C92": { code: "C92", description: "Myeloid leukemia", chapter: "II", range: "C92-C92" },
    "C95": { code: "C95", description: "Leukemia of unspecified cell type", chapter: "II", range: "C95-C95" },
    "D03": { code: "D03", description: "Melanoma in situ", chapter: "II", range: "D03-D03" },
    "D04": { code: "D04", description: "Carcinoma in situ of skin", chapter: "II", range: "D04-D04" },
    "D05": { code: "D05", description: "Carcinoma in situ of breast", chapter: "II", range: "D05-D05" },
    "D06": { code: "D06", description: "Carcinoma in situ of cervix uteri", chapter: "II", range: "D06-D06" },
    "D10": { code: "D10", description: "Benign neoplasm of mouth and pharynx", chapter: "II", range: "D10-D10" },
    "D12": { code: "D12", description: "Benign neoplasm of colon, rectum, anus and anal canal", chapter: "II", range: "D12-D12" },
    "D13": { code: "D13", description: "Benign neoplasm of other and ill-defined parts of digestive system", chapter: "II", range: "D13-D13" },
    "D14": { code: "D14", description: "Benign neoplasm of middle ear and respiratory system", chapter: "II", range: "D14-D14" },
    "D16": { code: "D16", description: "Benign neoplasm of bone and articular cartilage", chapter: "II", range: "D16-D16" },
    "D17": { code: "D17", description: "Benign lipomatous neoplasm of skin and subcutaneous tissue", chapter: "II", range: "D17-D17" },
    "D18": { code: "D18", description: "Hemangioma and lymphangioma, any site", chapter: "II", range: "D18-D18" },
    "D22": { code: "D22", description: "Melanocytic nevi", chapter: "II", range: "D22-D22" },
    "D23": { code: "D23", description: "Other benign neoplasms of skin", chapter: "II", range: "D23-D23" },
    "D24": { code: "D24", description: "Benign neoplasm of breast", chapter: "II", range: "D24-D24" },
    "D25": { code: "D25", description: "Leiomyoma of uterus", chapter: "II", range: "D25-D25" },
    "D27": { code: "D27", description: "Benign neoplasm of ovary", chapter: "II", range: "D27-D27" },
    "D29": { code: "D29", description: "Benign neoplasm of male genital organs", chapter: "II", range: "D29-D29" },
    "D30": { code: "D30", description: "Benign neoplasm of urinary organs", chapter: "II", range: "D30-D30" },
    "D32": { code: "D32", description: "Benign neoplasm of meninges", chapter: "II", range: "D32-D32" },
    "D33": { code: "D33", description: "Benign neoplasm of brain and cranial nerves", chapter: "II", range: "D33-D33" },
    "D44": { code: "D44", description: "Neoplasm of uncertain behavior of endocrine glands", chapter: "II", range: "D44-D44" },
    "D45": { code: "D45", description: "Polycythemia vera", chapter: "II", range: "D45-D45" },
    "D46": { code: "D46", description: "Myelodysplastic syndromes", chapter: "II", range: "D46-D46" },
    "D47": { code: "D47", description: "Other neoplasms of uncertain behavior of lymphoid, hematopoietic and related tissue", chapter: "II", range: "D47-D47" },
    "D50": { code: "D50", description: "Iron deficiency anemia", chapter: "III", range: "D50-D50" },
    "D51": { code: "D51", description: "Vitamin B12 deficiency anemia", chapter: "III", range: "D51-D51" },
    "D52": { code: "D52", description: "Folate deficiency anemia", chapter: "III", range: "D52-D52" },
    "D53": { code: "D53", description: "Other nutritional anemias", chapter: "III", range: "D53-D53" },
    "D55": { code: "D55", description: "Anemia due to enzyme disorders", chapter: "III", range: "D55-D55" },
    "D56": { code: "D56", description: "Thalassemia", chapter: "III", range: "D56-D56" },
    "D57": { code: "D57", description: "Sickle cell disorders", chapter: "III", range: "D57-D57" },
    "D58": { code: "D58", description: "Other hereditary hemolytic anemias", chapter: "III", range: "D58-D58" },
    "D59": { code: "D59", description: "Acquired hemolytic anemias", chapter: "III", range: "D59-D59" },
    "D61": { code: "D61", description: "Other aplastic anemias", chapter: "III", range: "D61-D61" },
    "D62": { code: "D62", description: "Acute posthemorrhagic anemia", chapter: "III", range: "D62-D62" },
    "D63": { code: "D63", description: "Anemia in chronic diseases classified elsewhere", chapter: "III", range: "D63-D63" },
    "D64": { code: "D64", description: "Other anemias", chapter: "III", range: "D64-D64" },
    "D65": { code: "D65", description: "Disseminated intravascular coagulation [defibrination syndrome]", chapter: "III", range: "D65-D65" },
    "D66": { code: "D66", description: "Hereditary factor VIII deficiency", chapter: "III", range: "D66-D66" },
    "D67": { code: "D67", description: "Hereditary factor IX deficiency", chapter: "III", range: "D67-D67" },
    "D68": { code: "D68", description: "Other coagulation defects", chapter: "III", range: "D68-D68" },
    "D69": { code: "D69", description: "Purpura and other hemorrhagic conditions", chapter: "III", range: "D69-D69" },
    "D70": { code: "D70", description: "Neutropenia", chapter: "III", range: "D70-D70" },
    "D72": { code: "D72", description: "Other disorders of white blood cells", chapter: "III", range: "D72-D72" },
    "D73": { code: "D73", description: "Diseases of spleen", chapter: "III", range: "D73-D73" },
    "D75": { code: "D75", description: "Other and unspecified diseases of blood and blood-forming organs", chapter: "III", range: "D75-D75" },
    "D80": { code: "D80", description: "Immunodeficiency with predominantly antibody defects", chapter: "III", range: "D80-D80" },
    "D81": { code: "D81", description: "Combined immunodeficiencies", chapter: "III", range: "D81-D81" },
    "D83": { code: "D83", description: "Common variable immunodeficiency", chapter: "III", range: "D83-D83" },
    "D84": { code: "D84", description: "Other immunodeficiencies", chapter: "III", range: "D84-D84" },
    "D86": { code: "D86", description: "Sarcoidosis", chapter: "III", range: "D86-D86" },
    "D89": { code: "D89", description: "Other disorders involving the immune mechanism, not elsewhere classified", chapter: "III", range: "D89-D89" },
    "E00": { code: "E00", description: "Congenital iodine-deficiency syndrome", chapter: "IV", range: "E00-E00" },
    "E01": { code: "E01", description: "Iodine-deficiency related thyroid disorders and allied conditions", chapter: "IV", range: "E01-E01" },
    "E02": { code: "E02", description: "Subclinical iodine-deficiency hypothyroidism", chapter: "IV", range: "E02-E02" },
    "E03": { code: "E03", description: "Other hypothyroidism", chapter: "IV", range: "E03-E03" },
    "E04": { code: "E04", description: "Other nontoxic goiter", chapter: "IV", range: "E04-E04" },
    "E05": { code: "E05", description: "Thyrotoxicosis [hyperthyroidism]", chapter: "IV", range: "E05-E05" },
    "E06": { code: "E06", description: "Thyroiditis", chapter: "IV", range: "E06-E06" },
    "E07": { code: "E07", description: "Other disorders of thyroid", chapter: "IV", range: "E07-E07" },
    "E10": { code: "E10", description: "Type 1 diabetes mellitus", chapter: "IV", range: "E10-E10" },
    "E11": { code: "E11", description: "Type 2 diabetes mellitus", chapter: "IV", range: "E11-E11" },
    "E13": { code: "E13", description: "Other specified diabetes mellitus", chapter: "IV", range: "E13-E13" },
    "E15": { code: "E15", description: "Nonspecific hypoglycemia", chapter: "IV", range: "E15-E15" },
    "E16": { code: "E16", description: "Other disorders of pancreatic internal secretion", chapter: "IV", range: "E16-E16" },
    "E20": { code: "E20", description: "Hypoparathyroidism", chapter: "IV", range: "E20-E20" },
    "E21": { code: "E21", description: "Hyperparathyroidism and other disorders of parathyroid gland", chapter: "IV", range: "E21-E21" },
    "E22": { code: "E22", description: "Hyperfunction of pituitary gland", chapter: "IV", range: "E22-E22" },
    "E23": { code: "E23", description: "Hypofunction and other disorders of pituitary gland", chapter: "IV", range: "E23-E23" },
    "E24": { code: "E24", description: "Cushing syndrome", chapter: "IV", range: "E24-E24" },
    "E25": { code: "E25", description: "Adrenogenital disorders", chapter: "IV", range: "E25-E25" },
    "E27": { code: "E27", description: "Other disorders of adrenal gland", chapter: "IV", range: "E27-E27" },
    "E28": { code: "E28", description: "Ovarian dysfunction", chapter: "IV", range: "E28-E28" },
    "E29": { code: "E29", description: "Testicular dysfunction", chapter: "IV", range: "E29-E29" },
    "E31": { code: "E31", description: "Polyglandular dysfunction", chapter: "IV", range: "E31-E31" },
    "E40": { code: "E40", description: "Kwashiorkor", chapter: "IV", range: "E40-E40" },
    "E41": { code: "E41", description: "Nutritional marasmus", chapter: "IV", range: "E41-E41" },
    "E43": { code: "E43", description: "Unspecified severe protein-energy malnutrition", chapter: "IV", range: "E43-E43" },
    "E44": { code: "E44", description: "Moderate and mild protein-energy malnutrition", chapter: "IV", range: "E44-E44" },
    "E46": { code: "E46", description: "Unspecified protein-energy malnutrition", chapter: "IV", range: "E46-E46" },
    "E50": { code: "E50", description: "Vitamin A deficiency", chapter: "IV", range: "E50-E50" },
    "E51": { code: "E51", description: "Thiamine deficiency", chapter: "IV", range: "E51-E51" },
    "E52": { code: "E52", description: "Niacin deficiency [pellagra]", chapter: "IV", range: "E52-E52" },
    "E53": { code: "E53", description: "Deficiency of other B group vitamins", chapter: "IV", range: "E53-E53" },
    "E54": { code: "E54", description: "Ascorbic acid deficiency", chapter: "IV", range: "E54-E54" },
    "E55": { code: "E55", description: "Vitamin D deficiency", chapter: "IV", range: "E55-E55" },
    "E56": { code: "E56", description: "Other vitamin deficiencies", chapter: "IV", range: "E56-E56" },
    "E61": { code: "E61", description: "Deficiency of other nutrient elements", chapter: "IV", range: "E61-E61" },
    "E63": { code: "E63", description: "Other nutritional deficiencies", chapter: "IV", range: "E63-E63" },
    "E65": { code: "E65", description: "Localized adiposity", chapter: "IV", range: "E65-E65" },
    "E66": { code: "E66", description: "Obesity", chapter: "IV", range: "E66-E66" },
    "E67": { code: "E67", description: "Other hyperalimentation", chapter: "IV", range: "E67-E67" },
    "E70": { code: "E70", description: "Disorders of aromatic amino-acid metabolism", chapter: "IV", range: "E70-E70" },
    "E71": { code: "E71", description: "Disorders of branched-chain amino-acid metabolism and fatty-acid metabolism", chapter: "IV", range: "E71-E71" },
    "E72": { code: "E72", description: "Disorders of amino-acid metabolism", chapter: "IV", range: "E72-E72" },
    "E73": { code: "E73", description: "Disorders of lactose metabolism", chapter: "IV", range: "E73-E73" },
    "E74": { code: "E74", description: "Other disorders of carbohydrate metabolism", chapter: "IV", range: "E74-E74" },
    "E75": { code: "E75", description: "Disorders of lipoid metabolism", chapter: "IV", range: "E75-E75" },
    "E76": { code: "E76", description: "Disorders of glycosaminoglycan metabolism", chapter: "IV", range: "E76-E76" },
    "E78": { code: "E78", description: "Disorders of lipoprotein metabolism and other lipidemias", chapter: "IV", range: "E78-E78" },
    "E79": { code: "E79", description: "Disorders of purine and pyrimidine metabolism", chapter: "IV", range: "E79-E79" },
    "E80": { code: "E80", description: "Disorders of porphyrin and bilirubin metabolism", chapter: "IV", range: "E80-E80" },
    "E83": { code: "E83", description: "Disorders of mineral metabolism", chapter: "IV", range: "E83-E83" },
    "E84": { code: "E84", description: "Cystic fibrosis", chapter: "IV", range: "E84-E84" },
    "E85": { code: "E85", description: "Amyloidosis", chapter: "IV", range: "E85-E85" },
    "E86": { code: "E86", description: "Volume depletion", chapter: "IV", range: "E86-E86" },
    "E87": { code: "E87", description: "Other disorders of fluid, electrolyte and acid-base balance", chapter: "IV", range: "E87-E87" },
    "E88": { code: "E88", description: "Other metabolic disorders", chapter: "IV", range: "E88-E88" },
    "E89": { code: "E89", description: "Postprocedural endocrine and metabolic disorders, not elsewhere classified", chapter: "IV", range: "E89-E89" },
    "F01": { code: "F01", description: "Vascular dementia", chapter: "V", range: "F01-F01" },
    "F02": { code: "F02", description: "Dementia in other diseases classified elsewhere", chapter: "V", range: "F02-F02" },
    "F03": { code: "F03", description: "Unspecified dementia", chapter: "V", range: "F03-F03" },
    "F05": { code: "F05", description: "Delirium, not induced by alcohol and other psychoactive substances", chapter: "V", range: "F05-F05" },
    "F10": { code: "F10", description: "Alcohol related disorders", chapter: "V", range: "F10-F10" },
    "F11": { code: "F11", description: "Opioid related disorders", chapter: "V", range: "F11-F11" },
    "F12": { code: "F12", description: "Cannabis related disorders", chapter: "V", range: "F12-F12" },
    "F13": { code: "F13", description: "Sedative, hypnotic, or anxiolytic related disorders", chapter: "V", range: "F13-F13" },
    "F14": { code: "F14", description: "Cocaine related disorders", chapter: "V", range: "F14-F14" },
    "F15": { code: "F15", description: "Other stimulant related disorders", chapter: "V", range: "F15-F15" },
    "F17": { code: "F17", description: "Nicotine dependence", chapter: "V", range: "F17-F17" },
    "F18": { code: "F18", description: "Inhalant related disorders", chapter: "V", range: "F18-F18" },
    "F19": { code: "F19", description: "Other psychoactive substance related disorders", chapter: "V", range: "F19-F19" },
    "F20": { code: "F20", description: "Schizophrenia", chapter: "V", range: "F20-F20" },
    "F21": { code: "F21", description: "Schizotypal disorder", chapter: "V", range: "F21-F21" },
    "F22": { code: "F22", description: "Delusional disorders", chapter: "V", range: "F22-F22" },
    "F23": { code: "F23", description: "Brief psychotic disorder", chapter: "V", range: "F23-F23" },
    "F25": { code: "F25", description: "Schizoaffective disorders", chapter: "V", range: "F25-F25" },
    "F29": { code: "F29", description: "Unspecified psychosis not due to a substance or known physiological condition", chapter: "V", range: "F29-F29" },
    "F30": { code: "F30", description: "Manic episode", chapter: "V", range: "F30-F30" },
    "F31": { code: "F31", description: "Bipolar disorder", chapter: "V", range: "F31-F31" },
    "F32": { code: "F32", description: "Major depressive disorder, single episode", chapter: "V", range: "F32-F32" },
    "F33": { code: "F33", description: "Major depressive disorder, recurrent", chapter: "V", range: "F33-F33" },
    "F34": { code: "F34", description: "Cyclothymic disorder", chapter: "V", range: "F34-F34" },
    "F39": { code: "F39", description: "Unspecified mood [affective] disorder", chapter: "V", range: "F39-F39" },
    "F40": { code: "F40", description: "Phobic anxiety disorders", chapter: "V", range: "F40-F40" },
    "F41": { code: "F41", description: "Other anxiety disorders", chapter: "V", range: "F41-F41" },
    "F42": { code: "F42", description: "Obsessive-compulsive disorder", chapter: "V", range: "F42-F42" },
    "F43": { code: "F43", description: "Reaction to severe stress, and adjustment disorders", chapter: "V", range: "F43-F43" },
    "F44": { code: "F44", description: "Dissociative [conversion] disorders", chapter: "V", range: "F44-F44" },
    "F45": { code: "F45", description: "Somatoform disorders", chapter: "V", range: "F45-F45" },
    "F48": { code: "F48", description: "Other neurotic disorders", chapter: "V", range: "F48-F48" },
    "F50": { code: "F50", description: "Eating disorders", chapter: "V", range: "F50-F50" },
    "F51": { code: "F51", description: "Nonorganic sleep disorders", chapter: "V", range: "F51-F51" },
    "F52": { code: "F52", description: "Sexual dysfunction, not caused by a disorder or disease", chapter: "V", range: "F52-F52" },
    "F60": { code: "F60", description: "Specific personality disorders", chapter: "V", range: "F60-F60" },
    "F63": { code: "F63", description: "Impulse control disorders", chapter: "V", range: "F63-F63" },
    "F64": { code: "F64", description: "Gender identity disorders", chapter: "V", range: "F64-F64" },
    "F65": { code: "F65", description: "Paraphilias", chapter: "V", range: "F65-F65" },
    "F80": { code: "F80", description: "Specific developmental disorders of speech and language", chapter: "V", range: "F80-F80" },
    "F81": { code: "F81", description: "Specific developmental disorders of scholastic skills", chapter: "V", range: "F81-F81" },
    "F82": { code: "F82", description: "Specific developmental disorder of motor function", chapter: "V", range: "F82-F82" },
    "F84": { code: "F84", description: "Pervasive developmental disorders", chapter: "V", range: "F84-F84" },
    "F90": { code: "F90", description: "Hyperkinetic disorders", chapter: "V", range: "F90-F90" },
    "F91": { code: "F91", description: "Conduct disorders", chapter: "V", range: "F91-F91" },
    "F93": { code: "F93", description: "Emotional disorders of childhood", chapter: "V", range: "F93-F93" },
    "F95": { code: "F95", description: "Tic disorders", chapter: "V", range: "F95-F95" },
    "F98": { code: "F98", description: "Other behavioral and emotional disorders with onset usually occurring in childhood and adolescence", chapter: "V", range: "F98-F98" }
  };
  var categories2 = {
    "G00": { code: "G00", description: "Bacterial meningitis, not elsewhere classified", chapter: "VI", range: "G00-G00" },
    "G03": { code: "G03", description: "Meningitis due to other and unspecified causes", chapter: "VI", range: "G03-G03" },
    "G04": { code: "G04", description: "Encephalitis, myelitis and encephalomyelitis", chapter: "VI", range: "G04-G04" },
    "G10": { code: "G10", description: "Huntington disease", chapter: "VI", range: "G10-G10" },
    "G11": { code: "G11", description: "Hereditary ataxia", chapter: "VI", range: "G11-G11" },
    "G20": { code: "G20", description: "Parkinson disease", chapter: "VI", range: "G20-G20" },
    "G21": { code: "G21", description: "Secondary parkinsonism", chapter: "VI", range: "G21-G21" },
    "G25": { code: "G25", description: "Other extrapyramidal and movement disorders", chapter: "VI", range: "G25-G25" },
    "G30": { code: "G30", description: "Alzheimer disease", chapter: "VI", range: "G30-G30" },
    "G31": { code: "G31", description: "Other degenerative diseases of nervous system, not elsewhere classified", chapter: "VI", range: "G31-G31" },
    "G35": { code: "G35", description: "Multiple sclerosis", chapter: "VI", range: "G35-G35" },
    "G40": { code: "G40", description: "Epilepsy", chapter: "VI", range: "G40-G40" },
    "G41": { code: "G41", description: "Status epilepticus", chapter: "VI", range: "G41-G41" },
    "G43": { code: "G43", description: "Migraine", chapter: "VI", range: "G43-G43" },
    "G44": { code: "G44", description: "Other headache syndromes", chapter: "VI", range: "G44-G44" },
    "G45": { code: "G45", description: "Cerebrovascular syndromes of reversible ischaemic neurological deficit [RIND]", chapter: "VI", range: "G45-G45" },
    "G47": { code: "G47", description: "Sleep disorders", chapter: "VI", range: "G47-G47" },
    "G50": { code: "G50", description: "Disorders of trigeminal nerve", chapter: "VI", range: "G50-G50" },
    "G51": { code: "G51", description: "Facial nerve disorders", chapter: "VI", range: "G51-G51" },
    "G54": { code: "G54", description: "Nerve root and plexus disorders", chapter: "VI", range: "G54-G54" },
    "G56": { code: "G56", description: "Mononeuropathies of upper limb", chapter: "VI", range: "G56-G56" },
    "G57": { code: "G57", description: "Mononeuropathies of lower limb", chapter: "VI", range: "G57-G57" },
    "G60": { code: "G60", description: "Hereditary and idiopathic neuropathy", chapter: "VI", range: "G60-G60" },
    "G61": { code: "G61", description: "Inflammatory polyneuropathy", chapter: "VI", range: "G61-G61" },
    "G62": { code: "G62", description: "Other polyneuropathies", chapter: "VI", range: "G62-G62" },
    "G70": { code: "G70", description: "Myasthenia gravis and other myoneural disorders", chapter: "VI", range: "G70-G70" },
    "G71": { code: "G71", description: "Primary disorders of muscles", chapter: "VI", range: "G71-G71" },
    "G80": { code: "G80", description: "Cerebral palsy", chapter: "VI", range: "G80-G80" },
    "G81": { code: "G81", description: "Hemiplegia", chapter: "VI", range: "G81-G81" },
    "G82": { code: "G82", description: "Paraplegia and quadriplegia", chapter: "VI", range: "G82-G82" },
    "G83": { code: "G83", description: "Other paralytic syndromes", chapter: "VI", range: "G83-G83" },
    "G89": { code: "G89", description: "Pain syndromes, not elsewhere classified", chapter: "VI", range: "G89-G89" },
    "G90": { code: "G90", description: "Disorders of autonomic nervous system", chapter: "VI", range: "G90-G90" },
    "G91": { code: "G91", description: "Hydrocephalus", chapter: "VI", range: "G91-G91" },
    "G93": { code: "G93", description: "Other disorders of brain", chapter: "VI", range: "G93-G93" },
    "G95": { code: "G95", description: "Other diseases of spinal cord", chapter: "VI", range: "G95-G95" },
    "G96": { code: "G96", description: "Other disorders of central nervous system", chapter: "VI", range: "G96-G96" },
    "G97": { code: "G97", description: "Postprocedural disorders of nervous system, not elsewhere classified", chapter: "VI", range: "G97-G97" },
    "G98": { code: "G98", description: "Other disorders of nervous system, not elsewhere classified", chapter: "VI", range: "G98-G98" },
    "H00": { code: "H00", description: "Hordeolum and chalazion of eyelid", chapter: "VII", range: "H00-H00" },
    "H01": { code: "H01", description: "Other inflammation of eyelid", chapter: "VII", range: "H01-H01" },
    "H02": { code: "H02", description: "Other disorders of eyelid", chapter: "VII", range: "H02-H02" },
    "H04": { code: "H04", description: "Disorders of lacrimal system", chapter: "VII", range: "H04-H04" },
    "H05": { code: "H05", description: "Disorders of orbit", chapter: "VII", range: "H05-H05" },
    "H10": { code: "H10", description: "Conjunctivitis", chapter: "VII", range: "H10-H10" },
    "H11": { code: "H11", description: "Other disorders of conjunctiva", chapter: "VII", range: "H11-H11" },
    "H15": { code: "H15", description: "Disorders of sclera", chapter: "VII", range: "H15-H15" },
    "H16": { code: "H16", description: "Keratitis", chapter: "VII", range: "H16-H16" },
    "H18": { code: "H18", description: "Other disorders of cornea", chapter: "VII", range: "H18-H18" },
    "H20": { code: "H20", description: "Iridocyclitis", chapter: "VII", range: "H20-H20" },
    "H21": { code: "H21", description: "Other disorders of iris and ciliary body", chapter: "VII", range: "H21-H21" },
    "H25": { code: "H25", description: "Age-related cataract", chapter: "VII", range: "H25-H25" },
    "H26": { code: "H26", description: "Other cataract", chapter: "VII", range: "H26-H26" },
    "H30": { code: "H30", description: "Chorioretinitis and retinochoroiditis", chapter: "VII", range: "H30-H30" },
    "H33": { code: "H33", description: "Retinal detachments and breaks", chapter: "VII", range: "H33-H33" },
    "H34": { code: "H34", description: "Other retinal vascular occlusions", chapter: "VII", range: "H34-H34" },
    "H35": { code: "H35", description: "Other disorders of retina", chapter: "VII", range: "H35-H35" },
    "H40": { code: "H40", description: "Glaucoma", chapter: "VII", range: "H40-H40" },
    "H43": { code: "H43", description: "Disorders of vitreous body", chapter: "VII", range: "H43-H43" },
    "H44": { code: "H44", description: "Disorders of globe", chapter: "VII", range: "H44-H44" },
    "H46": { code: "H46", description: "Optic neuritis", chapter: "VII", range: "H46-H46" },
    "H47": { code: "H47", description: "Other disorders of optic [2nd] nerve and visual pathways", chapter: "VII", range: "H47-H47" },
    "H49": { code: "H49", description: "Paralytic strabismus", chapter: "VII", range: "H49-H49" },
    "H50": { code: "H50", description: "Other strabismus", chapter: "VII", range: "H50-H50" },
    "H52": { code: "H52", description: "Disorders of refraction and accommodation", chapter: "VII", range: "H52-H52" },
    "H53": { code: "H53", description: "Visual disturbances", chapter: "VII", range: "H53-H53" },
    "H54": { code: "H54", description: "Blindness and low vision", chapter: "VII", range: "H54-H54" },
    "H59": { code: "H59", description: "Postprocedural disorders of eye and adnexa, not elsewhere classified", chapter: "VII", range: "H59-H59" },
    "H60": { code: "H60", description: "Noninfective otitis externa", chapter: "VIII", range: "H60-H60" },
    "H61": { code: "H61", description: "Other disorders of external ear", chapter: "VIII", range: "H61-H61" },
    "H65": { code: "H65", description: "Nonsuppurative otitis media", chapter: "VIII", range: "H65-H65" },
    "H66": { code: "H66", description: "Suppurative and unspecified otitis media", chapter: "VIII", range: "H66-H66" },
    "H68": { code: "H68", description: "Eustachian salpingitis and obstruction", chapter: "VIII", range: "H68-H68" },
    "H70": { code: "H70", description: "Mastoiditis and related conditions", chapter: "VIII", range: "H70-H70" },
    "H72": { code: "H72", description: "Perforation of tympanic membrane", chapter: "VIII", range: "H72-H72" },
    "H73": { code: "H73", description: "Other disorders of tympanic membrane", chapter: "VIII", range: "H73-H73" },
    "H74": { code: "H74", description: "Other disorders of middle ear and mastoid", chapter: "VIII", range: "H74-H74" },
    "H80": { code: "H80", description: "Otosclerosis", chapter: "VIII", range: "H80-H80" },
    "H81": { code: "H81", description: "Vestibular disorders", chapter: "VIII", range: "H81-H81" },
    "H83": { code: "H83", description: "Other diseases of inner ear", chapter: "VIII", range: "H83-H83" },
    "H90": { code: "H90", description: "Conductive and sensorineural hearing loss", chapter: "VIII", range: "H90-H90" },
    "H91": { code: "H91", description: "Other hearing loss", chapter: "VIII", range: "H91-H91" },
    "H93": { code: "H93", description: "Other disorders of ear, not elsewhere classified", chapter: "VIII", range: "H93-H93" },
    "I00": { code: "I00", description: "Rheumatic fever without mention of heart involvement", chapter: "IX", range: "I00-I00" },
    "I05": { code: "I05", description: "Rheumatic mitral valve diseases", chapter: "IX", range: "I05-I05" },
    "I06": { code: "I06", description: "Rheumatic aortic valve diseases", chapter: "IX", range: "I06-I06" },
    "I08": { code: "I08", description: "Multiple valve diseases", chapter: "IX", range: "I08-I08" },
    "I10": { code: "I10", description: "Essential (primary) hypertension", chapter: "IX", range: "I10-I10" },
    "I11": { code: "I11", description: "Hypertensive heart disease", chapter: "IX", range: "I11-I11" },
    "I12": { code: "I12", description: "Hypertensive chronic kidney disease", chapter: "IX", range: "I12-I12" },
    "I13": { code: "I13", description: "Hypertensive heart and chronic kidney disease", chapter: "IX", range: "I13-I13" },
    "I15": { code: "I15", description: "Secondary hypertension", chapter: "IX", range: "I15-I15" },
    "I20": { code: "I20", description: "Angina pectoris", chapter: "IX", range: "I20-I20" },
    "I21": { code: "I21", description: "Acute myocardial infarction", chapter: "IX", range: "I21-I21" },
    "I22": { code: "I22", description: "Subsequent ST elevation (STEMI) and non-ST elevation (NSTEMI) myocardial infarction", chapter: "IX", range: "I22-I22" },
    "I25": { code: "I25", description: "Chronic ischemic heart disease", chapter: "IX", range: "I25-I25" },
    "I26": { code: "I26", description: "Pulmonary embolism", chapter: "IX", range: "I26-I26" },
    "I27": { code: "I27", description: "Other diseases of pulmonary vasculature", chapter: "IX", range: "I27-I27" },
    "I30": { code: "I30", description: "Acute pericarditis", chapter: "IX", range: "I30-I30" },
    "I31": { code: "I31", description: "Other diseases of pericardium", chapter: "IX", range: "I31-I31" },
    "I33": { code: "I33", description: "Acute and subacute endocarditis", chapter: "IX", range: "I33-I33" },
    "I34": { code: "I34", description: "Nonrheumatic mitral valve disorders", chapter: "IX", range: "I34-I34" },
    "I35": { code: "I35", description: "Nonrheumatic aortic valve disorders", chapter: "IX", range: "I35-I35" },
    "I42": { code: "I42", description: "Cardiomyopathy", chapter: "IX", range: "I42-I42" },
    "I44": { code: "I44", description: "Atrioventricular and left bundle-branch block", chapter: "IX", range: "I44-I44" },
    "I45": { code: "I45", description: "Other conduction disorders", chapter: "IX", range: "I45-I45" },
    "I46": { code: "I46", description: "Cardiac arrest", chapter: "IX", range: "I46-I46" },
    "I47": { code: "I47", description: "Paroxysmal tachycardia", chapter: "IX", range: "I47-I47" },
    "I48": { code: "I48", description: "Atrial fibrillation and flutter", chapter: "IX", range: "I48-I48" },
    "I49": { code: "I49", description: "Other cardiac arrhythmias", chapter: "IX", range: "I49-I49" },
    "I50": { code: "I50", description: "Heart failure", chapter: "IX", range: "I50-I50" },
    "I51": { code: "I51", description: "Complications and ill-defined descriptions of heart disease", chapter: "IX", range: "I51-I51" },
    "I60": { code: "I60", description: "Nontraumatic intracranial hemorrhage", chapter: "IX", range: "I60-I60" },
    "I61": { code: "I61", description: "Nontraumatic intracerebral hemorrhage", chapter: "IX", range: "I61-I61" },
    "I62": { code: "I62", description: "Other nontraumatic intracranial hemorrhage", chapter: "IX", range: "I62-I62" },
    "I63": { code: "I63", description: "Cerebral infarction", chapter: "IX", range: "I63-I63" },
    "I67": { code: "I67", description: "Other cerebrovascular diseases", chapter: "IX", range: "I67-I67" },
    "I69": { code: "I69", description: "Sequelae of cerebrovascular disease", chapter: "IX", range: "I69-I69" },
    "I70": { code: "I70", description: "Atherosclerosis of arteries", chapter: "IX", range: "I70-I70" },
    "I71": { code: "I71", description: "Aortic aneurysm and dissection", chapter: "IX", range: "I71-I71" },
    "I73": { code: "I73", description: "Other peripheral vascular diseases", chapter: "IX", range: "I73-I73" },
    "I74": { code: "I74", description: "Arterial embolism and thrombosis", chapter: "IX", range: "I74-I74" },
    "I76": { code: "I76", description: "Gangrene", chapter: "IX", range: "I76-I76" },
    "I77": { code: "I77", description: "Other disorders of arteries and arterioles", chapter: "IX", range: "I77-I77" },
    "I80": { code: "I80", description: "Phlebitis and thrombophlebitis", chapter: "IX", range: "I80-I80" },
    "I82": { code: "I82", description: "Other venous embolism and thrombosis", chapter: "IX", range: "I82-I82" },
    "I83": { code: "I83", description: "Varicose veins of lower extremities", chapter: "IX", range: "I83-I83" },
    "I84": { code: "I84", description: "Hemorrhoids", chapter: "IX", range: "I84-I84" },
    "I85": { code: "I85", description: "Esophageal varices", chapter: "IX", range: "I85-I85" },
    "I87": { code: "I87", description: "Other disorders of veins", chapter: "IX", range: "I87-I87" },
    "I95": { code: "I95", description: "Hypotension", chapter: "IX", range: "I95-I95" },
    "I97": { code: "I97", description: "Postprocedural disorders of circulatory system, not elsewhere classified", chapter: "IX", range: "I97-I97" }
  };
  var categories3 = {
    "J00": { code: "J00", description: "Acute nasopharyngitis [common cold]", chapter: "X", range: "J00-J00" },
    "J01": { code: "J01", description: "Acute sinusitis", chapter: "X", range: "J01-J01" },
    "J02": { code: "J02", description: "Acute pharyngitis", chapter: "X", range: "J02-J02" },
    "J03": { code: "J03", description: "Acute tonsillitis", chapter: "X", range: "J03-J03" },
    "J04": { code: "J04", description: "Acute laryngitis and tracheitis", chapter: "X", range: "J04-J04" },
    "J06": { code: "J06", description: "Acute upper respiratory infections of multiple and unspecified sites", chapter: "X", range: "J06-J06" },
    "J09": { code: "J09", description: "Influenza due to certain identified influenza virus", chapter: "X", range: "J09-J09" },
    "J10": { code: "J10", description: "Influenza due to other identified influenza virus", chapter: "X", range: "J10-J10" },
    "J11": { code: "J11", description: "Influenza, virus not identified", chapter: "X", range: "J11-J11" },
    "J12": { code: "J12", description: "Viral pneumonia, not elsewhere classified", chapter: "X", range: "J12-J12" },
    "J15": { code: "J15", description: "Bacterial pneumonia, not elsewhere classified", chapter: "X", range: "J15-J15" },
    "J18": { code: "J18", description: "Pneumonia, unspecified organism", chapter: "X", range: "J18-J18" },
    "J20": { code: "J20", description: "Acute bronchitis", chapter: "X", range: "J20-J20" },
    "J21": { code: "J21", description: "Acute bronchiolitis", chapter: "X", range: "J21-J21" },
    "J30": { code: "J30", description: "Vasomotor and allergic rhinitis", chapter: "X", range: "J30-J30" },
    "J31": { code: "J31", description: "Chronic rhinitis, nasopharyngitis and pharyngitis", chapter: "X", range: "J31-J31" },
    "J32": { code: "J32", description: "Chronic sinusitis", chapter: "X", range: "J32-J32" },
    "J33": { code: "J33", description: "Nasal polyps", chapter: "X", range: "J33-J33" },
    "J35": { code: "J35", description: "Chronic diseases of tonsils and adenoids", chapter: "X", range: "J35-J35" },
    "J37": { code: "J37", description: "Chronic laryngitis and laryngotracheitis", chapter: "X", range: "J37-J37" },
    "J38": { code: "J38", description: "Diseases of vocal cords and larynx, not elsewhere classified", chapter: "X", range: "J38-J38" },
    "J40": { code: "J40", description: "Bronchitis, not specified as acute or chronic", chapter: "X", range: "J40-J40" },
    "J41": { code: "J41", description: "Simple and mucopurulent chronic bronchitis", chapter: "X", range: "J41-J41" },
    "J42": { code: "J42", description: "Unspecified chronic bronchitis", chapter: "X", range: "J42-J42" },
    "J43": { code: "J43", description: "Emphysema", chapter: "X", range: "J43-J43" },
    "J44": { code: "J44", description: "Other chronic obstructive pulmonary disease", chapter: "X", range: "J44-J44" },
    "J45": { code: "J45", description: "Asthma", chapter: "X", range: "J45-J45" },
    "J46": { code: "J46", description: "Status asthmaticus", chapter: "X", range: "J46-J46" },
    "J47": { code: "J47", description: "Bronchiectasis", chapter: "X", range: "J47-J47" },
    "J60": { code: "J60", description: "Coalworkers pneumoconiosis", chapter: "X", range: "J60-J60" },
    "J67": { code: "J67", description: "Hypersensitivity pneumonitis due to organic dust", chapter: "X", range: "J67-J67" },
    "J80": { code: "J80", description: "Adult respiratory distress syndrome", chapter: "X", range: "J80-J80" },
    "J81": { code: "J81", description: "Pulmonary edema", chapter: "X", range: "J81-J81" },
    "J84": { code: "J84", description: "Other interstitial pulmonary diseases", chapter: "X", range: "J84-J84" },
    "J90": { code: "J90", description: "Pleural effusion, not elsewhere classified", chapter: "X", range: "J90-J90" },
    "J93": { code: "J93", description: "Pneumothorax", chapter: "X", range: "J93-J93" },
    "J96": { code: "J96", description: "Respiratory failure, not elsewhere classified", chapter: "X", range: "J96-J96" },
    "J98": { code: "J98", description: "Other respiratory diseases", chapter: "X", range: "J98-J98" },
    "J99": { code: "J99", description: "Respiratory disorders in diseases classified elsewhere", chapter: "X", range: "J99-J99" },
    "K00": { code: "K00", description: "Disorders of tooth development and eruption", chapter: "XI", range: "K00-K00" },
    "K02": { code: "K02", description: "Dental caries", chapter: "XI", range: "K02-K02" },
    "K04": { code: "K04", description: "Diseases of pulp and periapical tissues", chapter: "XI", range: "K04-K04" },
    "K05": { code: "K05", description: "Gingivitis and periodontal diseases", chapter: "XI", range: "K05-K05" },
    "K08": { code: "K08", description: "Other disorders of teeth and supporting structures", chapter: "XI", range: "K08-K08" },
    "K11": { code: "K11", description: "Diseases of salivary glands", chapter: "XI", range: "K11-K11" },
    "K12": { code: "K12", description: "Stomatitis and related lesions", chapter: "XI", range: "K12-K12" },
    "K13": { code: "K13", description: "Other diseases of lips and oral mucosa", chapter: "XI", range: "K13-K13" },
    "K20": { code: "K20", description: "Esophagitis", chapter: "XI", range: "K20-K20" },
    "K21": { code: "K21", description: "Gastro-esophageal reflux disease", chapter: "XI", range: "K21-K21" },
    "K22": { code: "K22", description: "Other diseases of esophagus", chapter: "XI", range: "K22-K22" },
    "K25": { code: "K25", description: "Gastric ulcer", chapter: "XI", range: "K25-K25" },
    "K26": { code: "K26", description: "Duodenal ulcer", chapter: "XI", range: "K26-K26" },
    "K29": { code: "K29", description: "Gastritis and duodenitis", chapter: "XI", range: "K29-K29" },
    "K30": { code: "K30", description: "Functional dyspepsia", chapter: "XI", range: "K30-K30" },
    "K31": { code: "K31", description: "Other diseases of stomach and duodenum", chapter: "XI", range: "K31-K31" },
    "K35": { code: "K35", description: "Acute appendicitis", chapter: "XI", range: "K35-K35" },
    "K40": { code: "K40", description: "Inguinal hernia", chapter: "XI", range: "K40-K40" },
    "K42": { code: "K42", description: "Umbilical hernia", chapter: "XI", range: "K42-K42" },
    "K43": { code: "K43", description: "Ventral hernia", chapter: "XI", range: "K43-K43" },
    "K44": { code: "K44", description: "Diaphragmatic hernia", chapter: "XI", range: "K44-K44" },
    "K50": { code: "K50", description: "Crohn disease [regional enteritis]", chapter: "XI", range: "K50-K50" },
    "K51": { code: "K51", description: "Ulcerative colitis", chapter: "XI", range: "K51-K51" },
    "K52": { code: "K52", description: "Other noninfective gastroenteritis and colitis", chapter: "XI", range: "K52-K52" },
    "K55": { code: "K55", description: "Vascular disorders of intestine", chapter: "XI", range: "K55-K55" },
    "K56": { code: "K56", description: "Paralytic ileus and intestinal obstruction without hernia", chapter: "XI", range: "K56-K56" },
    "K57": { code: "K57", description: "Diverticular disease of intestine", chapter: "XI", range: "K57-K57" },
    "K58": { code: "K58", description: "Irritable bowel syndrome", chapter: "XI", range: "K58-K58" },
    "K59": { code: "K59", description: "Other functional intestinal disorders", chapter: "XI", range: "K59-K59" },
    "K60": { code: "K60", description: "Fissure and fistula of anal and rectal regions", chapter: "XI", range: "K60-K60" },
    "K62": { code: "K62", description: "Other diseases of anus and rectum", chapter: "XI", range: "K62-K62" },
    "K63": { code: "K63", description: "Other diseases of intestine", chapter: "XI", range: "K63-K63" },
    "K65": { code: "K65", description: "Peritonitis", chapter: "XI", range: "K65-K65" },
    "K70": { code: "K70", description: "Alcoholic liver disease", chapter: "XI", range: "K70-K70" },
    "K71": { code: "K71", description: "Toxic liver disease", chapter: "XI", range: "K71-K71" },
    "K72": { code: "K72", description: "Hepatic failure, not elsewhere classified", chapter: "XI", range: "K72-K72" },
    "K73": { code: "K73", description: "Chronic hepatitis, not elsewhere classified", chapter: "XI", range: "K73-K73" },
    "K74": { code: "K74", description: "Fibrosis and cirrhosis of liver", chapter: "XI", range: "K74-K74" },
    "K75": { code: "K75", description: "Other inflammatory diseases of liver", chapter: "XI", range: "K75-K75" },
    "K76": { code: "K76", description: "Other diseases of liver", chapter: "XI", range: "K76-K76" },
    "K80": { code: "K80", description: "Cholelithiasis", chapter: "XI", range: "K80-K80" },
    "K81": { code: "K81", description: "Cholecystitis", chapter: "XI", range: "K81-K81" },
    "K82": { code: "K82", description: "Other diseases of gallbladder", chapter: "XI", range: "K82-K82" },
    "K83": { code: "K83", description: "Other diseases of biliary tract", chapter: "XI", range: "K83-K83" },
    "K85": { code: "K85", description: "Acute pancreatitis", chapter: "XI", range: "K85-K85" },
    "K86": { code: "K86", description: "Other diseases of pancreas", chapter: "XI", range: "K86-K86" },
    "K90": { code: "K90", description: "Intestinal malabsorption", chapter: "XI", range: "K90-K90" },
    "K92": { code: "K92", description: "Other diseases of digestive system", chapter: "XI", range: "K92-K92" }
  };
  var categories4 = {
    "L00": { code: "L00", description: "Staphylococcal scalded skin syndrome", chapter: "XII", range: "L00-L00" },
    "L01": { code: "L01", description: "Impetigo", chapter: "XII", range: "L01-L01" },
    "L02": { code: "L02", description: "Cutaneous abscess, furuncle and carbuncle", chapter: "XII", range: "L02-L02" },
    "L03": { code: "L03", description: "Cellulitis and acute lymphangitis", chapter: "XII", range: "L03-L03" },
    "L05": { code: "L05", description: "Pilonidal cyst", chapter: "XII", range: "L05-L05" },
    "L08": { code: "L08", description: "Other local infections of skin and subcutaneous tissue", chapter: "XII", range: "L08-L08" },
    "L20": { code: "L20", description: "Atopic dermatitis", chapter: "XII", range: "L20-L20" },
    "L21": { code: "L21", description: "Seborrheic dermatitis", chapter: "XII", range: "L21-L21" },
    "L23": { code: "L23", description: "Allergic contact dermatitis", chapter: "XII", range: "L23-L23" },
    "L24": { code: "L24", description: "Irritant contact dermatitis", chapter: "XII", range: "L24-L24" },
    "L25": { code: "L25", description: "Unspecified contact dermatitis", chapter: "XII", range: "L25-L25" },
    "L27": { code: "L27", description: "Dermatitis due to substances taken internally", chapter: "XII", range: "L27-L27" },
    "L28": { code: "L28", description: "Lichen simplex chronicus and prurigo", chapter: "XII", range: "L28-L28" },
    "L29": { code: "L29", description: "Pruritus", chapter: "XII", range: "L29-L29" },
    "L30": { code: "L30", description: "Other dermatitis", chapter: "XII", range: "L30-L30" },
    "L40": { code: "L40", description: "Psoriasis", chapter: "XII", range: "L40-L40" },
    "L41": { code: "L41", description: "Parapsoriasis", chapter: "XII", range: "L41-L41" },
    "L42": { code: "L42", description: "Pityriasis rosea", chapter: "XII", range: "L42-L42" },
    "L43": { code: "L43", description: "Lichen planus", chapter: "XII", range: "L43-L43" },
    "L50": { code: "L50", description: "Urticaria", chapter: "XII", range: "L50-L50" },
    "L51": { code: "L51", description: "Erythema multiforme", chapter: "XII", range: "L51-L51" },
    "L52": { code: "L52", description: "Erythema nodosum", chapter: "XII", range: "L52-L52" },
    "L55": { code: "L55", description: "Sunburn", chapter: "XII", range: "L55-L55" },
    "L60": { code: "L60", description: "Nail disorders", chapter: "XII", range: "L60-L60" },
    "L63": { code: "L63", description: "Alopecia areata", chapter: "XII", range: "L63-L63" },
    "L64": { code: "L64", description: "Androgenic alopecia", chapter: "XII", range: "L64-L64" },
    "L65": { code: "L65", description: "Other nonscarring hair loss", chapter: "XII", range: "L65-L65" },
    "L70": { code: "L70", description: "Acne", chapter: "XII", range: "L70-L70" },
    "L71": { code: "L71", description: "Rosacea", chapter: "XII", range: "L71-L71" },
    "L72": { code: "L72", description: "Follicular cysts of skin and subcutaneous tissue", chapter: "XII", range: "L72-L72" },
    "L80": { code: "L80", description: "Vitiligo", chapter: "XII", range: "L80-L80" },
    "L81": { code: "L81", description: "Other disorders of pigmentation", chapter: "XII", range: "L81-L81" },
    "L82": { code: "L82", description: "Seborrheic keratosis", chapter: "XII", range: "L82-L82" },
    "L83": { code: "L83", description: "Acanthosis nigricans", chapter: "XII", range: "L83-L83" },
    "L88": { code: "L88", description: "Pyoderma gangrenosum", chapter: "XII", range: "L88-L88" },
    "L89": { code: "L89", description: "Pressure ulcer", chapter: "XII", range: "L89-L89" },
    "L90": { code: "L90", description: "Atrophic disorders of skin", chapter: "XII", range: "L90-L90" },
    "L91": { code: "L91", description: "Hypertrophic disorders of skin", chapter: "XII", range: "L91-L91" },
    "L93": { code: "L93", description: "Lupus erythematosus", chapter: "XII", range: "L93-L93" },
    "L97": { code: "L97", description: "Non-healing ulcer of skin", chapter: "XII", range: "L97-L97" },
    "L98": { code: "L98", description: "Other disorders of skin and subcutaneous tissue, not elsewhere classified", chapter: "XII", range: "L98-L98" },
    "M00": { code: "M00", description: "Pyogenic arthritis", chapter: "XIII", range: "M00-M00" },
    "M05": { code: "M05", description: "Rheumatoid arthritis with rheumatoid factor", chapter: "XIII", range: "M05-M05" },
    "M06": { code: "M06", description: "Other rheumatoid arthritis", chapter: "XIII", range: "M06-M06" },
    "M08": { code: "M08", description: "Juvenile arthritis", chapter: "XIII", range: "M08-M08" },
    "M10": { code: "M10", description: "Gout", chapter: "XIII", range: "M10-M10" },
    "M11": { code: "M11", description: "Other crystal arthropathies", chapter: "XIII", range: "M11-M11" },
    "M12": { code: "M12", description: "Other specific arthropathies", chapter: "XIII", range: "M12-M12" },
    "M13": { code: "M13", description: "Other arthritis", chapter: "XIII", range: "M13-M13" },
    "M15": { code: "M15", description: "Polyosteoarthritis", chapter: "XIII", range: "M15-M15" },
    "M16": { code: "M16", description: "Osteoarthritis of hip", chapter: "XIII", range: "M16-M16" },
    "M17": { code: "M17", description: "Osteoarthritis of knee", chapter: "XIII", range: "M17-M17" },
    "M18": { code: "M18", description: "Osteoarthritis of first carpometacarpal joint", chapter: "XIII", range: "M18-M18" },
    "M19": { code: "M19", description: "Other osteoarthritis", chapter: "XIII", range: "M19-M19" },
    "M20": { code: "M20", description: "Acquired deformities of fingers and toes", chapter: "XIII", range: "M20-M20" },
    "M21": { code: "M21", description: "Other acquired deformities of limbs", chapter: "XIII", range: "M21-M21" },
    "M23": { code: "M23", description: "Other internal derangement of knee", chapter: "XIII", range: "M23-M23" },
    "M24": { code: "M24", description: "Other joint disorders", chapter: "XIII", range: "M24-M24" },
    "M25": { code: "M25", description: "Joint disorders, not elsewhere classified", chapter: "XIII", range: "M25-M25" },
    "M30": { code: "M30", description: "Polyarteritis nodosa", chapter: "XIII", range: "M30-M30" },
    "M31": { code: "M31", description: "Other necrotizing vasculopathies", chapter: "XIII", range: "M31-M31" },
    "M32": { code: "M32", description: "Systemic lupus erythematosus", chapter: "XIII", range: "M32-M32" },
    "M33": { code: "M33", description: "Dermatopolymyositis", chapter: "XIII", range: "M33-M33" },
    "M34": { code: "M34", description: "Systemic sclerosis", chapter: "XIII", range: "M34-M34" },
    "M35": { code: "M35", description: "Other systemic involvement of connective tissue", chapter: "XIII", range: "M35-M35" },
    "M40": { code: "M40", description: "Kyphosis and lordosis", chapter: "XIII", range: "M40-M40" },
    "M41": { code: "M41", description: "Scoliosis", chapter: "XIII", range: "M41-M41" },
    "M42": { code: "M42", description: "Juvenile osteochondrosis of spine", chapter: "XIII", range: "M42-M42" },
    "M43": { code: "M43", description: "Other deforming dorsopathies", chapter: "XIII", range: "M43-M43" },
    "M45": { code: "M45", description: "Ankylosing spondylitis", chapter: "XIII", range: "M45-M45" },
    "M46": { code: "M46", description: "Other inflammatory spondylopathies", chapter: "XIII", range: "M46-M46" },
    "M47": { code: "M47", description: "Spondylosis", chapter: "XIII", range: "M47-M47" },
    "M48": { code: "M48", description: "Other spondylopathies", chapter: "XIII", range: "M48-M48" },
    "M50": { code: "M50", description: "Cervical disc disorders", chapter: "XIII", range: "M50-M50" },
    "M51": { code: "M51", description: "Other intervertebral disc disorders", chapter: "XIII", range: "M51-M51" },
    "M53": { code: "M53", description: "Other dorsopathies, not elsewhere classified", chapter: "XIII", range: "M53-M53" },
    "M54": { code: "M54", description: "Dorsalgia", chapter: "XIII", range: "M54-M54" },
    "M60": { code: "M60", description: "Myositis", chapter: "XIII", range: "M60-M60" },
    "M61": { code: "M61", description: "Calcification and ossification of muscle", chapter: "XIII", range: "M61-M61" },
    "M62": { code: "M62", description: "Other disorders of muscle", chapter: "XIII", range: "M62-M62" },
    "M65": { code: "M65", description: "Synovitis and tenosynovitis", chapter: "XIII", range: "M65-M65" },
    "M66": { code: "M66", description: "Spontaneous rupture of synovium and tendon", chapter: "XIII", range: "M66-M66" },
    "M70": { code: "M70", description: "Soft tissue disorders related to use, overuse and pressure", chapter: "XIII", range: "M70-M70" },
    "M71": { code: "M71", description: "Other bursopathies", chapter: "XIII", range: "M71-M71" },
    "M72": { code: "M72", description: "Fibroblastic disorders", chapter: "XIII", range: "M72-M72" },
    "M75": { code: "M75", description: "Shoulder lesions", chapter: "XIII", range: "M75-M75" },
    "M76": { code: "M76", description: "Enthesopathies of lower limb, excluding foot", chapter: "XIII", range: "M76-M76" },
    "M77": { code: "M77", description: "Other enthesopathies", chapter: "XIII", range: "M77-M77" },
    "M79": { code: "M79", description: "Other soft tissue disorders, not elsewhere classified", chapter: "XIII", range: "M79-M79" },
    "M80": { code: "M80", description: "Osteoporosis with current pathological fracture", chapter: "XIII", range: "M80-M80" },
    "M81": { code: "M81", description: "Osteoporosis without current pathological fracture", chapter: "XIII", range: "M81-M81" },
    "M84": { code: "M84", description: "Disorder of continuity of bone", chapter: "XIII", range: "M84-M84" },
    "M86": { code: "M86", description: "Osteomyelitis", chapter: "XIII", range: "M86-M86" },
    "M87": { code: "M87", description: "Osteonecrosis", chapter: "XIII", range: "M87-M87" },
    "M88": { code: "M88", description: "Paget disease [osteitis deformans]", chapter: "XIII", range: "M88-M88" },
    "M89": { code: "M89", description: "Other disorders of bone", chapter: "XIII", range: "M89-M89" },
    "M90": { code: "M90", description: "Osteochondropathies in diseases classified elsewhere", chapter: "XIII", range: "M90-M90" },
    "M95": { code: "M95", description: "Other disorders of musculoskeletal system and connective tissue", chapter: "XIII", range: "M95-M95" },
    "N00": { code: "N00", description: "Acute nephritic syndrome", chapter: "XIV", range: "N00-N00" },
    "N01": { code: "N01", description: "Rapidly progressive nephritic syndrome", chapter: "XIV", range: "N01-N01" },
    "N02": { code: "N02", description: "Recurrent and persistent hematuria", chapter: "XIV", range: "N02-N02" },
    "N03": { code: "N03", description: "Chronic nephritic syndrome", chapter: "XIV", range: "N03-N03" },
    "N04": { code: "N04", description: "Nephrotic syndrome", chapter: "XIV", range: "N04-N04" },
    "N05": { code: "N05", description: "Unspecified nephritic syndrome", chapter: "XIV", range: "N05-N05" },
    "N06": { code: "N06", description: "Isolated proteinuria with specified morphological lesion", chapter: "XIV", range: "N06-N06" },
    "N07": { code: "N07", description: "Hereditary nephropathy, not elsewhere classified", chapter: "XIV", range: "N07-N07" },
    "N08": { code: "N08", description: "Glomerular disorders in diseases classified elsewhere", chapter: "XIV", range: "N08-N08" },
    "N10": { code: "N10", description: "Acute pyelonephritis", chapter: "XIV", range: "N10-N10" },
    "N11": { code: "N11", description: "Chronic pyelonephritis", chapter: "XIV", range: "N11-N11" },
    "N12": { code: "N12", description: "Pyelonephritis, unspecified as acute or chronic", chapter: "XIV", range: "N12-N12" },
    "N13": { code: "N13", description: "Obstructive and reflux uropathy", chapter: "XIV", range: "N13-N13" },
    "N14": { code: "N14", description: "Tubulointerstitial nephritis and tubulopathy", chapter: "XIV", range: "N14-N14" },
    "N15": { code: "N15", description: "Other renal tubulo-interstitial diseases", chapter: "XIV", range: "N15-N15" },
    "N16": { code: "N16", description: "Renal tubulo-interstitial disorders in diseases classified elsewhere", chapter: "XIV", range: "N16-N16" },
    "N17": { code: "N17", description: "Acute kidney failure", chapter: "XIV", range: "N17-N17" },
    "N18": { code: "N18", description: "Chronic kidney disease", chapter: "XIV", range: "N18-N18" },
    "N19": { code: "N19", description: "Unspecified kidney failure", chapter: "XIV", range: "N19-N19" },
    "N20": { code: "N20", description: "Calculus of kidney and ureter", chapter: "XIV", range: "N20-N20" },
    "N21": { code: "N21", description: "Calculus of lower urinary tract", chapter: "XIV", range: "N21-N21" },
    "N23": { code: "N23", description: "Unspecified renal colic", chapter: "XIV", range: "N23-N23" },
    "N25": { code: "N25", description: "Disorders resulting from impaired renal tubular function", chapter: "XIV", range: "N25-N25" },
    "N26": { code: "N26", description: "Small kidney, unspecified", chapter: "XIV", range: "N26-N26" },
    "N28": { code: "N28", description: "Other disorders of kidney and ureter, not elsewhere classified", chapter: "XIV", range: "N28-N28" },
    "N30": { code: "N30", description: "Cystitis", chapter: "XIV", range: "N30-N30" },
    "N31": { code: "N31", description: "Neuromuscular dysfunction of bladder, not elsewhere classified", chapter: "XIV", range: "N31-N31" },
    "N32": { code: "N32", description: "Other disorders of bladder", chapter: "XIV", range: "N32-N32" },
    "N34": { code: "N34", description: "Urethritis and urethral syndrome", chapter: "XIV", range: "N34-N34" },
    "N35": { code: "N35", description: "Urethral stricture", chapter: "XIV", range: "N35-N35" },
    "N36": { code: "N36", description: "Other disorders of urethra", chapter: "XIV", range: "N36-N36" },
    "N39": { code: "N39", description: "Other disorders of urinary system", chapter: "XIV", range: "N39-N39" },
    "N40": { code: "N40", description: "Hyperplasia of prostate", chapter: "XIV", range: "N40-N40" },
    "N41": { code: "N41", description: "Inflammatory diseases of prostate", chapter: "XIV", range: "N41-N41" },
    "N42": { code: "N42", description: "Other disorders of prostate", chapter: "XIV", range: "N42-N42" },
    "N43": { code: "N43", description: "Hydrocele and spermatocele", chapter: "XIV", range: "N43-N43" },
    "N44": { code: "N44", description: "Torsion of testis", chapter: "XIV", range: "N44-N44" },
    "N45": { code: "N45", description: "Orchitis and epididymitis", chapter: "XIV", range: "N45-N45" },
    "N46": { code: "N46", description: "Male infertility", chapter: "XIV", range: "N46-N46" },
    "N47": { code: "N47", description: "Phimosis, paraphimosis and ballooning prepuce", chapter: "XIV", range: "N47-N47" },
    "N48": { code: "N48", description: "Other disorders of penis", chapter: "XIV", range: "N48-N48" },
    "N49": { code: "N49", description: "Inflammatory disorders of male genital organs, not elsewhere classified", chapter: "XIV", range: "N49-N49" },
    "N50": { code: "N50", description: "Other disorders of male genital organs", chapter: "XIV", range: "N50-N50" },
    "N60": { code: "N60", description: "Benign mammary dysplasias", chapter: "XIV", range: "N60-N60" },
    "N61": { code: "N61", description: "Inflammatory disorders of breast", chapter: "XIV", range: "N61-N61" },
    "N62": { code: "N62", description: "Hyperplasia of breast", chapter: "XIV", range: "N62-N62" },
    "N63": { code: "N63", description: "Unspecified lump in breast", chapter: "XIV", range: "N63-N63" },
    "N64": { code: "N64", description: "Other disorders of breast", chapter: "XIV", range: "N64-N64" },
    "N70": { code: "N70", description: "Salpingitis and oophoritis", chapter: "XIV", range: "N70-N70" },
    "N71": { code: "N71", description: "Inflammatory disorders of uterus, except cervix", chapter: "XIV", range: "N71-N71" },
    "N72": { code: "N72", description: "Inflammatory disorders of cervix uteri", chapter: "XIV", range: "N72-N72" },
    "N73": { code: "N73", description: "Other female pelvic inflammatory diseases", chapter: "XIV", range: "N73-N73" },
    "N75": { code: "N75", description: "Diseases of Bartholin gland", chapter: "XIV", range: "N75-N75" },
    "N76": { code: "N76", description: "Other inflammations of vagina and vulva", chapter: "XIV", range: "N76-N76" },
    "N80": { code: "N80", description: "Endometriosis", chapter: "XIV", range: "N80-N80" },
    "N81": { code: "N81", description: "Female genital prolapse", chapter: "XIV", range: "N81-N81" },
    "N82": { code: "N82", description: "Fistulae involving female genital tract", chapter: "XIV", range: "N82-N82" },
    "N83": { code: "N83", description: "Noninflammatory disorders of ovary, fallopian tube and broad ligament", chapter: "XIV", range: "N83-N83" },
    "N84": { code: "N84", description: "Polyp of female genital tract", chapter: "XIV", range: "N84-N84" },
    "N85": { code: "N85", description: "Noninflammatory disorders of uterus, except cervix", chapter: "XIV", range: "N85-N85" },
    "N87": { code: "N87", description: "Dysplasia of cervix uteri", chapter: "XIV", range: "N87-N87" },
    "N88": { code: "N88", description: "Other noninflammatory disorders of cervix uteri", chapter: "XIV", range: "N88-N88" },
    "N89": { code: "N89", description: "Vaginal dysplasia", chapter: "XIV", range: "N89-N89" },
    "N90": { code: "N90", description: "Other noninflammatory disorders of vulva and perineum", chapter: "XIV", range: "N90-N90" },
    "N91": { code: "N91", description: "Menstrual bleeding abnormalities", chapter: "XIV", range: "N91-N91" },
    "N92": { code: "N92", description: "Excessive, frequent and irregular menstruation", chapter: "XIV", range: "N92-N92" },
    "N93": { code: "N93", description: "Other abnormal uterine and vaginal bleeding", chapter: "XIV", range: "N93-N93" },
    "N94": { code: "N94", description: "Pain and other conditions associated with female genital organs and menstrual cycle", chapter: "XIV", range: "N94-N94" },
    "N95": { code: "N95", description: "Menopausal and other perimenopausal disorders", chapter: "XIV", range: "N95-N95" },
    "N97": { code: "N97", description: "Female infertility", chapter: "XIV", range: "N97-N97" },
    "N98": { code: "N98", description: "Complications of artificially induced termination of pregnancy", chapter: "XIV", range: "N98-N98" },
    "N99": { code: "N99", description: "Postprocedural disorders of genitourinary system, not elsewhere classified", chapter: "XIV", range: "N99-N99" }
  };
  var categories5 = {
    "O00": { code: "O00", description: "Ectopic pregnancy", chapter: "XV", range: "O00-O00" },
    "O01": { code: "O01", description: "Hydatidiform mole", chapter: "XV", range: "O01-O01" },
    "O02": { code: "O02", description: "Other abnormal products of conception", chapter: "XV", range: "O02-O02" },
    "O03": { code: "O03", description: "Spontaneous abortion", chapter: "XV", range: "O03-O03" },
    "O04": { code: "O04", description: "Termination of pregnancy", chapter: "XV", range: "O04-O04" },
    "O06": { code: "O06", description: "Unspecified abortion", chapter: "XV", range: "O06-O06" },
    "O07": { code: "O07", description: "Failed attempt at termination of pregnancy", chapter: "XV", range: "O07-O07" },
    "O08": { code: "O08", description: "Complications following abortion and ectopic and molar pregnancy", chapter: "XV", range: "O08-O08" },
    "O09": { code: "O09", description: "Supervision of high-risk pregnancy", chapter: "XV", range: "O09-O09" },
    "O10": { code: "O10", description: "Pre-existing hypertension complicating pregnancy, childbirth and the puerperium", chapter: "XV", range: "O10-O10" },
    "O11": { code: "O11", description: "Pre-existing hypertensive disorder with superimposed proteinuria", chapter: "XV", range: "O11-O11" },
    "O12": { code: "O12", description: "Gestational [pregnancy-induced] edema and proteinuria without hypertension", chapter: "XV", range: "O12-O12" },
    "O13": { code: "O13", description: "Gestational [pregnancy-induced] hypertension without significant proteinuria", chapter: "XV", range: "O13-O13" },
    "O14": { code: "O14", description: "Gestational [pregnancy-induced] hypertension with significant proteinuria", chapter: "XV", range: "O14-O14" },
    "O15": { code: "O15", description: "Eclampsia", chapter: "XV", range: "O15-O15" },
    "O16": { code: "O16", description: "Unspecified maternal hypertension", chapter: "XV", range: "O16-O16" },
    "O20": { code: "O20", description: "Hemorrhage in early pregnancy", chapter: "XV", range: "O20-O20" },
    "O21": { code: "O21", description: "Excessive vomiting in pregnancy", chapter: "XV", range: "O21-O21" },
    "O22": { code: "O22", description: "Venous complications in pregnancy", chapter: "XV", range: "O22-O22" },
    "O23": { code: "O23", description: "Infections of genitourinary tract in pregnancy", chapter: "XV", range: "O23-O23" },
    "O24": { code: "O24", description: "Diabetes mellitus in pregnancy", chapter: "XV", range: "O24-O24" },
    "O25": { code: "O25", description: "Malnutrition in pregnancy", chapter: "XV", range: "O25-O25" },
    "O26": { code: "O26", description: "Other maternal care for conditions predominantly related to pregnancy", chapter: "XV", range: "O26-O26" },
    "O28": { code: "O28", description: "Abnormal findings on antenatal screening of mother", chapter: "XV", range: "O28-O28" },
    "O29": { code: "O29", description: "Complications of anesthesia during pregnancy", chapter: "XV", range: "O29-O29" },
    "O30": { code: "O30", description: "Multiple gestation", chapter: "XV", range: "O30-O30" },
    "O31": { code: "O31", description: "Complications specific to multiple gestation", chapter: "XV", range: "O31-O31" },
    "O32": { code: "O32", description: "Maternal care for malpresentation of fetus", chapter: "XV", range: "O32-O32" },
    "O33": { code: "O33", description: "Maternal care for known or suspected disproportion", chapter: "XV", range: "O33-O33" },
    "O34": { code: "O34", description: "Maternal care for abnormality of pelvic organs", chapter: "XV", range: "O34-O34" },
    "O35": { code: "O35", description: "Maternal care for known or suspected fetal abnormality and damage", chapter: "XV", range: "O35-O35" },
    "O36": { code: "O36", description: "Maternal care for other fetal problems", chapter: "XV", range: "O36-O36" },
    "O40": { code: "O40", description: "Polyhydramnios", chapter: "XV", range: "O40-O40" },
    "O41": { code: "O41", description: "Other disorders of amniotic fluid and membranes", chapter: "XV", range: "O41-O41" },
    "O42": { code: "O42", description: "Premature rupture of membranes", chapter: "XV", range: "O42-O42" },
    "O43": { code: "O43", description: "Placental disorders", chapter: "XV", range: "O43-O43" },
    "O44": { code: "O44", description: "Placenta previa", chapter: "XV", range: "O44-O44" },
    "O45": { code: "O45", description: "Premature separation of placenta [abruptio placentae]", chapter: "XV", range: "O45-O45" },
    "O46": { code: "O46", description: "Antepartum hemorrhage, not elsewhere classified", chapter: "XV", range: "O46-O46" },
    "O47": { code: "O47", description: "False labor", chapter: "XV", range: "O47-O47" },
    "O48": { code: "O48", description: "Prolonged pregnancy", chapter: "XV", range: "O48-O48" },
    "Q00": { code: "Q00", description: "Anencephaly and similar malformations", chapter: "XVII", range: "Q00-Q00" },
    "Q01": { code: "Q01", description: "Encephalocele", chapter: "XVII", range: "Q01-Q01" },
    "Q02": { code: "Q02", description: "Microcephaly", chapter: "XVII", range: "Q02-Q02" },
    "Q03": { code: "Q03", description: "Congenital hydrocephalus", chapter: "XVII", range: "Q03-Q03" },
    "Q04": { code: "Q04", description: "Other congenital malformations of brain", chapter: "XVII", range: "Q04-Q04" },
    "Q05": { code: "Q05", description: "Spina bifida", chapter: "XVII", range: "Q05-Q05" },
    "Q10": { code: "Q10", description: "Congenital malformations of eyelid, lacrimal apparatus and orbit", chapter: "XVII", range: "Q10-Q10" },
    "Q11": { code: "Q11", description: "Anophthalmos, microphthalmos and macrophthalmos", chapter: "XVII", range: "Q11-Q11" },
    "Q12": { code: "Q12", description: "Congenital malformations of lens", chapter: "XVII", range: "Q12-Q12" },
    "Q13": { code: "Q13", description: "Congenital malformations of anterior chamber of eye", chapter: "XVII", range: "Q13-Q13" },
    "Q14": { code: "Q14", description: "Congenital malformations of posterior chamber of eye", chapter: "XVII", range: "Q14-Q14" },
    "Q20": { code: "Q20", description: "Congenital malformations of cardiac chambers and connections", chapter: "XVII", range: "Q20-Q20" },
    "Q21": { code: "Q21", description: "Congenital malformations of cardiac septa", chapter: "XVII", range: "Q21-Q21" },
    "Q23": { code: "Q23", description: "Congenital malformations of valves of heart", chapter: "XVII", range: "Q23-Q23" },
    "Q24": { code: "Q24", description: "Other congenital malformations of heart", chapter: "XVII", range: "Q24-Q24" },
    "Q25": { code: "Q25", description: "Congenital malformations of great arteries", chapter: "XVII", range: "Q25-Q25" },
    "Q26": { code: "Q26", description: "Congenital malformations of great veins", chapter: "XVII", range: "Q26-Q26" },
    "Q30": { code: "Q30", description: "Congenital malformations of nose", chapter: "XVII", range: "Q30-Q30" },
    "Q31": { code: "Q31", description: "Congenital malformations of larynx", chapter: "XVII", range: "Q31-Q31" },
    "Q32": { code: "Q32", description: "Congenital malformations of trachea and bronchus", chapter: "XVII", range: "Q32-Q32" },
    "Q33": { code: "Q33", description: "Congenital malformations of lung", chapter: "XVII", range: "Q33-Q33" },
    "Q35": { code: "Q35", description: "Cleft palate", chapter: "XVII", range: "Q35-Q35" },
    "Q36": { code: "Q36", description: "Cleft lip", chapter: "XVII", range: "Q36-Q36" },
    "Q37": { code: "Q37", description: "Cleft palate with cleft lip", chapter: "XVII", range: "Q37-Q37" },
    "Q38": { code: "Q38", description: "Other congenital malformations of tongue, mouth and pharynx", chapter: "XVII", range: "Q38-Q38" },
    "Q39": { code: "Q39", description: "Congenital malformations of esophagus", chapter: "XVII", range: "Q39-Q39" },
    "Q40": { code: "Q40", description: "Other congenital malformations of upper part of alimentary tract", chapter: "XVII", range: "Q40-Q40" },
    "Q41": { code: "Q41", description: "Other congenital malformations of lower part of alimentary tract", chapter: "XVII", range: "Q41-Q41" },
    "Q42": { code: "Q42", description: "Congenital absence, atresia and stenosis of large intestine", chapter: "XVII", range: "Q42-Q42" },
    "Q43": { code: "Q43", description: "Other congenital malformations of intestine", chapter: "XVII", range: "Q43-Q43" },
    "Q44": { code: "Q44", description: "Congenital malformations of gallbladder, bile ducts and liver", chapter: "XVII", range: "Q44-Q44" },
    "Q50": { code: "Q50", description: "Congenital malformations of ovaries, fallopian tubes and broad ligaments", chapter: "XVII", range: "Q50-Q50" },
    "Q51": { code: "Q51", description: "Congenital malformations of uterus and cervix", chapter: "XVII", range: "Q51-Q51" },
    "Q52": { code: "Q52", description: "Other congenital malformations of female genitalia", chapter: "XVII", range: "Q52-Q52" },
    "Q53": { code: "Q53", description: "Undescended and ectopic testicle", chapter: "XVII", range: "Q53-Q53" },
    "Q55": { code: "Q55", description: "Other congenital malformations of male genital organs", chapter: "XVII", range: "Q55-Q55" },
    "Q60": { code: "Q60", description: "Renal agenesis and other reduction defects of kidney", chapter: "XVII", range: "Q60-Q60" },
    "Q61": { code: "Q61", description: "Cystic kidney diseases", chapter: "XVII", range: "Q61-Q61" },
    "Q62": { code: "Q62", description: "Congenital obstructive defects of renal pelvis and congenital urethral stricture", chapter: "XVII", range: "Q62-Q62" },
    "Q63": { code: "Q63", description: "Other congenital malformations of kidney", chapter: "XVII", range: "Q63-Q63" },
    "Q64": { code: "Q64", description: "Other congenital malformations of urinary system", chapter: "XVII", range: "Q64-Q64" },
    "Q65": { code: "Q65", description: "Congenital deformities of hip", chapter: "XVII", range: "Q65-Q65" },
    "Q66": { code: "Q66", description: "Congenital deformities of feet", chapter: "XVII", range: "Q66-Q66" },
    "Q67": { code: "Q67", description: "Congenital musculoskeletal deformities of head, face, spine and chest", chapter: "XVII", range: "Q67-Q67" },
    "Q68": { code: "Q68", description: "Other congenital musculoskeletal deformities", chapter: "XVII", range: "Q68-Q68" },
    "Q70": { code: "Q70", description: "Polydactyly, syndactyly and camptodactyly", chapter: "XVII", range: "Q70-Q70" },
    "Q71": { code: "Q71", description: "Reduction defects of upper limb", chapter: "XVII", range: "Q71-Q71" },
    "Q72": { code: "Q72", description: "Reduction defects of lower limb", chapter: "XVII", range: "Q72-Q72" },
    "Q73": { code: "Q73", description: "Reduction defects of unspecified limb", chapter: "XVII", range: "Q73-Q73" },
    "Q74": { code: "Q74", description: "Other congenital malformations of limb", chapter: "XVII", range: "Q74-Q74" },
    "Q75": { code: "Q75", description: "Other congenital malformations of skull and face bones", chapter: "XVII", range: "Q75-Q75" },
    "Q76": { code: "Q76", description: "Congenital malformations of spine and bony thorax", chapter: "XVII", range: "Q76-Q76" },
    "Q78": { code: "Q78", description: "Other osteochondrodysplasias", chapter: "XVII", range: "Q78-Q78" },
    "Q79": { code: "Q79", description: "Congenital malformations of musculoskeletal system, not elsewhere classified", chapter: "XVII", range: "Q79-Q79" },
    "Q80": { code: "Q80", description: "Congenital ichthyosis", chapter: "XVII", range: "Q80-Q80" },
    "Q81": { code: "Q81", description: "Epidermolysis bullosa", chapter: "XVII", range: "Q81-Q81" },
    "Q82": { code: "Q82", description: "Other congenital malformations of skin", chapter: "XVII", range: "Q82-Q82" },
    "Q83": { code: "Q83", description: "Congenital malformations of breast", chapter: "XVII", range: "Q83-Q83" },
    "Q84": { code: "Q84", description: "Other congenital malformations of integument", chapter: "XVII", range: "Q84-Q84" },
    "Q85": { code: "Q85", description: "Phakomatoses, not elsewhere classified", chapter: "XVII", range: "Q85-Q85" },
    "Q86": { code: "Q86", description: "Congenital malformations due to exogenous agents, not elsewhere classified", chapter: "XVII", range: "Q86-Q86" },
    "Q87": { code: "Q87", description: "Other specified congenital malformation syndromes affecting multiple systems", chapter: "XVII", range: "Q87-Q87" },
    "Q89": { code: "Q89", description: "Other congenital malformations, not elsewhere classified", chapter: "XVII", range: "Q89-Q89" },
    "Q90": { code: "Q90", description: "Down syndrome", chapter: "XVII", range: "Q90-Q90" },
    "Q91": { code: "Q91", description: "Edwards syndrome and Patau syndrome", chapter: "XVII", range: "Q91-Q91" },
    "Q92": { code: "Q92", description: "Other trisomies and partial trisomies of the autosomes", chapter: "XVII", range: "Q92-Q92" },
    "Q93": { code: "Q93", description: "Monosomies and deletions from the autosomes", chapter: "XVII", range: "Q93-Q93" },
    "Q95": { code: "Q95", description: "Balanced rearrangements and structural markers, not elsewhere classified", chapter: "XVII", range: "Q95-Q95" },
    "Q96": { code: "Q96", description: "Turner syndrome", chapter: "XVII", range: "Q96-Q96" },
    "Q97": { code: "Q97", description: "Other sex chromosome abnormalities, female phenotype, not elsewhere classified", chapter: "XVII", range: "Q97-Q97" },
    "Q98": { code: "Q98", description: "Other sex chromosome abnormalities, male phenotype, not elsewhere classified", chapter: "XVII", range: "Q98-Q98" },
    "Q99": { code: "Q99", description: "Other chromosome abnormalities, not elsewhere classified", chapter: "XVII", range: "Q99-Q99" },
    "R00": { code: "R00", description: "Abnormalities of heart beat", chapter: "XVIII", range: "R00-R00" },
    "R01": { code: "R01", description: "Cardiac murmurs and other cardiac sounds", chapter: "XVIII", range: "R01-R01" },
    "R03": { code: "R03", description: "Abnormal blood-pressure reading, without diagnosis", chapter: "XVIII", range: "R03-R03" },
    "R04": { code: "R04", description: "Hemorrhage from respiratory passages", chapter: "XVIII", range: "R04-R04" },
    "R05": { code: "R05", description: "Cough", chapter: "XVIII", range: "R05-R05" },
    "R06": { code: "R06", description: "Abnormalities of breathing", chapter: "XVIII", range: "R06-R06" },
    "R07": { code: "R07", description: "Chest pain", chapter: "XVIII", range: "R07-R07" },
    "R09": { code: "R09", description: "Other symptoms and signs involving the circulatory and respiratory systems", chapter: "XVIII", range: "R09-R09" },
    "R10": { code: "R10", description: "Abdominal and pelvic pain", chapter: "XVIII", range: "R10-R10" },
    "R11": { code: "R11", description: "Nausea and vomiting", chapter: "XVIII", range: "R11-R11" },
    "R12": { code: "R12", description: "Heartburn", chapter: "XVIII", range: "R12-R12" },
    "R13": { code: "R13", description: "Dysphagia", chapter: "XVIII", range: "R13-R13" },
    "R14": { code: "R14", description: "Flatulence and related conditions", chapter: "XVIII", range: "R14-R14" },
    "R15": { code: "R15", description: "Fecal incontinence", chapter: "XVIII", range: "R15-R15" },
    "R16": { code: "R16", description: "Hepatomegaly and splenomegaly, not elsewhere classified", chapter: "XVIII", range: "R16-R16" },
    "R17": { code: "R17", description: "Jaundice [icterus], unspecified", chapter: "XVIII", range: "R17-R17" },
    "R18": { code: "R18", description: "Ascites", chapter: "XVIII", range: "R18-R18" },
    "R19": { code: "R19", description: "Intra-abdominal and pelvic swelling, mass and lump", chapter: "XVIII", range: "R19-R19" },
    "R20": { code: "R20", description: "Disturbances of skin sensation", chapter: "XVIII", range: "R20-R20" },
    "R21": { code: "R21", description: "Rash and other nonspecific skin eruption", chapter: "XVIII", range: "R21-R21" },
    "R22": { code: "R22", description: "Localized swelling, mass and lump of skin and subcutaneous tissue", chapter: "XVIII", range: "R22-R22" },
    "R23": { code: "R23", description: "Other skin changes", chapter: "XVIII", range: "R23-R23" },
    "R25": { code: "R25", description: "Abnormal involuntary movements", chapter: "XVIII", range: "R25-R25" },
    "R26": { code: "R26", description: "Abnormalities of gait and mobility", chapter: "XVIII", range: "R26-R26" },
    "R27": { code: "R27", description: "Other lack of coordination", chapter: "XVIII", range: "R27-R27" },
    "R29": { code: "R29", description: "Other symptoms and signs involving the nervous and musculoskeletal systems", chapter: "XVIII", range: "R29-R29" },
    "R30": { code: "R30", description: "Pain associated with micturition", chapter: "XVIII", range: "R30-R30" },
    "R31": { code: "R31", description: "Hematuria, unspecified", chapter: "XVIII", range: "R31-R31" },
    "R32": { code: "R32", description: "Unspecified urinary incontinence", chapter: "XVIII", range: "R32-R32" },
    "R33": { code: "R33", description: "Retention of urine", chapter: "XVIII", range: "R33-R33" },
    "R34": { code: "R34", description: "Anuria and oliguria", chapter: "XVIII", range: "R34-R34" },
    "R35": { code: "R35", description: "Polyuria", chapter: "XVIII", range: "R35-R35" },
    "R36": { code: "R36", description: "Discharge from penis", chapter: "XVIII", range: "R36-R36" },
    "R37": { code: "R37", description: "Sexual dysfunction, male", chapter: "XVIII", range: "R37-R37" },
    "R39": { code: "R39", description: "Other and unspecified symptoms and signs involving the genitourinary system", chapter: "XVIII", range: "R39-R39" },
    "R40": { code: "R40", description: "Coma, stupor and brain damage", chapter: "XVIII", range: "R40-R40" },
    "R41": { code: "R41", description: "Other symptoms and signs involving cognitive functions and awareness", chapter: "XVIII", range: "R41-R41" },
    "R42": { code: "R42", description: "Dizziness and giddiness", chapter: "XVIII", range: "R42-R42" },
    "R43": { code: "R43", description: "Disturbances of smell and taste", chapter: "XVIII", range: "R43-R43" },
    "R44": { code: "R44", description: "Other symptoms and signs involving general sensations and perceptions", chapter: "XVIII", range: "R44-R44" },
    "R45": { code: "R45", description: "Symptoms and signs involving emotional state", chapter: "XVIII", range: "R45-R45" },
    "R46": { code: "R46", description: "Symptoms and signs involving appearance and behavior", chapter: "XVIII", range: "R46-R46" },
    "R47": { code: "R47", description: "Speech disturbances, not elsewhere classified", chapter: "XVIII", range: "R47-R47" },
    "R48": { code: "R48", description: "Dyslexia and other symbolic dysfunctions, not elsewhere classified", chapter: "XVIII", range: "R48-R48" },
    "R49": { code: "R49", description: "Voice and resonance disorders", chapter: "XVIII", range: "R49-R49" },
    "R50": { code: "R50", description: "Fever of unknown origin", chapter: "XVIII", range: "R50-R50" },
    "R51": { code: "R51", description: "Headache", chapter: "XVIII", range: "R51-R51" },
    "R52": { code: "R52", description: "Pain, unspecified", chapter: "XVIII", range: "R52-R52" },
    "R53": { code: "R53", description: "Malaise and fatigue", chapter: "XVIII", range: "R53-R53" },
    "R54": { code: "R54", description: "Age-related physical frailty", chapter: "XVIII", range: "R54-R54" },
    "R55": { code: "R55", description: "Syncope and collapse", chapter: "XVIII", range: "R55-R55" },
    "R56": { code: "R56", description: "Convulsions, not elsewhere classified", chapter: "XVIII", range: "R56-R56" },
    "R57": { code: "R57", description: "Shock, not elsewhere classified", chapter: "XVIII", range: "R57-R57" },
    "R58": { code: "R58", description: "Hemorrhage, not elsewhere classified", chapter: "XVIII", range: "R58-R58" },
    "R60": { code: "R60", description: "Edema, not elsewhere classified", chapter: "XVIII", range: "R60-R60" },
    "R61": { code: "R61", description: "Generalized hyperhidrosis", chapter: "XVIII", range: "R61-R61" },
    "R62": { code: "R62", description: "Other general symptoms and signs", chapter: "XVIII", range: "R62-R62" },
    "R63": { code: "R63", description: "Symptoms and signs concerning food and fluid intake", chapter: "XVIII", range: "R63-R63" },
    "R64": { code: "R64", description: "Cachexia", chapter: "XVIII", range: "R64-R64" },
    "R68": { code: "R68", description: "Other general symptoms and signs", chapter: "XVIII", range: "R68-R68" },
    "R69": { code: "R69", description: "Illness, unspecified", chapter: "XVIII", range: "R69-R69" },
    "R70": { code: "R70", description: "Elevated erythrocyte sedimentation rate and abnormality of plasma viscosity", chapter: "XVIII", range: "R70-R70" },
    "R71": { code: "R71", description: "Abnormal morphology of red blood cells", chapter: "XVIII", range: "R71-R71" },
    "R73": { code: "R73", description: "Elevated blood glucose level", chapter: "XVIII", range: "R73-R73" },
    "R74": { code: "R74", description: "Abnormal serum enzyme levels", chapter: "XVIII", range: "R74-R74" },
    "R75": { code: "R75", description: "Inconclusive laboratory evidence of human immunodeficiency virus [HIV]", chapter: "XVIII", range: "R75-R75" },
    "R76": { code: "R76", description: "Other specified immunological findings", chapter: "XVIII", range: "R76-R76" },
    "R77": { code: "R77", description: "Other abnormalities of plasma proteins", chapter: "XVIII", range: "R77-R77" },
    "R78": { code: "R78", description: "Findings of drugs and other substances, not normally found in blood", chapter: "XVIII", range: "R78-R78" },
    "R79": { code: "R79", description: "Other abnormal findings of blood chemistry", chapter: "XVIII", range: "R79-R79" },
    "R80": { code: "R80", description: "Isolated proteinuria", chapter: "XVIII", range: "R80-R80" },
    "R81": { code: "R81", description: "Glycosuria", chapter: "XVIII", range: "R81-R81" },
    "R82": { code: "R82", description: "Other and unspecified abnormal findings in urine", chapter: "XVIII", range: "R82-R82" },
    "R83": { code: "R83", description: "Abnormal findings in cerebrospinal fluid", chapter: "XVIII", range: "R83-R83" },
    "R84": { code: "R84", description: "Abnormal findings in specimens from respiratory organs and thorax", chapter: "XVIII", range: "R84-R84" },
    "R85": { code: "R85", description: "Abnormal findings in specimens from digestive organs and abdominal cavity", chapter: "XVIII", range: "R85-R85" },
    "R86": { code: "R86", description: "Abnormal findings in specimens from male genital organs", chapter: "XVIII", range: "R86-R86" },
    "R87": { code: "R87", description: "Abnormal findings in specimens from female genital organs", chapter: "XVIII", range: "R87-R87" },
    "R89": { code: "R89", description: "Abnormal findings in specimens from other organs, systems and tissues", chapter: "XVIII", range: "R89-R89" },
    "R90": { code: "R90", description: "Abnormal findings on diagnostic imaging of central nervous system", chapter: "XVIII", range: "R90-R90" },
    "R91": { code: "R91", description: "Abnormal findings on diagnostic imaging of lung", chapter: "XVIII", range: "R91-R91" },
    "R92": { code: "R92", description: "Abnormal and inconclusive findings on diagnostic imaging of breast", chapter: "XVIII", range: "R92-R92" },
    "R93": { code: "R93", description: "Abnormal findings on diagnostic imaging of other body structures", chapter: "XVIII", range: "R93-R93" },
    "R94": { code: "R94", description: "Abnormal results of function studies", chapter: "XVIII", range: "R94-R94" },
    "R97": { code: "R97", description: "Abnormal findings on screening of malignant neoplasm", chapter: "XVIII", range: "R97-R97" },
    "R99": { code: "R99", description: "Ill-defined and unspecified cause of mortality", chapter: "XVIII", range: "R99-R99" }
  };
  var categories6 = {
    "S00": { code: "S00", description: "Superficial injury of head", chapter: "XIX", range: "S00-S00" },
    "S01": { code: "S01", description: "Open wound of head", chapter: "XIX", range: "S01-S01" },
    "S02": { code: "S02", description: "Fracture of skull and facial bones", chapter: "XIX", range: "S02-S02" },
    "S03": { code: "S03", description: "Dislocation and sprain of joints and ligaments of head", chapter: "XIX", range: "S03-S03" },
    "S04": { code: "S04", description: "Injury to cranial nerve", chapter: "XIX", range: "S04-S04" },
    "S05": { code: "S05", description: "Injury to eye and orbit", chapter: "XIX", range: "S05-S05" },
    "S06": { code: "S06", description: "Intracranial injury", chapter: "XIX", range: "S06-S06" },
    "S07": { code: "S07", description: "Crushing injury of head", chapter: "XIX", range: "S07-S07" },
    "S08": { code: "S08", description: "Avulsion, traumatic amputation and other traumatic injuries of part of head", chapter: "XIX", range: "S08-S08" },
    "S09": { code: "S09", description: "Other and unspecified injuries of head", chapter: "XIX", range: "S09-S09" },
    "S10": { code: "S10", description: "Superficial injury of neck", chapter: "XIX", range: "S10-S10" },
    "S11": { code: "S11", description: "Open wound of neck", chapter: "XIX", range: "S11-S11" },
    "S12": { code: "S12", description: "Fracture of neck", chapter: "XIX", range: "S12-S12" },
    "S13": { code: "S13", description: "Dislocation and sprain of joints and ligaments of neck", chapter: "XIX", range: "S13-S13" },
    "S14": { code: "S14", description: "Injury to cervical spinal cord", chapter: "XIX", range: "S14-S14" },
    "S15": { code: "S15", description: "Injury to blood vessels of neck", chapter: "XIX", range: "S15-S15" },
    "S16": { code: "S16", description: "Injury of muscle, fascia and tendon of neck", chapter: "XIX", range: "S16-S16" },
    "S17": { code: "S17", description: "Crushing injury of neck", chapter: "XIX", range: "S17-S17" },
    "S18": { code: "S18", description: "Traumatic amputation of neck", chapter: "XIX", range: "S18-S18" },
    "S19": { code: "S19", description: "Other and unspecified injuries of neck", chapter: "XIX", range: "S19-S19" },
    "S20": { code: "S20", description: "Superficial injury of thorax", chapter: "XIX", range: "S20-S20" },
    "S21": { code: "S21", description: "Open wound of thorax", chapter: "XIX", range: "S21-S21" },
    "S22": { code: "S22", description: "Fracture of rib(s), sternum and thoracic spine", chapter: "XIX", range: "S22-S22" },
    "S23": { code: "S23", description: "Dislocation and sprain of joints and ligaments of thorax", chapter: "XIX", range: "S23-S23" },
    "S24": { code: "S24", description: "Injury to thoracic spinal cord and nerves", chapter: "XIX", range: "S24-S24" },
    "S25": { code: "S25", description: "Injury to blood vessels of thorax", chapter: "XIX", range: "S25-S25" },
    "S26": { code: "S26", description: "Injury of heart", chapter: "XIX", range: "S26-S26" },
    "S27": { code: "S27", description: "Injury of other intrathoracic organs", chapter: "XIX", range: "S27-S27" },
    "S28": { code: "S28", description: "Crushing injury of thorax", chapter: "XIX", range: "S28-S28" },
    "S29": { code: "S29", description: "Other and unspecified injuries of thorax", chapter: "XIX", range: "S29-S29" },
    "S30": { code: "S30", description: "Superficial injury of abdomen, lower back, pelvis and external genitals", chapter: "XIX", range: "S30-S30" },
    "S31": { code: "S31", description: "Open wound of abdomen, lower back, pelvis and external genitals", chapter: "XIX", range: "S31-S31" },
    "S32": { code: "S32", description: "Fracture of lumbar spine and pelvis", chapter: "XIX", range: "S32-S32" },
    "S33": { code: "S33", description: "Dislocation and sprain of joints and ligaments of lumbar spine and pelvis", chapter: "XIX", range: "S33-S33" },
    "S34": { code: "S34", description: "Injury to lumbar spinal cord and nerves", chapter: "XIX", range: "S34-S34" },
    "S35": { code: "S35", description: "Injury to blood vessels of abdomen, lower back and pelvis", chapter: "XIX", range: "S35-S35" },
    "S36": { code: "S36", description: "Injury to intra-abdominal organs", chapter: "XIX", range: "S36-S36" },
    "S37": { code: "S37", description: "Injury to urinary tract and pelvic organs", chapter: "XIX", range: "S37-S37" },
    "S38": { code: "S38", description: "Crushing injury and traumatic amputation of part of abdomen, lower back, pelvis and external genitals", chapter: "XIX", range: "S38-S38" },
    "S39": { code: "S39", description: "Other and unspecified injuries of abdomen, lower back, pelvis and external genitals", chapter: "XIX", range: "S39-S39" },
    "S40": { code: "S40", description: "Superficial injury of shoulder and upper arm", chapter: "XIX", range: "S40-S40" },
    "S41": { code: "S41", description: "Open wound of shoulder and upper arm", chapter: "XIX", range: "S41-S41" },
    "S42": { code: "S42", description: "Fracture of shoulder and upper arm", chapter: "XIX", range: "S42-S42" },
    "S43": { code: "S43", description: "Dislocation and sprain of joints and ligaments of shoulder and upper arm", chapter: "XIX", range: "S43-S43" },
    "S44": { code: "S44", description: "Injury to nerves of shoulder and upper arm", chapter: "XIX", range: "S44-S44" },
    "S45": { code: "S45", description: "Injury to blood vessels of shoulder and upper arm", chapter: "XIX", range: "S45-S45" },
    "S46": { code: "S46", description: "Injury of muscle, fascia and tendon of shoulder and upper arm", chapter: "XIX", range: "S46-S46" },
    "S47": { code: "S47", description: "Crushing injury of shoulder and upper arm", chapter: "XIX", range: "S47-S47" },
    "S48": { code: "S48", description: "Traumatic amputation of shoulder and upper arm", chapter: "XIX", range: "S48-S48" },
    "S49": { code: "S49", description: "Other and unspecified injuries of shoulder and upper arm", chapter: "XIX", range: "S49-S49" },
    "S50": { code: "S50", description: "Superficial injury of elbow and forearm", chapter: "XIX", range: "S50-S50" },
    "S51": { code: "S51", description: "Open wound of elbow and forearm", chapter: "XIX", range: "S51-S51" },
    "S52": { code: "S52", description: "Fracture of forearm", chapter: "XIX", range: "S52-S52" },
    "S53": { code: "S53", description: "Dislocation and sprain of joints and ligaments of elbow", chapter: "XIX", range: "S53-S53" },
    "S54": { code: "S54", description: "Injury to nerves of forearm", chapter: "XIX", range: "S54-S54" },
    "S55": { code: "S55", description: "Injury to blood vessels of forearm", chapter: "XIX", range: "S55-S55" },
    "S56": { code: "S56", description: "Injury of muscle, fascia and tendon of elbow and forearm", chapter: "XIX", range: "S56-S56" },
    "S57": { code: "S57", description: "Crushing injury of elbow and forearm", chapter: "XIX", range: "S57-S57" },
    "S58": { code: "S58", description: "Traumatic amputation of elbow and forearm", chapter: "XIX", range: "S58-S58" },
    "S59": { code: "S59", description: "Other and unspecified injuries of elbow and forearm", chapter: "XIX", range: "S59-S59" },
    "S60": { code: "S60", description: "Superficial injury of wrist, hand and fingers", chapter: "XIX", range: "S60-S60" },
    "S61": { code: "S61", description: "Open wound of wrist, hand and fingers", chapter: "XIX", range: "S61-S61" },
    "S62": { code: "S62", description: "Fracture of wrist, hand and fingers", chapter: "XIX", range: "S62-S62" },
    "S63": { code: "S63", description: "Dislocation and sprain of joints and ligaments of wrist, hand and fingers", chapter: "XIX", range: "S63-S63" },
    "S64": { code: "S64", description: "Injury to nerves of wrist, hand and fingers", chapter: "XIX", range: "S64-S64" },
    "S65": { code: "S65", description: "Injury to blood vessels of wrist, hand and fingers", chapter: "XIX", range: "S65-S65" },
    "S66": { code: "S66", description: "Injury of muscle, fascia and tendon of wrist, hand and fingers", chapter: "XIX", range: "S66-S66" },
    "S67": { code: "S67", description: "Crushing injury of wrist, hand and fingers", chapter: "XIX", range: "S67-S67" },
    "S68": { code: "S68", description: "Traumatic amputation of wrist, hand and fingers", chapter: "XIX", range: "S68-S68" },
    "S69": { code: "S69", description: "Other and unspecified injuries of wrist, hand and fingers", chapter: "XIX", range: "S69-S69" },
    "S70": { code: "S70", description: "Superficial injury of hip and thigh", chapter: "XIX", range: "S70-S70" },
    "S71": { code: "S71", description: "Open wound of hip and thigh", chapter: "XIX", range: "S71-S71" },
    "S72": { code: "S72", description: "Fracture of femur", chapter: "XIX", range: "S72-S72" },
    "S73": { code: "S73", description: "Dislocation and sprain of joints and ligaments of hip and thigh", chapter: "XIX", range: "S73-S73" },
    "S74": { code: "S74", description: "Injury to nerves of hip and thigh", chapter: "XIX", range: "S74-S74" },
    "S75": { code: "S75", description: "Injury to blood vessels of hip and thigh", chapter: "XIX", range: "S75-S75" },
    "S76": { code: "S76", description: "Injury of muscle, fascia and tendon of hip and thigh", chapter: "XIX", range: "S76-S76" },
    "S77": { code: "S77", description: "Crushing injury of hip and thigh", chapter: "XIX", range: "S77-S77" },
    "S78": { code: "S78", description: "Traumatic amputation of hip and thigh", chapter: "XIX", range: "S78-S78" },
    "S79": { code: "S79", description: "Other and unspecified injuries of hip and thigh", chapter: "XIX", range: "S79-S79" },
    "S80": { code: "S80", description: "Superficial injury of lower leg", chapter: "XIX", range: "S80-S80" },
    "S81": { code: "S81", description: "Open wound of lower leg", chapter: "XIX", range: "S81-S81" },
    "S82": { code: "S82", description: "Fracture of lower leg, including ankle", chapter: "XIX", range: "S82-S82" },
    "S83": { code: "S83", description: "Dislocation and sprain of joints and ligaments of knee and lower leg", chapter: "XIX", range: "S83-S83" },
    "S84": { code: "S84", description: "Injury to nerves of lower leg", chapter: "XIX", range: "S84-S84" },
    "S85": { code: "S85", description: "Injury to blood vessels of lower leg", chapter: "XIX", range: "S85-S85" },
    "S86": { code: "S86", description: "Injury of muscle, fascia and tendon of lower leg", chapter: "XIX", range: "S86-S86" },
    "S87": { code: "S87", description: "Crushing injury of lower leg", chapter: "XIX", range: "S87-S87" },
    "S88": { code: "S88", description: "Traumatic amputation of lower leg", chapter: "XIX", range: "S88-S88" },
    "S89": { code: "S89", description: "Other and unspecified injuries of lower leg", chapter: "XIX", range: "S89-S89" },
    "S90": { code: "S90", description: "Superficial injury of ankle, foot and toes", chapter: "XIX", range: "S90-S90" },
    "S91": { code: "S91", description: "Open wound of ankle, foot and toes", chapter: "XIX", range: "S91-S91" },
    "S92": { code: "S92", description: "Fracture of foot and toes", chapter: "XIX", range: "S92-S92" },
    "S93": { code: "S93", description: "Dislocation and sprain of joints and ligaments of ankle and foot", chapter: "XIX", range: "S93-S93" },
    "S94": { code: "S94", description: "Injury to nerves of ankle and foot", chapter: "XIX", range: "S94-S94" },
    "S95": { code: "S95", description: "Injury to blood vessels of ankle and foot", chapter: "XIX", range: "S95-S95" },
    "S96": { code: "S96", description: "Injury of muscle, fascia and tendon of ankle and foot", chapter: "XIX", range: "S96-S96" },
    "S97": { code: "S97", description: "Crushing injury of ankle, foot and toes", chapter: "XIX", range: "S97-S97" },
    "S98": { code: "S98", description: "Traumatic amputation of ankle, foot and toes", chapter: "XIX", range: "S98-S98" },
    "S99": { code: "S99", description: "Other and unspecified injuries of ankle and foot", chapter: "XIX", range: "S99-S99" },
    "T07": { code: "T07", description: "Multiple injuries, not elsewhere classified", chapter: "XIX", range: "T07-T07" },
    "T08": { code: "T08", description: "Fracture of spine, level unspecified", chapter: "XIX", range: "T08-T08" },
    "T09": { code: "T09", description: "Injury of unspecified part of trunk", chapter: "XIX", range: "T09-T09" },
    "T11": { code: "T11", description: "Injury of unspecified part of upper limb", chapter: "XIX", range: "T11-T11" },
    "T13": { code: "T13", description: "Injury of unspecified part of lower limb", chapter: "XIX", range: "T13-T13" },
    "T14": { code: "T14", description: "Injury of unspecified body region", chapter: "XIX", range: "T14-T14" },
    "T15": { code: "T15", description: "Effects of foreign body entering through natural orifice", chapter: "XIX", range: "T15-T15" },
    "T16": { code: "T16", description: "Foreign body in ear", chapter: "XIX", range: "T16-T16" },
    "T17": { code: "T17", description: "Foreign body in respiratory tract", chapter: "XIX", range: "T17-T17" },
    "T18": { code: "T18", description: "Foreign body in alimentary tract", chapter: "XIX", range: "T18-T18" },
    "T19": { code: "T19", description: "Foreign body in genitourinary tract", chapter: "XIX", range: "T19-T19" },
    "T20": { code: "T20", description: "Burn and corrosion of head and neck", chapter: "XIX", range: "T20-T20" },
    "T21": { code: "T21", description: "Burn and corrosion of trunk", chapter: "XIX", range: "T21-T21" },
    "T22": { code: "T22", description: "Burn and corrosion of upper limb, except wrist and hand", chapter: "XIX", range: "T22-T22" },
    "T23": { code: "T23", description: "Burn and corrosion of wrist and hand", chapter: "XIX", range: "T23-T23" },
    "T24": { code: "T24", description: "Burn and corrosion of lower limb, except ankle and foot", chapter: "XIX", range: "T24-T24" },
    "T25": { code: "T25", description: "Burn and corrosion of ankle and foot", chapter: "XIX", range: "T25-T25" },
    "T26": { code: "T26", description: "Burn and corrosion limited to eye and adnexa", chapter: "XIX", range: "T26-T26" },
    "T27": { code: "T27", description: "Burn and corrosion of respiratory tract", chapter: "XIX", range: "T27-T27" },
    "T28": { code: "T28", description: "Burn and corrosion of oral cavity and pharynx", chapter: "XIX", range: "T28-T28" },
    "T29": { code: "T29", description: "Burn and corrosion of multiple and unspecified body regions", chapter: "XIX", range: "T29-T29" },
    "T30": { code: "T30", description: "Burn and corrosion, body region unspecified", chapter: "XIX", range: "T30-T30" },
    "T36": { code: "T36", description: "Poisoning by, adverse effect of and underdosing of systemic antibiotics", chapter: "XIX", range: "T36-T36" },
    "T37": { code: "T37", description: "Poisoning by, adverse effect of and underdosing of other systemic anti-infective and antiparasitic drugs", chapter: "XIX", range: "T37-T37" },
    "T38": { code: "T38", description: "Poisoning by, adverse effect of and underdosing of hormones and their synthetic substitutes and antagonists", chapter: "XIX", range: "T38-T38" },
    "T39": { code: "T39", description: "Poisoning by, adverse effect of and underdosing of nonopioid analgesics, antipyretics and antirheumatics", chapter: "XIX", range: "T39-T39" },
    "T40": { code: "T40", description: "Poisoning by, adverse effect of and underdosing of narcotics and psychodysleptics [hallucinogens]", chapter: "XIX", range: "T40-T40" },
    "T41": { code: "T41", description: "Poisoning by, adverse effect of and underdosing of anesthetics and therapeutic gases", chapter: "XIX", range: "T41-T41" },
    "T42": { code: "T42", description: "Poisoning by, adverse effect of and underdosing of antiepileptics, sedative-hypnotics and antiparkinsonism drugs", chapter: "XIX", range: "T42-T42" },
    "T43": { code: "T43", description: "Poisoning by, adverse effect of and underdosing of psychotropic drugs, not elsewhere classified", chapter: "XIX", range: "T43-T43" },
    "T44": { code: "T44", description: "Poisoning by, adverse effect of and underdosing of drugs primarily affecting the autonomic nervous system", chapter: "XIX", range: "T44-T44" },
    "T45": { code: "T45", description: "Poisoning by, adverse effect of and underdosing of primarily systemic and hematological agents, not elsewhere classified", chapter: "XIX", range: "T45-T45" },
    "T46": { code: "T46", description: "Poisoning by, adverse effect of and underdosing of drugs affecting the cardiovascular system", chapter: "XIX", range: "T46-T46" },
    "T47": { code: "T47", description: "Poisoning by, adverse effect of and underdosing of drugs primarily affecting the gastrointestinal system", chapter: "XIX", range: "T47-T47" },
    "T48": { code: "T48", description: "Poisoning by, adverse effect of and underdosing of drugs primarily affecting smooth and skeletal muscles and the respiratory system", chapter: "XIX", range: "T48-T48" },
    "T49": { code: "T49", description: "Poisoning by, adverse effect of and underdosing of predominantly topical agents for dermatological, ENT, ophthalmological and orodental disorders", chapter: "XIX", range: "T49-T49" },
    "T50": { code: "T50", description: "Poisoning by, adverse effect of and underdosing of diuretics and other and unspecified drugs, medicaments and biological substances", chapter: "XIX", range: "T50-T50" },
    "T51": { code: "T51", description: "Toxic effects of alcohols", chapter: "XIX", range: "T51-T51" },
    "T52": { code: "T52", description: "Toxic effects of organic solvents", chapter: "XIX", range: "T52-T52" },
    "T53": { code: "T53", description: "Toxic effects of halogen derivatives of aliphatic and aromatic hydrocarbons", chapter: "XIX", range: "T53-T53" },
    "T54": { code: "T54", description: "Toxic effects of corrosive substances", chapter: "XIX", range: "T54-T54" },
    "T55": { code: "T55", description: "Toxic effects of soaps and detergents", chapter: "XIX", range: "T55-T55" },
    "T56": { code: "T56", description: "Toxic effects of metals", chapter: "XIX", range: "T56-T56" },
    "T57": { code: "T57", description: "Toxic effects of other inorganic substances", chapter: "XIX", range: "T57-T57" },
    "T58": { code: "T58", description: "Toxic effects of carbon monoxide", chapter: "XIX", range: "T58-T58" },
    "T59": { code: "T59", description: "Toxic effects of other gaseous fumes, vapors and dusts", chapter: "XIX", range: "T59-T59" },
    "T60": { code: "T60", description: "Toxic effects of pesticides", chapter: "XIX", range: "T60-T60" },
    "T61": { code: "T61", description: "Toxic effects of noxious substances eaten as food", chapter: "XIX", range: "T61-T61" },
    "T62": { code: "T62", description: "Toxic effects of other and unspecified noxious substances", chapter: "XIX", range: "T62-T62" },
    "T63": { code: "T63", description: "Toxic effects of contact with venomous animals and plants", chapter: "XIX", range: "T63-T63" },
    "T64": { code: "T64", description: "Toxic effects of mycotoxins", chapter: "XIX", range: "T64-T64" },
    "T65": { code: "T65", description: "Toxic effects of other and unspecified substances", chapter: "XIX", range: "T65-T65" },
    "T66": { code: "T66", description: "Effects of radiation, unspecified", chapter: "XIX", range: "T66-T66" },
    "T67": { code: "T67", description: "Effects of heat and light", chapter: "XIX", range: "T67-T67" },
    "T68": { code: "T68", description: "Hypothermia", chapter: "XIX", range: "T68-T68" },
    "T69": { code: "T69", description: "Effects of reduced temperature", chapter: "XIX", range: "T69-T69" },
    "T70": { code: "T70", description: "Effects of air pressure and water pressure", chapter: "XIX", range: "T70-T70" },
    "T71": { code: "T71", description: "Asphyxiation due to entrapment", chapter: "XIX", range: "T71-T71" },
    "T73": { code: "T73", description: "Effects of other deprivation", chapter: "XIX", range: "T73-T73" },
    "T74": { code: "T74", description: "Adult and child abuse, neglect and exploitation", chapter: "XIX", range: "T74-T74" },
    "T75": { code: "T75", description: "Effects of other external causes", chapter: "XIX", range: "T75-T75" },
    "T76": { code: "T76", description: "Assault and homicide", chapter: "XIX", range: "T76-T76" },
    "T78": { code: "T78", description: "Adverse effects, not elsewhere classified", chapter: "XIX", range: "T78-T78" },
    "T80": { code: "T80", description: "Complications following infusion, transfusion and therapeutic injection", chapter: "XIX", range: "T80-T80" },
    "T81": { code: "T81", description: "Complications of procedures, not elsewhere classified", chapter: "XIX", range: "T81-T81" },
    "T82": { code: "T82", description: "Complications of cardiac and vascular prosthetic devices, implants and grafts", chapter: "XIX", range: "T82-T82" },
    "T83": { code: "T83", description: "Complications of genitourinary prosthetic devices, implants and grafts", chapter: "XIX", range: "T83-T83" },
    "T84": { code: "T84", description: "Complications of internal orthopedic prosthetic devices, implants and grafts", chapter: "XIX", range: "T84-T84" },
    "T85": { code: "T85", description: "Complications of other internal prosthetic devices, implants and grafts", chapter: "XIX", range: "T85-T85" },
    "T86": { code: "T86", description: "Failure and rejection of transplanted organs and tissues", chapter: "XIX", range: "T86-T86" },
    "T87": { code: "T87", description: "Complications peculiar to reattachment and amputation", chapter: "XIX", range: "T87-T87" },
    "T88": { code: "T88", description: "Other complications of medical and surgical care, not elsewhere classified", chapter: "XIX", range: "T88-T88" }
  };
  var categories7 = {
    "V00": { code: "V00", description: "Pedestrian conveyance accident", chapter: "XX", range: "V00-V00" },
    "V01": { code: "V01", description: "Pedestrian injured in collision with pedestrian conveyance", chapter: "XX", range: "V01-V01" },
    "V02": { code: "V02", description: "Pedestrian injured in collision with two- or three-wheeled motor vehicle", chapter: "XX", range: "V02-V02" },
    "V03": { code: "V03", description: "Pedestrian injured in collision with car, pickup truck or van", chapter: "XX", range: "V03-V03" },
    "V09": { code: "V09", description: "Pedestrian injured in other and unspecified transport accidents", chapter: "XX", range: "V09-V09" },
    "V10": { code: "V10", description: "Bicycle rider injured in collision with pedestrian or animal", chapter: "XX", range: "V10-V10" },
    "V12": { code: "V12", description: "Bicycle rider injured in collision with two- or three-wheeled motor vehicle", chapter: "XX", range: "V12-V12" },
    "V13": { code: "V13", description: "Bicycle rider injured in collision with car, pickup truck or van", chapter: "XX", range: "V13-V13" },
    "V14": { code: "V14", description: "Bicycle rider injured in collision with bus or motor vehicle (heavy vehicle)", chapter: "XX", range: "V14-V14" },
    "V17": { code: "V17", description: "Bicycle rider injured in collision with fixed or stationary object", chapter: "XX", range: "V17-V17" },
    "V19": { code: "V19", description: "Bicycle rider injured in other and unspecified transport accidents", chapter: "XX", range: "V19-V19" },
    "V23": { code: "V23", description: "Motorcycle rider injured in collision with car, pickup truck or van", chapter: "XX", range: "V23-V23" },
    "V29": { code: "V29", description: "Motorcycle rider injured in other and unspecified transport accidents", chapter: "XX", range: "V29-V29" },
    "V43": { code: "V43", description: "Car occupant injured in collision with car, pickup truck or van", chapter: "XX", range: "V43-V43" },
    "V49": { code: "V49", description: "Car occupant injured in other and unspecified transport accidents", chapter: "XX", range: "V49-V49" },
    "V53": { code: "V53", description: "Pickup truck or van occupant injured in collision with car, pickup truck or van", chapter: "XX", range: "V53-V53" },
    "V59": { code: "V59", description: "Pickup truck or van occupant injured in other and unspecified transport accidents", chapter: "XX", range: "V59-V59" },
    "V63": { code: "V63", description: "Bus occupant injured in collision with car, pickup truck or van", chapter: "XX", range: "V63-V63" },
    "V69": { code: "V69", description: "Bus occupant injured in other and unspecified transport accidents", chapter: "XX", range: "V69-V69" },
    "V73": { code: "V73", description: "Motorcycle or scooter sidecar occupant injured in collision with car, pickup truck or van", chapter: "XX", range: "V73-V73" },
    "V79": { code: "V79", description: "Motorcycle or scooter sidecar occupant injured in other and unspecified transport accidents", chapter: "XX", range: "V79-V79" },
    "V80": { code: "V80", description: "Person on outside of vehicle injured in transport accident", chapter: "XX", range: "V80-V80" },
    "V89": { code: "V89", description: "Motor or nonmotor vehicle accident, type of vehicle unspecified", chapter: "XX", range: "V89-V89" },
    "W00": { code: "W00", description: "Fall on and from same level due to ice and snow", chapter: "XX", range: "W00-W00" },
    "W01": { code: "W01", description: "Fall on and from same level due to slipping, tripping and stumbling", chapter: "XX", range: "W01-W01" },
    "W02": { code: "W02", description: "Fall from or due to collapse of non-moving stairs and steps", chapter: "XX", range: "W02-W02" },
    "W05": { code: "W05", description: "Fall from wheelchair", chapter: "XX", range: "W05-W05" },
    "W06": { code: "W06", description: "Fall from bed", chapter: "XX", range: "W06-W06" },
    "W07": { code: "W07", description: "Fall from chair", chapter: "XX", range: "W07-W07" },
    "W08": { code: "W08", description: "Fall from other furniture", chapter: "XX", range: "W08-W08" },
    "W10": { code: "W10", description: "Fall on and from stairs and steps", chapter: "XX", range: "W10-W10" },
    "W11": { code: "W11", description: "Fall on and from ladders", chapter: "XX", range: "W11-W11" },
    "W13": { code: "W13", description: "Fall from, out of or through building or structure", chapter: "XX", range: "W13-W13" },
    "W14": { code: "W14", description: "Fall from tree", chapter: "XX", range: "W14-W14" },
    "W15": { code: "W15", description: "Fall from cliff", chapter: "XX", range: "W15-W15" },
    "W17": { code: "W17", description: "Other fall from one level to another", chapter: "XX", range: "W17-W17" },
    "W18": { code: "W18", description: "Other fall on same level", chapter: "XX", range: "W18-W18" },
    "W19": { code: "W19", description: "Unspecified fall", chapter: "XX", range: "W19-W19" },
    "W20": { code: "W20", description: "Struck by thrown, projected or falling object", chapter: "XX", range: "W20-W20" },
    "W22": { code: "W22", description: "Struck by other objects", chapter: "XX", range: "W22-W22" },
    "W23": { code: "W23", description: "Caught, crushed, jammed or pinched in or between objects", chapter: "XX", range: "W23-W23" },
    "W25": { code: "W25", description: "Contact with sharp glass", chapter: "XX", range: "W25-W25" },
    "W27": { code: "W27", description: "Contact with nonpowered hand tool", chapter: "XX", range: "W27-W27" },
    "W28": { code: "W28", description: "Contact with powered hand tool", chapter: "XX", range: "W28-W28" },
    "W29": { code: "W29", description: "Contact with other machinery", chapter: "XX", range: "W29-W29" },
    "W32": { code: "W32", description: "Accidental discharge of handgun", chapter: "XX", range: "W32-W32" },
    "W34": { code: "W34", description: "Accidental discharge of other and unspecified firearms", chapter: "XX", range: "W34-W34" },
    "W45": { code: "W45", description: "Foreign body or object entering through skin", chapter: "XX", range: "W45-W45" },
    "W49": { code: "W49", description: "Exposure to other inanimate objects", chapter: "XX", range: "W49-W49" },
    "W50": { code: "W50", description: "Hit, struck, kicked, torn, bitten or scratched by other person", chapter: "XX", range: "W50-W50" },
    "W53": { code: "W53", description: "Bitten or struck by dog", chapter: "XX", range: "W53-W53" },
    "W54": { code: "W54", description: "Bitten or struck by other mammals", chapter: "XX", range: "W54-W54" },
    "W56": { code: "W56", description: "Contact with marine mammals", chapter: "XX", range: "W56-W56" },
    "W57": { code: "W57", description: "Bitten or stung by nonvenomous insects and other arthropods", chapter: "XX", range: "W57-W57" },
    "W64": { code: "W64", description: "Exposure to other animate mechanical forces", chapter: "XX", range: "W64-W64" },
    "W74": { code: "W74", description: "Unspecified drowning and submersion", chapter: "XX", range: "W74-W74" },
    "W75": { code: "W75", description: "Accidental suffocation in bed", chapter: "XX", range: "W75-W75" },
    "W76": { code: "W76", description: "Other accidental hanging and strangulation", chapter: "XX", range: "W76-W76" },
    "W78": { code: "W78", description: "Inhalation of gastric contents", chapter: "XX", range: "W78-W78" },
    "W79": { code: "W79", description: "Inhalation and ingestion of food causing obstruction of respiratory tract", chapter: "XX", range: "W79-W79" },
    "W80": { code: "W80", description: "Inhalation and ingestion of other objects causing obstruction of respiratory tract", chapter: "XX", range: "W80-W80" },
    "W84": { code: "W84", description: "Unspecified threat to breathing due to external cause", chapter: "XX", range: "W84-W84" },
    "W85": { code: "W85", description: "Exposure to electric transmission lines", chapter: "XX", range: "W85-W85" },
    "W87": { code: "W87", description: "Unspecified electric current", chapter: "XX", range: "W87-W87" },
    "W88": { code: "W88", description: "Exposure to ionizing radiation", chapter: "XX", range: "W88-W88" },
    "W92": { code: "W92", description: "Exposure to excessive heat of man-made origin", chapter: "XX", range: "W92-W92" },
    "W93": { code: "W93", description: "Exposure to excessive cold of man-made origin", chapter: "XX", range: "W93-W93" },
    "W99": { code: "W99", description: "Exposure to other man-made environmental factors", chapter: "XX", range: "W99-W99" }
  };
  var categories8 = {
    "X00": { code: "X00", description: "Exposure to uncontrolled fire in building or structure", chapter: "XX", range: "X00-X00" },
    "X02": { code: "X02", description: "Exposure to controlled fire in building or structure", chapter: "XX", range: "X02-X02" },
    "X04": { code: "X04", description: "Exposure to ignition of highly flammable material", chapter: "XX", range: "X04-X04" },
    "X06": { code: "X06", description: "Exposure to ignition or melting of other clothing and apparel", chapter: "XX", range: "X06-X06" },
    "X08": { code: "X08", description: "Exposure to other specified fire and flames", chapter: "XX", range: "X08-X08" },
    "X09": { code: "X09", description: "Exposure to unspecified fire and flames", chapter: "XX", range: "X09-X09" },
    "X10": { code: "X10", description: "Contact with hot drinks, food, fats and cooking oils", chapter: "XX", range: "X10-X10" },
    "X12": { code: "X12", description: "Contact with other hot fluids", chapter: "XX", range: "X12-X12" },
    "X13": { code: "X13", description: "Contact with steam and hot vapors", chapter: "XX", range: "X13-X13" },
    "X15": { code: "X15", description: "Contact with hot household appliances", chapter: "XX", range: "X15-X15" },
    "X18": { code: "X18", description: "Contact with other hot metals", chapter: "XX", range: "X18-X18" },
    "X19": { code: "X19", description: "Contact with other and unspecified hot substances", chapter: "XX", range: "X19-X19" },
    "X20": { code: "X20", description: "Contact with venomous snakes and lizards", chapter: "XX", range: "X20-X20" },
    "X21": { code: "X21", description: "Contact with venomous spiders", chapter: "XX", range: "X21-X21" },
    "X22": { code: "X22", description: "Contact with scorpions", chapter: "XX", range: "X22-X22" },
    "X23": { code: "X23", description: "Contact with hornets, wasps and bees", chapter: "XX", range: "X23-X23" },
    "X26": { code: "X26", description: "Contact with venomous marine animals and plants", chapter: "XX", range: "X26-X26" },
    "X29": { code: "X29", description: "Contact with unspecified venomous animal or plant", chapter: "XX", range: "X29-X29" },
    "X30": { code: "X30", description: "Effects of natural heat", chapter: "XX", range: "X30-X30" },
    "X31": { code: "X31", description: "Effects of natural cold", chapter: "XX", range: "X31-X31" },
    "X32": { code: "X32", description: "Effects of lightning", chapter: "XX", range: "X32-X32" },
    "X33": { code: "X33", description: "Effects of other natural forces", chapter: "XX", range: "X33-X33" },
    "X34": { code: "X34", description: "Earthquake", chapter: "XX", range: "X34-X34" },
    "X37": { code: "X37", description: "Cataclysmic storm", chapter: "XX", range: "X37-X37" },
    "X38": { code: "X38", description: "Flood", chapter: "XX", range: "X38-X38" },
    "X39": { code: "X39", description: "Other and unspecified effects of natural forces", chapter: "XX", range: "X39-X39" },
    "X50": { code: "X50", description: "Overexertion and strenuous or repetitive movements", chapter: "XX", range: "X50-X50" },
    "X51": { code: "X51", description: "Travel and motion", chapter: "XX", range: "X51-X51" },
    "X53": { code: "X53", description: "Lack of food", chapter: "XX", range: "X53-X53" },
    "X54": { code: "X54", description: "Lack of water", chapter: "XX", range: "X54-X54" },
    "X57": { code: "X57", description: "Unspecified privation", chapter: "XX", range: "X57-X57" },
    "X59": { code: "X59", description: "Exposure to unspecified factors", chapter: "XX", range: "X59-X59" },
    "X72": { code: "X72", description: "Intentional self-harm by handgun discharge", chapter: "XX", range: "X72-X72" },
    "X73": { code: "X73", description: "Intentional self-harm by shotgun discharge", chapter: "XX", range: "X73-X73" },
    "X74": { code: "X74", description: "Intentional self-harm by other and unspecified firearm discharge", chapter: "XX", range: "X74-X74" },
    "X78": { code: "X78", description: "Intentional self-harm by sharp object", chapter: "XX", range: "X78-X78" },
    "X80": { code: "X80", description: "Intentional self-harm by jumping from a high place", chapter: "XX", range: "X80-X80" },
    "X84": { code: "X84", description: "Intentional self-harm by unspecified means", chapter: "XX", range: "X84-X84" },
    "X85": { code: "X85", description: "Assault by poisoning", chapter: "XX", range: "X85-X85" },
    "X88": { code: "X88", description: "Assault by handgun discharge", chapter: "XX", range: "X88-X88" },
    "X89": { code: "X89", description: "Assault by other and unspecified firearm discharge", chapter: "XX", range: "X89-X89" },
    "X91": { code: "X91", description: "Assault by sharp object", chapter: "XX", range: "X91-X91" },
    "X92": { code: "X92", description: "Assault by blunt object", chapter: "XX", range: "X92-X92" },
    "X95": { code: "X95", description: "Assault by smoke, fire and flames", chapter: "XX", range: "X95-X95" },
    "X99": { code: "X99", description: "Assault by other specified means", chapter: "XX", range: "X99-X99" },
    "Y00": { code: "Y00", description: "Legal intervention involving firearm discharge", chapter: "XX", range: "Y00-Y00" },
    "Y01": { code: "Y01", description: "Legal intervention involving sharp object", chapter: "XX", range: "Y01-Y01" },
    "Y04": { code: "Y04", description: "Legal intervention, means unspecified", chapter: "XX", range: "Y04-Y04" },
    "Y83": { code: "Y83", description: "Surgical operation and other surgical procedures as the cause of abnormal reaction", chapter: "XX", range: "Y83-Y83" },
    "Y84": { code: "Y84", description: "Other medical procedures as the cause of abnormal reaction", chapter: "XX", range: "Y84-Y84" },
    "Y90": { code: "Y90", description: "Evidence of alcohol involvement determined by blood alcohol level", chapter: "XX", range: "Y90-Y90" },
    "Y92": { code: "Y92", description: "Place of occurrence of the external cause", chapter: "XX", range: "Y92-Y92" },
    "Y93": { code: "Y93", description: "Activity codes for classification of external causes of morbidity", chapter: "XX", range: "Y93-Y93" }
  };
  var categoriesZ = {
    "Z00": { code: "Z00", description: "Encounter for general adult medical examination", chapter: "XXI", range: "Z00-Z00" },
    "Z01": { code: "Z01", description: "Encounter for other special examinations", chapter: "XXI", range: "Z01-Z01" },
    "Z02": { code: "Z02", description: "Encounter for administrative examination", chapter: "XXI", range: "Z02-Z02" },
    "Z03": { code: "Z03", description: "Encounter for medical observation and evaluation of suspected diseases and conditions", chapter: "XXI", range: "Z03-Z03" },
    "Z04": { code: "Z04", description: "Encounter for observation and evaluation of conditions resulting from injury", chapter: "XXI", range: "Z04-Z04" },
    "Z08": { code: "Z08", description: "Encounter for follow-up examination after completed treatment for malignant neoplasm", chapter: "XXI", range: "Z08-Z08" },
    "Z09": { code: "Z09", description: "Encounter for follow-up examination after completed treatment for conditions other than malignant neoplasm", chapter: "XXI", range: "Z09-Z09" },
    "Z10": { code: "Z10", description: "Encounter for general adult medical examination and certain screening examinations", chapter: "XXI", range: "Z10-Z10" },
    "Z11": { code: "Z11", description: "Encounter for screening for infectious and parasitic diseases", chapter: "XXI", range: "Z11-Z11" },
    "Z12": { code: "Z12", description: "Encounter for screening for malignant neoplasms", chapter: "XXI", range: "Z12-Z12" },
    "Z13": { code: "Z13", description: "Encounter for screening for other diseases and disorders", chapter: "XXI", range: "Z13-Z13" },
    "Z20": { code: "Z20", description: "Encounter for contact with and exposure to communicable diseases", chapter: "XXI", range: "Z20-Z20" },
    "Z21": { code: "Z21", description: "Asymptomatic human immunodeficiency virus [HIV] infection status", chapter: "XXI", range: "Z21-Z21" },
    "Z23": { code: "Z23", description: "Encounter for immunization", chapter: "XXI", range: "Z23-Z23" },
    "Z30": { code: "Z30", description: "Encounter for contraceptive management", chapter: "XXI", range: "Z30-Z30" },
    "Z31": { code: "Z31", description: "Encounter for procreative management", chapter: "XXI", range: "Z31-Z31" },
    "Z33": { code: "Z33", description: "Pregnant state", chapter: "XXI", range: "Z33-Z33" },
    "Z34": { code: "Z34", description: "Encounter for supervision of normal pregnancy", chapter: "XXI", range: "Z34-Z34" },
    "Z35": { code: "Z35", description: "Encounter for supervision of high-risk pregnancy", chapter: "XXI", range: "Z35-Z35" },
    "Z36": { code: "Z36", description: "Encounter for antenatal screening of mother", chapter: "XXI", range: "Z36-Z36" },
    "Z37": { code: "Z37", description: "Outcome of delivery", chapter: "XXI", range: "Z37-Z37" },
    "Z39": { code: "Z39", description: "Encounter for care and examination immediately after delivery", chapter: "XXI", range: "Z39-Z39" },
    "Z40": { code: "Z40", description: "Encounter for prophylactic surgery", chapter: "XXI", range: "Z40-Z40" },
    "Z42": { code: "Z42", description: "Encounter for follow-up care involving plastic surgery", chapter: "XXI", range: "Z42-Z42" },
    "Z43": { code: "Z43", description: "Encounter for attention to and management of artificial openings", chapter: "XXI", range: "Z43-Z43" },
    "Z44": { code: "Z44", description: "Encounter for fitting and adjustment of external prosthetic device", chapter: "XXI", range: "Z44-Z44" },
    "Z45": { code: "Z45", description: "Encounter for adjustment and management of implanted device", chapter: "XXI", range: "Z45-Z45" },
    "Z46": { code: "Z46", description: "Encounter for fitting and adjustment of other devices", chapter: "XXI", range: "Z46-Z46" },
    "Z47": { code: "Z47", description: "Encounter for orthopedic aftercare", chapter: "XXI", range: "Z47-Z47" },
    "Z48": { code: "Z48", description: "Encounter for other specified postprocedural aftercare", chapter: "XXI", range: "Z48-Z48" },
    "Z49": { code: "Z49", description: "Encounter for care involving dialysis", chapter: "XXI", range: "Z49-Z49" },
    "Z50": { code: "Z50", description: "Encounter for care involving use of rehabilitation procedures", chapter: "XXI", range: "Z50-Z50" },
    "Z51": { code: "Z51", description: "Encounter for other specified aftercare", chapter: "XXI", range: "Z51-Z51" },
    "Z55": { code: "Z55", description: "Problems related to education and literacy", chapter: "XXI", range: "Z55-Z55" },
    "Z56": { code: "Z56", description: "Problems related to employment and unemployment", chapter: "XXI", range: "Z56-Z56" },
    "Z57": { code: "Z57", description: "Problems related to occupational exposure to risk factors", chapter: "XXI", range: "Z57-Z57" },
    "Z58": { code: "Z58", description: "Problems related to housing and economic circumstances", chapter: "XXI", range: "Z58-Z58" },
    "Z59": { code: "Z59", description: "Problems related to socioeconomic and psychosocial circumstances", chapter: "XXI", range: "Z59-Z59" },
    "Z60": { code: "Z60", description: "Problems related to social environment", chapter: "XXI", range: "Z60-Z60" },
    "Z62": { code: "Z62", description: "Problems related to upbringing", chapter: "XXI", range: "Z62-Z62" },
    "Z63": { code: "Z63", description: "Problems related to primary support group, including family circumstances", chapter: "XXI", range: "Z63-Z63" },
    "Z64": { code: "Z64", description: "Problems related to certain psychosocial circumstances", chapter: "XXI", range: "Z64-Z64" },
    "Z65": { code: "Z65", description: "Problems related to other psychosocial circumstances", chapter: "XXI", range: "Z65-Z65" },
    "Z66": { code: "Z66", description: "Do not resuscitate", chapter: "XXI", range: "Z66-Z66" },
    "Z68": { code: "Z68", description: "Encounter for provision of numerical grading scale", chapter: "XXI", range: "Z68-Z68" },
    "Z69": { code: "Z69", description: "Encounter for mental health services for victim and perpetrator of abuse", chapter: "XXI", range: "Z69-Z69" },
    "Z70": { code: "Z70", description: "Counseling for human sexuality", chapter: "XXI", range: "Z70-Z70" },
    "Z71": { code: "Z71", description: "Encounter for other counseling", chapter: "XXI", range: "Z71-Z71" },
    "Z72": { code: "Z72", description: "Problems related to lifestyle", chapter: "XXI", range: "Z72-Z72" },
    "Z73": { code: "Z73", description: "Problems related to life-management difficulty", chapter: "XXI", range: "Z73-Z73" },
    "Z74": { code: "Z74", description: "Problems related to care-dependency", chapter: "XXI", range: "Z74-Z74" },
    "Z75": { code: "Z75", description: "Problems related to medical facilities and other health care", chapter: "XXI", range: "Z75-Z75" },
    "Z76": { code: "Z76", description: "Encounter for other specified counseling and medical advice", chapter: "XXI", range: "Z76-Z76" },
    "Z79": { code: "Z79", description: "Long term (current) drug therapy", chapter: "XXI", range: "Z79-Z79" },
    "Z80": { code: "Z80", description: "Family history of primary malignant neoplasm", chapter: "XXI", range: "Z80-Z80" },
    "Z81": { code: "Z81", description: "Family history of mental and behavioral disorders", chapter: "XXI", range: "Z81-Z81" },
    "Z82": { code: "Z82", description: "Family history of certain disabilities and chronic diseases leading to disablement", chapter: "XXI", range: "Z82-Z82" },
    "Z83": { code: "Z83", description: "Family history of other specific conditions", chapter: "XXI", range: "Z83-Z83" },
    "Z84": { code: "Z84", description: "Family history of principal diseases classified elsewhere", chapter: "XXI", range: "Z84-Z84" },
    "Z85": { code: "Z85", description: "Personal history of malignant neoplasm", chapter: "XXI", range: "Z85-Z85" },
    "Z86": { code: "Z86", description: "Personal history of certain other diseases", chapter: "XXI", range: "Z86-Z86" },
    "Z87": { code: "Z87", description: "Personal history of other diseases and conditions", chapter: "XXI", range: "Z87-Z87" },
    "Z88": { code: "Z88", description: "Allergy status to drugs, medicaments and biological substances", chapter: "XXI", range: "Z88-Z88" },
    "Z89": { code: "Z89", description: "Acquired absence of limb", chapter: "XXI", range: "Z89-Z89" },
    "Z90": { code: "Z90", description: "Acquired absence of organs, not elsewhere classified", chapter: "XXI", range: "Z90-Z90" },
    "Z91": { code: "Z91", description: "Personal history of certain risk factors, not elsewhere classified", chapter: "XXI", range: "Z91-Z91" },
    "Z92": { code: "Z92", description: "Personal history of medical treatment", chapter: "XXI", range: "Z92-Z92" },
    "Z93": { code: "Z93", description: "Gastrostomy status", chapter: "XXI", range: "Z93-Z93" },
    "Z94": { code: "Z94", description: "Transplant status", chapter: "XXI", range: "Z94-Z94" },
    "Z95": { code: "Z95", description: "Presence of cardioverter/defibrillator and other cardiac implants", chapter: "XXI", range: "Z95-Z95" },
    "Z96": { code: "Z96", description: "Presence of other functional implants", chapter: "XXI", range: "Z96-Z96" },
    "Z97": { code: "Z97", description: "Presence of other devices", chapter: "XXI", range: "Z97-Z97" },
    "Z98": { code: "Z98", description: "Other postsurgical states", chapter: "XXI", range: "Z98-Z98" },
    "Z99": { code: "Z99", description: "Dependence on enabling machines and devices", chapter: "XXI", range: "Z99-Z99" }
  };
  var categories = {};
  var k;
  for (k in categories0) { categories[k] = categories0[k]; }
  for (k in categories2) { categories[k] = categories2[k]; }
  for (k in categories3) { categories[k] = categories3[k]; }
  for (k in categories4) { categories[k] = categories4[k]; }
  for (k in categories5) { categories[k] = categories5[k]; }
  for (k in categories6) { categories[k] = categories6[k]; }
  for (k in categories7) { categories[k] = categories7[k]; }
  for (k in categories8) { categories[k] = categories8[k]; }
  for (k in categoriesZ) { categories[k] = categoriesZ[k]; }

  var codes = {};
  codes["A00.0"] = { code: "A00.0", description: "Cholera due to Vibrio cholerae 01, biovar cholerae", category: "A00", excludes1: [], excludes2: [], includes: ["Cholera due to V. cholerae 01, biovar eltor"], commonUse: ["Traveler's diarrhea from cholera", "Severe watery diarrhea from cholera"], documentation: ["Stool culture positive for V. cholerae", "Epidemiological link to cholera endemic area"] };
  codes["A00.1"] = { code: "A00.1", description: "Cholera due to Vibrio cholerae 01, biovar eltor", category: "A00", excludes1: [], excludes2: [], includes: [], commonUse: ["Cholera from eltor strain"], documentation: ["Stool culture positive for V. cholerae eltor"] };
  codes["A00.9"] = { code: "A00.9", description: "Cholera, unspecified", category: "A00", excludes1: [], excludes2: [], includes: [], commonUse: ["Unspecified cholera"], documentation: ["Clinical presentation consistent with cholera"] };
  codes["A08.0"] = { code: "A08.0", description: "Rotaviral enteritis", category: "A09", excludes1: [], excludes2: [], includes: [], commonUse: ["Rotavirus gastroenteritis", "Winter vomiting disease"], documentation: ["Stool rotavirus antigen positive"] };
  codes["A08.11"] = { code: "A08.11", description: "Acute gastroenteritis due to Norwalk agent", category: "A09", excludes1: [], excludes2: [], includes: [], commonUse: ["Norovirus infection", "Stomach flu"], documentation: ["Stool norovirus PCR positive"] };
  codes["A08.19"] = { code: "A08.19", description: "Acute gastroenteritis due to other small round viruses", category: "A09", excludes1: [], excludes2: [], includes: [], commonUse: ["Viral gastroenteritis"], documentation: ["Stool viral studies"] };
  codes["A08.2"] = { code: "A08.2", description: "Adenoviral enteritis", category: "A09", excludes1: [], excludes2: [], includes: [], commonUse: ["Adenovirus gastroenteritis"], documentation: ["Stool adenovirus positive"] };
  codes["A08.3"] = { code: "A08.3", description: "Other viral enteritis", category: "A09", excludes1: [], excludes2: [], includes: [], commonUse: ["Viral diarrhea"], documentation: ["Viral stool studies"] };
  codes["A08.4"] = { code: "A08.4", description: "Viral intestinal infection, unspecified", category: "A09", excludes1: [], excludes2: [], includes: [], commonUse: ["Unspecified viral gastroenteritis"], documentation: ["Clinical diagnosis"] };
  codes["A09"] = { code: "A09", description: "Infectious gastroenteritis and colitis, unspecified", category: "A09", excludes1: ["Bacterial foodborne intoxications (A05.-)"], excludes2: [], includes: ["Gastroenteritis NOS", "Infectious colitis NOS", "Infectious enteritis NOS"], commonUse: ["Stomach bug", "Stomach flu", "Gastroenteritis", "Food poisoning"], documentation: ["Clinical diagnosis of gastroenteritis", "Stool studies if warranted"] };
  codes["B07.9"] = { code: "B07.9", description: "Viral warts, unspecified", category: "B07", excludes1: [], excludes2: [], includes: ["Verruca NOS", "Wart NOS"], commonUse: ["Common wart", "Plantar wart", "Flat wart"], documentation: ["Clinical examination findings"] };
  codes["B08.1"] = { code: "B08.1", description: "Molluscum contagiosum", category: "B08", excludes1: [], excludes2: [], includes: [], commonUse: ["Water warts", "Molluscum"], documentation: ["Clinical examination findings", "Dermoscopy"] };
  codes["B25.0"] = { code: "B25.0", description: "Cytomegaloviral pneumonitis", category: "B25", excludes1: [], excludes2: [], includes: [], commonUse: ["CMV pneumonia in immunocompromised"], documentation: ["CMV PCR positive", "Chest imaging", "BAL results"] };
  codes["B25.9"] = { code: "B25.9", description: "Cytomegaloviral disease, unspecified", category: "B25", excludes1: [], excludes2: [], includes: ["CMV disease NOS"], commonUse: ["CMV infection"], documentation: ["CMV serology", "CMV PCR"] };
  codes["B34.1"] = { code: "B34.1", description: "Enterovirus infection, unspecified", category: "B34", excludes1: [], excludes2: [], includes: [], commonUse: ["Enteroviral infection"], documentation: ["Enteroviral PCR"] };
  codes["B34.2"] = { code: "B34.2", description: "Coronavirus infection, unspecified", category: "B34", excludes1: [], excludes2: [], includes: [], commonUse: ["Coronavirus infection (non-COVID)"], documentation: ["Coronavirus testing"] };
  codes["B34.9"] = { code: "B34.9", description: "Viral infection, unspecified", category: "B34", excludes1: [], excludes2: [], includes: [], commonUse: ["Unspecified viral infection"], documentation: ["Viral serology studies"] };
  codes["B35.0"] = { code: "B35.0", description: "Dermatophytosis of scalp and beard", category: "B35", excludes1: [], excludes2: [], includes: ["Tinea capitis", "Tinea barbae"], commonUse: ["Ringworm of scalp", "Scalp ringworm"], documentation: ["KOH preparation positive", "Fungal culture"] };
  codes["B35.1"] = { code: "B35.1", description: "Dermatophytosis of nails", category: "B35", excludes1: [], excludes2: [], includes: ["Tinea unguium", "Onychomycosis"], commonUse: ["Fungal nail infection", "Toenail fungus"], documentation: ["Nail clippings KOH positive", "Fungal culture"] };
  codes["B35.2"] = { code: "B35.2", description: "Dermatophytosis of hand", category: "B35", excludes1: [], excludes2: [], includes: ["Tinea manuum"], commonUse: ["Ringworm of hand"], documentation: ["KOH preparation"] };
  codes["B35.3"] = { code: "B35.3", description: "Dermatophytosis of foot", category: "B35", excludes1: [], excludes2: [], includes: ["Tinea pedis"], commonUse: ["Athlete's foot", "Ringworm of foot"], documentation: ["KOH preparation positive"] };
  codes["B35.4"] = { code: "B35.4", description: "Dermatophytosis of body", category: "B35", excludes1: [], excludes2: [], includes: ["Tinea corporis"], commonUse: ["Ringworm of body", "Body ringworm"], documentation: ["KOH preparation"] };
  codes["B35.5"] = { code: "B35.5", description: "Tinea cruris", category: "B35", excludes1: [], excludes2: [], includes: ["Jock itch"], commonUse: ["Jock itch", "Groin ringworm"], documentation: ["KOH preparation positive"] };
  codes["B35.6"] = { code: "B35.6", description: "Tinea inguinalis", category: "B35", excludes1: [], excludes2: [], includes: [], commonUse: ["Groin ringworm"], documentation: ["KOH preparation"] };
  codes["B35.8"] = { code: "B35.8", description: "Other dermatophytosis", category: "B35", excludes1: [], excludes2: [], includes: [], commonUse: ["Other fungal skin infection"], documentation: ["KOH preparation", "Fungal culture"] };
  codes["B35.9"] = { code: "B35.9", description: "Dermatophytosis, unspecified", category: "B35", excludes1: [], excludes2: [], includes: ["Dermatophytosis NOS", "Ringworm NOS"], commonUse: ["Ringworm"], documentation: ["KOH preparation"] };
  codes["B37.0"] = { code: "B37.0", description: "Candidiasis of mouth", category: "B37", excludes1: [], excludes2: [], includes: ["Oral candidiasis", "Thrush"], commonUse: ["Thrush", "Oral yeast infection"], documentation: ["Oral swab positive for Candida"] };
  codes["B37.1"] = { code: "B37.1", description: "Pulmonary candidiasis", category: "B37", excludes1: [], excludes2: [], includes: [], commonUse: ["Candida pneumonia"], documentation: ["Sputum culture", "BAL culture"] };
  codes["B37.2"] = { code: "B37.2", description: "Candidiasis of vulva and vagina", category: "B37", excludes1: [], excludes2: [], includes: ["Vulvovaginal candidiasis"], commonUse: ["Yeast infection", "Vaginal yeast infection", "VVC"], documentation: ["Vaginal swab wet mount", "Fungal culture"] };
  codes["B37.3"] = { code: "B37.3", description: "Candidiasis of urethra", category: "B37", excludes1: [], excludes2: [], includes: [], commonUse: ["Candidal urethritis"], documentation: ["Urethral swab"] };
  codes["B37.4"] = { code: "B37.4", description: "Candidiasis of other urogenital sites", category: "B37", excludes1: [], excludes2: [], includes: [], commonUse: ["Candidal cystitis", "Candidal UTI"], documentation: ["Urine culture positive for Candida"] };
  codes["B37.8"] = { code: "B37.8", description: "Candidiasis of other sites", category: "B37", excludes1: [], excludes2: [], includes: ["Candidal esophagitis", "Candidal otitis externa"], commonUse: ["Esophageal candidiasis"], documentation: ["Endoscopy", "Culture"] };
  codes["B37.9"] = { code: "B37.9", description: "Candidiasis, unspecified", category: "B37", excludes1: [], excludes2: [], includes: ["Candidiasis NOS"], commonUse: ["Yeast infection"], documentation: ["Culture positive for Candida"] };
  codes["B54"] = { code: "B54", description: "Unspecified malaria", category: "B54", excludes1: [], excludes2: [], includes: ["Malaria NOS"], commonUse: ["Malaria"], documentation: ["Blood smear for malaria parasites", "Rapid malaria test"] };
  codes["B97.0"] = { code: "B97.0", description: "Reovirus as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: [], commonUse: ["Rotavirus gastroenteritis (as secondary code)"], documentation: ["Rotavirus testing"] };
  codes["B97.1"] = { code: "B97.1", description: "Adenovirus as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: [], commonUse: ["Adenovirus infections"], documentation: ["Adenoviral testing"] };
  codes["B97.2"] = { code: "B97.2", description: "Coronavirus as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: ["COVID-19", "SARS"], commonUse: ["COVID-19 (use U07.1 for confirmed)", "Coronavirus infection"], documentation: ["SARS-CoV-2 PCR", "COVID-19 test positive"] };
  codes["B97.3"] = { code: "B97.3", description: "Retrovirus as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: ["HTLV"], commonUse: ["Retroviral infection"], documentation: ["Retroviral testing"] };
  codes["B97.4"] = { code: "B97.4", description: "Respiratory syncytial virus as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: ["RSV"], commonUse: ["RSV bronchiolitis", "RSV pneumonia"], documentation: ["RSV nasal swab positive"] };
  codes["B97.5"] = { code: "B97.5", description: "Rhinovirus as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: [], commonUse: ["Rhinoviral infection", "Common cold"], documentation: ["Nasal swab for rhinovirus"] };
  codes["B97.6"] = { code: "B97.6", description: "Parvovirus B19 as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: [], commonUse: ["Fifth disease", "Parvoviral infection"], documentation: ["Parvovirus B19 IgM"] };
  codes["B97.7"] = { code: "B97.7", description: "Mycoplasma as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: [], commonUse: ["Mycoplasma pneumonia"], documentation: ["Mycoplasma IgM", "PCR"] };
  codes["B97.8"] = { code: "B97.8", description: "Other viral agents as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: [], commonUse: ["Other viral infections"], documentation: ["Viral studies"] };
  codes["B97.89"] = { code: "B97.89", description: "Other viral agents as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: [], commonUse: ["Other viral agents"], documentation: ["Viral testing"] };
  codes["B97.9"] = { code: "B97.9", description: "Viral agent, unspecified, as the cause of diseases classified elsewhere", category: "B97", excludes1: [], excludes2: [], includes: [], commonUse: ["Unspecified viral infection"], documentation: ["Viral serology"] };
  codes["C00.0"] = { code: "C00.0", description: "Malignant neoplasm of upper lip, vermilion border", category: "C00", excludes1: [], excludes2: [], includes: [], commonUse: ["Cancer of upper lip"], documentation: [] };
  codes["C00.1"] = { code: "C00.1", description: "Malignant neoplasm of lower lip, vermilion border", category: "C00", excludes1: [], excludes2: [], includes: [], commonUse: ["Cancer of lower lip"], documentation: [] };
  codes["C00.3"] = { code: "C00.3", description: "Malignant neoplasm of upper lip, inner aspect", category: "C00", excludes1: [], excludes2: [], includes: [], commonUse: ["Inner lip cancer"], documentation: [] };
  codes["C00.4"] = { code: "C00.4", description: "Malignant neoplasm of lower lip, inner aspect", category: "C00", excludes1: [], excludes2: [], includes: [], commonUse: ["Inner lip cancer"], documentation: [] };
  codes["C00.5"] = { code: "C00.5", description: "Malignant neoplasm of lip, unspecified, external", category: "C00", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip cancer NOS"], documentation: [] };
  codes["C00.6"] = { code: "C00.6", description: "Malignant neoplasm of commissure of lip", category: "C00", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip commissure cancer"], documentation: [] };
  codes["C00.9"] = { code: "C00.9", description: "Malignant neoplasm of lip, unspecified", category: "C00", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip cancer NOS"], documentation: [] };
  codes["C01.9"] = { code: "C01.9", description: "Malignant neoplasm of base of tongue", category: "C01", excludes1: [], excludes2: [], includes: [], commonUse: ["Base of tongue cancer"], documentation: [] };
  codes["C02.0"] = { code: "C02.0", description: "Malignant neoplasm of dorsal surface of tongue", category: "C02", excludes1: [], excludes2: [], includes: [], commonUse: ["Dorsal tongue cancer"], documentation: [] };
  codes["C02.1"] = { code: "C02.1", description: "Malignant neoplasm of border of tongue", category: "C02", excludes1: [], excludes2: [], includes: [], commonUse: ["Lateral tongue cancer"], documentation: [] };
  codes["C02.2"] = { code: "C02.2", description: "Malignant neoplasm of ventral surface of tongue", category: "C02", excludes1: [], excludes2: [], includes: [], commonUse: ["Floor of mouth cancer"], documentation: [] };
  codes["C02.3"] = { code: "C02.3", description: "Malignant neoplasm of anterior two-thirds of tongue, part unspecified", category: "C02", excludes1: [], excludes2: [], includes: [], commonUse: ["Tongue cancer NOS"], documentation: [] };
  codes["C02.4"] = { code: "C02.4", description: "Malignant neoplasm of lingual tonsil", category: "C02", excludes1: [], excludes2: [], includes: [], commonUse: ["Lingual tonsil cancer"], documentation: [] };
  codes["C02.9"] = { code: "C02.9", description: "Malignant neoplasm of tongue, unspecified", category: "C02", excludes1: [], excludes2: [], includes: [], commonUse: ["Tongue cancer NOS"], documentation: [] };
  codes["C03.0"] = { code: "C03.0", description: "Malignant neoplasm of upper gum", category: "C03", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper gum cancer"], documentation: [] };
  codes["C03.1"] = { code: "C03.1", description: "Malignant neoplasm of lower gum", category: "C03", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower gum cancer"], documentation: [] };
  codes["C03.9"] = { code: "C03.9", description: "Malignant neoplasm of gum, unspecified", category: "C03", excludes1: [], excludes2: [], includes: [], commonUse: ["Gum cancer NOS"], documentation: [] };
  codes["C04.0"] = { code: "C04.0", description: "Malignant neoplasm of anterior floor of mouth", category: "C04", excludes1: [], excludes2: [], includes: [], commonUse: ["Floor of mouth cancer"], documentation: [] };
  codes["C04.1"] = { code: "C04.1", description: "Malignant neoplasm of lateral floor of mouth", category: "C04", excludes1: [], excludes2: [], includes: [], commonUse: ["Floor of mouth cancer"], documentation: [] };
  codes["C04.9"] = { code: "C04.9", description: "Malignant neoplasm of floor of mouth, unspecified", category: "C04", excludes1: [], excludes2: [], includes: [], commonUse: ["Floor of mouth cancer NOS"], documentation: [] };
  codes["C05.0"] = { code: "C05.0", description: "Malignant neoplasm of hard palate", category: "C05", excludes1: [], excludes2: [], includes: [], commonUse: ["Hard palate cancer"], documentation: [] };
  codes["C05.1"] = { code: "C05.1", description: "Malignant neoplasm of soft palate", category: "C05", excludes1: [], excludes2: [], includes: [], commonUse: ["Soft palate cancer"], documentation: [] };
  codes["C05.2"] = { code: "C05.2", description: "Malignant neoplasm of uvula", category: "C05", excludes1: [], excludes2: [], includes: [], commonUse: ["Uvula cancer"], documentation: [] };
  codes["C05.9"] = { code: "C05.9", description: "Malignant neoplasm of palate, unspecified", category: "C05", excludes1: [], excludes2: [], includes: [], commonUse: ["Palate cancer NOS"], documentation: [] };
  codes["C06.0"] = { code: "C06.0", description: "Malignant neoplasm of cheek mucosa", category: "C06", excludes1: [], excludes2: [], includes: [], commonUse: ["Cheek mucosa cancer"], documentation: [] };
  codes["C06.1"] = { code: "C06.1", description: "Malignant neoplasm of vestibule of mouth", category: "C06", excludes1: [], excludes2: [], includes: [], commonUse: ["Vestibule cancer"], documentation: [] };
  codes["C06.2"] = { code: "C06.2", description: "Malignant neoplasm of retromolar area", category: "C06", excludes1: [], excludes2: [], includes: [], commonUse: ["Retromolar cancer"], documentation: [] };
  codes["C06.8"] = { code: "C06.8", description: "Malignant neoplasm of other specified parts of mouth", category: "C06", excludes1: [], excludes2: [], includes: [], commonUse: ["Mouth cancer"], documentation: [] };
  codes["C06.9"] = { code: "C06.9", description: "Malignant neoplasm of mouth, unspecified", category: "C06", excludes1: [], excludes2: [], includes: [], commonUse: ["Mouth cancer NOS"], documentation: [] };
  codes["C07.9"] = { code: "C07.9", description: "Malignant neoplasm of parotid gland", category: "C07", excludes1: [], excludes2: [], includes: [], commonUse: ["Parotid gland cancer","Salivary gland tumor"], documentation: [] };
  codes["C08.0"] = { code: "C08.0", description: "Malignant neoplasm of submandibular gland", category: "C08", excludes1: [], excludes2: [], includes: [], commonUse: ["Submandibular gland cancer"], documentation: [] };
  codes["C08.1"] = { code: "C08.1", description: "Malignant neoplasm of sublingual gland", category: "C08", excludes1: [], excludes2: [], includes: [], commonUse: ["Sublingual gland cancer"], documentation: [] };
  codes["C08.9"] = { code: "C08.9", description: "Malignant neoplasm of major salivary gland, unspecified", category: "C08", excludes1: [], excludes2: [], includes: [], commonUse: ["Salivary gland cancer NOS"], documentation: [] };
  codes["C09.0"] = { code: "C09.0", description: "Malignant neoplasm of tonsillar fossa", category: "C09", excludes1: [], excludes2: [], includes: [], commonUse: ["Tonsillar fossa cancer"], documentation: [] };
  codes["C09.1"] = { code: "C09.1", description: "Malignant neoplasm of tonsillar pillar", category: "C09", excludes1: [], excludes2: [], includes: [], commonUse: ["Tonsillar pillar cancer"], documentation: [] };
  codes["C09.9"] = { code: "C09.9", description: "Malignant neoplasm of tonsil, unspecified", category: "C09", excludes1: [], excludes2: [], includes: [], commonUse: ["Tonsil cancer NOS"], documentation: [] };
  codes["C10.0"] = { code: "C10.0", description: "Malignant neoplasm of vallecula", category: "C10", excludes1: [], excludes2: [], includes: [], commonUse: ["Vallecula cancer"], documentation: [] };
  codes["C10.1"] = { code: "C10.1", description: "Malignant neoplasm of anterior surface of epiglottis", category: "C10", excludes1: [], excludes2: [], includes: [], commonUse: ["Epiglottis cancer"], documentation: [] };
  codes["C10.2"] = { code: "C10.2", description: "Malignant neoplasm of lateral wall of oropharynx", category: "C10", excludes1: [], excludes2: [], includes: [], commonUse: ["Oropharynx cancer"], documentation: [] };
  codes["C10.3"] = { code: "C10.3", description: "Malignant neoplasm of posterior wall of oropharynx", category: "C10", excludes1: [], excludes2: [], includes: [], commonUse: ["Oropharynx cancer"], documentation: [] };
  codes["C10.4"] = { code: "C10.4", description: "Malignant neoplasm of tonsillar region", category: "C10", excludes1: [], excludes2: [], includes: [], commonUse: ["Tonsillar region cancer"], documentation: [] };
  codes["C10.9"] = { code: "C10.9", description: "Malignant neoplasm of oropharynx, unspecified", category: "C10", excludes1: [], excludes2: [], includes: [], commonUse: ["Oropharynx cancer NOS"], documentation: [] };
  codes["C11.0"] = { code: "C11.0", description: "Malignant neoplasm of nasopharynx", category: "C11", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasopharyngeal cancer"], documentation: [] };
  codes["C11.1"] = { code: "C11.1", description: "Malignant neoplasm of roof of nasopharynx", category: "C11", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasopharyngeal cancer"], documentation: [] };
  codes["C11.2"] = { code: "C11.2", description: "Malignant neoplasm of posterior wall of nasopharynx", category: "C11", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasopharyngeal cancer"], documentation: [] };
  codes["C11.3"] = { code: "C11.3", description: "Malignant neoplasm of lateral wall of nasopharynx", category: "C11", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasopharyngeal cancer"], documentation: [] };
  codes["C11.9"] = { code: "C11.9", description: "Malignant neoplasm of nasopharynx, unspecified", category: "C11", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasopharyngeal cancer NOS"], documentation: [] };
  codes["C13.0"] = { code: "C13.0", description: "Malignant neoplasm of postcricoid region", category: "C13", excludes1: [], excludes2: [], includes: [], commonUse: ["Postcricoid cancer"], documentation: [] };
  codes["C13.1"] = { code: "C13.1", description: "Malignant neoplasm of hypopharyngeal aspect of aryepiglottic fold", category: "C13", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypopharynx cancer"], documentation: [] };
  codes["C13.2"] = { code: "C13.2", description: "Malignant neoplasm of posterior wall of hypopharynx", category: "C13", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypopharynx cancer"], documentation: [] };
  codes["C13.9"] = { code: "C13.9", description: "Malignant neoplasm of hypopharynx, unspecified", category: "C13", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypopharynx cancer NOS"], documentation: [] };
  codes["C14.0"] = { code: "C14.0", description: "Malignant neoplasm of pharynx, unspecified", category: "C14", excludes1: [], excludes2: [], includes: [], commonUse: ["Pharyngeal cancer NOS"], documentation: [] };
  codes["C14.2"] = { code: "C14.2", description: "Malignant neoplasm of Waldeyer ring", category: "C14", excludes1: [], excludes2: [], includes: [], commonUse: ["Waldeyer ring cancer"], documentation: [] };
  codes["C14.8"] = { code: "C14.8", description: "Malignant neoplasm of other sites of lip, oral cavity and pharynx", category: "C14", excludes1: [], excludes2: [], includes: [], commonUse: ["Oral cavity cancer"], documentation: [] };
  codes["C15.3"] = { code: "C15.3", description: "Malignant neoplasm of upper third of esophagus", category: "C15", excludes1: [], excludes2: [], includes: [], commonUse: ["Esophageal cancer - upper"], documentation: [] };
  codes["C15.4"] = { code: "C15.4", description: "Malignant neoplasm of middle third of esophagus", category: "C15", excludes1: [], excludes2: [], includes: [], commonUse: ["Esophageal cancer - middle"], documentation: [] };
  codes["C15.5"] = { code: "C15.5", description: "Malignant neoplasm of lower third of esophagus", category: "C15", excludes1: [], excludes2: [], includes: [], commonUse: ["Esophageal cancer - lower"], documentation: [] };
  codes["C15.9"] = { code: "C15.9", description: "Malignant neoplasm of esophagus, unspecified", category: "C15", excludes1: [], excludes2: [], includes: [], commonUse: ["Esophageal cancer NOS"], documentation: [] };
  codes["C16.0"] = { code: "C16.0", description: "Malignant neoplasm of cardia", category: "C16", excludes1: [], excludes2: [], includes: [], commonUse: ["Gastric cardia cancer"], documentation: [] };
  codes["C16.1"] = { code: "C16.1", description: "Malignant neoplasm of fundus of stomach", category: "C16", excludes1: [], excludes2: [], includes: [], commonUse: ["Gastric fundus cancer"], documentation: [] };
  codes["C16.2"] = { code: "C16.2", description: "Malignant neoplasm of body of stomach", category: "C16", excludes1: [], excludes2: [], includes: [], commonUse: ["Gastric body cancer"], documentation: [] };
  codes["C16.3"] = { code: "C16.3", description: "Malignant neoplasm of pyloric antrum", category: "C16", excludes1: [], excludes2: [], includes: [], commonUse: ["Gastric antrum cancer"], documentation: [] };
  codes["C16.4"] = { code: "C16.4", description: "Malignant neoplasm of pylorus", category: "C16", excludes1: [], excludes2: [], includes: [], commonUse: ["Gastric pylorus cancer"], documentation: [] };
  codes["C16.9"] = { code: "C16.9", description: "Malignant neoplasm of stomach, unspecified", category: "C16", excludes1: [], excludes2: [], includes: [], commonUse: ["Stomach cancer NOS","Gastric cancer"], documentation: [] };
  codes["C17.0"] = { code: "C17.0", description: "Malignant neoplasm of duodenum", category: "C17", excludes1: [], excludes2: [], includes: [], commonUse: ["Duodenal cancer"], documentation: [] };
  codes["C17.1"] = { code: "C17.1", description: "Malignant neoplasm of jejunum", category: "C17", excludes1: [], excludes2: [], includes: [], commonUse: ["Jejunal cancer"], documentation: [] };
  codes["C17.2"] = { code: "C17.2", description: "Malignant neoplasm of ileum", category: "C17", excludes1: [], excludes2: [], includes: [], commonUse: ["Ileal cancer"], documentation: [] };
  codes["C17.9"] = { code: "C17.9", description: "Malignant neoplasm of small intestine, unspecified", category: "C17", excludes1: [], excludes2: [], includes: [], commonUse: ["Small bowel cancer NOS"], documentation: [] };
  codes["C18.0"] = { code: "C18.0", description: "Malignant neoplasm of cecum", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Cecal cancer"], documentation: [] };
  codes["C18.1"] = { code: "C18.1", description: "Malignant neoplasm of appendix", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Appendiceal cancer"], documentation: [] };
  codes["C18.2"] = { code: "C18.2", description: "Malignant neoplasm of ascending colon", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Ascending colon cancer"], documentation: [] };
  codes["C18.3"] = { code: "C18.3", description: "Malignant neoplasm of hepatic flexure", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatic flexure cancer"], documentation: [] };
  codes["C18.4"] = { code: "C18.4", description: "Malignant neoplasm of transverse colon", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Transverse colon cancer"], documentation: [] };
  codes["C18.5"] = { code: "C18.5", description: "Malignant neoplasm of splenic flexure", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Splenic flexure cancer"], documentation: [] };
  codes["C18.6"] = { code: "C18.6", description: "Malignant neoplasm of descending colon", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Descending colon cancer"], documentation: [] };
  codes["C18.7"] = { code: "C18.7", description: "Malignant neoplasm of sigmoid colon", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Sigmoid colon cancer"], documentation: [] };
  codes["C18.9"] = { code: "C18.9", description: "Malignant neoplasm of colon, unspecified", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Colon cancer NOS","Colorectal cancer"], documentation: [] };
  codes["C19"] = { code: "C19", description: "Malignant neoplasm of rectosigmoid junction", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Rectosigmoid cancer"], documentation: [] };
  codes["C20"] = { code: "C20", description: "Malignant neoplasm of rectum", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Rectal cancer"], documentation: [] };
  codes["C21.0"] = { code: "C21.0", description: "Malignant neoplasm of anus, unspecified", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Anal cancer NOS"], documentation: [] };
  codes["C21.1"] = { code: "C21.1", description: "Malignant neoplasm of anal canal", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Anal canal cancer"], documentation: [] };
  codes["C21.2"] = { code: "C21.2", description: "Malignant neoplasm of cloacogenic zone", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Cloacogenic cancer"], documentation: [] };
  codes["C21.8"] = { code: "C21.8", description: "Malignant neoplasm of overlapping sites of rectum, anus and anal canal", category: "C18", excludes1: [], excludes2: [], includes: [], commonUse: ["Rectal/anal cancer"], documentation: [] };
  codes["C22.0"] = { code: "C22.0", description: "Malignant neoplasm of liver", category: "C22", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatocellular carcinoma","Liver cancer","HCC"], documentation: [] };
  codes["C22.1"] = { code: "C22.1", description: "Malignant neoplasm of intrahepatic bile duct", category: "C22", excludes1: [], excludes2: [], includes: [], commonUse: ["Cholangiocarcinoma"], documentation: [] };
  codes["C22.2"] = { code: "C22.2", description: "Hepatoblastoma", category: "C22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pediatric liver tumor"], documentation: [] };
  codes["C22.9"] = { code: "C22.9", description: "Malignant neoplasm of liver, unspecified", category: "C22", excludes1: [], excludes2: [], includes: [], commonUse: ["Liver cancer NOS"], documentation: [] };
  codes["C23"] = { code: "C23", description: "Malignant neoplasm of gallbladder", category: "C22", excludes1: [], excludes2: [], includes: [], commonUse: ["Gallbladder cancer"], documentation: [] };
  codes["C24.0"] = { code: "C24.0", description: "Malignant neoplasm of extrahepatic bile duct", category: "C22", excludes1: [], excludes2: [], includes: [], commonUse: ["Bile duct cancer"], documentation: [] };
  codes["C24.1"] = { code: "C24.1", description: "Malignant neoplasm of ampulla of Vater", category: "C22", excludes1: [], excludes2: [], includes: [], commonUse: ["Ampullary cancer"], documentation: [] };
  codes["C24.9"] = { code: "C24.9", description: "Malignant neoplasm of biliary tract, unspecified", category: "C22", excludes1: [], excludes2: [], includes: [], commonUse: ["Biliary cancer NOS"], documentation: [] };
  codes["C25.0"] = { code: "C25.0", description: "Malignant neoplasm of head of pancreas", category: "C25", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic head cancer"], documentation: [] };
  codes["C25.1"] = { code: "C25.1", description: "Malignant neoplasm of body of pancreas", category: "C25", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic body cancer"], documentation: [] };
  codes["C25.2"] = { code: "C25.2", description: "Malignant neoplasm of tail of pancreas", category: "C25", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic tail cancer"], documentation: [] };
  codes["C25.3"] = { code: "C25.3", description: "Malignant neoplasm of pancreatic duct", category: "C25", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic duct cancer"], documentation: [] };
  codes["C25.4"] = { code: "C25.4", description: "Malignant neoplasm of endocrine pancreas", category: "C25", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic islet cell tumor"], documentation: [] };
  codes["C25.9"] = { code: "C25.9", description: "Malignant neoplasm of pancreas, unspecified", category: "C25", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic cancer NOS"], documentation: [] };
  codes["C26.9"] = { code: "C26.9", description: "Malignant neoplasm of ill-defined sites within the digestive system", category: "C25", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive cancer NOS"], documentation: [] };
  codes["C30.0"] = { code: "C30.0", description: "Malignant neoplasm of nasal cavity", category: "C30", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasal cavity cancer"], documentation: [] };
  codes["C30.1"] = { code: "C30.1", description: "Malignant neoplasm of middle ear", category: "C30", excludes1: [], excludes2: [], includes: [], commonUse: ["Middle ear cancer"], documentation: [] };
  codes["C31.0"] = { code: "C31.0", description: "Malignant neoplasm of maxillary sinus", category: "C31", excludes1: [], excludes2: [], includes: [], commonUse: ["Maxillary sinus cancer"], documentation: [] };
  codes["C31.1"] = { code: "C31.1", description: "Malignant neoplasm of ethmoidal sinus", category: "C31", excludes1: [], excludes2: [], includes: [], commonUse: ["Ethmoid sinus cancer"], documentation: [] };
  codes["C31.9"] = { code: "C31.9", description: "Malignant neoplasm of sinus, unspecified", category: "C31", excludes1: [], excludes2: [], includes: [], commonUse: ["Sinus cancer NOS"], documentation: [] };
  codes["C32.0"] = { code: "C32.0", description: "Malignant neoplasm of glottis", category: "C32", excludes1: [], excludes2: [], includes: [], commonUse: ["Glottic cancer","Laryngeal cancer"], documentation: [] };
  codes["C32.1"] = { code: "C32.1", description: "Malignant neoplasm of supraglottis", category: "C32", excludes1: [], excludes2: [], includes: [], commonUse: ["Supraglottic cancer"], documentation: [] };
  codes["C32.9"] = { code: "C32.9", description: "Malignant neoplasm of larynx, unspecified", category: "C32", excludes1: [], excludes2: [], includes: [], commonUse: ["Laryngeal cancer NOS"], documentation: [] };
  codes["C33"] = { code: "C33", description: "Malignant neoplasm of trachea", category: "C32", excludes1: [], excludes2: [], includes: [], commonUse: ["Tracheal cancer"], documentation: [] };
  codes["C34.0"] = { code: "C34.0", description: "Malignant neoplasm of main bronchus", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Bronchial cancer"], documentation: [] };
  codes["C34.1"] = { code: "C34.1", description: "Malignant neoplasm of upper lobe, bronchus or lung", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper lobe lung cancer"], documentation: [] };
  codes["C34.2"] = { code: "C34.2", description: "Malignant neoplasm of middle lobe, bronchus or lung", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Middle lobe lung cancer"], documentation: [] };
  codes["C34.3"] = { code: "C34.3", description: "Malignant neoplasm of lower lobe, bronchus or lung", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower lobe lung cancer"], documentation: [] };
  codes["C34.8"] = { code: "C34.8", description: "Malignant neoplasm of overlapping sites of bronchus and lung", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Lung cancer"], documentation: [] };
  codes["C34.9"] = { code: "C34.9", description: "Malignant neoplasm of bronchus or lung, unspecified", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Lung cancer NOS","NSCLC","SCLC"], documentation: [] };
  codes["C37"] = { code: "C37", description: "Malignant neoplasm of thymus", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Thymic cancer"], documentation: [] };
  codes["C38.0"] = { code: "C38.0", description: "Malignant neoplasm of heart", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac tumor"], documentation: [] };
  codes["C38.1"] = { code: "C38.1", description: "Malignant neoplasm of anterior mediastinum", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Anterior mediastinal tumor"], documentation: [] };
  codes["C38.2"] = { code: "C38.2", description: "Malignant neoplasm of posterior mediastinum", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Posterior mediastinal tumor"], documentation: [] };
  codes["C38.3"] = { code: "C38.3", description: "Malignant neoplasm of mediastinum, unspecified", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Mediastinal cancer NOS"], documentation: [] };
  codes["C38.4"] = { code: "C38.4", description: "Malignant neoplasm of pleura", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Mesothelioma","Pleural cancer"], documentation: [] };
  codes["C38.8"] = { code: "C38.8", description: "Malignant neoplasm of overlapping sites of heart, mediastinum and pleura", category: "C34", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiothoracic cancer"], documentation: [] };
  codes["C40.0"] = { code: "C40.0", description: "Malignant neoplasm of scapula and long bones of upper limb", category: "C40", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb bone cancer"], documentation: [] };
  codes["C40.1"] = { code: "C40.1", description: "Malignant neoplasm of short bones of upper limb", category: "C40", excludes1: [], excludes2: [], includes: [], commonUse: ["Hand bone cancer"], documentation: [] };
  codes["C40.2"] = { code: "C40.2", description: "Malignant neoplasm of long bones of lower limb", category: "C40", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb bone cancer"], documentation: [] };
  codes["C40.3"] = { code: "C40.3", description: "Malignant neoplasm of short bones of lower limb", category: "C40", excludes1: [], excludes2: [], includes: [], commonUse: ["Foot bone cancer"], documentation: [] };
  codes["C40.9"] = { code: "C40.9", description: "Malignant neoplasm of bone and articular cartilage of limb, unspecified", category: "C40", excludes1: [], excludes2: [], includes: [], commonUse: ["Extremity bone cancer"], documentation: [] };
  codes["C41.0"] = { code: "C41.0", description: "Malignant neoplasm of bones of skull and face", category: "C41", excludes1: [], excludes2: [], includes: [], commonUse: ["Skull bone cancer"], documentation: [] };
  codes["C41.1"] = { code: "C41.1", description: "Malignant neoplasm of mandible", category: "C41", excludes1: [], excludes2: [], includes: [], commonUse: ["Jaw cancer"], documentation: [] };
  codes["C41.2"] = { code: "C41.2", description: "Malignant neoplasm of vertebral column", category: "C41", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal bone cancer"], documentation: [] };
  codes["C41.3"] = { code: "C41.3", description: "Malignant neoplasm of ribs, sternum and clavicle", category: "C41", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall bone cancer"], documentation: [] };
  codes["C41.4"] = { code: "C41.4", description: "Malignant neoplasm of pelvic bones, sacrum and coccyx", category: "C41", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic bone cancer"], documentation: [] };
  codes["C41.9"] = { code: "C41.9", description: "Malignant neoplasm of bone and articular cartilage, unspecified", category: "C41", excludes1: [], excludes2: [], includes: [], commonUse: ["Bone cancer NOS"], documentation: [] };
  codes["C43.0"] = { code: "C43.0", description: "Malignant melanoma of lip", category: "C43", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip melanoma"], documentation: [] };
  codes["C43.1"] = { code: "C43.1", description: "Malignant melanoma of eyelid", category: "C43", excludes1: [], excludes2: [], includes: [], commonUse: ["Eyelid melanoma"], documentation: [] };
  codes["C43.2"] = { code: "C43.2", description: "Malignant melanoma of ear", category: "C43", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear melanoma"], documentation: [] };
  codes["C43.3"] = { code: "C43.3", description: "Malignant melanoma of other parts of face", category: "C43", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial melanoma"], documentation: [] };
  codes["C43.4"] = { code: "C43.4", description: "Malignant melanoma of scalp and neck", category: "C43", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp melanoma"], documentation: [] };
  codes["C43.5"] = { code: "C43.5", description: "Malignant melanoma of trunk", category: "C43", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk melanoma"], documentation: [] };
  codes["C43.6"] = { code: "C43.6", description: "Malignant melanoma of upper limb, including shoulder", category: "C43", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb melanoma"], documentation: [] };
  codes["C43.7"] = { code: "C43.7", description: "Malignant melanoma of lower limb, including hip", category: "C43", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb melanoma"], documentation: [] };
  codes["C43.9"] = { code: "C43.9", description: "Malignant melanoma of skin, unspecified", category: "C43", excludes1: [], excludes2: [], includes: [], commonUse: ["Melanoma NOS"], documentation: [] };
  codes["C44.0"] = { code: "C44.0", description: "Other and unspecified malignant neoplasm of skin of lip", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip skin cancer"], documentation: [] };
  codes["C44.1"] = { code: "C44.1", description: "Other and unspecified malignant neoplasm of eyelid", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Eyelid skin cancer"], documentation: [] };
  codes["C44.2"] = { code: "C44.2", description: "Other and unspecified malignant neoplasm of ear", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear skin cancer"], documentation: [] };
  codes["C44.3"] = { code: "C44.3", description: "Other and unspecified malignant neoplasm of skin of face", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial skin cancer"], documentation: [] };
  codes["C44.4"] = { code: "C44.4", description: "Other and unspecified malignant neoplasm of scalp and neck", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp skin cancer"], documentation: [] };
  codes["C44.5"] = { code: "C44.5", description: "Other and unspecified malignant neoplasm of skin of trunk", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk skin cancer"], documentation: [] };
  codes["C44.6"] = { code: "C44.6", description: "Other and unspecified malignant neoplasm of skin of upper limb", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb skin cancer"], documentation: [] };
  codes["C44.7"] = { code: "C44.7", description: "Other and unspecified malignant neoplasm of skin of lower limb", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb skin cancer"], documentation: [] };
  codes["C44.9"] = { code: "C44.9", description: "Other and unspecified malignant neoplasm of skin, unspecified", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Skin cancer NOS","BCC","SCC"], documentation: [] };
  codes["C45.0"] = { code: "C45.0", description: "Mesothelioma of pleura", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Pleural mesothelioma"], documentation: [] };
  codes["C45.1"] = { code: "C45.1", description: "Mesothelioma of peritoneum", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Peritoneal mesothelioma"], documentation: [] };
  codes["C45.9"] = { code: "C45.9", description: "Mesothelioma, unspecified", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Mesothelioma NOS"], documentation: [] };
  codes["C46.0"] = { code: "C46.0", description: "Kaposi sarcoma of skin", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Kaposi sarcoma - skin"], documentation: [] };
  codes["C46.1"] = { code: "C46.1", description: "Kaposi sarcoma of soft tissue", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Kaposi sarcoma - soft tissue"], documentation: [] };
  codes["C46.3"] = { code: "C46.3", description: "Kaposi sarcoma of lymph nodes", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Kaposi sarcoma - lymph nodes"], documentation: [] };
  codes["C46.9"] = { code: "C46.9", description: "Kaposi sarcoma, unspecified", category: "C44", excludes1: [], excludes2: [], includes: [], commonUse: ["Kaposi sarcoma NOS"], documentation: [] };
  codes["C47.0"] = { code: "C47.0", description: "Malignant neoplasm of peripheral nerves of head, face and neck", category: "C47", excludes1: [], excludes2: [], includes: [], commonUse: ["Head nerve tumor"], documentation: [] };
  codes["C47.1"] = { code: "C47.1", description: "Malignant neoplasm of peripheral nerves of upper limb", category: "C47", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb nerve tumor"], documentation: [] };
  codes["C47.2"] = { code: "C47.2", description: "Malignant neoplasm of peripheral nerves of lower limb", category: "C47", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb nerve tumor"], documentation: [] };
  codes["C47.9"] = { code: "C47.9", description: "Malignant neoplasm of peripheral nerves, unspecified", category: "C47", excludes1: [], excludes2: [], includes: [], commonUse: ["Nerve cancer NOS"], documentation: [] };
  codes["C48.0"] = { code: "C48.0", description: "Malignant neoplasm of retroperitoneum", category: "C47", excludes1: [], excludes2: [], includes: [], commonUse: ["Retroperitoneal cancer"], documentation: [] };
  codes["C48.1"] = { code: "C48.1", description: "Malignant neoplasm of specified parts of peritoneum", category: "C47", excludes1: [], excludes2: [], includes: [], commonUse: ["Peritoneal cancer"], documentation: [] };
  codes["C48.2"] = { code: "C48.2", description: "Malignant neoplasm of peritoneum, unspecified", category: "C47", excludes1: [], excludes2: [], includes: [], commonUse: ["Peritoneal cancer NOS"], documentation: [] };
  codes["C49.0"] = { code: "C49.0", description: "Malignant neoplasm of connective tissue of head, face and neck", category: "C49", excludes1: [], excludes2: [], includes: [], commonUse: ["Head soft tissue sarcoma"], documentation: [] };
  codes["C49.1"] = { code: "C49.1", description: "Malignant neoplasm of connective tissue of upper limb", category: "C49", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb soft tissue sarcoma"], documentation: [] };
  codes["C49.2"] = { code: "C49.2", description: "Malignant neoplasm of connective tissue of lower limb", category: "C49", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb soft tissue sarcoma"], documentation: [] };
  codes["C49.3"] = { code: "C49.3", description: "Malignant neoplasm of connective tissue of thorax", category: "C49", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic soft tissue sarcoma"], documentation: [] };
  codes["C49.4"] = { code: "C49.4", description: "Malignant neoplasm of connective tissue of abdomen", category: "C49", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal soft tissue sarcoma"], documentation: [] };
  codes["C49.5"] = { code: "C49.5", description: "Malignant neoplasm of connective tissue of pelvis", category: "C49", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic soft tissue sarcoma"], documentation: [] };
  codes["C49.9"] = { code: "C49.9", description: "Malignant neoplasm of connective tissue, unspecified", category: "C49", excludes1: [], excludes2: [], includes: [], commonUse: ["Soft tissue sarcoma NOS"], documentation: [] };
  codes["C50.0"] = { code: "C50.0", description: "Malignant neoplasm of nipple and areola of female breast", category: "C50", excludes1: [], excludes2: [], includes: [], commonUse: ["Nipple cancer"], documentation: [] };
  codes["C50.1"] = { code: "C50.1", description: "Malignant neoplasm of central portion of female breast", category: "C50", excludes1: [], excludes2: [], includes: [], commonUse: ["Central breast cancer"], documentation: [] };
  codes["C50.2"] = { code: "C50.2", description: "Malignant neoplasm of upper-inner quadrant of female breast", category: "C50", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper inner quadrant breast cancer"], documentation: [] };
  codes["C50.3"] = { code: "C50.3", description: "Malignant neoplasm of lower-inner quadrant of female breast", category: "C50", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower inner quadrant breast cancer"], documentation: [] };
  codes["C50.4"] = { code: "C50.4", description: "Malignant neoplasm of upper-outer quadrant of female breast", category: "C50", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper outer quadrant breast cancer"], documentation: [] };
  codes["C50.5"] = { code: "C50.5", description: "Malignant neoplasm of lower-outer quadrant of female breast", category: "C50", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower outer quadrant breast cancer"], documentation: [] };
  codes["C50.6"] = { code: "C50.6", description: "Malignant neoplasm of axillary tail of female breast", category: "C50", excludes1: [], excludes2: [], includes: [], commonUse: ["Axillary tail breast cancer"], documentation: [] };
  codes["C50.8"] = { code: "C50.8", description: "Malignant neoplasm of overlapping sites of female breast", category: "C50", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast cancer"], documentation: [] };
  codes["C50.9"] = { code: "C50.9", description: "Malignant neoplasm of breast, unspecified", category: "C50", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast cancer NOS","Invasive breast cancer"], documentation: [] };
  codes["C51.0"] = { code: "C51.0", description: "Malignant neoplasm of labium majus", category: "C51", excludes1: [], excludes2: [], includes: [], commonUse: ["Labial cancer"], documentation: [] };
  codes["C51.1"] = { code: "C51.1", description: "Malignant neoplasm of labium minus", category: "C51", excludes1: [], excludes2: [], includes: [], commonUse: ["Labial cancer"], documentation: [] };
  codes["C51.9"] = { code: "C51.9", description: "Malignant neoplasm of vulva, unspecified", category: "C51", excludes1: [], excludes2: [], includes: [], commonUse: ["Vulvar cancer NOS"], documentation: [] };
  codes["C52.9"] = { code: "C52.9", description: "Malignant neoplasm of vagina, unspecified", category: "C52", excludes1: [], excludes2: [], includes: [], commonUse: ["Vaginal cancer"], documentation: [] };
  codes["C53.0"] = { code: "C53.0", description: "Malignant neoplasm of endocervix", category: "C53", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocervical cancer"], documentation: [] };
  codes["C53.1"] = { code: "C53.1", description: "Malignant neoplasm of exocervix", category: "C53", excludes1: [], excludes2: [], includes: [], commonUse: ["Exocervical cancer"], documentation: [] };
  codes["C53.9"] = { code: "C53.9", description: "Malignant neoplasm of cervix uteri, unspecified", category: "C53", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical cancer NOS"], documentation: [] };
  codes["C54.1"] = { code: "C54.1", description: "Malignant neoplasm of endometrium", category: "C54", excludes1: [], excludes2: [], includes: [], commonUse: ["Endometrial cancer","Uterine cancer"], documentation: [] };
  codes["C54.9"] = { code: "C54.9", description: "Malignant neoplasm of corpus uteri, unspecified", category: "C54", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine corpus cancer NOS"], documentation: [] };
  codes["C55"] = { code: "C55", description: "Malignant neoplasm of uterus, unspecified", category: "C54", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine cancer NOS"], documentation: [] };
  codes["C56.9"] = { code: "C56.9", description: "Malignant neoplasm of ovary, unspecified", category: "C56", excludes1: [], excludes2: [], includes: [], commonUse: ["Ovarian cancer NOS"], documentation: [] };
  codes["C57.0"] = { code: "C57.0", description: "Malignant neoplasm of fallopian tube", category: "C56", excludes1: [], excludes2: [], includes: [], commonUse: ["Fallopian tube cancer"], documentation: [] };
  codes["C57.9"] = { code: "C57.9", description: "Malignant neoplasm of female genital tract, unspecified", category: "C56", excludes1: [], excludes2: [], includes: [], commonUse: ["Female genital cancer NOS"], documentation: [] };
  codes["C58"] = { code: "C58", description: "Malignant neoplasm of placenta", category: "C56", excludes1: [], excludes2: [], includes: [], commonUse: ["Choriocarcinoma"], documentation: [] };
  codes["C60.0"] = { code: "C60.0", description: "Malignant neoplasm of prepuce", category: "C60", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile cancer - prepuce"], documentation: [] };
  codes["C60.1"] = { code: "C60.1", description: "Malignant neoplasm of glans penis", category: "C60", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile cancer - glans"], documentation: [] };
  codes["C60.2"] = { code: "C60.2", description: "Malignant neoplasm of body of penis", category: "C60", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile cancer - body"], documentation: [] };
  codes["C60.9"] = { code: "C60.9", description: "Malignant neoplasm of penis, unspecified", category: "C60", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile cancer NOS"], documentation: [] };
  codes["C61"] = { code: "C61", description: "Malignant neoplasm of prostate", category: "C61", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostate cancer","Prostatic adenocarcinoma"], documentation: [] };
  codes["C62.0"] = { code: "C62.0", description: "Malignant neoplasm of undescended testis", category: "C62", excludes1: [], excludes2: [], includes: [], commonUse: ["Cryptorchidism-related testicular cancer"], documentation: [] };
  codes["C62.1"] = { code: "C62.1", description: "Malignant neoplasm of other and unspecified testis", category: "C62", excludes1: [], excludes2: [], includes: [], commonUse: ["Testicular cancer"], documentation: [] };
  codes["C62.9"] = { code: "C62.9", description: "Malignant neoplasm of testis, unspecified", category: "C62", excludes1: [], excludes2: [], includes: [], commonUse: ["Testicular cancer NOS"], documentation: [] };
  codes["C63.9"] = { code: "C63.9", description: "Malignant neoplasm of male genital organs, unspecified", category: "C62", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital cancer NOS"], documentation: [] };
  codes["C64.1"] = { code: "C64.1", description: "Malignant neoplasm of right kidney, except renal pelvis", category: "C64", excludes1: [], excludes2: [], includes: [], commonUse: ["Right kidney cancer"], documentation: [] };
  codes["C64.2"] = { code: "C64.2", description: "Malignant neoplasm of left kidney, except renal pelvis", category: "C64", excludes1: [], excludes2: [], includes: [], commonUse: ["Left kidney cancer"], documentation: [] };
  codes["C64.9"] = { code: "C64.9", description: "Malignant neoplasm of kidney, except renal pelvis, unspecified", category: "C64", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal cell carcinoma","Kidney cancer NOS","RCC"], documentation: [] };
  codes["C65.9"] = { code: "C65.9", description: "Malignant neoplasm of renal pelvis, unspecified", category: "C65", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal pelvis cancer NOS"], documentation: [] };
  codes["C66.9"] = { code: "C66.9", description: "Malignant neoplasm of ureter, unspecified", category: "C66", excludes1: [], excludes2: [], includes: [], commonUse: ["Ureter cancer NOS"], documentation: [] };
  codes["C67.0"] = { code: "C67.0", description: "Malignant neoplasm of trigone of bladder", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder trigone cancer"], documentation: [] };
  codes["C67.1"] = { code: "C67.1", description: "Malignant neoplasm of dome of bladder", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder dome cancer"], documentation: [] };
  codes["C67.2"] = { code: "C67.2", description: "Malignant neoplasm of lateral wall of bladder", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder lateral wall cancer"], documentation: [] };
  codes["C67.3"] = { code: "C67.3", description: "Malignant neoplasm of anterior wall of bladder", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder anterior wall cancer"], documentation: [] };
  codes["C67.4"] = { code: "C67.4", description: "Malignant neoplasm of bladder neck", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder neck cancer"], documentation: [] };
  codes["C67.5"] = { code: "C67.5", description: "Malignant neoplasm of ureteric orifice", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Ureteric orifice cancer"], documentation: [] };
  codes["C67.6"] = { code: "C67.6", description: "Malignant neoplasm of urachus", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Urachal cancer"], documentation: [] };
  codes["C67.7"] = { code: "C67.7", description: "Malignant neoplasm of posterior wall of bladder", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder posterior wall cancer"], documentation: [] };
  codes["C67.8"] = { code: "C67.8", description: "Malignant neoplasm of overlapping sites of bladder", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder cancer"], documentation: [] };
  codes["C67.9"] = { code: "C67.9", description: "Malignant neoplasm of bladder, unspecified", category: "C67", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder cancer NOS"], documentation: [] };
  codes["C68.0"] = { code: "C68.0", description: "Malignant neoplasm of urethra", category: "C68", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral cancer"], documentation: [] };
  codes["C68.1"] = { code: "C68.1", description: "Malignant neoplasm of paraurethral glands", category: "C68", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraurethral gland cancer"], documentation: [] };
  codes["C68.9"] = { code: "C68.9", description: "Malignant neoplasm of urinary organs, unspecified", category: "C68", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary cancer NOS"], documentation: [] };
  codes["C69.0"] = { code: "C69.0", description: "Malignant neoplasm of conjunctiva", category: "C69", excludes1: [], excludes2: [], includes: [], commonUse: ["Conjunctival cancer"], documentation: [] };
  codes["C69.1"] = { code: "C69.1", description: "Malignant neoplasm of cornea", category: "C69", excludes1: [], excludes2: [], includes: [], commonUse: ["Corneal cancer"], documentation: [] };
  codes["C69.2"] = { code: "C69.2", description: "Malignant neoplasm of retina", category: "C69", excludes1: [], excludes2: [], includes: [], commonUse: ["Retinal cancer","Retinoblastoma"], documentation: [] };
  codes["C69.3"] = { code: "C69.3", description: "Malignant neoplasm of choroid", category: "C69", excludes1: [], excludes2: [], includes: [], commonUse: ["Choroidal cancer"], documentation: [] };
  codes["C69.4"] = { code: "C69.4", description: "Malignant neoplasm of ciliary body", category: "C69", excludes1: [], excludes2: [], includes: [], commonUse: ["Ciliary body cancer"], documentation: [] };
  codes["C69.5"] = { code: "C69.5", description: "Malignant neoplasm of lacrimal gland and duct", category: "C69", excludes1: [], excludes2: [], includes: [], commonUse: ["Lacrimal gland cancer"], documentation: [] };
  codes["C69.6"] = { code: "C69.6", description: "Malignant neoplasm of orbit", category: "C69", excludes1: [], excludes2: [], includes: [], commonUse: ["Orbital cancer"], documentation: [] };
  codes["C69.9"] = { code: "C69.9", description: "Malignant neoplasm of eye, unspecified", category: "C69", excludes1: [], excludes2: [], includes: [], commonUse: ["Eye cancer NOS"], documentation: [] };
  codes["C71.0"] = { code: "C71.0", description: "Malignant neoplasm of cerebrum, except lobes and ventricles", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebral cancer"], documentation: [] };
  codes["C71.1"] = { code: "C71.1", description: "Malignant neoplasm of frontal lobe", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Frontal lobe brain cancer"], documentation: [] };
  codes["C71.2"] = { code: "C71.2", description: "Malignant neoplasm of temporal lobe", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Temporal lobe brain cancer"], documentation: [] };
  codes["C71.3"] = { code: "C71.3", description: "Malignant neoplasm of parietal lobe", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Parietal lobe brain cancer"], documentation: [] };
  codes["C71.4"] = { code: "C71.4", description: "Malignant neoplasm of occipital lobe", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Occipital lobe brain cancer"], documentation: [] };
  codes["C71.5"] = { code: "C71.5", description: "Malignant neoplasm of brain ventricle", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain ventricle cancer"], documentation: [] };
  codes["C71.6"] = { code: "C71.6", description: "Malignant neoplasm of cerebellum", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebellar cancer"], documentation: [] };
  codes["C71.7"] = { code: "C71.7", description: "Malignant neoplasm of brain stem", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain stem cancer"], documentation: [] };
  codes["C71.8"] = { code: "C71.8", description: "Malignant neoplasm of overlapping sites of brain", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain cancer"], documentation: [] };
  codes["C71.9"] = { code: "C71.9", description: "Malignant neoplasm of brain, unspecified", category: "C71", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain cancer NOS","Glioblastoma"], documentation: [] };
  codes["C73"] = { code: "C73", description: "Malignant neoplasm of thyroid gland", category: "C73", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid cancer"], documentation: [] };
  codes["C74.0"] = { code: "C74.0", description: "Malignant neoplasm of cortex of adrenal gland", category: "C74", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenal cortical cancer"], documentation: [] };
  codes["C74.1"] = { code: "C74.1", description: "Malignant neoplasm of medulla of adrenal gland", category: "C74", excludes1: [], excludes2: [], includes: [], commonUse: ["Pheochromocytoma"], documentation: [] };
  codes["C74.9"] = { code: "C74.9", description: "Malignant neoplasm of adrenal gland, unspecified", category: "C74", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenal cancer NOS"], documentation: [] };
  codes["C75.0"] = { code: "C75.0", description: "Malignant neoplasm of parathyroid gland", category: "C75", excludes1: [], excludes2: [], includes: [], commonUse: ["Parathyroid cancer"], documentation: [] };
  codes["C75.1"] = { code: "C75.1", description: "Malignant neoplasm of pituitary gland", category: "C75", excludes1: [], excludes2: [], includes: [], commonUse: ["Pituitary cancer"], documentation: [] };
  codes["C75.2"] = { code: "C75.2", description: "Malignant neoplasm of pineal gland", category: "C75", excludes1: [], excludes2: [], includes: [], commonUse: ["Pineal tumor"], documentation: [] };
  codes["C75.3"] = { code: "C75.3", description: "Malignant neoplasm of carotid body", category: "C75", excludes1: [], excludes2: [], includes: [], commonUse: ["Carotid body tumor"], documentation: [] };
  codes["C75.4"] = { code: "C75.4", description: "Malignant neoplasm of aortic body and other paraganglia", category: "C75", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraganglion tumor"], documentation: [] };
  codes["C75.5"] = { code: "C75.5", description: "Malignant neoplasm of unspecified endocrine gland", category: "C75", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocrine cancer NOS"], documentation: [] };
  codes["C76.0"] = { code: "C76.0", description: "Malignant neoplasm of head, face and neck", category: "C76", excludes1: [], excludes2: [], includes: [], commonUse: ["Head/face cancer NOS"], documentation: [] };
  codes["C76.1"] = { code: "C76.1", description: "Malignant neoplasm of thorax", category: "C76", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic cancer NOS"], documentation: [] };
  codes["C76.2"] = { code: "C76.2", description: "Malignant neoplasm of abdomen", category: "C76", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal cancer NOS"], documentation: [] };
  codes["C76.3"] = { code: "C76.3", description: "Malignant neoplasm of pelvis", category: "C76", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic cancer NOS"], documentation: [] };
  codes["C76.4"] = { code: "C76.4", description: "Malignant neoplasm of upper limb", category: "C76", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb cancer NOS"], documentation: [] };
  codes["C76.5"] = { code: "C76.5", description: "Malignant neoplasm of lower limb", category: "C76", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb cancer NOS"], documentation: [] };
  codes["C76.8"] = { code: "C76.8", description: "Malignant neoplasm of overlapping sites of other and ill-defined sites", category: "C76", excludes1: [], excludes2: [], includes: [], commonUse: ["Ill-defined cancer"], documentation: [] };
  codes["C76.9"] = { code: "C76.9", description: "Malignant neoplasm of ill-defined site, unspecified", category: "C76", excludes1: [], excludes2: [], includes: [], commonUse: ["Cancer NOS"], documentation: [] };
  codes["C77.0"] = { code: "C77.0", description: "Secondary and unspecified malignant neoplasm of lymph nodes of head, face and neck", category: "C77", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical lymph node metastasis"], documentation: [] };
  codes["C77.1"] = { code: "C77.1", description: "Secondary and unspecified malignant neoplasm of intrathoracic lymph nodes", category: "C77", excludes1: [], excludes2: [], includes: [], commonUse: ["Mediastinal lymph node metastasis"], documentation: [] };
  codes["C77.2"] = { code: "C77.2", description: "Secondary and unspecified malignant neoplasm of intra-abdominal lymph nodes", category: "C77", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal lymph node metastasis"], documentation: [] };
  codes["C77.3"] = { code: "C77.3", description: "Secondary and unspecified malignant neoplasm of axillary and upper limb lymph nodes", category: "C77", excludes1: [], excludes2: [], includes: [], commonUse: ["Axillary lymph node metastasis"], documentation: [] };
  codes["C77.4"] = { code: "C77.4", description: "Secondary and unspecified malignant neoplasm of inguinal and lower limb lymph nodes", category: "C77", excludes1: [], excludes2: [], includes: [], commonUse: ["Inguinal lymph node metastasis"], documentation: [] };
  codes["C77.5"] = { code: "C77.5", description: "Secondary and unspecified malignant neoplasm of intrapelvic lymph nodes", category: "C77", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic lymph node metastasis"], documentation: [] };
  codes["C77.8"] = { code: "C77.8", description: "Secondary and unspecified malignant neoplasm of multiple lymph nodes", category: "C77", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymph node metastasis"], documentation: [] };
  codes["C77.9"] = { code: "C77.9", description: "Secondary and unspecified malignant neoplasm of lymph node, unspecified", category: "C77", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymph node metastasis NOS"], documentation: [] };
  codes["C78.0"] = { code: "C78.0", description: "Secondary malignant neoplasm of lung", category: "C78", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary metastasis"], documentation: [] };
  codes["C78.1"] = { code: "C78.1", description: "Secondary malignant neoplasm of mediastinum", category: "C78", excludes1: [], excludes2: [], includes: [], commonUse: ["Mediastinal metastasis"], documentation: [] };
  codes["C78.2"] = { code: "C78.2", description: "Secondary malignant neoplasm of pleura", category: "C78", excludes1: [], excludes2: [], includes: [], commonUse: ["Pleural metastasis"], documentation: [] };
  codes["C78.3"] = { code: "C78.3", description: "Secondary malignant neoplasm of other respiratory organs", category: "C78", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory metastasis"], documentation: [] };
  codes["C78.4"] = { code: "C78.4", description: "Secondary malignant neoplasm of small intestine", category: "C78", excludes1: [], excludes2: [], includes: [], commonUse: ["Small bowel metastasis"], documentation: [] };
  codes["C78.5"] = { code: "C78.5", description: "Secondary malignant neoplasm of large intestine and rectum", category: "C78", excludes1: [], excludes2: [], includes: [], commonUse: ["Colorectal metastasis"], documentation: [] };
  codes["C78.6"] = { code: "C78.6", description: "Secondary malignant neoplasm of retroperitoneum and peritoneum", category: "C78", excludes1: [], excludes2: [], includes: [], commonUse: ["Peritoneal metastasis"], documentation: [] };
  codes["C78.7"] = { code: "C78.7", description: "Secondary malignant neoplasm of liver", category: "C78", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatic metastasis","Liver metastasis"], documentation: [] };
  codes["C78.8"] = { code: "C78.8", description: "Secondary malignant neoplasm of other digestive organs", category: "C78", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive metastasis"], documentation: [] };
  codes["C79.0"] = { code: "C79.0", description: "Secondary malignant neoplasm of kidney", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal metastasis"], documentation: [] };
  codes["C79.1"] = { code: "C79.1", description: "Secondary malignant neoplasm of bladder and other urinary organs", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary metastasis"], documentation: [] };
  codes["C79.2"] = { code: "C79.2", description: "Secondary malignant neoplasm of skin", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Cutaneous metastasis"], documentation: [] };
  codes["C79.3"] = { code: "C79.3", description: "Secondary malignant neoplasm of brain and spinal cord", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain metastasis"], documentation: [] };
  codes["C79.4"] = { code: "C79.4", description: "Secondary malignant neoplasm of other parts of nervous system", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["CNS metastasis"], documentation: [] };
  codes["C79.5"] = { code: "C79.5", description: "Secondary malignant neoplasm of bone and bone marrow", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Bone metastasis"], documentation: [] };
  codes["C79.6"] = { code: "C79.6", description: "Secondary malignant neoplasm of ovary", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Ovarian metastasis"], documentation: [] };
  codes["C79.7"] = { code: "C79.7", description: "Secondary malignant neoplasm of adrenal gland", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenal metastasis"], documentation: [] };
  codes["C79.8"] = { code: "C79.8", description: "Secondary malignant neoplasm of other specified sites", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Metastatic cancer NOS"], documentation: [] };
  codes["C79.9"] = { code: "C79.9", description: "Secondary malignant neoplasm, unspecified site", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Metastatic cancer NOS"], documentation: [] };
  codes["C80.1"] = { code: "C80.1", description: "Malignant (primary) neoplasm, unspecified", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Cancer of unknown primary","CUP"], documentation: [] };
  codes["C80.2"] = { code: "C80.2", description: "Malignant neoplasm of uncertain behavior", category: "C79", excludes1: [], excludes2: [], includes: [], commonUse: ["Cancer of uncertain behavior"], documentation: [] };
  codes["C81.0"] = { code: "C81.0", description: "Nodular lymphocyte predominant Hodgkin lymphoma", category: "C81", excludes1: [], excludes2: [], includes: [], commonUse: ["NLPHL"], documentation: [] };
  codes["C81.1"] = { code: "C81.1", description: "Hodgkin lymphoma, lymphocyte-rich", category: "C81", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymphocyte-rich HL"], documentation: [] };
  codes["C81.2"] = { code: "C81.2", description: "Hodgkin lymphoma, mixed cellularity", category: "C81", excludes1: [], excludes2: [], includes: [], commonUse: ["Mixed cellularity HL"], documentation: [] };
  codes["C81.3"] = { code: "C81.3", description: "Hodgkin lymphoma, lymphocyte depletion", category: "C81", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymphocyte-depleted HL"], documentation: [] };
  codes["C81.4"] = { code: "C81.4", description: "Hodgkin lymphoma, nodular sclerosis", category: "C81", excludes1: [], excludes2: [], includes: [], commonUse: ["Nodular sclerosis HL"], documentation: [] };
  codes["C81.9"] = { code: "C81.9", description: "Hodgkin lymphoma, unspecified", category: "C81", excludes1: [], excludes2: [], includes: [], commonUse: ["Hodgkin lymphoma NOS"], documentation: [] };
  codes["C82.0"] = { code: "C82.0", description: "Follicular lymphoma, grade 1", category: "C82", excludes1: [], excludes2: [], includes: [], commonUse: ["Low-grade follicular lymphoma"], documentation: [] };
  codes["C82.1"] = { code: "C82.1", description: "Follicular lymphoma, grade 2", category: "C82", excludes1: [], excludes2: [], includes: [], commonUse: ["Follicular lymphoma grade 2"], documentation: [] };
  codes["C82.2"] = { code: "C82.2", description: "Follicular lymphoma, grade 3a", category: "C82", excludes1: [], excludes2: [], includes: [], commonUse: ["Follicular lymphoma grade 3a"], documentation: [] };
  codes["C82.6"] = { code: "C82.6", description: "Follicular lymphoma, grade 3b", category: "C82", excludes1: [], excludes2: [], includes: [], commonUse: ["Follicular lymphoma grade 3b"], documentation: [] };
  codes["C82.9"] = { code: "C82.9", description: "Follicular lymphoma, unspecified", category: "C82", excludes1: [], excludes2: [], includes: [], commonUse: ["Follicular lymphoma NOS"], documentation: [] };
  codes["C83.0"] = { code: "C83.0", description: "Small lymphocytic lymphoma", category: "C83", excludes1: [], excludes2: [], includes: [], commonUse: ["SLL"], documentation: [] };
  codes["C83.1"] = { code: "C83.1", description: "Mantle cell lymphoma", category: "C83", excludes1: [], excludes2: [], includes: [], commonUse: ["MCL"], documentation: [] };
  codes["C83.2"] = { code: "C83.2", description: "Marginal zone lymphoma, MALT type", category: "C83", excludes1: [], excludes2: [], includes: [], commonUse: ["MALT lymphoma"], documentation: [] };
  codes["C83.3"] = { code: "C83.3", description: "Diffuse large B-cell lymphoma", category: "C83", excludes1: [], excludes2: [], includes: [], commonUse: ["DLBCL"], documentation: [] };
  codes["C83.4"] = { code: "C83.4", description: "Immunoblastic lymphoma", category: "C83", excludes1: [], excludes2: [], includes: [], commonUse: ["Immunoblastic lymphoma"], documentation: [] };
  codes["C83.5"] = { code: "C83.5", description: "Lymphoblastic (diffuse) lymphoma", category: "C83", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymphoblastic lymphoma"], documentation: [] };
  codes["C83.7"] = { code: "C83.7", description: "Burkitt lymphoma", category: "C83", excludes1: [], excludes2: [], includes: [], commonUse: ["Burkitt lymphoma"], documentation: [] };
  codes["C83.8"] = { code: "C83.8", description: "Other non-follicular lymphoma", category: "C83", excludes1: [], excludes2: [], includes: [], commonUse: ["Non-follicular lymphoma"], documentation: [] };
  codes["C83.9"] = { code: "C83.9", description: "Non-follicular lymphoma, unspecified", category: "C83", excludes1: [], excludes2: [], includes: [], commonUse: ["NHL NOS"], documentation: [] };
  codes["C84.0"] = { code: "C84.0", description: "Mycosis fungoides", category: "C84", excludes1: [], excludes2: [], includes: [], commonUse: ["Mycosis fungoides","Cutaneous T-cell lymphoma"], documentation: [] };
  codes["C84.1"] = { code: "C84.1", description: "Sezary disease", category: "C84", excludes1: [], excludes2: [], includes: [], commonUse: ["Sezary syndrome"], documentation: [] };
  codes["C84.4"] = { code: "C84.4", description: "Peripheral T-cell lymphoma, not elsewhere classified", category: "C84", excludes1: [], excludes2: [], includes: [], commonUse: ["PTCL"], documentation: [] };
  codes["C84.6"] = { code: "C84.6", description: "Anaplastic large cell lymphoma", category: "C84", excludes1: [], excludes2: [], includes: [], commonUse: ["ALCL"], documentation: [] };
  codes["C84.7"] = { code: "C84.7", description: "Anaplastic large cell lymphoma, ALK-positive", category: "C84", excludes1: [], excludes2: [], includes: [], commonUse: ["ALK-positive ALCL"], documentation: [] };
  codes["C84.9"] = { code: "C84.9", description: "Mature T/NK-cell lymphoma, unspecified", category: "C84", excludes1: [], excludes2: [], includes: [], commonUse: ["T/NK-cell lymphoma NOS"], documentation: [] };
  codes["C85.0"] = { code: "C85.0", description: "Lymphosarcoma", category: "C85", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymphosarcoma"], documentation: [] };
  codes["C85.1"] = { code: "C85.1", description: "B-cell lymphoma, unspecified", category: "C85", excludes1: [], excludes2: [], includes: [], commonUse: ["B-cell lymphoma NOS"], documentation: [] };
  codes["C85.2"] = { code: "C85.2", description: "Mediastinal (thymic) large B-cell lymphoma", category: "C85", excludes1: [], excludes2: [], includes: [], commonUse: ["Mediastinal B-cell lymphoma"], documentation: [] };
  codes["C85.9"] = { code: "C85.9", description: "Non-Hodgkin lymphoma, unspecified", category: "C85", excludes1: [], excludes2: [], includes: [], commonUse: ["NHL NOS"], documentation: [] };
  codes["C88.0"] = { code: "C88.0", description: "Waldenstrom macroglobulinemia", category: "C88", excludes1: [], excludes2: [], includes: [], commonUse: ["WM","IgM lymphoplasmacytic lymphoma"], documentation: [] };
  codes["C88.2"] = { code: "C88.2", description: "Heavy chain disease", category: "C88", excludes1: [], excludes2: [], includes: [], commonUse: ["Heavy chain disease"], documentation: [] };
  codes["C88.4"] = { code: "C88.4", description: "Extranodal marginal zone lymphoma of MALT type", category: "C84", excludes1: [], excludes2: [], includes: [], commonUse: ["MALT lymphoma"], documentation: [] };
  codes["C88.9"] = { code: "C88.9", description: "Malignant immunoproliferative disease, unspecified", category: "C88", excludes1: [], excludes2: [], includes: [], commonUse: ["Immunoproliferative disease NOS"], documentation: [] };
  codes["C90.0"] = { code: "C90.0", description: "Multiple myeloma", category: "C90", excludes1: [], excludes2: [], includes: [], commonUse: ["Myeloma","MM"], documentation: [] };
  codes["C90.1"] = { code: "C90.1", description: "Plasma cell leukemia", category: "C90", excludes1: [], excludes2: [], includes: [], commonUse: ["Plasma cell leukemia"], documentation: [] };
  codes["C90.2"] = { code: "C90.2", description: "Extramedullary plasmacytoma", category: "C90", excludes1: [], excludes2: [], includes: [], commonUse: ["Plasmacytoma"], documentation: [] };
  codes["C91.0"] = { code: "C91.0", description: "Acute lymphoblastic leukemia [ALL]", category: "C91", excludes1: [], excludes2: [], includes: [], commonUse: ["ALL"], documentation: [] };
  codes["C91.1"] = { code: "C91.1", description: "Chronic lymphocytic leukemia [CLL]", category: "C91", excludes1: [], excludes2: [], includes: [], commonUse: ["CLL"], documentation: [] };
  codes["C91.2"] = { code: "C91.2", description: "Prolymphocytic leukemia, B-cell type", category: "C91", excludes1: [], excludes2: [], includes: [], commonUse: ["B-PLL"], documentation: [] };
  codes["C91.3"] = { code: "C91.3", description: "Prolymphocytic leukemia, T-cell type", category: "C91", excludes1: [], excludes2: [], includes: [], commonUse: ["T-PLL"], documentation: [] };
  codes["C91.4"] = { code: "C91.4", description: "Hairy cell leukemia", category: "C91", excludes1: [], excludes2: [], includes: [], commonUse: ["HCL"], documentation: [] };
  codes["C91.5"] = { code: "C91.5", description: "Adult T-cell lymphoma/leukemia (HTLV-1 associated)", category: "C91", excludes1: [], excludes2: [], includes: [], commonUse: ["ATLL"], documentation: [] };
  codes["C91.6"] = { code: "C91.6", description: "Childhood lymphoblastic leukemia", category: "C91", excludes1: [], excludes2: [], includes: [], commonUse: ["Pediatric ALL"], documentation: [] };
  codes["C91.8"] = { code: "C91.8", description: "Other lymphoid leukemia", category: "C91", excludes1: [], excludes2: [], includes: [], commonUse: ["Other lymphoid leukemia"], documentation: [] };
  codes["C91.9"] = { code: "C91.9", description: "Lymphoid leukemia, unspecified", category: "C91", excludes1: [], excludes2: [], includes: [], commonUse: ["Leukemia NOS"], documentation: [] };
  codes["C92.0"] = { code: "C92.0", description: "Acute myeloblastic leukemia [AML]", category: "C92", excludes1: [], excludes2: [], includes: [], commonUse: ["AML"], documentation: [] };
  codes["C92.1"] = { code: "C92.1", description: "Chronic myelogenous leukemia [CML]", category: "C92", excludes1: [], excludes2: [], includes: [], commonUse: ["CML"], documentation: [] };
  codes["C92.2"] = { code: "C92.2", description: "Acute promyelocytic leukemia", category: "C92", excludes1: [], excludes2: [], includes: [], commonUse: ["APL"], documentation: [] };
  codes["C92.3"] = { code: "C92.3", description: "Myeloid sarcoma", category: "C92", excludes1: [], excludes2: [], includes: [], commonUse: ["Chloroma"], documentation: [] };
  codes["C92.4"] = { code: "C92.4", description: "Acute promyelocytic leukemia, t(15;17)(q22;q21)", category: "C92", excludes1: [], excludes2: [], includes: [], commonUse: ["APL with PML-RARA"], documentation: [] };
  codes["C92.5"] = { code: "C92.5", description: "Acute myelomonocytic leukemia", category: "C92", excludes1: [], excludes2: [], includes: [], commonUse: ["AMML"], documentation: [] };
  codes["C92.6"] = { code: "C92.6", description: "Acute myeloid leukemia with t(6;9)(p23;q34)", category: "C92", excludes1: [], excludes2: [], includes: [], commonUse: ["AML with DEK-NUP214"], documentation: [] };
  codes["C92.8"] = { code: "C92.8", description: "Other acute myeloid leukemia", category: "C92", excludes1: [], excludes2: [], includes: [], commonUse: ["Other AML"], documentation: [] };
  codes["C92.9"] = { code: "C92.9", description: "Myeloid leukemia, unspecified", category: "C92", excludes1: [], excludes2: [], includes: [], commonUse: ["Myeloid leukemia NOS"], documentation: [] };
  codes["C93.0"] = { code: "C93.0", description: "Chronic monomyelocytic leukemia", category: "C93", excludes1: [], excludes2: [], includes: [], commonUse: ["CMML"], documentation: [] };
  codes["C93.1"] = { code: "C93.1", description: "Acute monocytic leukemia", category: "C93", excludes1: [], excludes2: [], includes: [], commonUse: ["AMoL"], documentation: [] };
  codes["C93.9"] = { code: "C93.9", description: "Monocytic leukemia, unspecified", category: "C93", excludes1: [], excludes2: [], includes: [], commonUse: ["Monocytic leukemia NOS"], documentation: [] };
  codes["C94.0"] = { code: "C94.0", description: "Acute erythroid leukemia", category: "C94", excludes1: [], excludes2: [], includes: [], commonUse: ["Erythroleukemia"], documentation: [] };
  codes["C94.2"] = { code: "C94.2", description: "Acute megakaryoblastic leukemia", category: "C94", excludes1: [], excludes2: [], includes: [], commonUse: ["AMKL"], documentation: [] };
  codes["C94.4"] = { code: "C94.4", description: "Acute panmyelosis with myelofibrosis", category: "C94", excludes1: [], excludes2: [], includes: [], commonUse: ["APMF"], documentation: [] };
  codes["C94.7"] = { code: "C94.7", description: "Other specified leukemias", category: "C94", excludes1: [], excludes2: [], includes: [], commonUse: ["Other leukemias"], documentation: [] };
  codes["C95.0"] = { code: "C95.0", description: "Acute leukemia of unspecified cell type", category: "C95", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute leukemia NOS"], documentation: [] };
  codes["C95.1"] = { code: "C95.1", description: "Chronic leukemia of unspecified cell type", category: "C95", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic leukemia NOS"], documentation: [] };
  codes["C95.2"] = { code: "C95.2", description: "Subacute leukemia of unspecified cell type", category: "C95", excludes1: [], excludes2: [], includes: [], commonUse: ["Subacute leukemia NOS"], documentation: [] };
  codes["C95.9"] = { code: "C95.9", description: "Leukemia, unspecified", category: "C95", excludes1: [], excludes2: [], includes: [], commonUse: ["Leukemia NOS"], documentation: [] };
  codes["C96.0"] = { code: "C96.0", description: "Multifocal and multisystemic (disseminated) Langerhans-cell histiocytosis", category: "C96", excludes1: [], excludes2: [], includes: [], commonUse: ["LCH"], documentation: [] };
  codes["C96.1"] = { code: "C96.1", description: "Malignant histiocytosis", category: "C96", excludes1: [], excludes2: [], includes: [], commonUse: ["Histiocytic sarcoma"], documentation: [] };
  codes["C96.2"] = { code: "C96.2", description: "Mast cell sarcoma", category: "C96", excludes1: [], excludes2: [], includes: [], commonUse: ["Mast cell sarcoma"], documentation: [] };
  codes["C96.4"] = { code: "C96.4", description: "True histiocytic lymphoma", category: "C96", excludes1: [], excludes2: [], includes: [], commonUse: ["Histiocytic lymphoma"], documentation: [] };
  codes["C96.9"] = { code: "C96.9", description: "Malignant neoplasm of lymphoid, hematopoietic and related tissue, unspecified", category: "C96", excludes1: [], excludes2: [], includes: [], commonUse: ["Hematologic cancer NOS"], documentation: [] };
  codes["D00.0"] = { code: "D00.0", description: "Carcinoma in situ of lip, oral cavity and pharynx", category: "D00", excludes1: [], excludes2: [], includes: [], commonUse: ["Oral cavity CIS"], documentation: [] };
  codes["D00.1"] = { code: "D00.1", description: "Carcinoma in situ of esophagus", category: "D00", excludes1: [], excludes2: [], includes: [], commonUse: ["Esophageal CIS"], documentation: [] };
  codes["D00.2"] = { code: "D00.2", description: "Carcinoma in situ of stomach", category: "D00", excludes1: [], excludes2: [], includes: [], commonUse: ["Gastric CIS"], documentation: [] };
  codes["D01.0"] = { code: "D01.0", description: "Carcinoma in situ of colon", category: "D01", excludes1: [], excludes2: [], includes: [], commonUse: ["Colon CIS"], documentation: [] };
  codes["D01.1"] = { code: "D01.1", description: "Carcinoma in situ of rectosigmoid junction and rectum", category: "D01", excludes1: [], excludes2: [], includes: [], commonUse: ["Rectal CIS"], documentation: [] };
  codes["D01.2"] = { code: "D01.2", description: "Carcinoma in situ of anal canal", category: "D01", excludes1: [], excludes2: [], includes: [], commonUse: ["Anal CIS"], documentation: [] };
  codes["D01.3"] = { code: "D01.3", description: "Carcinoma in situ of anus, unspecified", category: "D01", excludes1: [], excludes2: [], includes: [], commonUse: ["Anal CIS NOS"], documentation: [] };
  codes["D01.4"] = { code: "D01.4", description: "Carcinoma in situ of other and unspecified parts of intestine", category: "D01", excludes1: [], excludes2: [], includes: [], commonUse: ["Intestinal CIS"], documentation: [] };
  codes["D01.5"] = { code: "D01.5", description: "Carcinoma in situ of liver, gallbladder and bile ducts", category: "D01", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatobiliary CIS"], documentation: [] };
  codes["D01.7"] = { code: "D01.7", description: "Carcinoma in situ of other specified digestive organs", category: "D01", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive CIS"], documentation: [] };
  codes["D01.9"] = { code: "D01.9", description: "Carcinoma in situ of digestive organ, unspecified", category: "D01", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive CIS NOS"], documentation: [] };
  codes["D02.0"] = { code: "D02.0", description: "Carcinoma in situ of larynx", category: "D02", excludes1: [], excludes2: [], includes: [], commonUse: ["Laryngeal CIS"], documentation: [] };
  codes["D02.1"] = { code: "D02.1", description: "Carcinoma in situ of trachea", category: "D02", excludes1: [], excludes2: [], includes: [], commonUse: ["Tracheal CIS"], documentation: [] };
  codes["D02.2"] = { code: "D02.2", description: "Carcinoma in situ of bronchus and lung", category: "D02", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary CIS"], documentation: [] };
  codes["D02.3"] = { code: "D02.3", description: "Carcinoma in situ of other respiratory organs", category: "D02", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory CIS"], documentation: [] };
  codes["D02.4"] = { code: "D02.4", description: "Carcinoma in situ of respiratory organ, unspecified", category: "D02", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory CIS NOS"], documentation: [] };
  codes["D03.0"] = { code: "D03.0", description: "Melanoma in situ of lip", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip melanoma in situ"], documentation: [] };
  codes["D03.1"] = { code: "D03.1", description: "Melanoma in situ of eyelid", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Eyelid melanoma in situ"], documentation: [] };
  codes["D03.2"] = { code: "D03.2", description: "Melanoma in situ of ear", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear melanoma in situ"], documentation: [] };
  codes["D03.3"] = { code: "D03.3", description: "Melanoma in situ of face", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial melanoma in situ"], documentation: [] };
  codes["D03.4"] = { code: "D03.4", description: "Melanoma in situ of scalp and neck", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp melanoma in situ"], documentation: [] };
  codes["D03.5"] = { code: "D03.5", description: "Melanoma in situ of trunk", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk melanoma in situ"], documentation: [] };
  codes["D03.6"] = { code: "D03.6", description: "Melanoma in situ of upper limb", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb melanoma in situ"], documentation: [] };
  codes["D03.7"] = { code: "D03.7", description: "Melanoma in situ of lower limb", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb melanoma in situ"], documentation: [] };
  codes["D03.8"] = { code: "D03.8", description: "Melanoma in situ of other sites", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Melanoma in situ"], documentation: [] };
  codes["D03.9"] = { code: "D03.9", description: "Melanoma in situ, unspecified", category: "D03", excludes1: [], excludes2: [], includes: [], commonUse: ["Melanoma in situ NOS"], documentation: [] };
  codes["D04.0"] = { code: "D04.0", description: "Carcinoma in situ of skin of lip", category: "D04", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip skin CIS"], documentation: [] };
  codes["D04.1"] = { code: "D04.1", description: "Carcinoma in situ of skin of eyelid", category: "D04", excludes1: [], excludes2: [], includes: [], commonUse: ["Eyelid CIS"], documentation: [] };
  codes["D04.2"] = { code: "D04.2", description: "Carcinoma in situ of skin of ear", category: "D04", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear CIS"], documentation: [] };
  codes["D04.3"] = { code: "D04.3", description: "Carcinoma in situ of skin of other and unspecified parts of face", category: "D04", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial CIS"], documentation: [] };
  codes["D04.4"] = { code: "D04.4", description: "Carcinoma in situ of skin of scalp and neck", category: "D04", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp CIS"], documentation: [] };
  codes["D04.5"] = { code: "D04.5", description: "Carcinoma in situ of skin of trunk", category: "D04", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk CIS"], documentation: [] };
  codes["D04.6"] = { code: "D04.6", description: "Carcinoma in situ of skin of upper limb", category: "D04", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb CIS"], documentation: [] };
  codes["D04.7"] = { code: "D04.7", description: "Carcinoma in situ of skin of lower limb", category: "D04", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb CIS"], documentation: [] };
  codes["D04.9"] = { code: "D04.9", description: "Carcinoma in situ of skin, unspecified", category: "D04", excludes1: [], excludes2: [], includes: [], commonUse: ["Skin CIS NOS"], documentation: [] };
  codes["D05.0"] = { code: "D05.0", description: "Carcinoma in situ of lobular carcinoma in situ of breast", category: "D05", excludes1: [], excludes2: [], includes: [], commonUse: ["LCIS"], documentation: [] };
  codes["D05.1"] = { code: "D05.1", description: "Carcinoma in situ of other and unspecified ductal carcinoma in situ of breast", category: "D05", excludes1: [], excludes2: [], includes: [], commonUse: ["DCIS"], documentation: [] };
  codes["D05.9"] = { code: "D05.9", description: "Carcinoma in situ of breast, unspecified", category: "D05", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast CIS NOS"], documentation: [] };
  codes["D06.0"] = { code: "D06.0", description: "Carcinoma in situ of endocervix", category: "D06", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocervical CIS"], documentation: [] };
  codes["D06.1"] = { code: "D06.1", description: "Carcinoma in situ of exocervix", category: "D06", excludes1: [], excludes2: [], includes: [], commonUse: ["Exocervical CIS"], documentation: [] };
  codes["D06.7"] = { code: "D06.7", description: "Carcinoma in situ of other parts of cervix", category: "D06", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical CIS"], documentation: [] };
  codes["D06.9"] = { code: "D06.9", description: "Carcinoma in situ of cervix, unspecified", category: "D06", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical CIS NOS"], documentation: [] };
  codes["D07.0"] = { code: "D07.0", description: "Carcinoma in situ of endometrium", category: "D07", excludes1: [], excludes2: [], includes: [], commonUse: ["Endometrial CIS"], documentation: [] };
  codes["D07.1"] = { code: "D07.1", description: "Carcinoma in situ of vulva", category: "D07", excludes1: [], excludes2: [], includes: [], commonUse: ["Vulvar CIS"], documentation: [] };
  codes["D07.2"] = { code: "D07.2", description: "Carcinoma in situ of vagina", category: "D07", excludes1: [], excludes2: [], includes: [], commonUse: ["Vaginal CIS"], documentation: [] };
  codes["D07.3"] = { code: "D07.3", description: "Carcinoma in situ of other and unspecified female genital organs", category: "D07", excludes1: [], excludes2: [], includes: [], commonUse: ["Female genital CIS"], documentation: [] };
  codes["D07.4"] = { code: "D07.4", description: "Carcinoma in situ of penis", category: "D07", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile CIS"], documentation: [] };
  codes["D07.5"] = { code: "D07.5", description: "Carcinoma in situ of prostate", category: "D07", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostatic CIS"], documentation: [] };
  codes["D07.6"] = { code: "D07.6", description: "Carcinoma in situ of other and unspecified male genital organs", category: "D07", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital CIS"], documentation: [] };
  codes["D09.0"] = { code: "D09.0", description: "Carcinoma in situ of bladder", category: "D09", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder CIS"], documentation: [] };
  codes["D09.1"] = { code: "D09.1", description: "Carcinoma in situ of other and unspecified urinary organs", category: "D09", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary CIS"], documentation: [] };
  codes["D09.2"] = { code: "D09.2", description: "Carcinoma in situ of eye", category: "D09", excludes1: [], excludes2: [], includes: [], commonUse: ["Ocular CIS"], documentation: [] };
  codes["D09.3"] = { code: "D09.3", description: "Carcinoma in situ of thyroid and other endocrine glands", category: "D09", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocrine CIS"], documentation: [] };
  codes["D09.9"] = { code: "D09.9", description: "Carcinoma in situ, unspecified", category: "D09", excludes1: [], excludes2: [], includes: [], commonUse: ["CIS NOS"], documentation: [] };
  codes["D10.0"] = { code: "D10.0", description: "Benign neoplasm of lip", category: "D10", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip tumor"], documentation: [] };
  codes["D10.1"] = { code: "D10.1", description: "Benign neoplasm of tongue", category: "D10", excludes1: [], excludes2: [], includes: [], commonUse: ["Tongue tumor"], documentation: [] };
  codes["D10.2"] = { code: "D10.2", description: "Benign neoplasm of floor of mouth", category: "D10", excludes1: [], excludes2: [], includes: [], commonUse: ["Floor of mouth tumor"], documentation: [] };
  codes["D10.3"] = { code: "D10.3", description: "Benign neoplasm of other and unspecified parts of mouth", category: "D10", excludes1: [], excludes2: [], includes: [], commonUse: ["Oral cavity tumor"], documentation: [] };
  codes["D10.4"] = { code: "D10.4", description: "Benign neoplasm of tonsil", category: "D10", excludes1: [], excludes2: [], includes: [], commonUse: ["Tonsillar tumor"], documentation: [] };
  codes["D10.5"] = { code: "D10.5", description: "Benign neoplasm of oropharynx", category: "D10", excludes1: [], excludes2: [], includes: [], commonUse: ["Oropharyngeal tumor"], documentation: [] };
  codes["D10.6"] = { code: "D10.6", description: "Benign neoplasm of nasopharynx", category: "D10", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasopharyngeal tumor"], documentation: [] };
  codes["D10.7"] = { code: "D10.7", description: "Benign neoplasm of hypopharynx", category: "D10", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypopharyngeal tumor"], documentation: [] };
  codes["D10.9"] = { code: "D10.9", description: "Benign neoplasm of pharynx, unspecified", category: "D10", excludes1: [], excludes2: [], includes: [], commonUse: ["Pharyngeal tumor NOS"], documentation: [] };
  codes["D11.0"] = { code: "D11.0", description: "Benign neoplasm of parotid gland", category: "D11", excludes1: [], excludes2: [], includes: [], commonUse: ["Parotid tumor"], documentation: [] };
  codes["D11.1"] = { code: "D11.1", description: "Benign neoplasm of submandibular gland", category: "D11", excludes1: [], excludes2: [], includes: [], commonUse: ["Submandibular tumor"], documentation: [] };
  codes["D11.7"] = { code: "D11.7", description: "Benign neoplasm of other major salivary glands", category: "D11", excludes1: [], excludes2: [], includes: [], commonUse: ["Salivary gland tumor"], documentation: [] };
  codes["D11.9"] = { code: "D11.9", description: "Benign neoplasm of major salivary gland, unspecified", category: "D11", excludes1: [], excludes2: [], includes: [], commonUse: ["Salivary gland tumor NOS"], documentation: [] };
  codes["D12.0"] = { code: "D12.0", description: "Benign neoplasm of cecum", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Cecal tumor"], documentation: [] };
  codes["D12.1"] = { code: "D12.1", description: "Benign neoplasm of appendix", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Appendiceal tumor"], documentation: [] };
  codes["D12.2"] = { code: "D12.2", description: "Benign neoplasm of ascending colon", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Ascending colon tumor"], documentation: [] };
  codes["D12.3"] = { code: "D12.3", description: "Benign neoplasm of transverse colon", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Transverse colon tumor"], documentation: [] };
  codes["D12.4"] = { code: "D12.4", description: "Benign neoplasm of descending colon", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Descending colon tumor"], documentation: [] };
  codes["D12.5"] = { code: "D12.5", description: "Benign neoplasm of sigmoid colon", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Sigmoid tumor"], documentation: [] };
  codes["D12.6"] = { code: "D12.6", description: "Benign neoplasm of colon, unspecified", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Colon polyp","Colon tumor NOS"], documentation: [] };
  codes["D12.7"] = { code: "D12.7", description: "Benign neoplasm of rectosigmoid junction and rectum", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Rectal polyp","Rectal tumor"], documentation: [] };
  codes["D12.8"] = { code: "D12.8", description: "Benign neoplasm of anus and anal canal", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Anal tumor"], documentation: [] };
  codes["D12.9"] = { code: "D12.9", description: "Benign neoplasm of large intestine, part unspecified", category: "D12", excludes1: [], excludes2: [], includes: [], commonUse: ["Colorectal tumor"], documentation: [] };
  codes["D13.0"] = { code: "D13.0", description: "Benign neoplasm of esophagus", category: "D13", excludes1: [], excludes2: [], includes: [], commonUse: ["Esophageal tumor"], documentation: [] };
  codes["D13.1"] = { code: "D13.1", description: "Benign neoplasm of stomach", category: "D13", excludes1: [], excludes2: [], includes: [], commonUse: ["Gastric tumor"], documentation: [] };
  codes["D13.2"] = { code: "D13.2", description: "Benign neoplasm of duodenum", category: "D13", excludes1: [], excludes2: [], includes: [], commonUse: ["Duodenal tumor"], documentation: [] };
  codes["D13.3"] = { code: "D13.3", description: "Benign neoplasm of other and unspecified parts of small intestine", category: "D13", excludes1: [], excludes2: [], includes: [], commonUse: ["Small bowel tumor"], documentation: [] };
  codes["D13.4"] = { code: "D13.4", description: "Benign neoplasm of liver", category: "D13", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatic tumor"], documentation: [] };
  codes["D13.5"] = { code: "D13.5", description: "Benign neoplasm of extrahepatic bile ducts", category: "D13", excludes1: [], excludes2: [], includes: [], commonUse: ["Bile duct tumor"], documentation: [] };
  codes["D13.6"] = { code: "D13.6", description: "Benign neoplasm of pancreas", category: "D13", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic tumor"], documentation: [] };
  codes["D13.7"] = { code: "D13.7", description: "Benign neoplasm of endocrine pancreas", category: "D13", excludes1: [], excludes2: [], includes: [], commonUse: ["Islet cell tumor"], documentation: [] };
  codes["D13.9"] = { code: "D13.9", description: "Benign neoplasm of ill-defined sites within the digestive system", category: "D13", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive tumor NOS"], documentation: [] };
  codes["D14.0"] = { code: "D14.0", description: "Benign neoplasm of middle ear", category: "D14", excludes1: [], excludes2: [], includes: [], commonUse: ["Middle ear tumor"], documentation: [] };
  codes["D14.1"] = { code: "D14.1", description: "Benign neoplasm of larynx", category: "D14", excludes1: [], excludes2: [], includes: [], commonUse: ["Laryngeal tumor"], documentation: [] };
  codes["D14.2"] = { code: "D14.2", description: "Benign neoplasm of trachea", category: "D14", excludes1: [], excludes2: [], includes: [], commonUse: ["Tracheal tumor"], documentation: [] };
  codes["D14.3"] = { code: "D14.3", description: "Benign neoplasm of bronchus and lung", category: "D14", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary tumor"], documentation: [] };
  codes["D14.4"] = { code: "D14.4", description: "Benign neoplasm of respiratory organ, unspecified", category: "D14", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory tumor NOS"], documentation: [] };
  codes["D15.0"] = { code: "D15.0", description: "Benign neoplasm of thymus", category: "D15", excludes1: [], excludes2: [], includes: [], commonUse: ["Thymoma"], documentation: [] };
  codes["D15.1"] = { code: "D15.1", description: "Benign neoplasm of heart", category: "D15", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac tumor"], documentation: [] };
  codes["D15.2"] = { code: "D15.2", description: "Benign neoplasm of mediastinum", category: "D15", excludes1: [], excludes2: [], includes: [], commonUse: ["Mediastinal tumor"], documentation: [] };
  codes["D15.7"] = { code: "D15.7", description: "Benign neoplasm of other specified thoracic organs", category: "D15", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic tumor"], documentation: [] };
  codes["D15.9"] = { code: "D15.9", description: "Benign neoplasm of thoracic organ, unspecified", category: "D15", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic tumor NOS"], documentation: [] };
  codes["D16.0"] = { code: "D16.0", description: "Benign neoplasm of scapula and long bones of upper limb", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb bone tumor"], documentation: [] };
  codes["D16.1"] = { code: "D16.1", description: "Benign neoplasm of short bones of upper limb", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Hand bone tumor"], documentation: [] };
  codes["D16.2"] = { code: "D16.2", description: "Benign neoplasm of long bones of lower limb", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb bone tumor"], documentation: [] };
  codes["D16.3"] = { code: "D16.3", description: "Benign neoplasm of short bones of lower limb", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Foot bone tumor"], documentation: [] };
  codes["D16.4"] = { code: "D16.4", description: "Benign neoplasm of bones of skull and face", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Skull tumor"], documentation: [] };
  codes["D16.5"] = { code: "D16.5", description: "Benign neoplasm of mandible", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Jaw tumor"], documentation: [] };
  codes["D16.6"] = { code: "D16.6", description: "Benign neoplasm of vertebral column", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal tumor"], documentation: [] };
  codes["D16.7"] = { code: "D16.7", description: "Benign neoplasm of ribs, sternum and clavicle", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall tumor"], documentation: [] };
  codes["D16.8"] = { code: "D16.8", description: "Benign neoplasm of pelvic bones, sacrum and coccyx", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic bone tumor"], documentation: [] };
  codes["D16.9"] = { code: "D16.9", description: "Benign neoplasm of bone and articular cartilage, unspecified", category: "D16", excludes1: [], excludes2: [], includes: [], commonUse: ["Bone tumor NOS"], documentation: [] };
  codes["D17.0"] = { code: "D17.0", description: "Benign lipomatous neoplasm of skin and subcutaneous tissue of face", category: "D17", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial lipoma"], documentation: [] };
  codes["D17.1"] = { code: "D17.1", description: "Benign lipomatous neoplasm of skin and subcutaneous tissue of neck", category: "D17", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck lipoma"], documentation: [] };
  codes["D17.2"] = { code: "D17.2", description: "Benign lipomatous neoplasm of skin and subcutaneous tissue of trunk", category: "D17", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk lipoma"], documentation: [] };
  codes["D17.3"] = { code: "D17.3", description: "Benign lipomatous neoplasm of skin and subcutaneous tissue of upper limb", category: "D17", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb lipoma"], documentation: [] };
  codes["D17.4"] = { code: "D17.4", description: "Benign lipomatous neoplasm of skin and subcutaneous tissue of lower limb", category: "D17", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb lipoma"], documentation: [] };
  codes["D17.5"] = { code: "D17.5", description: "Benign lipomatous neoplasm of skin and subcutaneous tissue of genitourinary organ", category: "D17", excludes1: [], excludes2: [], includes: [], commonUse: ["Genitourinary lipoma"], documentation: [] };
  codes["D17.7"] = { code: "D17.7", description: "Benign lipomatous neoplasm of skin and subcutaneous tissue of other sites", category: "D17", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipoma NOS"], documentation: [] };
  codes["D17.9"] = { code: "D17.9", description: "Benign lipomatous neoplasm of skin and subcutaneous tissue, unspecified", category: "D17", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipoma NOS"], documentation: [] };
  codes["D18.0"] = { code: "D18.0", description: "Hemangioma, any site", category: "D18", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemangioma"], documentation: [] };
  codes["D18.1"] = { code: "D18.1", description: "Lymphangioma, any site", category: "D18", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymphangioma"], documentation: [] };
  codes["D19.0"] = { code: "D19.0", description: "Benign mesothelioma of pleura", category: "D19", excludes1: [], excludes2: [], includes: [], commonUse: ["Benign pleural mesothelioma"], documentation: [] };
  codes["D19.1"] = { code: "D19.1", description: "Benign mesothelioma of peritoneum", category: "D19", excludes1: [], excludes2: [], includes: [], commonUse: ["Benign peritoneal mesothelioma"], documentation: [] };
  codes["D19.7"] = { code: "D19.7", description: "Benign mesothelioma of other sites", category: "D19", excludes1: [], excludes2: [], includes: [], commonUse: ["Benign mesothelioma"], documentation: [] };
  codes["D19.9"] = { code: "D19.9", description: "Benign mesothelioma, unspecified", category: "D19", excludes1: [], excludes2: [], includes: [], commonUse: ["Benign mesothelioma NOS"], documentation: [] };
  codes["D20.0"] = { code: "D20.0", description: "Benign neoplasm of soft tissue of retroperitoneum", category: "D20", excludes1: [], excludes2: [], includes: [], commonUse: ["Retroperitoneal tumor"], documentation: [] };
  codes["D20.1"] = { code: "D20.1", description: "Benign neoplasm of soft tissue of mediastinum", category: "D20", excludes1: [], excludes2: [], includes: [], commonUse: ["Mediastinal soft tissue tumor"], documentation: [] };
  codes["D21.0"] = { code: "D21.0", description: "Benign neoplasm of connective and other soft tissue of head, face and neck", category: "D21", excludes1: [], excludes2: [], includes: [], commonUse: ["Head soft tissue tumor"], documentation: [] };
  codes["D21.1"] = { code: "D21.1", description: "Benign neoplasm of connective and other soft tissue of upper limb", category: "D21", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb soft tissue tumor"], documentation: [] };
  codes["D21.2"] = { code: "D21.2", description: "Benign neoplasm of connective and other soft tissue of lower limb", category: "D21", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb soft tissue tumor"], documentation: [] };
  codes["D21.3"] = { code: "D21.3", description: "Benign neoplasm of connective and other soft tissue of thorax", category: "D21", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic soft tissue tumor"], documentation: [] };
  codes["D21.4"] = { code: "D21.4", description: "Benign neoplasm of connective and other soft tissue of abdomen", category: "D21", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal soft tissue tumor"], documentation: [] };
  codes["D21.5"] = { code: "D21.5", description: "Benign neoplasm of connective and other soft tissue of pelvis", category: "D21", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic soft tissue tumor"], documentation: [] };
  codes["D21.6"] = { code: "D21.6", description: "Benign neoplasm of connective and other soft tissue of trunk, unspecified", category: "D21", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk soft tissue tumor"], documentation: [] };
  codes["D21.9"] = { code: "D21.9", description: "Benign neoplasm of connective and other soft tissue, unspecified", category: "D21", excludes1: [], excludes2: [], includes: [], commonUse: ["Soft tissue tumor NOS"], documentation: [] };
  codes["D22.0"] = { code: "D22.0", description: "Melanocytic nevi of lip", category: "D22", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip nevus"], documentation: [] };
  codes["D22.1"] = { code: "D22.1", description: "Melanocytic nevi of eyelid", category: "D22", excludes1: [], excludes2: [], includes: [], commonUse: ["Eyelid nevus"], documentation: [] };
  codes["D22.2"] = { code: "D22.2", description: "Melanocytic nevi of ear", category: "D22", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear nevus"], documentation: [] };
  codes["D22.3"] = { code: "D22.3", description: "Melanocytic nevi of other and unspecified parts of face", category: "D22", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial nevus"], documentation: [] };
  codes["D22.4"] = { code: "D22.4", description: "Melanocytic nevi of scalp and neck", category: "D22", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp nevus"], documentation: [] };
  codes["D22.5"] = { code: "D22.5", description: "Melanocytic nevi of trunk", category: "D22", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk nevus"], documentation: [] };
  codes["D22.6"] = { code: "D22.6", description: "Melanocytic nevi of upper limb", category: "D22", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb nevus"], documentation: [] };
  codes["D22.7"] = { code: "D22.7", description: "Melanocytic nevi of lower limb", category: "D22", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb nevus"], documentation: [] };
  codes["D22.9"] = { code: "D22.9", description: "Melanocytic nevi, unspecified", category: "D22", excludes1: [], excludes2: [], includes: [], commonUse: ["Nevus NOS","Mole"], documentation: [] };
  codes["D23.0"] = { code: "D23.0", description: "Benign neoplasm of skin of lip", category: "D23", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip skin tumor"], documentation: [] };
  codes["D23.1"] = { code: "D23.1", description: "Benign neoplasm of skin of eyelid", category: "D23", excludes1: [], excludes2: [], includes: [], commonUse: ["Eyelid skin tumor"], documentation: [] };
  codes["D23.2"] = { code: "D23.2", description: "Benign neoplasm of skin of ear", category: "D23", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear skin tumor"], documentation: [] };
  codes["D23.3"] = { code: "D23.3", description: "Benign neoplasm of skin of other and unspecified parts of face", category: "D23", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial skin tumor"], documentation: [] };
  codes["D23.4"] = { code: "D23.4", description: "Benign neoplasm of skin of scalp and neck", category: "D23", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp skin tumor"], documentation: [] };
  codes["D23.5"] = { code: "D23.5", description: "Benign neoplasm of skin of trunk", category: "D23", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk skin tumor"], documentation: [] };
  codes["D23.6"] = { code: "D23.6", description: "Benign neoplasm of skin of upper limb", category: "D23", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb skin tumor"], documentation: [] };
  codes["D23.7"] = { code: "D23.7", description: "Benign neoplasm of skin of lower limb", category: "D23", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb skin tumor"], documentation: [] };
  codes["D23.9"] = { code: "D23.9", description: "Benign neoplasm of skin, unspecified", category: "D23", excludes1: [], excludes2: [], includes: [], commonUse: ["Skin tumor NOS"], documentation: [] };
  codes["D24"] = { code: "D24", description: "Benign neoplasm of breast", category: "D24", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast fibroadenoma","Breast lump"], documentation: [] };
  codes["D25.0"] = { code: "D25.0", description: "Submucous leiomyoma of uterus", category: "D25", excludes1: [], excludes2: [], includes: [], commonUse: ["Submucous fibroid"], documentation: [] };
  codes["D25.1"] = { code: "D25.1", description: "Intramural leiomyoma of uterus", category: "D25", excludes1: [], excludes2: [], includes: [], commonUse: ["Intramural fibroid"], documentation: [] };
  codes["D25.2"] = { code: "D25.2", description: "Subserosal leiomyoma of uterus", category: "D25", excludes1: [], excludes2: [], includes: [], commonUse: ["Subserosal fibroid"], documentation: [] };
  codes["D25.9"] = { code: "D25.9", description: "Leiomyoma of uterus, unspecified", category: "D25", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine fibroid"], documentation: [] };
  codes["D26.0"] = { code: "D26.0", description: "Benign neoplasm of cervix uteri", category: "D26", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical polyp"], documentation: [] };
  codes["D26.1"] = { code: "D26.1", description: "Benign neoplasm of corpus uteri", category: "D26", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine corpus tumor"], documentation: [] };
  codes["D26.7"] = { code: "D26.7", description: "Benign neoplasm of other parts of uterus", category: "D26", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine tumor"], documentation: [] };
  codes["D26.9"] = { code: "D26.9", description: "Benign neoplasm of uterus, unspecified", category: "D26", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine tumor NOS"], documentation: [] };
  codes["D27"] = { code: "D27", description: "Benign neoplasm of ovary", category: "D27", excludes1: [], excludes2: [], includes: [], commonUse: ["Ovarian cyst","Ovarian tumor"], documentation: [] };
  codes["D28.0"] = { code: "D28.0", description: "Benign neoplasm of vulva", category: "D28", excludes1: [], excludes2: [], includes: [], commonUse: ["Vulvar tumor"], documentation: [] };
  codes["D28.1"] = { code: "D28.1", description: "Benign neoplasm of vagina", category: "D28", excludes1: [], excludes2: [], includes: [], commonUse: ["Vaginal tumor"], documentation: [] };
  codes["D28.2"] = { code: "D28.2", description: "Benign neoplasm of fallopian tube", category: "D28", excludes1: [], excludes2: [], includes: [], commonUse: ["Fallopian tube tumor"], documentation: [] };
  codes["D28.7"] = { code: "D28.7", description: "Benign neoplasm of other specified female genital organs", category: "D28", excludes1: [], excludes2: [], includes: [], commonUse: ["Female genital tumor"], documentation: [] };
  codes["D28.9"] = { code: "D28.9", description: "Benign neoplasm of female genital organ, unspecified", category: "D28", excludes1: [], excludes2: [], includes: [], commonUse: ["Female genital tumor NOS"], documentation: [] };
  codes["D29.0"] = { code: "D29.0", description: "Benign neoplasm of prostate", category: "D29", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostatic BPH"], documentation: [] };
  codes["D29.1"] = { code: "D29.1", description: "Benign neoplasm of testis", category: "D29", excludes1: [], excludes2: [], includes: [], commonUse: ["Testicular tumor"], documentation: [] };
  codes["D29.2"] = { code: "D29.2", description: "Benign neoplasm of epididymis", category: "D29", excludes1: [], excludes2: [], includes: [], commonUse: ["Epididymal cyst"], documentation: [] };
  codes["D29.3"] = { code: "D29.3", description: "Benign neoplasm of spermatic cord", category: "D29", excludes1: [], excludes2: [], includes: [], commonUse: ["Spermatic cord tumor"], documentation: [] };
  codes["D29.4"] = { code: "D29.4", description: "Benign neoplasm of penis", category: "D29", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile tumor"], documentation: [] };
  codes["D29.9"] = { code: "D29.9", description: "Benign neoplasm of male genital organ, unspecified", category: "D29", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital tumor NOS"], documentation: [] };
  codes["D30.0"] = { code: "D30.0", description: "Benign neoplasm of kidney", category: "D30", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal cyst","Kidney tumor"], documentation: [] };
  codes["D30.1"] = { code: "D30.1", description: "Benign neoplasm of renal pelvis", category: "D30", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal pelvis tumor"], documentation: [] };
  codes["D30.2"] = { code: "D30.2", description: "Benign neoplasm of ureter", category: "D30", excludes1: [], excludes2: [], includes: [], commonUse: ["Ureteral tumor"], documentation: [] };
  codes["D30.3"] = { code: "D30.3", description: "Benign neoplasm of bladder", category: "D30", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder tumor","Bladder polyp"], documentation: [] };
  codes["D30.4"] = { code: "D30.4", description: "Benign neoplasm of urethra", category: "D30", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral tumor"], documentation: [] };
  codes["D30.9"] = { code: "D30.9", description: "Benign neoplasm of urinary organ, unspecified", category: "D30", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary tumor NOS"], documentation: [] };
  codes["D31.0"] = { code: "D31.0", description: "Benign neoplasm of conjunctiva", category: "D31", excludes1: [], excludes2: [], includes: [], commonUse: ["Conjunctival tumor"], documentation: [] };
  codes["D31.1"] = { code: "D31.1", description: "Benign neoplasm of cornea", category: "D31", excludes1: [], excludes2: [], includes: [], commonUse: ["Corneal tumor"], documentation: [] };
  codes["D31.2"] = { code: "D31.2", description: "Benign neoplasm of retina", category: "D31", excludes1: [], excludes2: [], includes: [], commonUse: ["Retinal tumor"], documentation: [] };
  codes["D31.3"] = { code: "D31.3", description: "Benign neoplasm of choroid", category: "D31", excludes1: [], excludes2: [], includes: [], commonUse: ["Choroidal tumor"], documentation: [] };
  codes["D31.4"] = { code: "D31.4", description: "Benign neoplasm of ciliary body", category: "D31", excludes1: [], excludes2: [], includes: [], commonUse: ["Ciliary body tumor"], documentation: [] };
  codes["D31.5"] = { code: "D31.5", description: "Benign neoplasm of lacrimal gland and duct", category: "D31", excludes1: [], excludes2: [], includes: [], commonUse: ["Lacrimal gland tumor"], documentation: [] };
  codes["D31.6"] = { code: "D31.6", description: "Benign neoplasm of orbit, unspecified", category: "D31", excludes1: [], excludes2: [], includes: [], commonUse: ["Orbital tumor"], documentation: [] };
  codes["D31.9"] = { code: "D31.9", description: "Benign neoplasm of eye, unspecified", category: "D31", excludes1: [], excludes2: [], includes: [], commonUse: ["Eye tumor NOS"], documentation: [] };
  codes["D32.0"] = { code: "D32.0", description: "Benign neoplasm of meninges of cerebral hemispheres", category: "D32", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningioma"], documentation: [] };
  codes["D32.1"] = { code: "D32.1", description: "Benign neoplasm of meninges of spinal cord", category: "D32", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal meningioma"], documentation: [] };
  codes["D32.9"] = { code: "D32.9", description: "Benign neoplasm of meninges, unspecified", category: "D32", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningioma NOS"], documentation: [] };
  codes["D33.0"] = { code: "D33.0", description: "Benign neoplasm of brain, supratentorial", category: "D33", excludes1: [], excludes2: [], includes: [], commonUse: ["Supratentorial brain tumor"], documentation: [] };
  codes["D33.1"] = { code: "D33.1", description: "Benign neoplasm of brain, infratentorial", category: "D33", excludes1: [], excludes2: [], includes: [], commonUse: ["Infratentorial brain tumor"], documentation: [] };
  codes["D33.2"] = { code: "D33.2", description: "Benign neoplasm of brain, unspecified", category: "D33", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain tumor NOS"], documentation: [] };
  codes["D33.3"] = { code: "D33.3", description: "Benign neoplasm of cranial nerves", category: "D33", excludes1: [], excludes2: [], includes: [], commonUse: ["Cranial nerve tumor"], documentation: [] };
  codes["D33.4"] = { code: "D33.4", description: "Benign neoplasm of brain, ventricles", category: "D33", excludes1: [], excludes2: [], includes: [], commonUse: ["Ventricular tumor"], documentation: [] };
  codes["D33.7"] = { code: "D33.7", description: "Benign neoplasm of other parts of central nervous system", category: "D33", excludes1: [], excludes2: [], includes: [], commonUse: ["CNS tumor"], documentation: [] };
  codes["D33.9"] = { code: "D33.9", description: "Benign neoplasm of central nervous system, unspecified", category: "D33", excludes1: [], excludes2: [], includes: [], commonUse: ["CNS tumor NOS"], documentation: [] };
  codes["D34"] = { code: "D34", description: "Benign neoplasm of thyroid gland", category: "D34", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid nodule","Thyroid adenoma"], documentation: [] };
  codes["D35.0"] = { code: "D35.0", description: "Benign neoplasm of adrenal gland", category: "D35", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenal adenoma"], documentation: [] };
  codes["D35.1"] = { code: "D35.1", description: "Benign neoplasm of parathyroid gland", category: "D35", excludes1: [], excludes2: [], includes: [], commonUse: ["Parathyroid adenoma"], documentation: [] };
  codes["D35.2"] = { code: "D35.2", description: "Benign neoplasm of pituitary gland", category: "D35", excludes1: [], excludes2: [], includes: [], commonUse: ["Pituitary adenoma"], documentation: [] };
  codes["D35.3"] = { code: "D35.3", description: "Benign neoplasm of craniopharyngeal duct", category: "D35", excludes1: [], excludes2: [], includes: [], commonUse: ["Craniopharyngioma"], documentation: [] };
  codes["D35.4"] = { code: "D35.4", description: "Benign neoplasm of pineal gland", category: "D35", excludes1: [], excludes2: [], includes: [], commonUse: ["Pineal cyst"], documentation: [] };
  codes["D35.5"] = { code: "D35.5", description: "Benign neoplasm of carotid body", category: "D35", excludes1: [], excludes2: [], includes: [], commonUse: ["Carotid body tumor"], documentation: [] };
  codes["D35.6"] = { code: "D35.6", description: "Benign neoplasm of aortic body and other paraganglia", category: "D35", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraganglioma"], documentation: [] };
  codes["D35.7"] = { code: "D35.7", description: "Benign neoplasm of other specified endocrine glands", category: "D35", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocrine tumor"], documentation: [] };
  codes["D35.9"] = { code: "D35.9", description: "Benign neoplasm of endocrine gland, unspecified", category: "D35", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocrine tumor NOS"], documentation: [] };
  codes["D36.0"] = { code: "D36.0", description: "Benign neoplasm of lymph nodes", category: "D36", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymph node tumor"], documentation: [] };
  codes["D36.1"] = { code: "D36.1", description: "Benign neoplasm of peripheral nerves and autonomic nervous system", category: "D36", excludes1: [], excludes2: [], includes: [], commonUse: ["Nerve sheath tumor"], documentation: [] };
  codes["D36.7"] = { code: "D36.7", description: "Benign neoplasm of other specified sites", category: "D36", excludes1: [], excludes2: [], includes: [], commonUse: ["Benign tumor"], documentation: [] };
  codes["D36.9"] = { code: "D36.9", description: "Benign neoplasm of unspecified site", category: "D36", excludes1: [], excludes2: [], includes: [], commonUse: ["Benign tumor NOS"], documentation: [] };
  codes["D37.0"] = { code: "D37.0", description: "Neoplasm of uncertain behavior of lip, oral cavity and pharynx", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Oral cavity uncertain tumor"], documentation: [] };
  codes["D37.1"] = { code: "D37.1", description: "Neoplasm of uncertain behavior of stomach", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Gastric uncertain tumor"], documentation: [] };
  codes["D37.2"] = { code: "D37.2", description: "Neoplasm of uncertain behavior of small intestine", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Small bowel uncertain tumor"], documentation: [] };
  codes["D37.3"] = { code: "D37.3", description: "Neoplasm of uncertain behavior of appendix", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Appendiceal uncertain tumor"], documentation: [] };
  codes["D37.4"] = { code: "D37.4", description: "Neoplasm of uncertain behavior of colon", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Colon uncertain tumor"], documentation: [] };
  codes["D37.5"] = { code: "D37.5", description: "Neoplasm of uncertain behavior of rectum, rectosigmoid junction and anus", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Rectal uncertain tumor"], documentation: [] };
  codes["D37.6"] = { code: "D37.6", description: "Neoplasm of uncertain behavior of liver, gallbladder and bile ducts", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatobiliary uncertain tumor"], documentation: [] };
  codes["D37.7"] = { code: "D37.7", description: "Neoplasm of uncertain behavior of other digestive organs", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive uncertain tumor"], documentation: [] };
  codes["D37.8"] = { code: "D37.8", description: "Neoplasm of uncertain behavior of digestive organ, unspecified", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive uncertain tumor NOS"], documentation: [] };
  codes["D37.9"] = { code: "D37.9", description: "Neoplasm of uncertain behavior of digestive organ, unspecified", category: "D37", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive uncertain tumor NOS"], documentation: [] };
  codes["D38.0"] = { code: "D38.0", description: "Neoplasm of uncertain behavior of larynx", category: "D38", excludes1: [], excludes2: [], includes: [], commonUse: ["Laryngeal uncertain tumor"], documentation: [] };
  codes["D38.1"] = { code: "D38.1", description: "Neoplasm of uncertain behavior of trachea, bronchus and lung", category: "D38", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary uncertain tumor"], documentation: [] };
  codes["D38.2"] = { code: "D38.2", description: "Neoplasm of uncertain behavior of pleura", category: "D38", excludes1: [], excludes2: [], includes: [], commonUse: ["Pleural uncertain tumor"], documentation: [] };
  codes["D38.3"] = { code: "D38.3", description: "Neoplasm of uncertain behavior of mediastinum", category: "D38", excludes1: [], excludes2: [], includes: [], commonUse: ["Mediastinal uncertain tumor"], documentation: [] };
  codes["D38.4"] = { code: "D38.4", description: "Neoplasm of uncertain behavior of thymus", category: "D38", excludes1: [], excludes2: [], includes: [], commonUse: ["Thymic uncertain tumor"], documentation: [] };
  codes["D38.5"] = { code: "D38.5", description: "Neoplasm of uncertain behavior of other respiratory organs", category: "D38", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory uncertain tumor"], documentation: [] };
  codes["D38.6"] = { code: "D38.6", description: "Neoplasm of uncertain behavior of respiratory organ, unspecified", category: "D38", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory uncertain tumor NOS"], documentation: [] };
  codes["D39.0"] = { code: "D39.0", description: "Neoplasm of uncertain behavior of uterus", category: "D39", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine uncertain tumor"], documentation: [] };
  codes["D39.1"] = { code: "D39.1", description: "Neoplasm of uncertain behavior of ovary", category: "D39", excludes1: [], excludes2: [], includes: [], commonUse: ["Ovarian uncertain tumor"], documentation: [] };
  codes["D39.2"] = { code: "D39.2", description: "Neoplasm of uncertain behavior of placenta", category: "D39", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental uncertain tumor"], documentation: [] };
  codes["D39.7"] = { code: "D39.7", description: "Neoplasm of uncertain behavior of other specified female genital organs", category: "D39", excludes1: [], excludes2: [], includes: [], commonUse: ["Female genital uncertain tumor"], documentation: [] };
  codes["D39.9"] = { code: "D39.9", description: "Neoplasm of uncertain behavior of female genital organ, unspecified", category: "D39", excludes1: [], excludes2: [], includes: [], commonUse: ["Female genital uncertain tumor NOS"], documentation: [] };
  codes["D40.0"] = { code: "D40.0", description: "Neoplasm of uncertain behavior of prostate", category: "D40", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostatic uncertain tumor"], documentation: [] };
  codes["D40.1"] = { code: "D40.1", description: "Neoplasm of uncertain behavior of testis", category: "D40", excludes1: [], excludes2: [], includes: [], commonUse: ["Testicular uncertain tumor"], documentation: [] };
  codes["D40.7"] = { code: "D40.7", description: "Neoplasm of uncertain behavior of other specified male genital organs", category: "D40", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital uncertain tumor"], documentation: [] };
  codes["D40.9"] = { code: "D40.9", description: "Neoplasm of uncertain behavior of male genital organ, unspecified", category: "D40", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital uncertain tumor NOS"], documentation: [] };
  codes["D41.0"] = { code: "D41.0", description: "Neoplasm of uncertain behavior of kidney", category: "D41", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal uncertain tumor"], documentation: [] };
  codes["D41.1"] = { code: "D41.1", description: "Neoplasm of uncertain behavior of renal pelvis", category: "D41", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal pelvis uncertain tumor"], documentation: [] };
  codes["D41.2"] = { code: "D41.2", description: "Neoplasm of uncertain behavior of ureter", category: "D41", excludes1: [], excludes2: [], includes: [], commonUse: ["Ureteral uncertain tumor"], documentation: [] };
  codes["D41.3"] = { code: "D41.3", description: "Neoplasm of uncertain behavior of bladder", category: "D41", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder uncertain tumor"], documentation: [] };
  codes["D41.4"] = { code: "D41.4", description: "Neoplasm of uncertain behavior of urethra", category: "D41", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral uncertain tumor"], documentation: [] };
  codes["D41.7"] = { code: "D41.7", description: "Neoplasm of uncertain behavior of other urinary organs", category: "D41", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary uncertain tumor"], documentation: [] };
  codes["D41.9"] = { code: "D41.9", description: "Neoplasm of uncertain behavior of urinary organ, unspecified", category: "D41", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary uncertain tumor NOS"], documentation: [] };
  codes["D42.0"] = { code: "D42.0", description: "Neoplasm of uncertain behavior of meninges of cerebral hemispheres", category: "D42", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningeal uncertain tumor"], documentation: [] };
  codes["D42.1"] = { code: "D42.1", description: "Neoplasm of uncertain behavior of meninges of spinal cord", category: "D42", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal meningeal uncertain tumor"], documentation: [] };
  codes["D42.9"] = { code: "D42.9", description: "Neoplasm of uncertain behavior of meninges, unspecified", category: "D42", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningeal uncertain tumor NOS"], documentation: [] };
  codes["D43.0"] = { code: "D43.0", description: "Neoplasm of uncertain behavior of brain, supratentorial", category: "D43", excludes1: [], excludes2: [], includes: [], commonUse: ["Supratentorial uncertain brain tumor"], documentation: [] };
  codes["D43.1"] = { code: "D43.1", description: "Neoplasm of uncertain behavior of brain, infratentorial", category: "D43", excludes1: [], excludes2: [], includes: [], commonUse: ["Infratentorial uncertain brain tumor"], documentation: [] };
  codes["D43.2"] = { code: "D43.2", description: "Neoplasm of uncertain behavior of brain, unspecified", category: "D43", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain uncertain tumor NOS"], documentation: [] };
  codes["D43.3"] = { code: "D43.3", description: "Neoplasm of uncertain behavior of cranial nerves", category: "D43", excludes1: [], excludes2: [], includes: [], commonUse: ["Cranial nerve uncertain tumor"], documentation: [] };
  codes["D43.4"] = { code: "D43.4", description: "Neoplasm of uncertain behavior of brain, ventricles", category: "D43", excludes1: [], excludes2: [], includes: [], commonUse: ["Ventricular uncertain tumor"], documentation: [] };
  codes["D43.7"] = { code: "D43.7", description: "Neoplasm of uncertain behavior of other parts of central nervous system", category: "D43", excludes1: [], excludes2: [], includes: [], commonUse: ["CNS uncertain tumor"], documentation: [] };
  codes["D43.9"] = { code: "D43.9", description: "Neoplasm of uncertain behavior of central nervous system, unspecified", category: "D43", excludes1: [], excludes2: [], includes: [], commonUse: ["CNS uncertain tumor NOS"], documentation: [] };
  codes["D44.0"] = { code: "D44.0", description: "Neoplasm of uncertain behavior of thyroid gland", category: "D44", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid uncertain tumor"], documentation: [] };
  codes["D44.1"] = { code: "D44.1", description: "Neoplasm of uncertain behavior of adrenal gland", category: "D44", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenal uncertain tumor"], documentation: [] };
  codes["D44.2"] = { code: "D44.2", description: "Neoplasm of uncertain behavior of pituitary gland", category: "D44", excludes1: [], excludes2: [], includes: [], commonUse: ["Pituitary uncertain tumor"], documentation: [] };
  codes["D44.3"] = { code: "D44.3", description: "Neoplasm of uncertain behavior of pineal gland", category: "D44", excludes1: [], excludes2: [], includes: [], commonUse: ["Pineal uncertain tumor"], documentation: [] };
  codes["D44.4"] = { code: "D44.4", description: "Neoplasm of uncertain behavior of endocrine pancreas", category: "D44", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic endocrine uncertain tumor"], documentation: [] };
  codes["D44.7"] = { code: "D44.7", description: "Neoplasm of uncertain behavior of other specified endocrine glands", category: "D44", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocrine uncertain tumor"], documentation: [] };
  codes["D44.9"] = { code: "D44.9", description: "Neoplasm of uncertain behavior of endocrine gland, unspecified", category: "D44", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocrine uncertain tumor NOS"], documentation: [] };
  codes["D45"] = { code: "D45", description: "Polycythemia vera", category: "D45", excludes1: [], excludes2: [], includes: [], commonUse: ["PV","Polycythemia"], documentation: [] };
  codes["D46.0"] = { code: "D46.0", description: "Refractory anemia without sideroblasts", category: "D46", excludes1: [], excludes2: [], includes: [], commonUse: ["RA"], documentation: [] };
  codes["D46.1"] = { code: "D46.1", description: "Refractory anemia with sideroblasts", category: "D46", excludes1: [], excludes2: [], includes: [], commonUse: ["RARS"], documentation: [] };
  codes["D46.2"] = { code: "D46.2", description: "Refractory anemia with excess blasts", category: "D46", excludes1: [], excludes2: [], includes: [], commonUse: ["RAEB"], documentation: [] };
  codes["D46.3"] = { code: "D46.3", description: "Refractory anemia with excess blasts in transformation", category: "D46", excludes1: [], excludes2: [], includes: [], commonUse: ["RAEB-T"], documentation: [] };
  codes["D46.4"] = { code: "D46.4", description: "Refractory cytopenia with multilineage dysplasia", category: "D46", excludes1: [], excludes2: [], includes: [], commonUse: ["RCMD"], documentation: [] };
  codes["D46.5"] = { code: "D46.5", description: "Refractory cytopenia with multilineage dysplasia and ringed sideroblasts", category: "D46", excludes1: [], excludes2: [], includes: [], commonUse: ["RCMD-RS"], documentation: [] };
  codes["D46.6"] = { code: "D46.6", description: "Myelodysplastic syndrome with isolated del(5q)", category: "D46", excludes1: [], excludes2: [], includes: [], commonUse: ["5q- syndrome"], documentation: [] };
  codes["D46.7"] = { code: "D46.7", description: "Other myelodysplastic syndromes", category: "D46", excludes1: [], excludes2: [], includes: [], commonUse: ["MDS NOS"], documentation: [] };
  codes["D46.9"] = { code: "D46.9", description: "Myelodysplastic syndrome, unspecified", category: "D46", excludes1: [], excludes2: [], includes: [], commonUse: ["MDS NOS"], documentation: [] };
  codes["D47.0"] = { code: "D47.0", description: "Histiocytic and mast cell tumors of uncertain behavior", category: "D47", excludes1: [], excludes2: [], includes: [], commonUse: ["Mast cell tumor"], documentation: [] };
  codes["D47.1"] = { code: "D47.1", description: "Chronic myeloproliferative disease", category: "D47", excludes1: [], excludes2: [], includes: [], commonUse: ["CMPD"], documentation: [] };
  codes["D47.2"] = { code: "D47.2", description: "Monoclonal gammopathy of undetermined significance [MGUS]", category: "D47", excludes1: [], excludes2: [], includes: [], commonUse: ["MGUS"], documentation: [] };
  codes["D47.3"] = { code: "D47.3", description: "Essential (hemorrhagic) thrombocythemia", category: "D47", excludes1: [], excludes2: [], includes: [], commonUse: ["Essential thrombocythemia","ET"], documentation: [] };
  codes["D47.4"] = { code: "D47.4", description: "Osteomyelofibrosis", category: "D47", excludes1: [], excludes2: [], includes: [], commonUse: ["Myelofibrosis","MF"], documentation: [] };
  codes["D47.5"] = { code: "D47.5", description: "Chronic myelomonocytic leukemia [CMML]", category: "D47", excludes1: [], excludes2: [], includes: [], commonUse: ["CMML"], documentation: [] };
  codes["D47.8"] = { code: "D47.8", description: "Other specified neoplasms of uncertain behavior of lymphoid, hematopoietic and related tissue", category: "D47", excludes1: [], excludes2: [], includes: [], commonUse: ["Hematologic uncertain tumor"], documentation: [] };
  codes["D47.9"] = { code: "D47.9", description: "Neoplasm of uncertain behavior of lymphoid, hematopoietic and related tissue, unspecified", category: "D47", excludes1: [], excludes2: [], includes: [], commonUse: ["Hematologic uncertain tumor NOS"], documentation: [] };
  codes["D48.0"] = { code: "D48.0", description: "Neoplasm of uncertain behavior of bone and articular cartilage", category: "D48", excludes1: [], excludes2: [], includes: [], commonUse: ["Bone uncertain tumor"], documentation: [] };
  codes["D48.1"] = { code: "D48.1", description: "Neoplasm of uncertain behavior of connective and other soft tissue", category: "D48", excludes1: [], excludes2: [], includes: [], commonUse: ["Soft tissue uncertain tumor"], documentation: [] };
  codes["D48.2"] = { code: "D48.2", description: "Neoplasm of uncertain behavior of peripheral nerves and autonomic nervous system", category: "D48", excludes1: [], excludes2: [], includes: [], commonUse: ["Nerve uncertain tumor"], documentation: [] };
  codes["D48.3"] = { code: "D48.3", description: "Neoplasm of uncertain behavior of retroperitoneum", category: "D48", excludes1: [], excludes2: [], includes: [], commonUse: ["Retroperitoneal uncertain tumor"], documentation: [] };
  codes["D48.4"] = { code: "D48.4", description: "Neoplasm of uncertain behavior of peritoneum", category: "D48", excludes1: [], excludes2: [], includes: [], commonUse: ["Peritoneal uncertain tumor"], documentation: [] };
  codes["D48.5"] = { code: "D48.5", description: "Neoplasm of uncertain behavior of skin", category: "D48", excludes1: [], excludes2: [], includes: [], commonUse: ["Skin uncertain tumor"], documentation: [] };
  codes["D48.6"] = { code: "D48.6", description: "Neoplasm of uncertain behavior of breast", category: "D48", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast uncertain tumor"], documentation: [] };
  codes["D48.7"] = { code: "D48.7", description: "Neoplasm of uncertain behavior of other specified sites", category: "D48", excludes1: [], excludes2: [], includes: [], commonUse: ["Uncertain tumor"], documentation: [] };
  codes["D48.9"] = { code: "D48.9", description: "Neoplasm of uncertain behavior, unspecified", category: "D48", excludes1: [], excludes2: [], includes: [], commonUse: ["Uncertain tumor NOS"], documentation: [] };
  codes["D49.0"] = { code: "D49.0", description: "Neoplasm of unspecified behavior of digestive organs", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive neoplasm UNS"], documentation: [] };
  codes["D49.1"] = { code: "D49.1", description: "Neoplasm of unspecified behavior of respiratory organs", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory neoplasm UNS"], documentation: [] };
  codes["D49.2"] = { code: "D49.2", description: "Neoplasm of unspecified behavior of bone, soft tissue, and skin", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["Bone/soft tissue neoplasm UNS"], documentation: [] };
  codes["D49.3"] = { code: "D49.3", description: "Neoplasm of unspecified behavior of breast", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast neoplasm UNS"], documentation: [] };
  codes["D49.4"] = { code: "D49.4", description: "Neoplasm of unspecified behavior of genitourinary organs", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["Genitourinary neoplasm UNS"], documentation: [] };
  codes["D49.5"] = { code: "D49.5", description: "Neoplasm of unspecified behavior of other endocrine glands", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocrine neoplasm UNS"], documentation: [] };
  codes["D49.6"] = { code: "D49.6", description: "Neoplasm of unspecified behavior of eye, brain and other parts of central nervous system", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["CNS neoplasm UNS"], documentation: [] };
  codes["D49.7"] = { code: "D49.7", description: "Neoplasm of unspecified behavior of lymphoid, hematopoietic and related tissue", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["Hematologic neoplasm UNS"], documentation: [] };
  codes["D49.8"] = { code: "D49.8", description: "Neoplasm of unspecified behavior of other specified sites", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["Neoplasm UNS"], documentation: [] };
  codes["D49.9"] = { code: "D49.9", description: "Neoplasm of unspecified behavior, unspecified site", category: "D49", excludes1: [], excludes2: [], includes: [], commonUse: ["Neoplasm UNS NOS"], documentation: [] };
  codes["D50.0"] = { code: "D50.0", description: "Iron deficiency anemia secondary to blood loss (chronic)", category: "D50", excludes1: [], excludes2: [], includes: [], commonUse: ["Anemia of chronic blood loss"], documentation: [] };
  codes["D50.1"] = { code: "D50.1", description: "Iron deficiency anemia secondary to inadequate iron intake", category: "D50", excludes1: [], excludes2: [], includes: [], commonUse: ["Dietary iron deficiency anemia"], documentation: [] };
  codes["D50.8"] = { code: "D50.8", description: "Other iron deficiency anemias", category: "D50", excludes1: [], excludes2: [], includes: [], commonUse: ["Iron deficiency anemia"], documentation: [] };
  codes["D50.9"] = { code: "D50.9", description: "Iron deficiency anemia, unspecified", category: "D50", excludes1: [], excludes2: [], includes: [], commonUse: ["Iron deficiency anemia NOS"], documentation: [] };
  codes["D51.0"] = { code: "D51.0", description: "Vitamin B12 deficiency anemia due to intrinsic factor deficiency", category: "D51", excludes1: [], excludes2: [], includes: [], commonUse: ["Pernicious anemia"], documentation: [] };
  codes["D51.1"] = { code: "D51.1", description: "Vitamin B12 deficiency anemia due to selective vitamin B12 malabsorption", category: "D51", excludes1: [], excludes2: [], includes: [], commonUse: ["B12 malabsorption"], documentation: [] };
  codes["D51.2"] = { code: "D51.2", description: "Vitamin B12 deficiency anemia due to dietary vitamin B12 deficiency", category: "D51", excludes1: [], excludes2: [], includes: [], commonUse: ["Dietary B12 deficiency"], documentation: [] };
  codes["D51.3"] = { code: "D51.3", description: "Other dietary vitamin B12 deficiency anemia", category: "D51", excludes1: [], excludes2: [], includes: [], commonUse: ["B12 deficiency anemia"], documentation: [] };
  codes["D51.8"] = { code: "D51.8", description: "Other vitamin B12 deficiency anemias", category: "D51", excludes1: [], excludes2: [], includes: [], commonUse: ["B12 deficiency anemia"], documentation: [] };
  codes["D51.9"] = { code: "D51.9", description: "Vitamin B12 deficiency anemia, unspecified", category: "D51", excludes1: [], excludes2: [], includes: [], commonUse: ["B12 deficiency anemia NOS"], documentation: [] };
  codes["D52.0"] = { code: "D52.0", description: "Folate deficiency anemia due to inadequate folate intake", category: "D52", excludes1: [], excludes2: [], includes: [], commonUse: ["Dietary folate deficiency anemia"], documentation: [] };
  codes["D52.1"] = { code: "D52.1", description: "Folate deficiency anemia due to malabsorption", category: "D52", excludes1: [], excludes2: [], includes: [], commonUse: ["Folate malabsorption"], documentation: [] };
  codes["D52.8"] = { code: "D52.8", description: "Other folate deficiency anemias", category: "D52", excludes1: [], excludes2: [], includes: [], commonUse: ["Folate deficiency anemia"], documentation: [] };
  codes["D52.9"] = { code: "D52.9", description: "Folate deficiency anemia, unspecified", category: "D52", excludes1: [], excludes2: [], includes: [], commonUse: ["Folate deficiency anemia NOS"], documentation: [] };
  codes["D53.0"] = { code: "D53.0", description: "Anemia due to protein deficiency", category: "D53", excludes1: [], excludes2: [], includes: [], commonUse: ["Protein deficiency anemia"], documentation: [] };
  codes["D53.1"] = { code: "D53.1", description: "Megaloblastic anemia, not elsewhere classified", category: "D53", excludes1: [], excludes2: [], includes: [], commonUse: ["Megaloblastic anemia NOS"], documentation: [] };
  codes["D53.2"] = { code: "D53.2", description: "Anemia due to disorders of nucleotide metabolism", category: "D53", excludes1: [], excludes2: [], includes: [], commonUse: ["Nucleotide metabolism anemia"], documentation: [] };
  codes["D53.8"] = { code: "D53.8", description: "Other specified nutritional anemias", category: "D53", excludes1: [], excludes2: [], includes: [], commonUse: ["Nutritional anemia"], documentation: [] };
  codes["D53.9"] = { code: "D53.9", description: "Nutritional anemia, unspecified", category: "D53", excludes1: [], excludes2: [], includes: [], commonUse: ["Nutritional anemia NOS"], documentation: [] };
  codes["D55.0"] = { code: "D55.0", description: "Anemia due to glucose-6-phosphate dehydrogenase deficiency", category: "D55", excludes1: [], excludes2: [], includes: [], commonUse: ["G6PD deficiency anemia"], documentation: [] };
  codes["D55.1"] = { code: "D55.1", description: "Anemia due to other disorders of glutathione metabolism", category: "D55", excludes1: [], excludes2: [], includes: [], commonUse: ["Glutathione metabolism anemia"], documentation: [] };
  codes["D55.2"] = { code: "D55.2", description: "Anemia due to disorders of glycolytic enzymes", category: "D55", excludes1: [], excludes2: [], includes: [], commonUse: ["Glycolytic enzyme anemia"], documentation: [] };
  codes["D55.8"] = { code: "D55.8", description: "Other anemias due to enzyme disorders", category: "D55", excludes1: [], excludes2: [], includes: [], commonUse: ["Enzyme disorder anemia"], documentation: [] };
  codes["D55.9"] = { code: "D55.9", description: "Anemia due to enzyme disorder, unspecified", category: "D55", excludes1: [], excludes2: [], includes: [], commonUse: ["Enzyme disorder anemia NOS"], documentation: [] };
  codes["D56.0"] = { code: "D56.0", description: "Thalassemia minor", category: "D56", excludes1: [], excludes2: [], includes: [], commonUse: ["Beta thalassemia trait","Alpha thalassemia trait"], documentation: [] };
  codes["D56.1"] = { code: "D56.1", description: "Beta thalassemia major", category: "D56", excludes1: [], excludes2: [], includes: [], commonUse: ["Cooley anemia","Thalassemia major"], documentation: [] };
  codes["D56.2"] = { code: "D56.2", description: "Beta thalassemia intermedia", category: "D56", excludes1: [], excludes2: [], includes: [], commonUse: ["Thalassemia intermedia"], documentation: [] };
  codes["D56.3"] = { code: "D56.3", description: "Sickle cell-hemoglobin C disease", category: "D56", excludes1: [], excludes2: [], includes: [], commonUse: ["HbSC disease"], documentation: [] };
  codes["D56.4"] = { code: "D56.4", description: "Hereditary persistence of fetal hemoglobin", category: "D56", excludes1: [], excludes2: [], includes: [], commonUse: ["HPFH"], documentation: [] };
  codes["D56.8"] = { code: "D56.8", description: "Other thalassemias", category: "D56", excludes1: [], excludes2: [], includes: [], commonUse: ["Other thalassemia"], documentation: [] };
  codes["D56.9"] = { code: "D56.9", description: "Thalassemia, unspecified", category: "D56", excludes1: [], excludes2: [], includes: [], commonUse: ["Thalassemia NOS"], documentation: [] };
  codes["D57.0"] = { code: "D57.0", description: "Sickle-cell anemia with crisis", category: "D57", excludes1: [], excludes2: [], includes: [], commonUse: ["Sickle cell crisis","Vaso-occlusive crisis"], documentation: [] };
  codes["D57.1"] = { code: "D57.1", description: "Sickle-cell anemia without crisis", category: "D57", excludes1: [], excludes2: [], includes: [], commonUse: ["Sickle cell disease"], documentation: [] };
  codes["D57.2"] = { code: "D57.2", description: "Sickle-cell/Hb-C disease", category: "D57", excludes1: [], excludes2: [], includes: [], commonUse: ["Sickle-HbC disease"], documentation: [] };
  codes["D57.3"] = { code: "D57.3", description: "Sickle-cell trait", category: "D57", excludes1: [], excludes2: [], includes: [], commonUse: ["Sickle cell trait","HbAS"], documentation: [] };
  codes["D57.8"] = { code: "D57.8", description: "Other sickle-cell disorders", category: "D57", excludes1: [], excludes2: [], includes: [], commonUse: ["Other sickle cell disorders"], documentation: [] };
  codes["D58.0"] = { code: "D58.0", description: "Hereditary spherocytosis", category: "D58", excludes1: [], excludes2: [], includes: [], commonUse: ["Spherocytosis"], documentation: [] };
  codes["D58.1"] = { code: "D58.1", description: "Hereditary elliptocytosis", category: "D58", excludes1: [], excludes2: [], includes: [], commonUse: ["Elliptocytosis"], documentation: [] };
  codes["D58.2"] = { code: "D58.2", description: "Hemoglobin E disease", category: "D58", excludes1: [], excludes2: [], includes: [], commonUse: ["HbE disease"], documentation: [] };
  codes["D58.8"] = { code: "D58.8", description: "Other hereditary hemolytic anemias", category: "D58", excludes1: [], excludes2: [], includes: [], commonUse: ["Hereditary hemolytic anemia"], documentation: [] };
  codes["D58.9"] = { code: "D58.9", description: "Hereditary hemolytic anemia, unspecified", category: "D58", excludes1: [], excludes2: [], includes: [], commonUse: ["Hereditary hemolytic anemia NOS"], documentation: [] };
  codes["D59.0"] = { code: "D59.0", description: "Drug-induced autoimmune hemolytic anemia", category: "D59", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced hemolytic anemia"], documentation: [] };
  codes["D59.1"] = { code: "D59.1", description: "Other autoimmune hemolytic anemias", category: "D59", excludes1: [], excludes2: [], includes: [], commonUse: ["Autoimmune hemolytic anemia","AIHA"], documentation: [] };
  codes["D59.2"] = { code: "D59.2", description: "Drug-induced non-autoimmune hemolytic anemia", category: "D59", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced hemolytic anemia"], documentation: [] };
  codes["D59.3"] = { code: "D59.3", description: "Hemolytic-uremic syndrome", category: "D59", excludes1: [], excludes2: [], includes: [], commonUse: ["HUS"], documentation: [] };
  codes["D59.4"] = { code: "D59.4", description: "Other non-autoimmune hemolytic anemias", category: "D59", excludes1: [], excludes2: [], includes: [], commonUse: ["Non-autoimmune hemolytic anemia"], documentation: [] };
  codes["D59.5"] = { code: "D59.5", description: "Paroxysmal nocturnal hemoglobinuria [Marchiafava-Micheli]", category: "D59", excludes1: [], excludes2: [], includes: [], commonUse: ["PNH"], documentation: [] };
  codes["D59.6"] = { code: "D59.6", description: "Hemolysis due to exogenous agents", category: "D59", excludes1: [], excludes2: [], includes: [], commonUse: ["Exogenous hemolysis"], documentation: [] };
  codes["D59.8"] = { code: "D59.8", description: "Other acquired hemolytic anemias", category: "D59", excludes1: [], excludes2: [], includes: [], commonUse: ["Acquired hemolytic anemia"], documentation: [] };
  codes["D59.9"] = { code: "D59.9", description: "Acquired hemolytic anemia, unspecified", category: "D59", excludes1: [], excludes2: [], includes: [], commonUse: ["Acquired hemolytic anemia NOS"], documentation: [] };
  codes["D60.0"] = { code: "D60.0", description: "Acute aplastic anemia", category: "D61", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute aplastic anemia"], documentation: [] };
  codes["D60.1"] = { code: "D60.1", description: "Chronic aplastic anemia", category: "D61", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic aplastic anemia"], documentation: [] };
  codes["D60.2"] = { code: "D60.2", description: "Aplastic anemia, unspecified", category: "D61", excludes1: [], excludes2: [], includes: [], commonUse: ["Aplastic anemia NOS"], documentation: [] };
  codes["D60.8"] = { code: "D60.8", description: "Other aplastic anemias", category: "D61", excludes1: [], excludes2: [], includes: [], commonUse: ["Aplastic anemia"], documentation: [] };
  codes["D60.9"] = { code: "D60.9", description: "Aplastic anemia, unspecified", category: "D61", excludes1: [], excludes2: [], includes: [], commonUse: ["Aplastic anemia NOS"], documentation: [] };
  codes["D61.3"] = { code: "D61.3", description: "Idiopathic aplastic anemia", category: "D61", excludes1: [], excludes2: [], includes: [], commonUse: ["Idiopathic aplastic anemia"], documentation: [] };
  codes["D61.8"] = { code: "D61.8", description: "Other specified aplastic anemias", category: "D61", excludes1: [], excludes2: [], includes: [], commonUse: ["Aplastic anemia"], documentation: [] };
  codes["D61.9"] = { code: "D61.9", description: "Aplastic anemia, unspecified", category: "D61", excludes1: [], excludes2: [], includes: [], commonUse: ["Aplastic anemia NOS"], documentation: [] };
  codes["D62"] = { code: "D62", description: "Acute posthemorrhagic anemia", category: "D62", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute blood loss anemia","Posthemorrhagic anemia"], documentation: [] };
  codes["D63.0"] = { code: "D63.0", description: "Anemia in neoplastic disease", category: "D63", excludes1: [], excludes2: [], includes: [], commonUse: ["Anemia of malignancy"], documentation: [] };
  codes["D63.1"] = { code: "D63.1", description: "Anemia in chronic kidney disease", category: "D63", excludes1: [], excludes2: [], includes: [], commonUse: ["Anemia of CKD","Renal anemia"], documentation: [] };
  codes["D63.2"] = { code: "D63.2", description: "Anemia of endocrine disorder", category: "D63", excludes1: [], excludes2: [], includes: [], commonUse: ["Endocrine anemia"], documentation: [] };
  codes["D63.8"] = { code: "D63.8", description: "Anemia in other chronic diseases", category: "D63", excludes1: [], excludes2: [], includes: [], commonUse: ["Anemia of chronic disease","ACD"], documentation: [] };
  codes["D63.9"] = { code: "D63.9", description: "Anemia in chronic disease, unspecified", category: "D63", excludes1: [], excludes2: [], includes: [], commonUse: ["Anemia of chronic disease NOS"], documentation: [] };
  codes["D64.0"] = { code: "D64.0", description: "Hereditary sideroblastic anemia", category: "D64", excludes1: [], excludes2: [], includes: [], commonUse: ["Sideroblastic anemia"], documentation: [] };
  codes["D64.1"] = { code: "D64.1", description: "Secondary sideroblastic anemia", category: "D64", excludes1: [], excludes2: [], includes: [], commonUse: ["Acquired sideroblastic anemia"], documentation: [] };
  codes["D64.2"] = { code: "D64.2", description: "Sideroblastic anemia due to other drugs and toxins", category: "D64", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced sideroblastic anemia"], documentation: [] };
  codes["D64.3"] = { code: "D64.3", description: "Other sideroblastic anemias", category: "D64", excludes1: [], excludes2: [], includes: [], commonUse: ["Sideroblastic anemia"], documentation: [] };
  codes["D64.4"] = { code: "D64.4", description: "Dyserythropoietic anemia", category: "D64", excludes1: [], excludes2: [], includes: [], commonUse: ["Dyserythropoietic anemia"], documentation: [] };
  codes["D64.8"] = { code: "D64.8", description: "Other specified anemias", category: "D64", excludes1: [], excludes2: [], includes: [], commonUse: ["Other anemias"], documentation: [] };
  codes["D64.9"] = { code: "D64.9", description: "Anemia, unspecified", category: "D64", excludes1: [], excludes2: [], includes: [], commonUse: ["Anemia NOS"], documentation: [] };
  codes["D65"] = { code: "D65", description: "Disseminated intravascular coagulation [defibrination syndrome]", category: "D65", excludes1: [], excludes2: [], includes: [], commonUse: ["DIC"], documentation: [] };
  codes["D66"] = { code: "D66", description: "Hereditary factor VIII deficiency", category: "D66", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemophilia A"], documentation: [] };
  codes["D67"] = { code: "D67", description: "Hereditary factor IX deficiency", category: "D67", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemophilia B","Christmas disease"], documentation: [] };
  codes["D68.0"] = { code: "D68.0", description: "Von Willebrand disease", category: "D68", excludes1: [], excludes2: [], includes: [], commonUse: ["vWD"], documentation: [] };
  codes["D68.1"] = { code: "D68.1", description: "Hereditary factor XI deficiency", category: "D68", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemophilia C"], documentation: [] };
  codes["D68.2"] = { code: "D68.2", description: "Hereditary deficiency of other clotting factors", category: "D68", excludes1: [], excludes2: [], includes: [], commonUse: ["Clotting factor deficiency"], documentation: [] };
  codes["D68.3"] = { code: "D68.3", description: "Hemorrhagic disorder due to circulating anticoagulants", category: "D68", excludes1: [], excludes2: [], includes: [], commonUse: ["Acquired coagulopathy"], documentation: [] };
  codes["D68.4"] = { code: "D68.4", description: "Acquired coagulation factor deficiency", category: "D68", excludes1: [], excludes2: [], includes: [], commonUse: ["Acquired coagulopathy"], documentation: [] };
  codes["D68.5"] = { code: "D68.5", description: "Thrombophilia due to antiphospholipid antibodies", category: "D68", excludes1: [], excludes2: [], includes: [], commonUse: ["APL syndrome","Antiphospholipid syndrome"], documentation: [] };
  codes["D68.6"] = { code: "D68.6", description: "Other thrombophilia", category: "D68", excludes1: [], excludes2: [], includes: [], commonUse: ["Thrombophilia"], documentation: [] };
  codes["D68.8"] = { code: "D68.8", description: "Other specified coagulation defects", category: "D68", excludes1: [], excludes2: [], includes: [], commonUse: ["Coagulation defect"], documentation: [] };
  codes["D68.9"] = { code: "D68.9", description: "Coagulation defect, unspecified", category: "D68", excludes1: [], excludes2: [], includes: [], commonUse: ["Coagulation defect NOS"], documentation: [] };
  codes["D69.0"] = { code: "D69.0", description: "Allergic purpura", category: "D69", excludes1: [], excludes2: [], includes: [], commonUse: ["Henoch-Schonlein purpura","IgA vasculitis"], documentation: [] };
  codes["D69.1"] = { code: "D69.1", description: "Qualitative platelet defects", category: "D69", excludes1: [], excludes2: [], includes: [], commonUse: ["Platelet function defect"], documentation: [] };
  codes["D69.2"] = { code: "D69.2", description: "Other nonthrombocytopenic purpura", category: "D69", excludes1: [], excludes2: [], includes: [], commonUse: ["Purpura"], documentation: [] };
  codes["D69.3"] = { code: "D69.3", description: "Idiopathic thrombocytopenic purpura", category: "D69", excludes1: [], excludes2: [], includes: [], commonUse: ["ITP","Immune thrombocytopenia"], documentation: [] };
  codes["D69.4"] = { code: "D69.4", description: "Other primary thrombocytopenia", category: "D69", excludes1: [], excludes2: [], includes: [], commonUse: ["Thrombocytopenia"], documentation: [] };
  codes["D69.5"] = { code: "D69.5", description: "Secondary thrombocytopenia", category: "D69", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary thrombocytopenia"], documentation: [] };
  codes["D69.6"] = { code: "D69.6", description: "Thrombocytopenia, unspecified", category: "D69", excludes1: [], excludes2: [], includes: [], commonUse: ["Thrombocytopenia NOS"], documentation: [] };
  codes["D69.8"] = { code: "D69.8", description: "Other specified hemorrhagic conditions", category: "D69", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemorrhagic condition"], documentation: [] };
  codes["D69.9"] = { code: "D69.9", description: "Hemorrhagic condition, unspecified", category: "D69", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemorrhagic condition NOS"], documentation: [] };
  codes["D70.0"] = { code: "D70.0", description: "Agranulocytosis", category: "D70", excludes1: [], excludes2: [], includes: [], commonUse: ["Agranulocytosis","Neutropenia"], documentation: [] };
  codes["D70.1"] = { code: "D70.1", description: "Agranulocytosis due to infection", category: "D70", excludes1: [], excludes2: [], includes: [], commonUse: ["Infection-related neutropenia"], documentation: [] };
  codes["D70.2"] = { code: "D70.2", description: "Cyclic neutropenia", category: "D70", excludes1: [], excludes2: [], includes: [], commonUse: ["Cyclic neutropenia"], documentation: [] };
  codes["D70.3"] = { code: "D70.3", description: "Neutropenia due to chemotherapy", category: "D70", excludes1: [], excludes2: [], includes: [], commonUse: ["Chemotherapy-induced neutropenia"], documentation: [] };
  codes["D70.4"] = { code: "D70.4", description: "Neutropenia due to drugs", category: "D70", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced neutropenia"], documentation: [] };
  codes["D70.8"] = { code: "D70.8", description: "Other neutropenias", category: "D70", excludes1: [], excludes2: [], includes: [], commonUse: ["Neutropenia"], documentation: [] };
  codes["D70.9"] = { code: "D70.9", description: "Neutropenia, unspecified", category: "D70", excludes1: [], excludes2: [], includes: [], commonUse: ["Neutropenia NOS"], documentation: [] };
  codes["D71.0"] = { code: "D71.0", description: "Chronic granulomatous disease", category: "D72", excludes1: [], excludes2: [], includes: [], commonUse: ["CGD"], documentation: [] };
  codes["D71.1"] = { code: "D71.1", description: "Leukocyte adhesion deficiency", category: "D72", excludes1: [], excludes2: [], includes: [], commonUse: ["LAD"], documentation: [] };
  codes["D71.2"] = { code: "D71.2", description: "Other functional disorders of polymorphonuclear neutrophils", category: "D72", excludes1: [], excludes2: [], includes: [], commonUse: ["Neutrophil function defect"], documentation: [] };
  codes["D71.3"] = { code: "D71.3", description: "Other specified disorders of white blood cells", category: "D72", excludes1: [], excludes2: [], includes: [], commonUse: ["White blood cell disorder"], documentation: [] };
  codes["D71.9"] = { code: "D71.9", description: "Disorder of white blood cells, unspecified", category: "D72", excludes1: [], excludes2: [], includes: [], commonUse: ["White blood cell disorder NOS"], documentation: [] };
  codes["D72.8"] = { code: "D72.8", description: "Other specified disorders of white blood cells", category: "D72", excludes1: [], excludes2: [], includes: [], commonUse: ["White blood cell disorder"], documentation: [] };
  codes["D72.9"] = { code: "D72.9", description: "Disorder of white blood cells, unspecified", category: "D72", excludes1: [], excludes2: [], includes: [], commonUse: ["White blood cell disorder NOS"], documentation: [] };
  codes["D73.0"] = { code: "D73.0", description: "Hypersplenism", category: "D73", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypersplenism"], documentation: [] };
  codes["D73.1"] = { code: "D73.1", description: "Hypersplenism, unspecified", category: "D73", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypersplenism NOS"], documentation: [] };
  codes["D73.2"] = { code: "D73.2", description: "Chronic congestive splenomegaly", category: "D73", excludes1: [], excludes2: [], includes: [], commonUse: ["Congestive splenomegaly"], documentation: [] };
  codes["D73.3"] = { code: "D73.3", description: "Abscess of spleen", category: "D73", excludes1: [], excludes2: [], includes: [], commonUse: ["Splenic abscess"], documentation: [] };
  codes["D73.4"] = { code: "D73.4", description: "Cyst of spleen", category: "D73", excludes1: [], excludes2: [], includes: [], commonUse: ["Splenic cyst"], documentation: [] };
  codes["D73.5"] = { code: "D73.5", description: "Infarction of spleen", category: "D73", excludes1: [], excludes2: [], includes: [], commonUse: ["Splenic infarction"], documentation: [] };
  codes["D73.8"] = { code: "D73.8", description: "Other diseases of spleen", category: "D73", excludes1: [], excludes2: [], includes: [], commonUse: ["Spleen disease"], documentation: [] };
  codes["D73.9"] = { code: "D73.9", description: "Disease of spleen, unspecified", category: "D73", excludes1: [], excludes2: [], includes: [], commonUse: ["Spleen disease NOS"], documentation: [] };
  codes["D75.0"] = { code: "D75.0", description: "Familial erythrocytosis", category: "D75", excludes1: [], excludes2: [], includes: [], commonUse: ["Familial polycythemia"], documentation: [] };
  codes["D75.1"] = { code: "D75.1", description: "Secondary polycythemia", category: "D75", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary polycythemia"], documentation: [] };
  codes["D75.2"] = { code: "D75.2", description: "Essential thrombocytosis", category: "D75", excludes1: [], excludes2: [], includes: [], commonUse: ["Essential thrombocytosis"], documentation: [] };
  codes["D75.8"] = { code: "D75.8", description: "Other specified diseases of blood and blood-forming organs", category: "D75", excludes1: [], excludes2: [], includes: [], commonUse: ["Blood disorder"], documentation: [] };
  codes["D75.9"] = { code: "D75.9", description: "Disease of blood and blood-forming organs, unspecified", category: "D75", excludes1: [], excludes2: [], includes: [], commonUse: ["Blood disorder NOS"], documentation: [] };
  codes["D80.0"] = { code: "D80.0", description: "Hypogammaglobulinemia due to deficiency of secretory component", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["Secretory IgA deficiency"], documentation: [] };
  codes["D80.1"] = { code: "D80.1", description: "Nonfamilial hypogammaglobulinemia", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["Common variable immunodeficiency","CVID"], documentation: [] };
  codes["D80.2"] = { code: "D80.2", description: "Selective deficiency of immunoglobulin A [IgA]", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["IgA deficiency"], documentation: [] };
  codes["D80.3"] = { code: "D80.3", description: "Selective deficiency of immunoglobulin G [IgG] subclasses", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["IgG subclass deficiency"], documentation: [] };
  codes["D80.4"] = { code: "D80.4", description: "Selective deficiency of immunoglobulin M [IgM]", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["IgM deficiency"], documentation: [] };
  codes["D80.5"] = { code: "D80.5", description: "Immunodeficiency with increased immunoglobulin M [IgM]", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyper IgM syndrome"], documentation: [] };
  codes["D80.6"] = { code: "D80.6", description: "Antibody deficiency with near-normal immunoglobulins or with hyperimmunoglobulinemia", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["Antibody deficiency"], documentation: [] };
  codes["D80.7"] = { code: "D80.7", description: "Transient hypogammaglobulinemia of infancy", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["Transient hypogammaglobulinemia"], documentation: [] };
  codes["D80.8"] = { code: "D80.8", description: "Other specified immunodeficiencies with predominant antibody defect", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["Antibody defect"], documentation: [] };
  codes["D80.9"] = { code: "D80.9", description: "Immunodeficiency with predominant antibody defect, unspecified", category: "D80", excludes1: [], excludes2: [], includes: [], commonUse: ["Antibody defect NOS"], documentation: [] };
  codes["D81.0"] = { code: "D81.0", description: "Severe combined immunodeficiency [SCID] with reticular dysgenesis", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["SCID - reticular dysgenesis"], documentation: [] };
  codes["D81.1"] = { code: "D81.1", description: "Severe combined immunodeficiency [SCID] with adenosine deaminase deficiency", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["SCID - ADA deficiency"], documentation: [] };
  codes["D81.2"] = { code: "D81.2", description: "Severe combined immunodeficiency [SCID] due to purine nucleoside phosphorylase deficiency", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["SCID - PNP deficiency"], documentation: [] };
  codes["D81.3"] = { code: "D81.3", description: "Adenosine deaminase [ADA] deficiency", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["ADA deficiency"], documentation: [] };
  codes["D81.4"] = { code: "D81.4", description: "Nezelof syndrome", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["Nezelof syndrome"], documentation: [] };
  codes["D81.5"] = { code: "D81.5", description: "Purine nucleoside phosphorylase [PNP] deficiency", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["PNP deficiency"], documentation: [] };
  codes["D81.6"] = { code: "D81.6", description: "Major histocompatibility complex class I deficiency", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["MHC class I deficiency"], documentation: [] };
  codes["D81.7"] = { code: "D81.7", description: "Major histocompatibility complex class II deficiency", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["MHC class II deficiency"], documentation: [] };
  codes["D81.8"] = { code: "D81.8", description: "Other combined immunodeficiencies", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["Combined immunodeficiency"], documentation: [] };
  codes["D81.9"] = { code: "D81.9", description: "Combined immunodeficiency, unspecified", category: "D81", excludes1: [], excludes2: [], includes: [], commonUse: ["Combined immunodeficiency NOS"], documentation: [] };
  codes["D82.0"] = { code: "D82.0", description: "Wiskott-Aldrich syndrome", category: "D82", excludes1: [], excludes2: [], includes: [], commonUse: ["WAS"], documentation: [] };
  codes["D82.1"] = { code: "D82.1", description: "Di George syndrome", category: "D82", excludes1: [], excludes2: [], includes: [], commonUse: ["22q11.2 deletion syndrome","Velocardiofacial syndrome"], documentation: [] };
  codes["D82.2"] = { code: "D82.2", description: "Ataxia-telangiectasia [Louis-Bar syndrome]", category: "D82", excludes1: [], excludes2: [], includes: [], commonUse: ["AT","Ataxia-telangiectasia"], documentation: [] };
  codes["D82.3"] = { code: "D82.3", description: "Immunodeficiency due to defective extrinsic (Th1) pathway", category: "D82", excludes1: [], excludes2: [], includes: [], commonUse: ["Th1 pathway defect"], documentation: [] };
  codes["D82.4"] = { code: "D82.4", description: "Hyper IgE syndrome", category: "D82", excludes1: [], excludes2: [], includes: [], commonUse: ["Job syndrome"], documentation: [] };
  codes["D82.8"] = { code: "D82.8", description: "Immunodeficiency associated with other specified major defects", category: "D82", excludes1: [], excludes2: [], includes: [], commonUse: ["Immunodeficiency with major defect"], documentation: [] };
  codes["D82.9"] = { code: "D82.9", description: "Immunodeficiency associated with major defect, unspecified", category: "D82", excludes1: [], excludes2: [], includes: [], commonUse: ["Immunodeficiency with major defect NOS"], documentation: [] };
  codes["D83.0"] = { code: "D83.0", description: "Common variable immunodeficiency with predominant abnormalities of B-cell numbers and function", category: "D83", excludes1: [], excludes2: [], includes: [], commonUse: ["CVID with B-cell abnormality"], documentation: [] };
  codes["D83.1"] = { code: "D83.1", description: "Common variable immunodeficiency with predominant immunoglobulin abnormalities", category: "D83", excludes1: [], excludes2: [], includes: [], commonUse: ["CVID with Ig abnormality"], documentation: [] };
  codes["D83.2"] = { code: "D83.2", description: "Common variable immunodeficiency with autoantibodies to B or T cells", category: "D83", excludes1: [], excludes2: [], includes: [], commonUse: ["CVID with autoantibodies"], documentation: [] };
  codes["D83.8"] = { code: "D83.8", description: "Other common variable immunodeficiencies", category: "D83", excludes1: [], excludes2: [], includes: [], commonUse: ["CVID"], documentation: [] };
  codes["D83.9"] = { code: "D83.9", description: "Common variable immunodeficiency, unspecified", category: "D83", excludes1: [], excludes2: [], includes: [], commonUse: ["CVID NOS"], documentation: [] };
  codes["D84.0"] = { code: "D84.0", description: "Immunodeficiency due to lymphocyte adhesion molecule defect", category: "D84", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymphocyte adhesion defect"], documentation: [] };
  codes["D84.1"] = { code: "D84.1", description: "Defects in the complement system", category: "D84", excludes1: [], excludes2: [], includes: [], commonUse: ["Complement deficiency"], documentation: [] };
  codes["D84.2"] = { code: "D84.2", description: "Other specified immunodeficiencies", category: "D84", excludes1: [], excludes2: [], includes: [], commonUse: ["Other immunodeficiency"], documentation: [] };
  codes["D84.8"] = { code: "D84.8", description: "Other specified immunodeficiencies", category: "D84", excludes1: [], excludes2: [], includes: [], commonUse: ["Other immunodeficiency"], documentation: [] };
  codes["D84.9"] = { code: "D84.9", description: "Immunodeficiency, unspecified", category: "D84", excludes1: [], excludes2: [], includes: [], commonUse: ["Immunodeficiency NOS"], documentation: [] };
  codes["D86.0"] = { code: "D86.0", description: "Sarcoidosis of lung", category: "D86", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary sarcoidosis","Sarcoidosis"], documentation: [] };
  codes["D86.1"] = { code: "D86.1", description: "Sarcoidosis of lymph nodes", category: "D86", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymph node sarcoidosis"], documentation: [] };
  codes["D86.2"] = { code: "D86.2", description: "Sarcoidosis of lung with sarcoidosis of lymph nodes", category: "D86", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary and lymph node sarcoidosis"], documentation: [] };
  codes["D86.3"] = { code: "D86.3", description: "Sarcoidosis of spleen", category: "D86", excludes1: [], excludes2: [], includes: [], commonUse: ["Splenic sarcoidosis"], documentation: [] };
  codes["D86.8"] = { code: "D86.8", description: "Sarcoidosis of other sites", category: "D86", excludes1: [], excludes2: [], includes: [], commonUse: ["Sarcoidosis - other site"], documentation: [] };
  codes["D86.9"] = { code: "D86.9", description: "Sarcoidosis, unspecified", category: "D86", excludes1: [], excludes2: [], includes: [], commonUse: ["Sarcoidosis NOS"], documentation: [] };
  codes["D89.0"] = { code: "D89.0", description: "Polyclonal hypergammaglobulinemia", category: "D89", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyclonal hypergammaglobulinemia"], documentation: [] };
  codes["D89.1"] = { code: "D89.1", description: "Monoclonal gammopathy of undetermined significance (MGUS)", category: "D89", excludes1: [], excludes2: [], includes: [], commonUse: ["MGUS"], documentation: [] };
  codes["D89.2"] = { code: "D89.2", description: "Monoclonal gammopathy, unspecified", category: "D89", excludes1: [], excludes2: [], includes: [], commonUse: ["Monoclonal gammopathy NOS"], documentation: [] };
  codes["D89.3"] = { code: "D89.3", description: "Polyclonal hypergammaglobulinemia, unspecified", category: "D89", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyclonal hypergammaglobulinemia NOS"], documentation: [] };
  codes["D89.4"] = { code: "D89.4", description: "Autoimmune lymphoproliferative syndrome [ALPS]", category: "D89", excludes1: [], excludes2: [], includes: [], commonUse: ["ALPS"], documentation: [] };
  codes["D89.5"] = { code: "D89.5", description: "Other specified hypergammaglobulinemia", category: "D89", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypergammaglobulinemia"], documentation: [] };
  codes["D89.6"] = { code: "D89.6", description: "Combined immunodeficiency, unspecified", category: "D89", excludes1: [], excludes2: [], includes: [], commonUse: ["Combined immunodeficiency NOS"], documentation: [] };
  codes["D89.8"] = { code: "D89.8", description: "Other specified disorders involving the immune mechanism", category: "D89", excludes1: [], excludes2: [], includes: [], commonUse: ["Immune disorder"], documentation: [] };
  codes["D89.9"] = { code: "D89.9", description: "Disorder involving the immune mechanism, unspecified", category: "D89", excludes1: [], excludes2: [], includes: [], commonUse: ["Immune disorder NOS"], documentation: [] };
  codes["E00.0"] = { code: "E00.0", description: "Congenital iodine-deficiency syndrome with myxedematous cretinism", category: "E00", excludes1: [], excludes2: [], includes: [], commonUse: ["Cretinism with hypothyroidism"], documentation: [] };
  codes["E00.1"] = { code: "E00.1", description: "Congenital iodine-deficiency syndrome with neurological features", category: "E00", excludes1: [], excludes2: [], includes: [], commonUse: ["Cretinism - neurological"], documentation: [] };
  codes["E00.2"] = { code: "E00.2", description: "Congenital iodine-deficiency syndrome with mixed features", category: "E00", excludes1: [], excludes2: [], includes: [], commonUse: ["Cretinism - mixed"], documentation: [] };
  codes["E00.9"] = { code: "E00.9", description: "Congenital iodine-deficiency syndrome, unspecified", category: "E00", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital iodine deficiency NOS"], documentation: [] };
  codes["E01.0"] = { code: "E01.0", description: "Iodine-deficiency-related diffuse goiter (endemic goiter)", category: "E01", excludes1: [], excludes2: [], includes: [], commonUse: ["Endemic goiter"], documentation: [] };
  codes["E01.1"] = { code: "E01.1", description: "Iodine-deficiency-related multinodular goiter (endemic goiter)", category: "E01", excludes1: [], excludes2: [], includes: [], commonUse: ["Endemic multinodular goiter"], documentation: [] };
  codes["E01.2"] = { code: "E01.2", description: "Iodine-deficiency-related goiter, unspecified", category: "E01", excludes1: [], excludes2: [], includes: [], commonUse: ["Iodine-deficiency goiter NOS"], documentation: [] };
  codes["E01.8"] = { code: "E01.8", description: "Iodine-deficiency-related hypothyroidism and allied conditions", category: "E01", excludes1: [], excludes2: [], includes: [], commonUse: ["Iodine-deficiency hypothyroidism"], documentation: [] };
  codes["E02"] = { code: "E02", description: "Subclinical iodine-deficiency hypothyroidism", category: "E02", excludes1: [], excludes2: [], includes: [], commonUse: ["Subclinical hypothyroidism from iodine deficiency"], documentation: [] };
  codes["E03.0"] = { code: "E03.0", description: "Congenital hypothyroidism with diffuse goiter", category: "E03", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital hypothyroidism with goiter"], documentation: [] };
  codes["E03.1"] = { code: "E03.1", description: "Congenital hypothyroidism without goiter", category: "E03", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital hypothyroidism NOS"], documentation: [] };
  codes["E03.2"] = { code: "E03.2", description: "Hypothyroidism due to medicaments and other exogenous substances", category: "E03", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced hypothyroidism"], documentation: [] };
  codes["E03.3"] = { code: "E03.3", description: "Postinfectious hypothyroidism", category: "E03", excludes1: [], excludes2: [], includes: [], commonUse: ["Post thyroiditis hypothyroidism"], documentation: [] };
  codes["E03.4"] = { code: "E03.4", description: "Atrophy of thyroid (acquired)", category: "E03", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid atrophy"], documentation: [] };
  codes["E03.5"] = { code: "E03.5", description: "Other hypothyroidism", category: "E03", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypothyroidism"], documentation: [] };
  codes["E03.8"] = { code: "E03.8", description: "Other specified hypothyroidism", category: "E03", excludes1: [], excludes2: [], includes: [], commonUse: ["Other hypothyroidism"], documentation: [] };
  codes["E03.9"] = { code: "E03.9", description: "Hypothyroidism, unspecified", category: "E03", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypothyroidism NOS","Underactive thyroid"], documentation: [] };
  codes["E04.0"] = { code: "E04.0", description: "Nontoxic diffuse goiter", category: "E04", excludes1: [], excludes2: [], includes: [], commonUse: ["Simple goiter","Diffuse goiter"], documentation: [] };
  codes["E04.1"] = { code: "E04.1", description: "Nontoxic single thyroid nodule", category: "E04", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid nodule"], documentation: [] };
  codes["E04.2"] = { code: "E04.2", description: "Nontoxic multinodular goiter", category: "E04", excludes1: [], excludes2: [], includes: [], commonUse: ["Multinodular goiter","MNG"], documentation: [] };
  codes["E04.3"] = { code: "E04.3", description: "Transient nontoxic goiter", category: "E04", excludes1: [], excludes2: [], includes: [], commonUse: ["Transient goiter"], documentation: [] };
  codes["E04.8"] = { code: "E04.8", description: "Other specified nontoxic goiter", category: "E04", excludes1: [], excludes2: [], includes: [], commonUse: ["Nontoxic goiter"], documentation: [] };
  codes["E04.9"] = { code: "E04.9", description: "Nontoxic goiter, unspecified", category: "E04", excludes1: [], excludes2: [], includes: [], commonUse: ["Goiter NOS"], documentation: [] };
  codes["E05.0"] = { code: "E05.0", description: "Thyrotoxicosis with diffuse goiter", category: "E05", excludes1: [], excludes2: [], includes: [], commonUse: ["Graves disease","Diffuse toxic goiter"], documentation: [] };
  codes["E05.1"] = { code: "E05.1", description: "Thyrotoxicosis with toxic single thyroid nodule", category: "E05", excludes1: [], excludes2: [], includes: [], commonUse: ["Toxic thyroid nodule","Toxic adenoma"], documentation: [] };
  codes["E05.2"] = { code: "E05.2", description: "Thyrotoxicosis with toxic multinodular goiter", category: "E05", excludes1: [], excludes2: [], includes: [], commonUse: ["Toxic multinodular goiter","Plummer disease"], documentation: [] };
  codes["E05.3"] = { code: "E05.3", description: "Thyrotoxicosis from ectopic thyroid tissue", category: "E05", excludes1: [], excludes2: [], includes: [], commonUse: ["Ectopic hyperthyroidism"], documentation: [] };
  codes["E05.4"] = { code: "E05.4", description: "Thyrotoxicosis factitia", category: "E05", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyrotoxicosis factitia"], documentation: [] };
  codes["E05.5"] = { code: "E05.5", description: "Thyroid crisis or storm", category: "E05", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid storm"], documentation: [] };
  codes["E05.8"] = { code: "E05.8", description: "Other thyrotoxicosis", category: "E05", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperthyroidism"], documentation: [] };
  codes["E05.9"] = { code: "E05.9", description: "Thyrotoxicosis, unspecified", category: "E05", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperthyroidism NOS"], documentation: [] };
  codes["E06.0"] = { code: "E06.0", description: "Acute thyroiditis", category: "E06", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute thyroiditis","Subacute thyroiditis"], documentation: [] };
  codes["E06.1"] = { code: "E06.1", description: "Subacute thyroiditis", category: "E06", excludes1: [], excludes2: [], includes: [], commonUse: ["De Quervain thyroiditis"], documentation: [] };
  codes["E06.2"] = { code: "E06.2", description: "Chronic thyroiditis with transient thyrotoxicosis", category: "E06", excludes1: [], excludes2: [], includes: [], commonUse: ["Hashitoxicosis"], documentation: [] };
  codes["E06.3"] = { code: "E06.3", description: "Autoimmune thyroiditis", category: "E06", excludes1: [], excludes2: [], includes: [], commonUse: ["Hashimoto thyroiditis"], documentation: [] };
  codes["E06.4"] = { code: "E06.4", description: "Drug-induced thyroiditis", category: "E06", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced thyroiditis"], documentation: [] };
  codes["E06.5"] = { code: "E06.5", description: "Other chronic thyroiditis", category: "E06", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic thyroiditis"], documentation: [] };
  codes["E06.9"] = { code: "E06.9", description: "Thyroiditis, unspecified", category: "E06", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroiditis NOS"], documentation: [] };
  codes["E07.0"] = { code: "E07.0", description: "Hyperthyroidism of thyroid follicular cell origin", category: "E07", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperthyroidism"], documentation: [] };
  codes["E07.1"] = { code: "E07.1", description: "Hashitoxicosis", category: "E07", excludes1: [], excludes2: [], includes: [], commonUse: ["Hashitoxicosis"], documentation: [] };
  codes["E07.8"] = { code: "E07.8", description: "Other disorders of thyroid", category: "E07", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid disorder"], documentation: [] };
  codes["E07.9"] = { code: "E07.9", description: "Disorder of thyroid, unspecified", category: "E07", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid disorder NOS"], documentation: [] };
  codes["E10.0"] = { code: "E10.0", description: "Type 1 diabetes mellitus with hyperosmolarity", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["DKA with hyperosmolarity"], documentation: [] };
  codes["E10.1"] = { code: "E10.1", description: "Type 1 diabetes mellitus with ketoacidosis", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["DKA","Diabetic ketoacidosis"], documentation: [] };
  codes["E10.2"] = { code: "E10.2", description: "Type 1 diabetes mellitus with kidney complications", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["T1DM with nephropathy"], documentation: [] };
  codes["E10.3"] = { code: "E10.3", description: "Type 1 diabetes mellitus with ophthalmic complications", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["T1DM with retinopathy"], documentation: [] };
  codes["E10.4"] = { code: "E10.4", description: "Type 1 diabetes mellitus with neurological complications", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["T1DM with neuropathy"], documentation: [] };
  codes["E10.5"] = { code: "E10.5", description: "Type 1 diabetes mellitus with peripheral circulatory complications", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["T1DM with PVD"], documentation: [] };
  codes["E10.6"] = { code: "E10.6", description: "Type 1 diabetes mellitus with other specified complications", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["T1DM with other complication"], documentation: [] };
  codes["E10.7"] = { code: "E10.7", description: "Type 1 diabetes mellitus with multiple complications", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["T1DM with multiple complications"], documentation: [] };
  codes["E10.8"] = { code: "E10.8", description: "Type 1 diabetes mellitus with unspecified complications", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["T1DM with unspecified complication"], documentation: [] };
  codes["E10.9"] = { code: "E10.9", description: "Type 1 diabetes mellitus without complications", category: "E10", excludes1: [], excludes2: [], includes: [], commonUse: ["Type 1 diabetes","T1DM"], documentation: [] };
  codes["E11.0"] = { code: "E11.0", description: "Type 2 diabetes mellitus with hyperosmolarity", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["T2DM with hyperosmolarity"], documentation: [] };
  codes["E11.1"] = { code: "E11.1", description: "Type 2 diabetes mellitus with ketoacidosis", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["T2DM with ketoacidosis"], documentation: [] };
  codes["E11.2"] = { code: "E11.2", description: "Type 2 diabetes mellitus with kidney complications", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["T2DM with nephropathy","Diabetic nephropathy"], documentation: [] };
  codes["E11.3"] = { code: "E11.3", description: "Type 2 diabetes mellitus with ophthalmic complications", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["T2DM with retinopathy","Diabetic retinopathy"], documentation: [] };
  codes["E11.4"] = { code: "E11.4", description: "Type 2 diabetes mellitus with neurological complications", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["T2DM with neuropathy","Diabetic neuropathy"], documentation: [] };
  codes["E11.5"] = { code: "E11.5", description: "Type 2 diabetes mellitus with peripheral circulatory complications", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["T2DM with PVD","Diabetic PVD"], documentation: [] };
  codes["E11.6"] = { code: "E11.6", description: "Type 2 diabetes mellitus with other specified complications", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["T2DM with other complication"], documentation: [] };
  codes["E11.7"] = { code: "E11.7", description: "Type 2 diabetes mellitus with multiple complications", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["T2DM with multiple complications"], documentation: [] };
  codes["E11.8"] = { code: "E11.8", description: "Type 2 diabetes mellitus with unspecified complications", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["T2DM with unspecified complication"], documentation: [] };
  codes["E11.9"] = { code: "E11.9", description: "Type 2 diabetes mellitus without complications", category: "E11", excludes1: [], excludes2: [], includes: [], commonUse: ["Type 2 diabetes","T2DM","Diabetes mellitus"], documentation: [] };
  codes["E13.0"] = { code: "E13.0", description: "Other specified diabetes mellitus with hyperosmolarity", category: "E13", excludes1: [], excludes2: [], includes: [], commonUse: ["Other diabetes with hyperosmolarity"], documentation: [] };
  codes["E13.1"] = { code: "E13.1", description: "Other specified diabetes mellitus with ketoacidosis", category: "E13", excludes1: [], excludes2: [], includes: [], commonUse: ["Other diabetes with ketoacidosis"], documentation: [] };
  codes["E13.2"] = { code: "E13.2", description: "Other specified diabetes mellitus with kidney complications", category: "E13", excludes1: [], excludes2: [], includes: [], commonUse: ["Other diabetes with nephropathy"], documentation: [] };
  codes["E13.3"] = { code: "E13.3", description: "Other specified diabetes mellitus with ophthalmic complications", category: "E13", excludes1: [], excludes2: [], includes: [], commonUse: ["Other diabetes with retinopathy"], documentation: [] };
  codes["E13.4"] = { code: "E13.4", description: "Other specified diabetes mellitus with neurological complications", category: "E13", excludes1: [], excludes2: [], includes: [], commonUse: ["Other diabetes with neuropathy"], documentation: [] };
  codes["E13.9"] = { code: "E13.9", description: "Other specified diabetes mellitus without complications", category: "E13", excludes1: [], excludes2: [], includes: [], commonUse: ["Other specified diabetes NOS"], documentation: [] };
  codes["E15"] = { code: "E15", description: "Nonspecific hypoglycemia", category: "E15", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypoglycemia NOS"], documentation: [] };
  codes["E16.0"] = { code: "E16.0", description: "Drug-induced hypoglycemia without coma", category: "E16", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced hypoglycemia"], documentation: [] };
  codes["E16.1"] = { code: "E16.1", description: "Other hypoglycemia", category: "E16", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypoglycemia"], documentation: [] };
  codes["E16.2"] = { code: "E16.2", description: "Hypoglycemia, unspecified", category: "E16", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypoglycemia NOS"], documentation: [] };
  codes["E16.3"] = { code: "E16.3", description: "Increased secretion of glucagon", category: "E16", excludes1: [], excludes2: [], includes: [], commonUse: ["Glucagon excess"], documentation: [] };
  codes["E16.4"] = { code: "E16.4", description: "Increased secretion of gastrin", category: "E16", excludes1: [], excludes2: [], includes: [], commonUse: ["Zollinger-Ellison syndrome"], documentation: [] };
  codes["E16.8"] = { code: "E16.8", description: "Other specified disorders of pancreatic internal secretion", category: "E16", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic endocrine disorder"], documentation: [] };
  codes["E16.9"] = { code: "E16.9", description: "Disorder of pancreatic internal secretion, unspecified", category: "E16", excludes1: [], excludes2: [], includes: [], commonUse: ["Pancreatic endocrine disorder NOS"], documentation: [] };
  codes["E20.0"] = { code: "E20.0", description: "Idiopathic hypoparathyroidism", category: "E20", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypoparathyroidism NOS"], documentation: [] };
  codes["E20.1"] = { code: "E20.1", description: "Pseudohypoparathyroidism", category: "E20", excludes1: [], excludes2: [], includes: [], commonUse: ["Pseudohypoparathyroidism"], documentation: [] };
  codes["E20.8"] = { code: "E20.8", description: "Other hypoparathyroidism", category: "E20", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypoparathyroidism"], documentation: [] };
  codes["E20.9"] = { code: "E20.9", description: "Hypoparathyroidism, unspecified", category: "E20", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypoparathyroidism NOS"], documentation: [] };
  codes["E21.0"] = { code: "E21.0", description: "Primary hyperparathyroidism", category: "E21", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperparathyroidism"], documentation: [] };
  codes["E21.1"] = { code: "E21.1", description: "Secondary hyperparathyroidism, not elsewhere classified", category: "E21", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary hyperparathyroidism"], documentation: [] };
  codes["E21.2"] = { code: "E21.2", description: "Other hyperparathyroidism", category: "E21", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperparathyroidism"], documentation: [] };
  codes["E21.3"] = { code: "E21.3", description: "Hyperparathyroidism, unspecified", category: "E21", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperparathyroidism NOS"], documentation: [] };
  codes["E21.4"] = { code: "E21.4", description: "Other specified disorders of parathyroid gland", category: "E21", excludes1: [], excludes2: [], includes: [], commonUse: ["Parathyroid disorder"], documentation: [] };
  codes["E21.5"] = { code: "E21.5", description: "Disorder of parathyroid gland, unspecified", category: "E21", excludes1: [], excludes2: [], includes: [], commonUse: ["Parathyroid disorder NOS"], documentation: [] };
  codes["E22.0"] = { code: "E22.0", description: "Acromegaly and pituitary gigantism", category: "E22", excludes1: [], excludes2: [], includes: [], commonUse: ["Acromegaly","Gigantism"], documentation: [] };
  codes["E22.1"] = { code: "E22.1", description: "Hyperprolactinemia", category: "E22", excludes1: [], excludes2: [], includes: [], commonUse: ["Prolactinoma"], documentation: [] };
  codes["E22.2"] = { code: "E22.2", description: "Syndrome of inappropriate secretion of antidiuretic hormone", category: "E22", excludes1: [], excludes2: [], includes: [], commonUse: ["SIADH"], documentation: [] };
  codes["E22.8"] = { code: "E22.8", description: "Other hyperfunction of pituitary gland", category: "E22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pituitary hyperfunction"], documentation: [] };
  codes["E22.9"] = { code: "E22.9", description: "Hyperfunction of pituitary gland, unspecified", category: "E22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pituitary hyperfunction NOS"], documentation: [] };
  codes["E23.0"] = { code: "E23.0", description: "Hypopituitarism", category: "E23", excludes1: [], excludes2: [], includes: [], commonUse: ["Pituitary insufficiency","Hypopituitarism"], documentation: [] };
  codes["E23.1"] = { code: "E23.1", description: "Drug-induced hypopituitarism", category: "E23", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced hypopituitarism"], documentation: [] };
  codes["E23.2"] = { code: "E23.2", description: "Diabetes insipidus", category: "E23", excludes1: [], excludes2: [], includes: [], commonUse: ["Diabetes insipidus","DI"], documentation: [] };
  codes["E23.3"] = { code: "E23.3", description: "Cranio-pharyngioma", category: "E23", excludes1: [], excludes2: [], includes: [], commonUse: ["Craniopharyngioma"], documentation: [] };
  codes["E23.6"] = { code: "E23.6", description: "Other disorders of pituitary gland", category: "E23", excludes1: [], excludes2: [], includes: [], commonUse: ["Pituitary disorder"], documentation: [] };
  codes["E23.7"] = { code: "E23.7", description: "Disorder of pituitary gland, unspecified", category: "E23", excludes1: [], excludes2: [], includes: [], commonUse: ["Pituitary disorder NOS"], documentation: [] };
  codes["E24.0"] = { code: "E24.0", description: "Pituitary-dependent Cushing disease", category: "E24", excludes1: [], excludes2: [], includes: [], commonUse: ["Cushing disease"], documentation: [] };
  codes["E24.1"] = { code: "E24.1", description: "Ectopic ACTH syndrome", category: "E24", excludes1: [], excludes2: [], includes: [], commonUse: ["Ectopic Cushing syndrome"], documentation: [] };
  codes["E24.2"] = { code: "E24.2", description: "Drug-induced Cushing syndrome", category: "E24", excludes1: [], excludes2: [], includes: [], commonUse: ["Iatrogenic Cushing syndrome"], documentation: [] };
  codes["E24.3"] = { code: "E24.3", description: "Ectopic ACTH syndrome", category: "E24", excludes1: [], excludes2: [], includes: [], commonUse: ["Ectopic ACTH"], documentation: [] };
  codes["E24.4"] = { code: "E24.4", description: "Cushing syndrome, unspecified", category: "E24", excludes1: [], excludes2: [], includes: [], commonUse: ["Cushing syndrome NOS"], documentation: [] };
  codes["E24.8"] = { code: "E24.8", description: "Other Cushing syndromes", category: "E24", excludes1: [], excludes2: [], includes: [], commonUse: ["Cushing syndrome"], documentation: [] };
  codes["E24.9"] = { code: "E24.9", description: "Cushing syndrome, unspecified", category: "E24", excludes1: [], excludes2: [], includes: [], commonUse: ["Cushing syndrome NOS"], documentation: [] };
  codes["E25.0"] = { code: "E25.0", description: "Adrenogenital disorders associated with enzyme deficiency", category: "E25", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital adrenal hyperplasia","CAH"], documentation: [] };
  codes["E25.8"] = { code: "E25.8", description: "Other adrenogenital disorders", category: "E25", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenogenital disorder"], documentation: [] };
  codes["E25.9"] = { code: "E25.9", description: "Adrenogenital disorder, unspecified", category: "E25", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenogenital disorder NOS"], documentation: [] };
  codes["E26.0"] = { code: "E26.0", description: "Primary hyperaldosteronism", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Conn syndrome"], documentation: [] };
  codes["E26.1"] = { code: "E26.1", description: "Secondary hyperaldosteronism", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary hyperaldosteronism"], documentation: [] };
  codes["E26.9"] = { code: "E26.9", description: "Hyperaldosteronism, unspecified", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperaldosteronism NOS"], documentation: [] };
  codes["E27.0"] = { code: "E27.0", description: "Adrenal crisis", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Addisonian crisis","Adrenal crisis"], documentation: [] };
  codes["E27.1"] = { code: "E27.1", description: "Primary adrenocortical insufficiency", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Addison disease"], documentation: [] };
  codes["E27.2"] = { code: "E27.2", description: "Addisonian crisis", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Addisonian crisis"], documentation: [] };
  codes["E27.3"] = { code: "E27.3", description: "Adrenocortical insufficiency, unspecified", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenal insufficiency NOS"], documentation: [] };
  codes["E27.4"] = { code: "E27.4", description: "Other and unspecified adrenocortical insufficiency", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenal insufficiency"], documentation: [] };
  codes["E27.5"] = { code: "E27.5", description: "Adrenal medulla chromaffin neoplasm", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Pheochromocytoma"], documentation: [] };
  codes["E27.8"] = { code: "E27.8", description: "Other specified disorders of adrenal gland", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenal disorder"], documentation: [] };
  codes["E27.9"] = { code: "E27.9", description: "Disorder of adrenal gland, unspecified", category: "E27", excludes1: [], excludes2: [], includes: [], commonUse: ["Adrenal disorder NOS"], documentation: [] };
  codes["E28.0"] = { code: "E28.0", description: "Ovarian hyperfunction", category: "E28", excludes1: [], excludes2: [], includes: [], commonUse: ["Ovarian hyperfunction"], documentation: [] };
  codes["E28.1"] = { code: "E28.1", description: "Polycystic ovarian syndrome", category: "E28", excludes1: [], excludes2: [], includes: [], commonUse: ["PCOS","PCOD"], documentation: [] };
  codes["E28.2"] = { code: "E28.2", description: "Premature ovarian failure", category: "E28", excludes1: [], excludes2: [], includes: [], commonUse: ["POF","Premature menopause"], documentation: [] };
  codes["E28.3"] = { code: "E28.3", description: "Primary ovarian insufficiency", category: "E28", excludes1: [], excludes2: [], includes: [], commonUse: ["Primary ovarian insufficiency"], documentation: [] };
  codes["E28.8"] = { code: "E28.8", description: "Other ovarian dysfunction", category: "E28", excludes1: [], excludes2: [], includes: [], commonUse: ["Ovarian dysfunction"], documentation: [] };
  codes["E28.9"] = { code: "E28.9", description: "Ovarian dysfunction, unspecified", category: "E28", excludes1: [], excludes2: [], includes: [], commonUse: ["Ovarian dysfunction NOS"], documentation: [] };
  codes["E29.0"] = { code: "E29.0", description: "Testicular hyperfunction", category: "E29", excludes1: [], excludes2: [], includes: [], commonUse: ["Testicular hyperfunction"], documentation: [] };
  codes["E29.1"] = { code: "E29.1", description: "Testicular hypofunction", category: "E29", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypogonadism","Low testosterone"], documentation: [] };
  codes["E29.8"] = { code: "E29.8", description: "Other testicular dysfunction", category: "E29", excludes1: [], excludes2: [], includes: [], commonUse: ["Testicular dysfunction"], documentation: [] };
  codes["E29.9"] = { code: "E29.9", description: "Testicular dysfunction, unspecified", category: "E29", excludes1: [], excludes2: [], includes: [], commonUse: ["Testicular dysfunction NOS"], documentation: [] };
  codes["E31.0"] = { code: "E31.0", description: "Autoimmune polyglandular dysfunction", category: "E31", excludes1: [], excludes2: [], includes: [], commonUse: ["APS type I","APS type II"], documentation: [] };
  codes["E31.1"] = { code: "E31.1", description: "Polyglandular hyperfunction", category: "E31", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyglandular hyperfunction"], documentation: [] };
  codes["E31.2"] = { code: "E31.2", description: "Polyglandular dysfunction, unspecified", category: "E31", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyglandular dysfunction NOS"], documentation: [] };
  codes["E31.8"] = { code: "E31.8", description: "Other specified polyglandular dysfunction", category: "E31", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyglandular dysfunction"], documentation: [] };
  codes["E31.9"] = { code: "E31.9", description: "Polyglandular dysfunction, unspecified", category: "E31", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyglandular dysfunction NOS"], documentation: [] };
  codes["E40"] = { code: "E40", description: "Kwashiorkor", category: "E40", excludes1: [], excludes2: [], includes: [], commonUse: ["Protein malnutrition"], documentation: [] };
  codes["E41"] = { code: "E41", description: "Nutritional marasmus", category: "E41", excludes1: [], excludes2: [], includes: [], commonUse: ["Marasmus"], documentation: [] };
  codes["E43"] = { code: "E43", description: "Unspecified severe protein-energy malnutrition", category: "E43", excludes1: [], excludes2: [], includes: [], commonUse: ["Severe malnutrition"], documentation: [] };
  codes["E44.0"] = { code: "E44.0", description: "Moderate protein-energy malnutrition", category: "E44", excludes1: [], excludes2: [], includes: [], commonUse: ["Moderate malnutrition"], documentation: [] };
  codes["E44.1"] = { code: "E44.1", description: "Mild protein-energy malnutrition", category: "E44", excludes1: [], excludes2: [], includes: [], commonUse: ["Mild malnutrition"], documentation: [] };
  codes["E46"] = { code: "E46", description: "Unspecified protein-energy malnutrition", category: "E46", excludes1: [], excludes2: [], includes: [], commonUse: ["Malnutrition NOS"], documentation: [] };
  codes["E50.0"] = { code: "E50.0", description: "Vitamin A deficiency with conjunctival xerosis", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin A deficiency - ocular"], documentation: [] };
  codes["E50.1"] = { code: "E50.1", description: "Vitamin A deficiency with Bitot spot and corneal xerosis", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Bitot spot"], documentation: [] };
  codes["E50.2"] = { code: "E50.2", description: "Vitamin A deficiency with corneal ulceration and xerosis", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin A corneal ulcer"], documentation: [] };
  codes["E50.3"] = { code: "E50.3", description: "Vitamin A deficiency with keratomalacia", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Keratomalacia"], documentation: [] };
  codes["E50.4"] = { code: "E50.4", description: "Vitamin A deficiency with xerophthalmia", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Xerophthalmia"], documentation: [] };
  codes["E50.5"] = { code: "E50.5", description: "Vitamin A deficiency with night blindness", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Night blindness"], documentation: [] };
  codes["E50.6"] = { code: "E50.6", description: "Vitamin A deficiency with xerosis of conjunctiva", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Conjunctival xerosis"], documentation: [] };
  codes["E50.7"] = { code: "E50.7", description: "Other ocular manifestations of vitamin A deficiency", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin A deficiency - eye"], documentation: [] };
  codes["E50.8"] = { code: "E50.8", description: "Other manifestations of vitamin A deficiency", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin A deficiency"], documentation: [] };
  codes["E50.9"] = { code: "E50.9", description: "Vitamin A deficiency, unspecified", category: "E50", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin A deficiency NOS"], documentation: [] };
  codes["E51.1"] = { code: "E51.1", description: "Beriberi", category: "E51", excludes1: [], excludes2: [], includes: [], commonUse: ["Beriberi","Thiamine deficiency"], documentation: [] };
  codes["E51.2"] = { code: "E51.2", description: "Wernicke encephalopathy", category: "E51", excludes1: [], excludes2: [], includes: [], commonUse: ["Wernicke-Korsakoff syndrome"], documentation: [] };
  codes["E51.8"] = { code: "E51.8", description: "Other manifestations of thiamine deficiency", category: "E51", excludes1: [], excludes2: [], includes: [], commonUse: ["Thiamine deficiency"], documentation: [] };
  codes["E51.9"] = { code: "E51.9", description: "Thiamine deficiency, unspecified", category: "E51", excludes1: [], excludes2: [], includes: [], commonUse: ["Thiamine deficiency NOS"], documentation: [] };
  codes["E52"] = { code: "E52", description: "Niacin deficiency [pellagra]", category: "E52", excludes1: [], excludes2: [], includes: [], commonUse: ["Pellagra"], documentation: [] };
  codes["E53.0"] = { code: "E53.0", description: "Deficiency of vitamin B12", category: "E53", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin B12 deficiency"], documentation: [] };
  codes["E53.1"] = { code: "E53.1", description: "Deficiency of pyridoxine", category: "E53", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin B6 deficiency"], documentation: [] };
  codes["E53.8"] = { code: "E53.8", description: "Deficiency of other B group vitamins", category: "E53", excludes1: [], excludes2: [], includes: [], commonUse: ["B vitamin deficiency"], documentation: [] };
  codes["E53.9"] = { code: "E53.9", description: "Vitamin B deficiency, unspecified", category: "E53", excludes1: [], excludes2: [], includes: [], commonUse: ["B vitamin deficiency NOS"], documentation: [] };
  codes["E54"] = { code: "E54", description: "Ascorbic acid deficiency", category: "E54", excludes1: [], excludes2: [], includes: [], commonUse: ["Scurvy","Vitamin C deficiency"], documentation: [] };
  codes["E55.0"] = { code: "E55.0", description: "Rickets, active", category: "E55", excludes1: [], excludes2: [], includes: [], commonUse: ["Rickets"], documentation: [] };
  codes["E55.9"] = { code: "E55.9", description: "Vitamin D deficiency, unspecified", category: "E55", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin D deficiency NOS","Low vitamin D"], documentation: [] };
  codes["E56.0"] = { code: "E56.0", description: "Deficiency of vitamin E", category: "E56", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin E deficiency"], documentation: [] };
  codes["E56.1"] = { code: "E56.1", description: "Deficiency of vitamin K", category: "E56", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin K deficiency"], documentation: [] };
  codes["E56.8"] = { code: "E56.8", description: "Deficiency of other vitamins", category: "E56", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin deficiency"], documentation: [] };
  codes["E56.9"] = { code: "E56.9", description: "Vitamin deficiency, unspecified", category: "E56", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitamin deficiency NOS"], documentation: [] };
  codes["E61.0"] = { code: "E61.0", description: "Deficiency of copper", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Copper deficiency"], documentation: [] };
  codes["E61.1"] = { code: "E61.1", description: "Deficiency of iron", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Iron deficiency"], documentation: [] };
  codes["E61.2"] = { code: "E61.2", description: "Deficiency of magnesium", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Magnesium deficiency"], documentation: [] };
  codes["E61.3"] = { code: "E61.3", description: "Deficiency of manganese", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Manganese deficiency"], documentation: [] };
  codes["E61.4"] = { code: "E61.4", description: "Deficiency of chromium", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Chromium deficiency"], documentation: [] };
  codes["E61.5"] = { code: "E61.5", description: "Deficiency of molybdenum", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Molybdenum deficiency"], documentation: [] };
  codes["E61.6"] = { code: "E61.6", description: "Deficiency of zinc", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Zinc deficiency"], documentation: [] };
  codes["E61.7"] = { code: "E61.7", description: "Deficiency of multiple nutrient elements", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple nutrient deficiency"], documentation: [] };
  codes["E61.8"] = { code: "E61.8", description: "Deficiency of other nutrient elements", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Nutrient element deficiency"], documentation: [] };
  codes["E61.9"] = { code: "E61.9", description: "Deficiency of nutrient element, unspecified", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Nutrient element deficiency NOS"], documentation: [] };
  codes["E63.0"] = { code: "E63.0", description: "Deficiency of essential fatty acids [EFA]", category: "E63", excludes1: [], excludes2: [], includes: [], commonUse: ["EFA deficiency"], documentation: [] };
  codes["E63.1"] = { code: "E63.1", description: "Imbalance of constituents of food intake", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Dietary imbalance"], documentation: [] };
  codes["E63.8"] = { code: "E63.8", description: "Other specified nutritional deficiencies", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Nutritional deficiency"], documentation: [] };
  codes["E63.9"] = { code: "E63.9", description: "Nutritional deficiency, unspecified", category: "E61", excludes1: [], excludes2: [], includes: [], commonUse: ["Nutritional deficiency NOS"], documentation: [] };
  codes["E65"] = { code: "E65", description: "Localized adiposity", category: "E65", excludes1: [], excludes2: [], includes: [], commonUse: ["Localized fat deposit"], documentation: [] };
  codes["E66.0"] = { code: "E66.0", description: "Morbid (severe) obesity due to excess calories", category: "E66", excludes1: [], excludes2: [], includes: [], commonUse: ["Morbid obesity","Severe obesity"], documentation: [] };
  codes["E66.1"] = { code: "E66.1", description: "Drug-induced obesity", category: "E66", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced obesity"], documentation: [] };
  codes["E66.2"] = { code: "E66.2", description: "Morbid (severe) obesity with alveolar hypoventilation", category: "E66", excludes1: [], excludes2: [], includes: [], commonUse: ["Pickwickian syndrome","Obesity hypoventilation"], documentation: [] };
  codes["E66.8"] = { code: "E66.8", description: "Other obesity", category: "E66", excludes1: [], excludes2: [], includes: [], commonUse: ["Obesity"], documentation: [] };
  codes["E66.9"] = { code: "E66.9", description: "Obesity, unspecified", category: "E66", excludes1: [], excludes2: [], includes: [], commonUse: ["Obesity NOS","Overweight"], documentation: [] };
  codes["E67.0"] = { code: "E67.0", description: "Hypervitaminosis A", category: "E67", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypervitaminosis A"], documentation: [] };
  codes["E67.1"] = { code: "E67.1", description: "Hypercarotinemia", category: "E67", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypercarotinemia"], documentation: [] };
  codes["E67.2"] = { code: "E67.2", description: "Hypervitaminosis D", category: "E67", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypervitaminosis D"], documentation: [] };
  codes["E67.3"] = { code: "E67.3", description: "Hypervitaminosis E", category: "E67", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypervitaminosis E"], documentation: [] };
  codes["E67.8"] = { code: "E67.8", description: "Other hyperalimentation", category: "E67", excludes1: [], excludes2: [], includes: [], commonUse: ["Other hyperalimentation"], documentation: [] };
  codes["E67.9"] = { code: "E67.9", description: "Hyperalimentation, unspecified", category: "E67", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperalimentation NOS"], documentation: [] };
  codes["E70.0"] = { code: "E70.0", description: "Classical phenylketonuria", category: "E70", excludes1: [], excludes2: [], includes: [], commonUse: ["PKU"], documentation: [] };
  codes["E70.1"] = { code: "E70.1", description: "Other hyperphenylalaninemias", category: "E70", excludes1: [], excludes2: [], includes: [], commonUse: ["Non-PKU hyperphenylalaninemia"], documentation: [] };
  codes["E70.2"] = { code: "E70.2", description: "Disorders of tyrosine metabolism", category: "E70", excludes1: [], excludes2: [], includes: [], commonUse: ["Tyrosinemia","Tyrosinosis"], documentation: [] };
  codes["E70.3"] = { code: "E70.3", description: "Albinism", category: "E70", excludes1: [], excludes2: [], includes: [], commonUse: ["Albinism"], documentation: [] };
  codes["E70.8"] = { code: "E70.8", description: "Other disorders of aromatic amino-acid metabolism", category: "E70", excludes1: [], excludes2: [], includes: [], commonUse: ["Aromatic amino acid disorder"], documentation: [] };
  codes["E70.9"] = { code: "E70.9", description: "Disorder of aromatic amino-acid metabolism, unspecified", category: "E70", excludes1: [], excludes2: [], includes: [], commonUse: ["Aromatic amino acid disorder NOS"], documentation: [] };
  codes["E71.0"] = { code: "E71.0", description: "Maple syrup urine disease", category: "E71", excludes1: [], excludes2: [], includes: [], commonUse: ["MSUD","Branched-chain ketoaciduria"], documentation: [] };
  codes["E71.1"] = { code: "E71.1", description: "Disorders of branched-chain amino-acid metabolism", category: "E71", excludes1: [], excludes2: [], includes: [], commonUse: ["BCAA metabolism disorder"], documentation: [] };
  codes["E71.2"] = { code: "E71.2", description: "Disorders of branched-chain amino-acid metabolism, unspecified", category: "E71", excludes1: [], excludes2: [], includes: [], commonUse: ["BCAA disorder NOS"], documentation: [] };
  codes["E71.3"] = { code: "E71.3", description: "Disorders of fatty-acid metabolism", category: "E71", excludes1: [], excludes2: [], includes: [], commonUse: ["Fatty acid oxidation disorder"], documentation: [] };
  codes["E71.4"] = { code: "E71.4", description: "Disorders of propionate metabolism", category: "E71", excludes1: [], excludes2: [], includes: [], commonUse: ["Propionic acidemia"], documentation: [] };
  codes["E71.5"] = { code: "E71.5", description: "Disorders of other branched-chain amino-acid metabolism", category: "E71", excludes1: [], excludes2: [], includes: [], commonUse: ["Other BCAA disorder"], documentation: [] };
  codes["E71.8"] = { code: "E71.8", description: "Other disorders of branched-chain amino-acid metabolism and fatty-acid metabolism", category: "E71", excludes1: [], excludes2: [], includes: [], commonUse: ["Other metabolic disorder"], documentation: [] };
  codes["E71.9"] = { code: "E71.9", description: "Disorder of branched-chain amino-acid metabolism and fatty-acid metabolism, unspecified", category: "E71", excludes1: [], excludes2: [], includes: [], commonUse: ["BCAA/fatty acid disorder NOS"], documentation: [] };
  codes["E72.0"] = { code: "E72.0", description: "Disorders of amino-acid transport", category: "E72", excludes1: [], excludes2: [], includes: [], commonUse: ["Amino acid transport disorder"], documentation: [] };
  codes["E72.1"] = { code: "E72.1", description: "Disorders of amino-acid metabolism", category: "E72", excludes1: [], excludes2: [], includes: [], commonUse: ["Amino acid metabolism disorder"], documentation: [] };
  codes["E72.2"] = { code: "E72.2", description: "Disorders of urea cycle metabolism", category: "E72", excludes1: [], excludes2: [], includes: [], commonUse: ["Urea cycle disorder","UCD"], documentation: [] };
  codes["E72.3"] = { code: "E72.3", description: "Disorders of glycine metabolism", category: "E72", excludes1: [], excludes2: [], includes: [], commonUse: ["Glycine metabolism disorder"], documentation: [] };
  codes["E72.8"] = { code: "E72.8", description: "Other disorders of amino-acid metabolism", category: "E72", excludes1: [], excludes2: [], includes: [], commonUse: ["Amino acid disorder"], documentation: [] };
  codes["E72.9"] = { code: "E72.9", description: "Disorder of amino-acid metabolism, unspecified", category: "E72", excludes1: [], excludes2: [], includes: [], commonUse: ["Amino acid disorder NOS"], documentation: [] };
  codes["E73.0"] = { code: "E73.0", description: "Congenital lactase deficiency", category: "E73", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital lactase deficiency"], documentation: [] };
  codes["E73.1"] = { code: "E73.1", description: "Acquired lactase deficiency", category: "E73", excludes1: [], excludes2: [], includes: [], commonUse: ["Lactose intolerance","Lactase deficiency"], documentation: [] };
  codes["E73.8"] = { code: "E73.8", description: "Other disorders of lactose metabolism", category: "E73", excludes1: [], excludes2: [], includes: [], commonUse: ["Lactose metabolism disorder"], documentation: [] };
  codes["E73.9"] = { code: "E73.9", description: "Lactose intolerance, unspecified", category: "E73", excludes1: [], excludes2: [], includes: [], commonUse: ["Lactose intolerance NOS"], documentation: [] };
  codes["E74.0"] = { code: "E74.0", description: "Glycogen storage disease", category: "E74", excludes1: [], excludes2: [], includes: [], commonUse: ["GSD","Von Gierke disease"], documentation: [] };
  codes["E74.1"] = { code: "E74.1", description: "Disorders of fructose metabolism", category: "E74", excludes1: [], excludes2: [], includes: [], commonUse: ["Fructose intolerance","Hereditary fructose intolerance"], documentation: [] };
  codes["E74.2"] = { code: "E74.2", description: "Disorders of galactose metabolism", category: "E74", excludes1: [], excludes2: [], includes: [], commonUse: ["Galactosemia"], documentation: [] };
  codes["E74.3"] = { code: "E74.3", description: "Other disorders of carbohydrate metabolism", category: "E74", excludes1: [], excludes2: [], includes: [], commonUse: ["Carbohydrate metabolism disorder"], documentation: [] };
  codes["E74.4"] = { code: "E74.4", description: "Disorders of pyruvate metabolism and gluconeogenesis", category: "E74", excludes1: [], excludes2: [], includes: [], commonUse: ["Pyruvate metabolism disorder"], documentation: [] };
  codes["E74.8"] = { code: "E74.8", description: "Other specified disorders of carbohydrate metabolism", category: "E74", excludes1: [], excludes2: [], includes: [], commonUse: ["Carbohydrate metabolism disorder"], documentation: [] };
  codes["E74.9"] = { code: "E74.9", description: "Disorder of carbohydrate metabolism, unspecified", category: "E74", excludes1: [], excludes2: [], includes: [], commonUse: ["Carbohydrate metabolism disorder NOS"], documentation: [] };
  codes["E75.0"] = { code: "E75.0", description: "Sphingolipidosis", category: "E75", excludes1: [], excludes2: [], includes: [], commonUse: ["Sphingolipidosis","Gaucher disease"], documentation: [] };
  codes["E75.1"] = { code: "E75.1", description: "Other lipid storage disorders", category: "E75", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipid storage disease"], documentation: [] };
  codes["E75.2"] = { code: "E75.2", description: "Disorders of sphingolipid metabolism", category: "E75", excludes1: [], excludes2: [], includes: [], commonUse: ["Sphingolipid metabolism disorder"], documentation: [] };
  codes["E75.3"] = { code: "E75.3", description: "Other disorders of lipoid metabolism", category: "E75", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipoid metabolism disorder"], documentation: [] };
  codes["E75.4"] = { code: "E75.4", description: "Niemann-Pick disease", category: "E75", excludes1: [], excludes2: [], includes: [], commonUse: ["Niemann-Pick"], documentation: [] };
  codes["E75.5"] = { code: "E75.5", description: "Other lipid storage disorders", category: "E75", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipid storage disease"], documentation: [] };
  codes["E75.6"] = { code: "E75.6", description: "Lipid storage disorder, unspecified", category: "E75", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipid storage disease NOS"], documentation: [] };
  codes["E76.0"] = { code: "E76.0", description: "Mucopolysaccharidosis, type I [Hurler syndrome or Scheie syndrome]", category: "E76", excludes1: [], excludes2: [], includes: [], commonUse: ["MPS I","Hurler syndrome","Scheie syndrome"], documentation: [] };
  codes["E76.1"] = { code: "E76.1", description: "Mucopolysaccharidosis, type II [Hunter syndrome]", category: "E76", excludes1: [], excludes2: [], includes: [], commonUse: ["MPS II","Hunter syndrome"], documentation: [] };
  codes["E76.2"] = { code: "E76.2", description: "Mucopolysaccharidosis, type III [Sanfilippo syndrome]", category: "E76", excludes1: [], excludes2: [], includes: [], commonUse: ["MPS III","Sanfilippo syndrome"], documentation: [] };
  codes["E76.3"] = { code: "E76.3", description: "Mucopolysaccharidosis, type IV [Morquio syndrome]", category: "E76", excludes1: [], excludes2: [], includes: [], commonUse: ["MPS IV","Morquio syndrome"], documentation: [] };
  codes["E76.8"] = { code: "E76.8", description: "Other mucopolysaccharidoses", category: "E76", excludes1: [], excludes2: [], includes: [], commonUse: ["Other MPS"], documentation: [] };
  codes["E76.9"] = { code: "E76.9", description: "Mucopolysaccharidosis, unspecified", category: "E76", excludes1: [], excludes2: [], includes: [], commonUse: ["MPS NOS"], documentation: [] };
  codes["E78.0"] = { code: "E78.0", description: "Pure hypercholesterolemia", category: "E78", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypercholesterolemia","High cholesterol"], documentation: [] };
  codes["E78.1"] = { code: "E78.1", description: "Pure hyperglyceridemia", category: "E78", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertriglyceridemia","High triglycerides"], documentation: [] };
  codes["E78.2"] = { code: "E78.2", description: "Mixed hyperlipidemia", category: "E78", excludes1: [], excludes2: [], includes: [], commonUse: ["Mixed hyperlipidemia","Dyslipidemia"], documentation: [] };
  codes["E78.3"] = { code: "E78.3", description: "Hyperlipoproteinemia", category: "E78", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperlipoproteinemia"], documentation: [] };
  codes["E78.4"] = { code: "E78.4", description: "Other hyperlipidemia", category: "E78", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperlipidemia NOS"], documentation: [] };
  codes["E78.5"] = { code: "E78.5", description: "Hyperlipidemia, unspecified", category: "E78", excludes1: [], excludes2: [], includes: [], commonUse: ["High lipids NOS"], documentation: [] };
  codes["E78.6"] = { code: "E78.6", description: "Lipoprotein deficiency", category: "E78", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipoprotein deficiency"], documentation: [] };
  codes["E78.8"] = { code: "E78.8", description: "Other disorders of lipoprotein metabolism and other lipidemias", category: "E78", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipid metabolism disorder"], documentation: [] };
  codes["E78.9"] = { code: "E78.9", description: "Disorder of lipoprotein metabolism and other lipidemias, unspecified", category: "E78", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipid disorder NOS"], documentation: [] };
  codes["E79.0"] = { code: "E79.0", description: "Primary hyperuricemia, unspecified", category: "E79", excludes1: [], excludes2: [], includes: [], commonUse: ["Gout","Hyperuricemia"], documentation: [] };
  codes["E79.1"] = { code: "E79.1", description: "Lesch-Nyhan syndrome", category: "E79", excludes1: [], excludes2: [], includes: [], commonUse: ["Lesch-Nyhan"], documentation: [] };
  codes["E79.8"] = { code: "E79.8", description: "Other disorders of purine and pyrimidine metabolism", category: "E79", excludes1: [], excludes2: [], includes: [], commonUse: ["Purine metabolism disorder"], documentation: [] };
  codes["E79.9"] = { code: "E79.9", description: "Disorder of purine and pyrimidine metabolism, unspecified", category: "E79", excludes1: [], excludes2: [], includes: [], commonUse: ["Purine metabolism disorder NOS"], documentation: [] };
  codes["E80.0"] = { code: "E80.0", description: "Hereditary porphyria", category: "E80", excludes1: [], excludes2: [], includes: [], commonUse: ["Porphyria"], documentation: [] };
  codes["E80.1"] = { code: "E80.1", description: "Porphyria cutanea tarda", category: "E80", excludes1: [], excludes2: [], includes: [], commonUse: ["PCT"], documentation: [] };
  codes["E80.2"] = { code: "E80.2", description: "Other porphyria", category: "E80", excludes1: [], excludes2: [], includes: [], commonUse: ["Other porphyria"], documentation: [] };
  codes["E80.3"] = { code: "E80.3", description: "Disorders of bilirubin metabolism", category: "E80", excludes1: [], excludes2: [], includes: [], commonUse: ["Gilbert syndrome","Crigler-Najjar","Dubin-Johnson"], documentation: [] };
  codes["E80.4"] = { code: "E80.4", description: "Gilbert syndrome", category: "E80", excludes1: [], excludes2: [], includes: [], commonUse: ["Gilbert syndrome"], documentation: [] };
  codes["E80.5"] = { code: "E80.5", description: "Crigler-Najjar syndrome", category: "E80", excludes1: [], excludes2: [], includes: [], commonUse: ["Crigler-Najjar"], documentation: [] };
  codes["E80.6"] = { code: "E80.6", description: "Other disorders of bilirubin metabolism", category: "E80", excludes1: [], excludes2: [], includes: [], commonUse: ["Bilirubin disorder"], documentation: [] };
  codes["E80.7"] = { code: "E80.7", description: "Disorders of porphyrin and bilirubin metabolism, unspecified", category: "E80", excludes1: [], excludes2: [], includes: [], commonUse: ["Heme metabolism disorder NOS"], documentation: [] };
  codes["E83.0"] = { code: "E83.0", description: "Disorders of copper metabolism", category: "E83", excludes1: [], excludes2: [], includes: [], commonUse: ["Wilson disease","Menkes disease"], documentation: [] };
  codes["E83.1"] = { code: "E83.1", description: "Disorders of iron metabolism", category: "E83", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemochromatosis","Iron overload"], documentation: [] };
  codes["E83.2"] = { code: "E83.2", description: "Disorders of zinc metabolism", category: "E83", excludes1: [], excludes2: [], includes: [], commonUse: ["Zinc metabolism disorder"], documentation: [] };
  codes["E83.3"] = { code: "E83.3", description: "Disorders of phosphorus metabolism", category: "E83", excludes1: [], excludes2: [], includes: [], commonUse: ["Phosphorus metabolism disorder"], documentation: [] };
  codes["E83.4"] = { code: "E83.4", description: "Disorders of magnesium metabolism", category: "E83", excludes1: [], excludes2: [], includes: [], commonUse: ["Magnesium metabolism disorder"], documentation: [] };
  codes["E83.5"] = { code: "E83.5", description: "Disorders of calcium metabolism", category: "E83", excludes1: [], excludes2: [], includes: [], commonUse: ["Calcium metabolism disorder","Hypocalcemia","Hypercalcemia"], documentation: [] };
  codes["E83.8"] = { code: "E83.8", description: "Other disorders of mineral metabolism", category: "E83", excludes1: [], excludes2: [], includes: [], commonUse: ["Mineral metabolism disorder"], documentation: [] };
  codes["E83.9"] = { code: "E83.9", description: "Disorder of mineral metabolism, unspecified", category: "E83", excludes1: [], excludes2: [], includes: [], commonUse: ["Mineral metabolism disorder NOS"], documentation: [] };
  codes["E84.0"] = { code: "E84.0", description: "Cystic fibrosis with pulmonary manifestations", category: "E84", excludes1: [], excludes2: [], includes: [], commonUse: ["CF with pulmonary involvement"], documentation: [] };
  codes["E84.1"] = { code: "E84.1", description: "Cystic fibrosis with intestinal manifestations", category: "E84", excludes1: [], excludes2: [], includes: [], commonUse: ["CF with intestinal involvement"], documentation: [] };
  codes["E84.8"] = { code: "E84.8", description: "Cystic fibrosis with other manifestations", category: "E84", excludes1: [], excludes2: [], includes: [], commonUse: ["CF with other manifestation"], documentation: [] };
  codes["E84.9"] = { code: "E84.9", description: "Cystic fibrosis, unspecified", category: "E84", excludes1: [], excludes2: [], includes: [], commonUse: ["CF NOS","Cystic fibrosis"], documentation: [] };
  codes["E85.0"] = { code: "E85.0", description: "Non-neuropathic hereditary amyloidosis", category: "E85", excludes1: [], excludes2: [], includes: [], commonUse: ["Hereditary amyloidosis"], documentation: [] };
  codes["E85.1"] = { code: "E85.1", description: "Neuropathic hereditary amyloidosis", category: "E85", excludes1: [], excludes2: [], includes: [], commonUse: ["FAP","Familial amyloid polyneuropathy"], documentation: [] };
  codes["E85.2"] = { code: "E85.2", description: "Senile systemic amyloidosis", category: "E85", excludes1: [], excludes2: [], includes: [], commonUse: ["Senile amyloidosis"], documentation: [] };
  codes["E85.3"] = { code: "E85.3", description: "Secondary systemic amyloidosis", category: "E85", excludes1: [], excludes2: [], includes: [], commonUse: ["AA amyloidosis"], documentation: [] };
  codes["E85.4"] = { code: "E85.4", description: "Localized amyloidosis", category: "E85", excludes1: [], excludes2: [], includes: [], commonUse: ["Localized amyloidosis"], documentation: [] };
  codes["E85.8"] = { code: "E85.8", description: "Other amyloidosis", category: "E85", excludes1: [], excludes2: [], includes: [], commonUse: ["Other amyloidosis"], documentation: [] };
  codes["E85.9"] = { code: "E85.9", description: "Amyloidosis, unspecified", category: "E85", excludes1: [], excludes2: [], includes: [], commonUse: ["Amyloidosis NOS"], documentation: [] };
  codes["E86.0"] = { code: "E86.0", description: "Dehydration", category: "E86", excludes1: [], excludes2: [], includes: [], commonUse: ["Dehydration"], documentation: [] };
  codes["E86.1"] = { code: "E86.1", description: "Volume depletion", category: "E86", excludes1: [], excludes2: [], includes: [], commonUse: ["Volume depletion","Hypovolemia"], documentation: [] };
  codes["E86.9"] = { code: "E86.9", description: "Volume depletion, unspecified", category: "E86", excludes1: [], excludes2: [], includes: [], commonUse: ["Volume depletion NOS"], documentation: [] };
  codes["E87.0"] = { code: "E87.0", description: "Hyperosmolality and hypernatremia", category: "E87", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypernatremia"], documentation: [] };
  codes["E87.1"] = { code: "E87.1", description: "Hypo-osmolality and hyponatremia", category: "E87", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyponatremia","Low sodium"], documentation: [] };
  codes["E87.2"] = { code: "E87.2", description: "Metabolic acidosis", category: "E87", excludes1: [], excludes2: [], includes: [], commonUse: ["Metabolic acidosis"], documentation: [] };
  codes["E87.3"] = { code: "E87.3", description: "Alkalosis", category: "E87", excludes1: [], excludes2: [], includes: [], commonUse: ["Metabolic alkalosis","Respiratory alkalosis"], documentation: [] };
  codes["E87.4"] = { code: "E87.4", description: "Mixed disorder of acid-base balance", category: "E87", excludes1: [], excludes2: [], includes: [], commonUse: ["Mixed acid-base disorder"], documentation: [] };
  codes["E87.5"] = { code: "E87.5", description: "Hyperkalemia", category: "E87", excludes1: [], excludes2: [], includes: [], commonUse: ["High potassium"], documentation: [] };
  codes["E87.6"] = { code: "E87.6", description: "Hypokalemia", category: "E87", excludes1: [], excludes2: [], includes: [], commonUse: ["Low potassium"], documentation: [] };
  codes["E87.7"] = { code: "E87.7", description: "Fluid overload", category: "E87", excludes1: [], excludes2: [], includes: [], commonUse: ["Fluid overload","Volume overload"], documentation: [] };
  codes["E87.8"] = { code: "E87.8", description: "Other disorders of fluid, electrolyte and acid-base balance", category: "E87", excludes1: [], excludes2: [], includes: [], commonUse: ["Electrolyte disorder"], documentation: [] };
  codes["E88.0"] = { code: "E88.0", description: "Obesity due to excess calories", category: "E88", excludes1: [], excludes2: [], includes: [], commonUse: ["Obesity"], documentation: [] };
  codes["E88.1"] = { code: "E88.1", description: "Lipodystrophy, not elsewhere classified", category: "E88", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipodystrophy"], documentation: [] };
  codes["E88.2"] = { code: "E88.2", description: "Lipomatosis, not elsewhere classified", category: "E88", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipomatosis"], documentation: [] };
  codes["E88.3"] = { code: "E88.3", description: "Lymphedema, not elsewhere classified", category: "E88", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymphedema"], documentation: [] };
  codes["E88.8"] = { code: "E88.8", description: "Other metabolic disorders", category: "E88", excludes1: [], excludes2: [], includes: [], commonUse: ["Metabolic disorder"], documentation: [] };
  codes["E88.9"] = { code: "E88.9", description: "Metabolic disorder, unspecified", category: "E88", excludes1: [], excludes2: [], includes: [], commonUse: ["Metabolic disorder NOS"], documentation: [] };
  codes["E89.0"] = { code: "E89.0", description: "Postprocedural hypothyroidism", category: "E89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-thyroidectomy hypothyroidism"], documentation: [] };
  codes["E89.1"] = { code: "E89.1", description: "Postprocedural hypoinsulinemia", category: "E89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-pancreatectomy diabetes"], documentation: [] };
  codes["E89.2"] = { code: "E89.2", description: "Postprocedural hypoparathyroidism", category: "E89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-surgical hypoparathyroidism"], documentation: [] };
  codes["E89.3"] = { code: "E89.3", description: "Postprocedural hypopituitarism", category: "E89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-surgical hypopituitarism"], documentation: [] };
  codes["E89.4"] = { code: "E89.4", description: "Postprocedural ovarian failure", category: "E89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-surgical ovarian failure"], documentation: [] };
  codes["E89.5"] = { code: "E89.5", description: "Postprocedural adrenal (cortical) insufficiency", category: "E89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-adrenalectomy adrenal insufficiency"], documentation: [] };
  codes["E89.6"] = { code: "E89.6", description: "Postprocedural hyperparathyroidism", category: "E89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-surgical hyperparathyroidism"], documentation: [] };
  codes["E89.8"] = { code: "E89.8", description: "Other postprocedural endocrine and metabolic disorders", category: "E89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-surgical endocrine disorder"], documentation: [] };
  codes["E89.9"] = { code: "E89.9", description: "Postprocedural endocrine and metabolic disorder, unspecified", category: "E89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-surgical endocrine disorder NOS"], documentation: [] };
  codes["F01.0"] = { code: "F01.0", description: "Vascular dementia of mild severity", category: "F01", excludes1: [], excludes2: [], includes: [], commonUse: ["Mild vascular dementia"], documentation: [] };
  codes["F01.1"] = { code: "F01.1", description: "Vascular dementia of moderate severity", category: "F01", excludes1: [], excludes2: [], includes: [], commonUse: ["Moderate vascular dementia"], documentation: [] };
  codes["F01.2"] = { code: "F01.2", description: "Vascular dementia of severe severity", category: "F01", excludes1: [], excludes2: [], includes: [], commonUse: ["Severe vascular dementia"], documentation: [] };
  codes["F01.9"] = { code: "F01.9", description: "Vascular dementia, unspecified", category: "F01", excludes1: [], excludes2: [], includes: [], commonUse: ["Vascular dementia NOS"], documentation: [] };
  codes["F02.0"] = { code: "F02.0", description: "Dementia in Alzheimer disease with early onset", category: "F02", excludes1: [], excludes2: [], includes: [], commonUse: ["Early-onset Alzheimer dementia"], documentation: [] };
  codes["F02.1"] = { code: "F02.1", description: "Dementia in Alzheimer disease with late onset", category: "F02", excludes1: [], excludes2: [], includes: [], commonUse: ["Late-onset Alzheimer dementia"], documentation: [] };
  codes["F02.8"] = { code: "F02.8", description: "Dementia in other diseases classified elsewhere", category: "F02", excludes1: [], excludes2: [], includes: [], commonUse: ["Dementia NOS"], documentation: [] };
  codes["F03"] = { code: "F03", description: "Unspecified dementia", category: "F03", excludes1: [], excludes2: [], includes: [], commonUse: ["Dementia NOS","Senile dementia"], documentation: [] };
  codes["F04"] = { code: "F04", description: "Organic amnesic syndrome, not induced by alcohol", category: "F04", excludes1: [], excludes2: [], includes: [], commonUse: ["Korsakoff syndrome"], documentation: [] };
  codes["F05.0"] = { code: "F05.0", description: "Delirium with hyperactivity", category: "F05", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperactive delirium"], documentation: [] };
  codes["F05.1"] = { code: "F05.1", description: "Delirium with hypoactivity", category: "F05", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypoactive delirium"], documentation: [] };
  codes["F05.9"] = { code: "F05.9", description: "Delirium, unspecified", category: "F05", excludes1: [], excludes2: [], includes: [], commonUse: ["Delirium NOS"], documentation: [] };
  codes["F06.0"] = { code: "F06.0", description: "Psychotic disorder with delusions due to physiological condition", category: "F06", excludes1: [], excludes2: [], includes: [], commonUse: ["Delusional disorder NOS"], documentation: [] };
  codes["F06.1"] = { code: "F06.1", description: "Psychotic disorder with hallucinations due to physiological condition", category: "F06", excludes1: [], excludes2: [], includes: [], commonUse: ["Hallucinatory disorder NOS"], documentation: [] };
  codes["F06.3"] = { code: "F06.3", description: "Mood disorders due to known physiological condition", category: "F06", excludes1: [], excludes2: [], includes: [], commonUse: ["Organic mood disorder"], documentation: [] };
  codes["F06.4"] = { code: "F06.4", description: "Anxiety disorder due to known physiological condition", category: "F06", excludes1: [], excludes2: [], includes: [], commonUse: ["Organic anxiety disorder"], documentation: [] };
  codes["F06.7"] = { code: "F06.7", description: "Mild neurocognitive disorder due to known physiological condition", category: "F06", excludes1: [], excludes2: [], includes: [], commonUse: ["Mild neurocognitive disorder"], documentation: [] };
  codes["F06.9"] = { code: "F06.9", description: "Unspecified mental disorder due to known physiological condition", category: "F06", excludes1: [], excludes2: [], includes: [], commonUse: ["Organic mental disorder NOS"], documentation: [] };
  codes["F09"] = { code: "F09", description: "Unspecified organic mental disorder", category: "F09", excludes1: [], excludes2: [], includes: [], commonUse: ["Organic brain syndrome NOS"], documentation: [] };
  codes["F10.10"] = { code: "F10.10", description: "Alcohol abuse, uncomplicated", category: "F10", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcohol abuse"], documentation: [] };
  codes["F10.20"] = { code: "F10.20", description: "Alcohol dependence, uncomplicated", category: "F10", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcoholism","Alcohol dependence"], documentation: [] };
  codes["F10.21"] = { code: "F10.21", description: "Alcohol dependence, in remission", category: "F10", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcohol dependence in remission"], documentation: [] };
  codes["F10.92"] = { code: "F10.92", description: "Alcohol use, unspecified with intoxication", category: "F10", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcohol intoxication"], documentation: [] };
  codes["F10.93"] = { code: "F10.93", description: "Alcohol use, unspecified with withdrawal", category: "F10", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcohol withdrawal"], documentation: [] };
  codes["F11.10"] = { code: "F11.10", description: "Opioid abuse, uncomplicated", category: "F11", excludes1: [], excludes2: [], includes: [], commonUse: ["Opioid abuse"], documentation: [] };
  codes["F11.20"] = { code: "F11.20", description: "Opioid dependence, uncomplicated", category: "F11", excludes1: [], excludes2: [], includes: [], commonUse: ["Opioid dependence","Heroin dependence"], documentation: [] };
  codes["F11.23"] = { code: "F11.23", description: "Opioid dependence with withdrawal", category: "F11", excludes1: [], excludes2: [], includes: [], commonUse: ["Opioid withdrawal"], documentation: [] };
  codes["F12.10"] = { code: "F12.10", description: "Cannabis abuse, uncomplicated", category: "F12", excludes1: [], excludes2: [], includes: [], commonUse: ["Marijuana abuse"], documentation: [] };
  codes["F12.20"] = { code: "F12.20", description: "Cannabis dependence, uncomplicated", category: "F12", excludes1: [], excludes2: [], includes: [], commonUse: ["Cannabis dependence","Marijuana dependence"], documentation: [] };
  codes["F13.20"] = { code: "F13.20", description: "Sedative-hypnotic dependence, uncomplicated", category: "F13", excludes1: [], excludes2: [], includes: [], commonUse: ["Benzodiazepine dependence"], documentation: [] };
  codes["F13.23"] = { code: "F13.23", description: "Sedative-hypnotic dependence with withdrawal", category: "F13", excludes1: [], excludes2: [], includes: [], commonUse: ["Benzodiazepine withdrawal"], documentation: [] };
  codes["F14.10"] = { code: "F14.10", description: "Cocaine abuse, uncomplicated", category: "F14", excludes1: [], excludes2: [], includes: [], commonUse: ["Cocaine abuse"], documentation: [] };
  codes["F14.20"] = { code: "F14.20", description: "Cocaine dependence, uncomplicated", category: "F14", excludes1: [], excludes2: [], includes: [], commonUse: ["Cocaine dependence"], documentation: [] };
  codes["F15.10"] = { code: "F15.10", description: "Other stimulant abuse, uncomplicated", category: "F15", excludes1: [], excludes2: [], includes: [], commonUse: ["Amphetamine abuse"], documentation: [] };
  codes["F15.20"] = { code: "F15.20", description: "Other stimulant dependence, uncomplicated", category: "F15", excludes1: [], excludes2: [], includes: [], commonUse: ["Amphetamine dependence","Methamphetamine dependence"], documentation: [] };
  codes["F17.210"] = { code: "F17.210", description: "Nicotine dependence, cigarettes, uncomplicated", category: "F17", excludes1: [], excludes2: [], includes: [], commonUse: ["Smoking","Tobacco dependence","Cigarette dependence"], documentation: [] };
  codes["F18.10"] = { code: "F18.10", description: "Inhalant abuse, uncomplicated", category: "F18", excludes1: [], excludes2: [], includes: [], commonUse: ["Inhalant abuse"], documentation: [] };
  codes["F19.20"] = { code: "F19.20", description: "Other psychoactive substance dependence", category: "F19", excludes1: [], excludes2: [], includes: [], commonUse: ["Substance dependence NOS"], documentation: [] };
  codes["F20.0"] = { code: "F20.0", description: "Paranoid schizophrenia", category: "F20", excludes1: [], excludes2: [], includes: [], commonUse: ["Paranoid schizophrenia"], documentation: [] };
  codes["F20.1"] = { code: "F20.1", description: "Hebephrenic schizophrenia", category: "F20", excludes1: [], excludes2: [], includes: [], commonUse: ["Disorganized schizophrenia"], documentation: [] };
  codes["F20.2"] = { code: "F20.2", description: "Catatonic schizophrenia", category: "F20", excludes1: [], excludes2: [], includes: [], commonUse: ["Catatonic schizophrenia"], documentation: [] };
  codes["F20.3"] = { code: "F20.3", description: "Undifferentiated schizophrenia", category: "F20", excludes1: [], excludes2: [], includes: [], commonUse: ["Undifferentiated schizophrenia"], documentation: [] };
  codes["F20.9"] = { code: "F20.9", description: "Schizophrenia, unspecified", category: "F20", excludes1: [], excludes2: [], includes: [], commonUse: ["Schizophrenia NOS"], documentation: [] };
  codes["F21"] = { code: "F21", description: "Schizotypal disorder", category: "F21", excludes1: [], excludes2: [], includes: [], commonUse: ["Schizotypal personality"], documentation: [] };
  codes["F22"] = { code: "F22", description: "Delusional disorders", category: "F22", excludes1: [], excludes2: [], includes: [], commonUse: ["Delusional disorder"], documentation: [] };
  codes["F23"] = { code: "F23", description: "Brief psychotic disorder", category: "F23", excludes1: [], excludes2: [], includes: [], commonUse: ["Brief reactive psychosis"], documentation: [] };
  codes["F25.0"] = { code: "F25.0", description: "Schizoaffective disorder, manic type", category: "F25", excludes1: [], excludes2: [], includes: [], commonUse: ["Schizoaffective - manic"], documentation: [] };
  codes["F25.1"] = { code: "F25.1", description: "Schizoaffective disorder, depressive type", category: "F25", excludes1: [], excludes2: [], includes: [], commonUse: ["Schizoaffective - depressive"], documentation: [] };
  codes["F25.9"] = { code: "F25.9", description: "Schizoaffective disorder, unspecified", category: "F25", excludes1: [], excludes2: [], includes: [], commonUse: ["Schizoaffective disorder NOS"], documentation: [] };
  codes["F29"] = { code: "F29", description: "Unspecified psychosis", category: "F29", excludes1: [], excludes2: [], includes: [], commonUse: ["Psychosis NOS"], documentation: [] };
  codes["F30.0"] = { code: "F30.0", description: "Hypomanic episode", category: "F30", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypomania"], documentation: [] };
  codes["F30.1"] = { code: "F30.1", description: "Manic episode", category: "F30", excludes1: [], excludes2: [], includes: [], commonUse: ["Mania"], documentation: [] };
  codes["F31.0"] = { code: "F31.0", description: "Bipolar I, current episode hypomanic", category: "F31", excludes1: [], excludes2: [], includes: [], commonUse: ["Bipolar I - hypomanic"], documentation: [] };
  codes["F31.1"] = { code: "F31.1", description: "Bipolar I, current episode manic", category: "F31", excludes1: [], excludes2: [], includes: [], commonUse: ["Bipolar I - manic"], documentation: [] };
  codes["F31.2"] = { code: "F31.2", description: "Bipolar I, current episode manic severe with psychotic features", category: "F31", excludes1: [], excludes2: [], includes: [], commonUse: ["Bipolar I - manic with psychosis"], documentation: [] };
  codes["F31.3"] = { code: "F31.3", description: "Bipolar I, current episode depressed", category: "F31", excludes1: [], excludes2: [], includes: [], commonUse: ["Bipolar depression"], documentation: [] };
  codes["F31.81"] = { code: "F31.81", description: "Bipolar II disorder", category: "F31", excludes1: [], excludes2: [], includes: [], commonUse: ["Bipolar II"], documentation: [] };
  codes["F31.9"] = { code: "F31.9", description: "Bipolar disorder, unspecified", category: "F31", excludes1: [], excludes2: [], includes: [], commonUse: ["Bipolar disorder NOS"], documentation: [] };
  codes["F32.0"] = { code: "F32.0", description: "Major depressive disorder, single episode, mild", category: "F32", excludes1: [], excludes2: [], includes: [], commonUse: ["Depression - mild"], documentation: [] };
  codes["F32.1"] = { code: "F32.1", description: "Major depressive disorder, single episode, moderate", category: "F32", excludes1: [], excludes2: [], includes: [], commonUse: ["Depression - moderate"], documentation: [] };
  codes["F32.2"] = { code: "F32.2", description: "Major depressive disorder, single episode, severe", category: "F32", excludes1: [], excludes2: [], includes: [], commonUse: ["Depression - severe"], documentation: [] };
  codes["F32.9"] = { code: "F32.9", description: "Major depressive disorder, single episode, unspecified", category: "F32", excludes1: [], excludes2: [], includes: [], commonUse: ["Depression NOS"], documentation: [] };
  codes["F33.0"] = { code: "F33.0", description: "Major depressive disorder, recurrent, mild", category: "F33", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent depression - mild"], documentation: [] };
  codes["F33.1"] = { code: "F33.1", description: "Major depressive disorder, recurrent, moderate", category: "F33", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent depression - moderate"], documentation: [] };
  codes["F33.2"] = { code: "F33.2", description: "Major depressive disorder, recurrent, severe", category: "F33", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent depression - severe"], documentation: [] };
  codes["F33.9"] = { code: "F33.9", description: "Major depressive disorder, recurrent, unspecified", category: "F33", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent depression NOS"], documentation: [] };
  codes["F34.0"] = { code: "F34.0", description: "Cyclothymic disorder", category: "F34", excludes1: [], excludes2: [], includes: [], commonUse: ["Cyclothymia"], documentation: [] };
  codes["F34.1"] = { code: "F34.1", description: "Dysthymic disorder", category: "F34", excludes1: [], excludes2: [], includes: [], commonUse: ["Dysthymia"], documentation: [] };
  codes["F39"] = { code: "F39", description: "Unspecified mood disorder", category: "F39", excludes1: [], excludes2: [], includes: [], commonUse: ["Mood disorder NOS"], documentation: [] };
  codes["F40.0"] = { code: "F40.0", description: "Agoraphobia", category: "F40", excludes1: [], excludes2: [], includes: [], commonUse: ["Agoraphobia"], documentation: [] };
  codes["F40.1"] = { code: "F40.1", description: "Social phobia", category: "F40", excludes1: [], excludes2: [], includes: [], commonUse: ["Social anxiety disorder","Social phobia"], documentation: [] };
  codes["F40.2"] = { code: "F40.2", description: "Specific phobias", category: "F40", excludes1: [], excludes2: [], includes: [], commonUse: ["Specific phobia"], documentation: [] };
  codes["F41.0"] = { code: "F41.0", description: "Panic disorder without agoraphobia", category: "F41", excludes1: [], excludes2: [], includes: [], commonUse: ["Panic disorder","Panic attacks"], documentation: [] };
  codes["F41.1"] = { code: "F41.1", description: "Generalized anxiety disorder", category: "F41", excludes1: [], excludes2: [], includes: [], commonUse: ["GAD","Anxiety disorder"], documentation: [] };
  codes["F41.9"] = { code: "F41.9", description: "Anxiety disorder, unspecified", category: "F41", excludes1: [], excludes2: [], includes: [], commonUse: ["Anxiety NOS"], documentation: [] };
  codes["F42.0"] = { code: "F42.0", description: "Obsessional thoughts or ruminations", category: "F42", excludes1: [], excludes2: [], includes: [], commonUse: ["OCD - obsessions"], documentation: [] };
  codes["F42.1"] = { code: "F42.1", description: "Compulsive acts", category: "F42", excludes1: [], excludes2: [], includes: [], commonUse: ["OCD - compulsions"], documentation: [] };
  codes["F42.2"] = { code: "F42.2", description: "Mixed obsessional thoughts and acts", category: "F42", excludes1: [], excludes2: [], includes: [], commonUse: ["OCD"], documentation: [] };
  codes["F42.9"] = { code: "F42.9", description: "Obsessive-compulsive disorder, unspecified", category: "F42", excludes1: [], excludes2: [], includes: [], commonUse: ["OCD NOS"], documentation: [] };
  codes["F43.1"] = { code: "F43.1", description: "Post-traumatic stress disorder", category: "F43", excludes1: [], excludes2: [], includes: [], commonUse: ["PTSD"], documentation: [] };
  codes["F43.20"] = { code: "F43.20", description: "Adjustment disorder, unspecified", category: "F43", excludes1: [], excludes2: [], includes: [], commonUse: ["Adjustment disorder NOS"], documentation: [] };
  codes["F43.21"] = { code: "F43.21", description: "Adjustment disorder with depressed mood", category: "F43", excludes1: [], excludes2: [], includes: [], commonUse: ["Adjustment disorder - depressed"], documentation: [] };
  codes["F43.22"] = { code: "F43.22", description: "Adjustment disorder with anxiety", category: "F43", excludes1: [], excludes2: [], includes: [], commonUse: ["Adjustment disorder - anxious"], documentation: [] };
  codes["F43.23"] = { code: "F43.23", description: "Adjustment disorder with mixed anxiety and depressed mood", category: "F43", excludes1: [], excludes2: [], includes: [], commonUse: ["Adjustment disorder - mixed"], documentation: [] };
  codes["F44.0"] = { code: "F44.0", description: "Dissociative amnesia", category: "F44", excludes1: [], excludes2: [], includes: [], commonUse: ["Dissociative amnesia"], documentation: [] };
  codes["F44.1"] = { code: "F44.1", description: "Dissociative fugue", category: "F44", excludes1: [], excludes2: [], includes: [], commonUse: ["Fugue state"], documentation: [] };
  codes["F44.4"] = { code: "F44.4", description: "Dissociative motor disorder", category: "F44", excludes1: [], excludes2: [], includes: [], commonUse: ["Conversion disorder - motor"], documentation: [] };
  codes["F44.5"] = { code: "F44.5", description: "Dissociative convulsions", category: "F44", excludes1: [], excludes2: [], includes: [], commonUse: ["Psychogenic seizures"], documentation: [] };
  codes["F44.6"] = { code: "F44.6", description: "Dissociative anesthesia and sensory loss", category: "F44", excludes1: [], excludes2: [], includes: [], commonUse: ["Conversion - sensory"], documentation: [] };
  codes["F44.9"] = { code: "F44.9", description: "Dissociative [conversion] disorder, unspecified", category: "F44", excludes1: [], excludes2: [], includes: [], commonUse: ["Conversion disorder NOS"], documentation: [] };
  codes["F45.0"] = { code: "F45.0", description: "Somatization disorder", category: "F45", excludes1: [], excludes2: [], includes: [], commonUse: ["Somatization disorder"], documentation: [] };
  codes["F45.2"] = { code: "F45.2", description: "Hypochondriasis", category: "F45", excludes1: [], excludes2: [], includes: [], commonUse: ["Health anxiety","Hypochondriasis"], documentation: [] };
  codes["F45.21"] = { code: "F45.21", description: "Body dysmorphic disorder", category: "F45", excludes1: [], excludes2: [], includes: [], commonUse: ["BDD","Body dysmorphia"], documentation: [] };
  codes["F45.3"] = { code: "F45.3", description: "Somatoform pain disorder", category: "F45", excludes1: [], excludes2: [], includes: [], commonUse: ["Psychogenic pain"], documentation: [] };
  codes["F45.9"] = { code: "F45.9", description: "Somatoform disorder, unspecified", category: "F45", excludes1: [], excludes2: [], includes: [], commonUse: ["Somatoform disorder NOS"], documentation: [] };
  codes["F48.0"] = { code: "F48.0", description: "Neurasthenia", category: "F48", excludes1: [], excludes2: [], includes: [], commonUse: ["Neurasthenia","Chronic fatigue syndrome"], documentation: [] };
  codes["F48.1"] = { code: "F48.1", description: "Depersonalization-derealization disorder", category: "F48", excludes1: [], excludes2: [], includes: [], commonUse: ["Depersonalization"], documentation: [] };
  codes["F50.0"] = { code: "F50.0", description: "Anorexia nervosa", category: "F50", excludes1: [], excludes2: [], includes: [], commonUse: ["Anorexia"], documentation: [] };
  codes["F50.1"] = { code: "F50.1", description: "Bulimia nervosa", category: "F50", excludes1: [], excludes2: [], includes: [], commonUse: ["Bulimia"], documentation: [] };
  codes["F50.9"] = { code: "F50.9", description: "Eating disorder, unspecified", category: "F50", excludes1: [], excludes2: [], includes: [], commonUse: ["Eating disorder NOS"], documentation: [] };
  codes["F51.0"] = { code: "F51.0", description: "Nonorganic insomnia", category: "F51", excludes1: [], excludes2: [], includes: [], commonUse: ["Insomnia"], documentation: [] };
  codes["F51.1"] = { code: "F51.1", description: "Nonorganic hypersomnia", category: "F51", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypersomnia"], documentation: [] };
  codes["F60.0"] = { code: "F60.0", description: "Paranoid personality disorder", category: "F60", excludes1: [], excludes2: [], includes: [], commonUse: ["Paranoid personality"], documentation: [] };
  codes["F60.1"] = { code: "F60.1", description: "Schizoid personality disorder", category: "F60", excludes1: [], excludes2: [], includes: [], commonUse: ["Schizoid personality"], documentation: [] };
  codes["F60.2"] = { code: "F60.2", description: "Antisocial personality disorder", category: "F60", excludes1: [], excludes2: [], includes: [], commonUse: ["ASPD","Antisocial personality","Sociopathy"], documentation: [] };
  codes["F60.3"] = { code: "F60.3", description: "Borderline personality disorder", category: "F60", excludes1: [], excludes2: [], includes: [], commonUse: ["BPD","Borderline personality"], documentation: [] };
  codes["F60.5"] = { code: "F60.5", description: "Avoidant personality disorder", category: "F60", excludes1: [], excludes2: [], includes: [], commonUse: ["Avoidant personality"], documentation: [] };
  codes["F60.6"] = { code: "F60.6", description: "Dependent personality disorder", category: "F60", excludes1: [], excludes2: [], includes: [], commonUse: ["Dependent personality"], documentation: [] };
  codes["F60.7"] = { code: "F60.7", description: "Narcissistic personality disorder", category: "F60", excludes1: [], excludes2: [], includes: [], commonUse: ["NPD","Narcissistic personality"], documentation: [] };
  codes["F60.9"] = { code: "F60.9", description: "Personality disorder, unspecified", category: "F60", excludes1: [], excludes2: [], includes: [], commonUse: ["Personality disorder NOS"], documentation: [] };
  codes["F63.0"] = { code: "F63.0", description: "Pathological gambling", category: "F63", excludes1: [], excludes2: [], includes: [], commonUse: ["Gambling disorder","Compulsive gambling"], documentation: [] };
  codes["F63.1"] = { code: "F63.1", description: "Pyromania", category: "F63", excludes1: [], excludes2: [], includes: [], commonUse: ["Pyromania"], documentation: [] };
  codes["F63.2"] = { code: "F63.2", description: "Kleptomania", category: "F63", excludes1: [], excludes2: [], includes: [], commonUse: ["Kleptomania"], documentation: [] };
  codes["F64.0"] = { code: "F64.0", description: "Transsexualism", category: "F64", excludes1: [], excludes2: [], includes: [], commonUse: ["Gender dysphoria"], documentation: [] };
  codes["F80.0"] = { code: "F80.0", description: "Phonological disorder", category: "F80", excludes1: [], excludes2: [], includes: [], commonUse: ["Speech sound disorder"], documentation: [] };
  codes["F80.1"] = { code: "F80.1", description: "Expressive language disorder", category: "F80", excludes1: [], excludes2: [], includes: [], commonUse: ["Expressive language delay"], documentation: [] };
  codes["F80.2"] = { code: "F80.2", description: "Mixed receptive-expressive language disorder", category: "F80", excludes1: [], excludes2: [], includes: [], commonUse: ["Mixed language disorder"], documentation: [] };
  codes["F81.0"] = { code: "F81.0", description: "Specific reading disorder", category: "F81", excludes1: [], excludes2: [], includes: [], commonUse: ["Dyslexia","Reading disorder"], documentation: [] };
  codes["F81.2"] = { code: "F81.2", description: "Specific disorder of arithmetical skills", category: "F81", excludes1: [], excludes2: [], includes: [], commonUse: ["Dyscalculia","Math disorder"], documentation: [] };
  codes["F82"] = { code: "F82", description: "Specific developmental disorder of motor function", category: "F82", excludes1: [], excludes2: [], includes: [], commonUse: ["Developmental coordination disorder","Dyspraxia"], documentation: [] };
  codes["F84.0"] = { code: "F84.0", description: "Childhood autism", category: "F84", excludes1: [], excludes2: [], includes: [], commonUse: ["Autism","Autism spectrum disorder","ASD"], documentation: [] };
  codes["F84.1"] = { code: "F84.1", description: "Asperger syndrome", category: "F84", excludes1: [], excludes2: [], includes: [], commonUse: ["Asperger syndrome"], documentation: [] };
  codes["F84.9"] = { code: "F84.9", description: "Pervasive developmental disorder, unspecified", category: "F84", excludes1: [], excludes2: [], includes: [], commonUse: ["PDD NOS","Autism NOS"], documentation: [] };
  codes["F90.0"] = { code: "F90.0", description: "ADHD, predominantly inattentive type", category: "F90", excludes1: [], excludes2: [], includes: [], commonUse: ["ADHD - inattentive","ADD"], documentation: [] };
  codes["F90.1"] = { code: "F90.1", description: "ADHD, predominantly hyperactive type", category: "F90", excludes1: [], excludes2: [], includes: [], commonUse: ["ADHD - hyperactive"], documentation: [] };
  codes["F90.2"] = { code: "F90.2", description: "ADHD, combined type", category: "F90", excludes1: [], excludes2: [], includes: [], commonUse: ["ADHD - combined"], documentation: [] };
  codes["F90.9"] = { code: "F90.9", description: "ADHD, unspecified type", category: "F90", excludes1: [], excludes2: [], includes: [], commonUse: ["ADHD NOS"], documentation: [] };
  codes["F95.0"] = { code: "F95.0", description: "Transient tic disorder", category: "F95", excludes1: [], excludes2: [], includes: [], commonUse: ["Transient tic disorder"], documentation: [] };
  codes["F95.1"] = { code: "F95.1", description: "Chronic motor or vocal tic disorder", category: "F95", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic tic disorder"], documentation: [] };
  codes["F95.2"] = { code: "F95.2", description: "Tourette syndrome", category: "F95", excludes1: [], excludes2: [], includes: [], commonUse: ["Tourette syndrome"], documentation: [] };
  codes["F98.0"] = { code: "F98.0", description: "Enuresis", category: "F98", excludes1: [], excludes2: [], includes: [], commonUse: ["Bedwetting","Nocturnal enuresis"], documentation: [] };
  codes["F98.1"] = { code: "F98.1", description: "Encopresis", category: "F98", excludes1: [], excludes2: [], includes: [], commonUse: ["Fecal soiling"], documentation: [] };
  codes["F98.5"] = { code: "F98.5", description: "Stuttering", category: "F98", excludes1: [], excludes2: [], includes: [], commonUse: ["Stuttering"], documentation: [] };
  codes["G00.0"] = { code: "G00.0", description: "Haemophilus influenzae meningitis", category: "G00", excludes1: [], excludes2: [], includes: [], commonUse: ["H. influenzae meningitis"], documentation: [] };
  codes["G00.1"] = { code: "G00.1", description: "Pneumococcal meningitis", category: "G00", excludes1: [], excludes2: [], includes: [], commonUse: ["Strep pneumoniae meningitis"], documentation: [] };
  codes["G00.2"] = { code: "G00.2", description: "Streptococcal meningitis", category: "G00", excludes1: [], excludes2: [], includes: [], commonUse: ["Group B strep meningitis"], documentation: [] };
  codes["G00.9"] = { code: "G00.9", description: "Bacterial meningitis, unspecified", category: "G00", excludes1: [], excludes2: [], includes: [], commonUse: ["Bacterial meningitis NOS"], documentation: [] };
  codes["G03.0"] = { code: "G03.0", description: "Meningitis due to other bacteria", category: "G03", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningitis NOS"], documentation: [] };
  codes["G03.1"] = { code: "G03.1", description: "Cryptococcal meningitis", category: "G03", excludes1: [], excludes2: [], includes: [], commonUse: ["Fungal meningitis"], documentation: [] };
  codes["G03.8"] = { code: "G03.8", description: "Meningitis due to other organisms", category: "G03", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningitis NOS"], documentation: [] };
  codes["G03.9"] = { code: "G03.9", description: "Meningitis, unspecified", category: "G03", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningitis NOS"], documentation: [] };
  codes["G04.0"] = { code: "G04.0", description: "Acute disseminated encephalitis", category: "G04", excludes1: [], excludes2: [], includes: [], commonUse: ["ADEM"], documentation: [] };
  codes["G04.1"] = { code: "G04.1", description: "Acute transverse myelitis", category: "G04", excludes1: [], excludes2: [], includes: [], commonUse: ["Transverse myelitis"], documentation: [] };
  codes["G04.2"] = { code: "G04.2", description: "Bacterial meningoencephalitis", category: "G04", excludes1: [], excludes2: [], includes: [], commonUse: ["Bacterial meningoencephalitis"], documentation: [] };
  codes["G04.8"] = { code: "G04.8", description: "Other viral meningoencephalitis", category: "G04", excludes1: [], excludes2: [], includes: [], commonUse: ["Encephalitis NOS"], documentation: [] };
  codes["G04.9"] = { code: "G04.9", description: "Encephalitis, myelitis and encephalomyelitis, unspecified", category: "G04", excludes1: [], excludes2: [], includes: [], commonUse: ["Encephalitis NOS"], documentation: [] };
  codes["G10"] = { code: "G10", description: "Huntington disease", category: "G10", excludes1: [], excludes2: [], includes: [], commonUse: ["Huntington chorea","Huntington disease"], documentation: [] };
  codes["G11.0"] = { code: "G11.0", description: "Congenital cerebellar ataxia", category: "G11", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital cerebellar ataxia"], documentation: [] };
  codes["G11.1"] = { code: "G11.1", description: "Friedreich ataxia", category: "G11", excludes1: [], excludes2: [], includes: [], commonUse: ["Friedreich ataxia"], documentation: [] };
  codes["G11.2"] = { code: "G11.2", description: "Early-onset cerebellar ataxia", category: "G11", excludes1: [], excludes2: [], includes: [], commonUse: ["Early-onset ataxia"], documentation: [] };
  codes["G11.3"] = { code: "G11.3", description: "Cerebellar ataxia with DNA repair defects", category: "G11", excludes1: [], excludes2: [], includes: [], commonUse: ["Ataxia telangiectasia"], documentation: [] };
  codes["G11.4"] = { code: "G11.4", description: "Hereditary spastic paraplegia", category: "G11", excludes1: [], excludes2: [], includes: [], commonUse: ["HSP","Spastic paraplegia"], documentation: [] };
  codes["G11.8"] = { code: "G11.8", description: "Other hereditary ataxias", category: "G11", excludes1: [], excludes2: [], includes: [], commonUse: ["Hereditary ataxia NOS"], documentation: [] };
  codes["G11.9"] = { code: "G11.9", description: "Hereditary ataxia, unspecified", category: "G11", excludes1: [], excludes2: [], includes: [], commonUse: ["Hereditary ataxia NOS"], documentation: [] };
  codes["G20"] = { code: "G20", description: "Parkinson disease", category: "G20", excludes1: [], excludes2: [], includes: [], commonUse: ["Parkinsonism","PD","Paralysis agitans"], documentation: [] };
  codes["G21.0"] = { code: "G21.0", description: "Malignant neuroleptic syndrome", category: "G21", excludes1: [], excludes2: [], includes: [], commonUse: ["NMS"], documentation: [] };
  codes["G21.1"] = { code: "G21.1", description: "Drug-induced secondary parkinsonism", category: "G21", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced parkinsonism"], documentation: [] };
  codes["G21.2"] = { code: "G21.2", description: "Postencephalitic parkinsonism", category: "G21", excludes1: [], excludes2: [], includes: [], commonUse: ["Postencephalitic parkinsonism"], documentation: [] };
  codes["G21.3"] = { code: "G21.3", description: "Idiopathic Parkinson disease with dyskinesia", category: "G21", excludes1: [], excludes2: [], includes: [], commonUse: ["PD with dyskinesia"], documentation: [] };
  codes["G21.8"] = { code: "G21.8", description: "Other secondary parkinsonism", category: "G21", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary parkinsonism NOS"], documentation: [] };
  codes["G21.9"] = { code: "G21.9", description: "Secondary parkinsonism, unspecified", category: "G21", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary parkinsonism NOS"], documentation: [] };
  codes["G25.0"] = { code: "G25.0", description: "Essential tremor", category: "G25", excludes1: [], excludes2: [], includes: [], commonUse: ["ET","Benign essential tremor"], documentation: [] };
  codes["G25.1"] = { code: "G25.1", description: "Drug-induced tremor", category: "G25", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced tremor"], documentation: [] };
  codes["G25.2"] = { code: "G25.2", description: "Other specified forms of tremor", category: "G25", excludes1: [], excludes2: [], includes: [], commonUse: ["Tremor NOS"], documentation: [] };
  codes["G25.3"] = { code: "G25.3", description: "Myoclonus", category: "G25", excludes1: [], excludes2: [], includes: [], commonUse: ["Myoclonus"], documentation: [] };
  codes["G25.4"] = { code: "G25.4", description: "Drug-induced dystonia", category: "G25", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced dystonia"], documentation: [] };
  codes["G25.5"] = { code: "G25.5", description: "Other chorea", category: "G25", excludes1: [], excludes2: [], includes: [], commonUse: ["Chorea NOS"], documentation: [] };
  codes["G25.8"] = { code: "G25.8", description: "Other specified extrapyramidal and movement disorders", category: "G25", excludes1: [], excludes2: [], includes: [], commonUse: ["Movement disorder NOS"], documentation: [] };
  codes["G25.9"] = { code: "G25.9", description: "Extrapyramidal and movement disorder, unspecified", category: "G25", excludes1: [], excludes2: [], includes: [], commonUse: ["Movement disorder NOS"], documentation: [] };
  codes["G30.0"] = { code: "G30.0", description: "Alzheimer disease with early onset", category: "G30", excludes1: [], excludes2: [], includes: [], commonUse: ["Early-onset Alzheimer disease"], documentation: [] };
  codes["G30.1"] = { code: "G30.1", description: "Alzheimer disease with late onset", category: "G30", excludes1: [], excludes2: [], includes: [], commonUse: ["Late-onset Alzheimer disease"], documentation: [] };
  codes["G30.9"] = { code: "G30.9", description: "Alzheimer disease, unspecified", category: "G30", excludes1: [], excludes2: [], includes: [], commonUse: ["Alzheimer disease NOS"], documentation: [] };
  codes["G31.0"] = { code: "G31.0", description: "Localized cerebral atrophy", category: "G31", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebral atrophy"], documentation: [] };
  codes["G31.1"] = { code: "G31.1", description: "Senile degeneration of brain", category: "G31", excludes1: [], excludes2: [], includes: [], commonUse: ["Senile brain degeneration"], documentation: [] };
  codes["G31.2"] = { code: "G31.2", description: "Degeneration of nervous system due to alcohol", category: "G31", excludes1: [], excludes2: [], includes: [], commonUse: ["Wernicke-Korsakoff syndrome"], documentation: [] };
  codes["G31.8"] = { code: "G31.8", description: "Other degenerative diseases of nervous system", category: "G31", excludes1: [], excludes2: [], includes: [], commonUse: ["Neurodegeneration NOS"], documentation: [] };
  codes["G31.9"] = { code: "G31.9", description: "Degenerative disease of nervous system, unspecified", category: "G31", excludes1: [], excludes2: [], includes: [], commonUse: ["Neurodegeneration NOS"], documentation: [] };
  codes["G35"] = { code: "G35", description: "Multiple sclerosis", category: "G35", excludes1: [], excludes2: [], includes: [], commonUse: ["MS","Demyelinating disease"], documentation: [] };
  codes["G40.0"] = { code: "G40.0", description: "Localization-related (focal) (partial) idiopathic epilepsy", category: "G40", excludes1: [], excludes2: [], includes: [], commonUse: ["Idiopathic epilepsy"], documentation: [] };
  codes["G40.1"] = { code: "G40.1", description: "Localization-related (focal) (partial) symptomatic epilepsy", category: "G40", excludes1: [], excludes2: [], includes: [], commonUse: ["Symptomatic epilepsy"], documentation: [] };
  codes["G40.2"] = { code: "G40.2", description: "Localization-related (focal) (partial) symptomatic epilepsy, complex", category: "G40", excludes1: [], excludes2: [], includes: [], commonUse: ["Temporal lobe epilepsy"], documentation: [] };
  codes["G40.3"] = { code: "G40.3", description: "Generalized idiopathic epilepsy", category: "G40", excludes1: [], excludes2: [], includes: [], commonUse: ["Juvenile myoclonic epilepsy"], documentation: [] };
  codes["G40.4"] = { code: "G40.4", description: "Other generalized epilepsy", category: "G40", excludes1: [], excludes2: [], includes: [], commonUse: ["Generalized epilepsy NOS"], documentation: [] };
  codes["G40.5"] = { code: "G40.5", description: "Special epileptic syndromes", category: "G40", excludes1: [], excludes2: [], includes: [], commonUse: ["Epilepsy syndrome NOS"], documentation: [] };
  codes["G40.9"] = { code: "G40.9", description: "Epilepsy, unspecified", category: "G40", excludes1: [], excludes2: [], includes: [], commonUse: ["Epilepsy NOS","Seizure disorder"], documentation: [] };
  codes["G41.0"] = { code: "G41.0", description: "Grand mal status epilepticus", category: "G41", excludes1: [], excludes2: [], includes: [], commonUse: ["Generalized tonic-clonic status epilepticus"], documentation: [] };
  codes["G41.1"] = { code: "G41.1", description: "Complex partial status epilepticus", category: "G41", excludes1: [], excludes2: [], includes: [], commonUse: ["Focal status epilepticus"], documentation: [] };
  codes["G41.2"] = { code: "G41.2", description: "Simple partial status epilepticus", category: "G41", excludes1: [], excludes2: [], includes: [], commonUse: ["Simple partial status"], documentation: [] };
  codes["G41.8"] = { code: "G41.8", description: "Other status epilepticus", category: "G41", excludes1: [], excludes2: [], includes: [], commonUse: ["Status epilepticus NOS"], documentation: [] };
  codes["G41.9"] = { code: "G41.9", description: "Status epilepticus, unspecified", category: "G41", excludes1: [], excludes2: [], includes: [], commonUse: ["Status epilepticus NOS"], documentation: [] };
  codes["G43.0"] = { code: "G43.0", description: "Migraine without aura", category: "G43", excludes1: [], excludes2: [], includes: [], commonUse: ["Common migraine","Migraine without aura"], documentation: [] };
  codes["G43.1"] = { code: "G43.1", description: "Migraine with aura", category: "G43", excludes1: [], excludes2: [], includes: [], commonUse: ["Classic migraine","Migraine with aura"], documentation: [] };
  codes["G43.2"] = { code: "G43.2", description: "Status migrainosus", category: "G43", excludes1: [], excludes2: [], includes: [], commonUse: ["Status migrainosus"], documentation: [] };
  codes["G43.7"] = { code: "G43.7", description: "Chronic migraine without aura", category: "G43", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic migraine"], documentation: [] };
  codes["G43.8"] = { code: "G43.8", description: "Other migraine", category: "G43", excludes1: [], excludes2: [], includes: [], commonUse: ["Migraine NOS"], documentation: [] };
  codes["G43.9"] = { code: "G43.9", description: "Migraine, unspecified", category: "G43", excludes1: [], excludes2: [], includes: [], commonUse: ["Migraine NOS"], documentation: [] };
  codes["G44.0"] = { code: "G44.0", description: "Cluster headache syndrome", category: "G44", excludes1: [], excludes2: [], includes: [], commonUse: ["Cluster headache"], documentation: [] };
  codes["G44.1"] = { code: "G44.1", description: "Vascular headache, not elsewhere classified", category: "G44", excludes1: [], excludes2: [], includes: [], commonUse: ["Vascular headache"], documentation: [] };
  codes["G44.2"] = { code: "G44.2", description: "Tension-type headache", category: "G44", excludes1: [], excludes2: [], includes: [], commonUse: ["Tension headache","TTH"], documentation: [] };
  codes["G44.3"] = { code: "G44.3", description: "Chronic post-traumatic headache", category: "G44", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-traumatic headache"], documentation: [] };
  codes["G44.4"] = { code: "G44.4", description: "Drug-induced headache, not elsewhere classified", category: "G44", excludes1: [], excludes2: [], includes: [], commonUse: ["Medication-overuse headache"], documentation: [] };
  codes["G44.8"] = { code: "G44.8", description: "Other specified headache syndromes", category: "G44", excludes1: [], excludes2: [], includes: [], commonUse: ["Headache NOS"], documentation: [] };
  codes["G45.0"] = { code: "G45.0", description: "Vertebro-basilar artery syndrome", category: "G45", excludes1: [], excludes2: [], includes: [], commonUse: ["VBI","Vertebrobasilar insufficiency"], documentation: [] };
  codes["G45.1"] = { code: "G45.1", description: "Carotid artery syndrome (hemispheric)", category: "G45", excludes1: [], excludes2: [], includes: [], commonUse: ["Carotid artery syndrome"], documentation: [] };
  codes["G45.2"] = { code: "G45.2", description: "Multiple and bilateral precerebral artery syndromes", category: "G45", excludes1: [], excludes2: [], includes: [], commonUse: ["Multi-territory TIA"], documentation: [] };
  codes["G45.8"] = { code: "G45.8", description: "Other transient cerebral ischaemic attacks", category: "G45", excludes1: [], excludes2: [], includes: [], commonUse: ["TIA NOS"], documentation: [] };
  codes["G45.9"] = { code: "G45.9", description: "Transient cerebral ischaemic attack, unspecified", category: "G45", excludes1: [], excludes2: [], includes: [], commonUse: ["TIA NOS"], documentation: [] };
  codes["G47.0"] = { code: "G47.0", description: "Insomnia", category: "G47", excludes1: [], excludes2: [], includes: [], commonUse: ["Insomnia"], documentation: [] };
  codes["G47.1"] = { code: "G47.1", description: "Hypersomnia", category: "G47", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypersomnia","Excessive daytime sleepiness"], documentation: [] };
  codes["G47.2"] = { code: "G47.2", description: "Circadian rhythm sleep disorder", category: "G47", excludes1: [], excludes2: [], includes: [], commonUse: ["Sleep-wake disorder"], documentation: [] };
  codes["G47.3"] = { code: "G47.3", description: "Sleep apnea", category: "G47", excludes1: [], excludes2: [], includes: [], commonUse: ["Sleep apnea","OSA","Obstructive sleep apnea"], documentation: [] };
  codes["G47.4"] = { code: "G47.4", description: "Narcolepsy and cataplexy", category: "G47", excludes1: [], excludes2: [], includes: [], commonUse: ["Narcolepsy"], documentation: [] };
  codes["G47.8"] = { code: "G47.8", description: "Other sleep disorders", category: "G47", excludes1: [], excludes2: [], includes: [], commonUse: ["Sleep disorder NOS"], documentation: [] };
  codes["G47.9"] = { code: "G47.9", description: "Sleep disorder, unspecified", category: "G47", excludes1: [], excludes2: [], includes: [], commonUse: ["Sleep disorder NOS"], documentation: [] };
  codes["G50.0"] = { code: "G50.0", description: "Trigeminal neuralgia", category: "G50", excludes1: [], excludes2: [], includes: [], commonUse: ["Trigeminal neuralgia","Tic douloureux"], documentation: [] };
  codes["G50.1"] = { code: "G50.1", description: "Atypical facial pain", category: "G50", excludes1: [], excludes2: [], includes: [], commonUse: ["Atypical facial pain"], documentation: [] };
  codes["G50.8"] = { code: "G50.8", description: "Other disorders of trigeminal nerve", category: "G50", excludes1: [], excludes2: [], includes: [], commonUse: ["Trigeminal nerve disorder"], documentation: [] };
  codes["G50.9"] = { code: "G50.9", description: "Disorder of trigeminal nerve, unspecified", category: "G50", excludes1: [], excludes2: [], includes: [], commonUse: ["Trigeminal nerve disorder NOS"], documentation: [] };
  codes["G51.0"] = { code: "G51.0", description: "Bell palsy", category: "G51", excludes1: [], excludes2: [], includes: [], commonUse: ["Bell palsy","Idiopathic facial paralysis"], documentation: [] };
  codes["G51.1"] = { code: "G51.1", description: "Geniculate ganglionitis", category: "G51", excludes1: [], excludes2: [], includes: [], commonUse: ["Ramsay Hunt syndrome"], documentation: [] };
  codes["G51.2"] = { code: "G51.2", description: "Melkersson syndrome", category: "G51", excludes1: [], excludes2: [], includes: [], commonUse: ["Melkersson-Rosenthal syndrome"], documentation: [] };
  codes["G51.8"] = { code: "G51.8", description: "Other disorders of facial nerve", category: "G51", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial nerve disorder"], documentation: [] };
  codes["G51.9"] = { code: "G51.9", description: "Facial nerve disorder, unspecified", category: "G51", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial nerve disorder NOS"], documentation: [] };
  codes["G54.0"] = { code: "G54.0", description: "Brachial plexus disorders", category: "G54", excludes1: [], excludes2: [], includes: [], commonUse: ["Brachial plexopathy","Thoracic outlet syndrome"], documentation: [] };
  codes["G54.1"] = { code: "G54.1", description: "Lumbosacral root lesions", category: "G54", excludes1: [], excludes2: [], includes: [], commonUse: ["Radiculopathy","Nerve root lesion"], documentation: [] };
  codes["G54.2"] = { code: "G54.2", description: "Cervical root lesions", category: "G54", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical radiculopathy"], documentation: [] };
  codes["G54.4"] = { code: "G54.4", description: "Lumbosacral root lesions", category: "G54", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar radiculopathy"], documentation: [] };
  codes["G54.5"] = { code: "G54.5", description: "Neuralgic amyotrophy", category: "G54", excludes1: [], excludes2: [], includes: [], commonUse: ["Parsonage-Turner syndrome"], documentation: [] };
  codes["G54.8"] = { code: "G54.8", description: "Other nerve root and plexus disorders", category: "G54", excludes1: [], excludes2: [], includes: [], commonUse: ["Nerve root disorder NOS"], documentation: [] };
  codes["G54.9"] = { code: "G54.9", description: "Nerve root and plexus disorder, unspecified", category: "G54", excludes1: [], excludes2: [], includes: [], commonUse: ["Nerve root disorder NOS"], documentation: [] };
  codes["G55"] = { code: "G55", description: "Nerve root and plexus compressions in diseases classified elsewhere", category: "G55", excludes1: [], excludes2: [], includes: [], commonUse: ["Radiculopathy NOS"], documentation: [] };
  codes["G56.0"] = { code: "G56.0", description: "Carpal tunnel syndrome", category: "G56", excludes1: [], excludes2: [], includes: [], commonUse: ["CTS","Carpal tunnel syndrome"], documentation: [] };
  codes["G56.1"] = { code: "G56.1", description: "Median nerve lesion", category: "G56", excludes1: [], excludes2: [], includes: [], commonUse: ["Median neuropathy"], documentation: [] };
  codes["G56.2"] = { code: "G56.2", description: "Ulnar nerve lesion at elbow", category: "G56", excludes1: [], excludes2: [], includes: [], commonUse: ["Ulnar neuropathy at elbow"], documentation: [] };
  codes["G56.3"] = { code: "G56.3", description: "Ulnar nerve lesion at wrist", category: "G56", excludes1: [], excludes2: [], includes: [], commonUse: ["Ulnar neuropathy at wrist"], documentation: [] };
  codes["G56.4"] = { code: "G56.4", description: "Radial nerve lesion", category: "G56", excludes1: [], excludes2: [], includes: [], commonUse: ["Radial neuropathy","Saturday night palsy"], documentation: [] };
  codes["G56.8"] = { code: "G56.8", description: "Other mononeuropathies of upper limb", category: "G56", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb mononeuropathy"], documentation: [] };
  codes["G56.9"] = { code: "G56.9", description: "Mononeuropathy of upper limb, unspecified", category: "G56", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb mononeuropathy NOS"], documentation: [] };
  codes["G57.0"] = { code: "G57.0", description: "Lesion of sciatic nerve", category: "G57", excludes1: [], excludes2: [], includes: [], commonUse: ["Sciatica","Sciatic neuropathy"], documentation: [] };
  codes["G57.1"] = { code: "G57.1", description: "Meralgia paraesthetica", category: "G57", excludes1: [], excludes2: [], includes: [], commonUse: ["Lateral femoral cutaneous neuropathy"], documentation: [] };
  codes["G57.2"] = { code: "G57.2", description: "Lesion of lateral popliteal nerve", category: "G57", excludes1: [], excludes2: [], includes: [], commonUse: ["Common peroneal neuropathy"], documentation: [] };
  codes["G57.3"] = { code: "G57.3", description: "Lesion of medial popliteal nerve", category: "G57", excludes1: [], excludes2: [], includes: [], commonUse: ["Tibial neuropathy"], documentation: [] };
  codes["G57.4"] = { code: "G57.4", description: "Lesion of tibial nerve", category: "G57", excludes1: [], excludes2: [], includes: [], commonUse: ["Tarsal tunnel syndrome"], documentation: [] };
  codes["G57.5"] = { code: "G57.5", description: "Lesion of lateral plantar nerve", category: "G57", excludes1: [], excludes2: [], includes: [], commonUse: ["Baxter neuropathy"], documentation: [] };
  codes["G57.6"] = { code: "G57.6", description: "Lesion of plantar nerve", category: "G57", excludes1: [], excludes2: [], includes: [], commonUse: ["Morton neuroma"], documentation: [] };
  codes["G57.8"] = { code: "G57.8", description: "Other mononeuropathies of lower limb", category: "G57", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb mononeuropathy"], documentation: [] };
  codes["G57.9"] = { code: "G57.9", description: "Mononeuropathy of lower limb, unspecified", category: "G57", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb mononeuropathy NOS"], documentation: [] };
  codes["G60.0"] = { code: "G60.0", description: "Hereditary motor and sensory neuropathy", category: "G60", excludes1: [], excludes2: [], includes: [], commonUse: ["Charcot-Marie-Tooth disease","CMT"], documentation: [] };
  codes["G60.1"] = { code: "G60.1", description: "Refsum disease", category: "G60", excludes1: [], excludes2: [], includes: [], commonUse: ["Refsum disease"], documentation: [] };
  codes["G60.2"] = { code: "G60.2", description: "Neuropathy in association with hereditary ataxia", category: "G60", excludes1: [], excludes2: [], includes: [], commonUse: ["Friedreich ataxia neuropathy"], documentation: [] };
  codes["G60.3"] = { code: "G60.3", description: "Idiopathic progressive neuropathy", category: "G60", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic inflammatory demyelinating polyneuropathy"], documentation: [] };
  codes["G60.8"] = { code: "G60.8", description: "Other hereditary and idiopathic neuropathies", category: "G60", excludes1: [], excludes2: [], includes: [], commonUse: ["Hereditary neuropathy NOS"], documentation: [] };
  codes["G60.9"] = { code: "G60.9", description: "Hereditary and idiopathic neuropathy, unspecified", category: "G60", excludes1: [], excludes2: [], includes: [], commonUse: ["Hereditary neuropathy NOS"], documentation: [] };
  codes["G61.0"] = { code: "G61.0", description: "Guillain-Barre syndrome", category: "G61", excludes1: [], excludes2: [], includes: [], commonUse: ["GBS","Guillain-Barre syndrome"], documentation: [] };
  codes["G61.1"] = { code: "G61.1", description: "Miller Fisher syndrome", category: "G61", excludes1: [], excludes2: [], includes: [], commonUse: ["Miller Fisher syndrome"], documentation: [] };
  codes["G61.8"] = { code: "G61.8", description: "Other inflammatory polyneuropathies", category: "G61", excludes1: [], excludes2: [], includes: [], commonUse: ["CIDP","Inflammatory polyneuropathy"], documentation: [] };
  codes["G61.9"] = { code: "G61.9", description: "Inflammatory polyneuropathy, unspecified", category: "G61", excludes1: [], excludes2: [], includes: [], commonUse: ["Inflammatory polyneuropathy NOS"], documentation: [] };
  codes["G62.0"] = { code: "G62.0", description: "Alcoholic polyneuropathy", category: "G62", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcoholic neuropathy"], documentation: [] };
  codes["G62.1"] = { code: "G62.1", description: "Polyneuropathy due to other toxic agents", category: "G62", excludes1: [], excludes2: [], includes: [], commonUse: ["Toxic neuropathy"], documentation: [] };
  codes["G62.2"] = { code: "G62.2", description: "Polyneuropathy due to malignancy", category: "G62", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraneoplastic neuropathy"], documentation: [] };
  codes["G62.8"] = { code: "G62.8", description: "Other specified polyneuropathies", category: "G62", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyneuropathy NOS"], documentation: [] };
  codes["G62.9"] = { code: "G62.9", description: "Polyneuropathy, unspecified", category: "G62", excludes1: [], excludes2: [], includes: [], commonUse: ["Neuropathy NOS","Peripheral neuropathy"], documentation: [] };
  codes["G70.0"] = { code: "G70.0", description: "Myasthenia gravis", category: "G70", excludes1: [], excludes2: [], includes: [], commonUse: ["Myasthenia gravis","MG"], documentation: [] };
  codes["G70.1"] = { code: "G70.1", description: "Lambert-Eaton myasthenic syndrome", category: "G70", excludes1: [], excludes2: [], includes: [], commonUse: ["LEMS"], documentation: [] };
  codes["G70.2"] = { code: "G70.2", description: "Congenital and developmental myasthenia", category: "G70", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital myasthenia"], documentation: [] };
  codes["G70.8"] = { code: "G70.8", description: "Other myoneural disorders", category: "G70", excludes1: [], excludes2: [], includes: [], commonUse: ["Myoneural disorder"], documentation: [] };
  codes["G70.9"] = { code: "G70.9", description: "Myoneural disorder, unspecified", category: "G70", excludes1: [], excludes2: [], includes: [], commonUse: ["Neuromuscular disorder NOS"], documentation: [] };
  codes["G71.0"] = { code: "G71.0", description: "Muscular dystrophy", category: "G71", excludes1: [], excludes2: [], includes: [], commonUse: ["Duchenne muscular dystrophy","Becker muscular dystrophy"], documentation: [] };
  codes["G71.1"] = { code: "G71.1", description: "Neuromuscular junction disorders", category: "G71", excludes1: [], excludes2: [], includes: [], commonUse: ["Neuromuscular junction disorder"], documentation: [] };
  codes["G71.2"] = { code: "G71.2", description: "Congenital myopathies", category: "G71", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital myopathy"], documentation: [] };
  codes["G71.3"] = { code: "G71.3", description: "Mitochondrial myopathy", category: "G71", excludes1: [], excludes2: [], includes: [], commonUse: ["Mitochondrial myopathy"], documentation: [] };
  codes["G71.8"] = { code: "G71.8", description: "Other primary disorders of muscles", category: "G71", excludes1: [], excludes2: [], includes: [], commonUse: ["Myopathy NOS"], documentation: [] };
  codes["G71.9"] = { code: "G71.9", description: "Primary disorder of muscle, unspecified", category: "G71", excludes1: [], excludes2: [], includes: [], commonUse: ["Myopathy NOS"], documentation: [] };
  codes["G72.0"] = { code: "G72.0", description: "Drug-induced myopathy", category: "G72", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced myopathy","Statin myopathy"], documentation: [] };
  codes["G72.1"] = { code: "G72.1", description: "Alcoholic myopathy", category: "G72", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcoholic myopathy"], documentation: [] };
  codes["G72.2"] = { code: "G72.2", description: "Myopathy due to other toxic agents", category: "G72", excludes1: [], excludes2: [], includes: [], commonUse: ["Toxic myopathy"], documentation: [] };
  codes["G72.3"] = { code: "G72.3", description: "Periodic paralysis", category: "G72", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypokalemic periodic paralysis","Hyperkalemic periodic paralysis"], documentation: [] };
  codes["G72.4"] = { code: "G72.4", description: "Inflammatory myopathy, unspecified", category: "G72", excludes1: [], excludes2: [], includes: [], commonUse: ["Polymyositis","Dermatomyositis"], documentation: [] };
  codes["G72.8"] = { code: "G72.8", description: "Other specified myopathies", category: "G72", excludes1: [], excludes2: [], includes: [], commonUse: ["Myopathy NOS"], documentation: [] };
  codes["G72.9"] = { code: "G72.9", description: "Myopathy, unspecified", category: "G72", excludes1: [], excludes2: [], includes: [], commonUse: ["Myopathy NOS"], documentation: [] };
  codes["G80.0"] = { code: "G80.0", description: "Spastic diplegic cerebral palsy", category: "G80", excludes1: [], excludes2: [], includes: [], commonUse: ["Spastic diplegia","Spastic CP"], documentation: [] };
  codes["G80.1"] = { code: "G80.1", description: "Spastic quadriplegic cerebral palsy", category: "G80", excludes1: [], excludes2: [], includes: [], commonUse: ["Spastic quadriplegia"], documentation: [] };
  codes["G80.2"] = { code: "G80.2", description: "Spastic hemiplegic cerebral palsy", category: "G80", excludes1: [], excludes2: [], includes: [], commonUse: ["Spastic hemiplegia"], documentation: [] };
  codes["G80.3"] = { code: "G80.3", description: "Dyskinetic cerebral palsy", category: "G80", excludes1: [], excludes2: [], includes: [], commonUse: ["Dyskinetic CP","Athetoid CP"], documentation: [] };
  codes["G80.4"] = { code: "G80.4", description: "Ataxic cerebral palsy", category: "G80", excludes1: [], excludes2: [], includes: [], commonUse: ["Ataxic CP"], documentation: [] };
  codes["G80.8"] = { code: "G80.8", description: "Other cerebral palsy", category: "G80", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebral palsy NOS"], documentation: [] };
  codes["G80.9"] = { code: "G80.9", description: "Cerebral palsy, unspecified", category: "G80", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebral palsy NOS"], documentation: [] };
  codes["G81.0"] = { code: "G81.0", description: "Flaccid hemiplegia", category: "G81", excludes1: [], excludes2: [], includes: [], commonUse: ["Flaccid hemiplegia"], documentation: [] };
  codes["G81.1"] = { code: "G81.1", description: "Spastic hemiplegia", category: "G81", excludes1: [], excludes2: [], includes: [], commonUse: ["Spastic hemiplegia"], documentation: [] };
  codes["G81.9"] = { code: "G81.9", description: "Hemiplegia, unspecified", category: "G81", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemiplegia NOS","Paralysis of limb"], documentation: [] };
  codes["G82.0"] = { code: "G82.0", description: "Paraplegia (complete)", category: "G82", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraplegia complete","Paralysis of lower extremities"], documentation: [] };
  codes["G82.1"] = { code: "G82.1", description: "Paraplegia, incomplete", category: "G82", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraplegia incomplete"], documentation: [] };
  codes["G82.2"] = { code: "G82.2", description: "Quadriplegia (complete)", category: "G82", excludes1: [], excludes2: [], includes: [], commonUse: ["Quadriplegia complete","Paralysis of all four extremities"], documentation: [] };
  codes["G82.3"] = { code: "G82.3", description: "Quadriplegia, incomplete", category: "G82", excludes1: [], excludes2: [], includes: [], commonUse: ["Quadriplegia incomplete"], documentation: [] };
  codes["G82.4"] = { code: "G82.4", description: "Paraplegia, unspecified", category: "G82", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraplegia NOS"], documentation: [] };
  codes["G82.5"] = { code: "G82.5", description: "Quadriplegia, unspecified", category: "G82", excludes1: [], excludes2: [], includes: [], commonUse: ["Quadriplegia NOS"], documentation: [] };
  codes["G82.A"] = { code: "G82.A", description: "Paraplegia NOS", category: "G82", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraplegia NOS"], documentation: [] };
  codes["G82.B"] = { code: "G82.B", description: "Paraplegia, unspecified", category: "G82", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraplegia NOS"], documentation: [] };
  codes["G83.0"] = { code: "G83.0", description: "Diplegia of upper limbs", category: "G83", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb diplegia"], documentation: [] };
  codes["G83.1"] = { code: "G83.1", description: "Monoplegia of lower limb", category: "G83", excludes1: [], excludes2: [], includes: [], commonUse: ["Monoplegia lower extremity"], documentation: [] };
  codes["G83.2"] = { code: "G83.2", description: "Monoplegia of upper limb", category: "G83", excludes1: [], excludes2: [], includes: [], commonUse: ["Monoplegia upper extremity"], documentation: [] };
  codes["G83.3"] = { code: "G83.3", description: "Monoplegia, unspecified", category: "G83", excludes1: [], excludes2: [], includes: [], commonUse: ["Monoplegia NOS"], documentation: [] };
  codes["G83.4"] = { code: "G83.4", description: "Cauda equina syndrome", category: "G83", excludes1: [], excludes2: [], includes: [], commonUse: ["Cauda equina syndrome"], documentation: [] };
  codes["G83.8"] = { code: "G83.8", description: "Other paralytic syndromes", category: "G83", excludes1: [], excludes2: [], includes: [], commonUse: ["Paralytic syndrome NOS"], documentation: [] };
  codes["G83.9"] = { code: "G83.9", description: "Paralytic syndrome, unspecified", category: "G83", excludes1: [], excludes2: [], includes: [], commonUse: ["Paralysis NOS"], documentation: [] };
  codes["G89.0"] = { code: "G89.0", description: "Central post-stroke pain", category: "G89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-stroke pain"], documentation: [] };
  codes["G89.1"] = { code: "G89.1", description: "Acute pain due to trauma", category: "G89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-traumatic pain"], documentation: [] };
  codes["G89.2"] = { code: "G89.2", description: "Chronic pain", category: "G89", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic pain syndrome","CPS"], documentation: [] };
  codes["G89.3"] = { code: "G89.3", description: "Postprocedural pain", category: "G89", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-surgical pain"], documentation: [] };
  codes["G89.4"] = { code: "G89.4", description: "Chronic pain syndrome", category: "G89", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic pain syndrome NOS"], documentation: [] };
  codes["G89.8"] = { code: "G89.8", description: "Other pain syndromes", category: "G89", excludes1: [], excludes2: [], includes: [], commonUse: ["Pain syndrome NOS"], documentation: [] };
  codes["G89.9"] = { code: "G89.9", description: "Pain syndrome, unspecified", category: "G89", excludes1: [], excludes2: [], includes: [], commonUse: ["Pain NOS"], documentation: [] };
  codes["G90.0"] = { code: "G90.0", description: "Idiopathic peripheral autonomic neuropathy", category: "G90", excludes1: [], excludes2: [], includes: [], commonUse: ["Autonomic neuropathy"], documentation: [] };
  codes["G90.1"] = { code: "G90.1", description: "Familial dysautonomia [Riley-Day]", category: "G90", excludes1: [], excludes2: [], includes: [], commonUse: ["Familial dysautonomia","Riley-Day syndrome"], documentation: [] };
  codes["G90.2"] = { code: "G90.2", description: "Horner syndrome", category: "G90", excludes1: [], excludes2: [], includes: [], commonUse: ["Horner syndrome"], documentation: [] };
  codes["G90.3"] = { code: "G90.3", description: "Systemic autonomic neuropathy", category: "G90", excludes1: [], excludes2: [], includes: [], commonUse: ["Autonomic neuropathy NOS"], documentation: [] };
  codes["G90.4"] = { code: "G90.4", description: "Autonomic neuropathy due to diabetes", category: "G90", excludes1: [], excludes2: [], includes: [], commonUse: ["Diabetic autonomic neuropathy"], documentation: [] };
  codes["G90.8"] = { code: "G90.8", description: "Other disorders of autonomic nervous system", category: "G90", excludes1: [], excludes2: [], includes: [], commonUse: ["Autonomic disorder NOS"], documentation: [] };
  codes["G90.9"] = { code: "G90.9", description: "Disorder of autonomic nervous system, unspecified", category: "G90", excludes1: [], excludes2: [], includes: [], commonUse: ["Autonomic disorder NOS"], documentation: [] };
  codes["G91.0"] = { code: "G91.0", description: "Communicating hydrocephalus", category: "G91", excludes1: [], excludes2: [], includes: [], commonUse: ["Communicating hydrocephalus"], documentation: [] };
  codes["G91.1"] = { code: "G91.1", description: "Obstructive hydrocephalus", category: "G91", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstructive hydrocephalus","Non-communicating hydrocephalus"], documentation: [] };
  codes["G91.2"] = { code: "G91.2", description: "Normal-pressure hydrocephalus", category: "G91", excludes1: [], excludes2: [], includes: [], commonUse: ["NPH","Normal pressure hydrocephalus"], documentation: [] };
  codes["G91.8"] = { code: "G91.8", description: "Other hydrocephalus", category: "G91", excludes1: [], excludes2: [], includes: [], commonUse: ["Hydrocephalus NOS"], documentation: [] };
  codes["G91.9"] = { code: "G91.9", description: "Hydrocephalus, unspecified", category: "G91", excludes1: [], excludes2: [], includes: [], commonUse: ["Hydrocephalus NOS"], documentation: [] };
  codes["G93.0"] = { code: "G93.0", description: "Cerebral cyst", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebral cyst"], documentation: [] };
  codes["G93.1"] = { code: "G93.1", description: "Anoxic brain damage, not elsewhere classified", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["Anoxic encephalopathy","Hypoxic brain injury"], documentation: [] };
  codes["G93.2"] = { code: "G93.2", description: "Benign intracranial hypertension", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["IIH","Idiopathic intracranial hypertension","Pseudotumor cerebri"], documentation: [] };
  codes["G93.3"] = { code: "G93.3", description: "Postviral fatigue syndrome", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic fatigue syndrome","CFS"], documentation: [] };
  codes["G93.4"] = { code: "G93.4", description: "Encephalopathy, unspecified", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["Encephalopathy NOS"], documentation: [] };
  codes["G93.5"] = { code: "G93.5", description: "Compression of brain", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain compression"], documentation: [] };
  codes["G93.6"] = { code: "G93.6", description: "Cerebral edema", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain swelling"], documentation: [] };
  codes["G93.7"] = { code: "G93.7", description: "Reye syndrome", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["Reye syndrome"], documentation: [] };
  codes["G93.8"] = { code: "G93.8", description: "Other specified disorders of brain", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain disorder NOS"], documentation: [] };
  codes["G93.9"] = { code: "G93.9", description: "Disorder of brain, unspecified", category: "G93", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain disorder NOS"], documentation: [] };
  codes["G95.0"] = { code: "G95.0", description: "Syringomyelia and syringobulbia", category: "G95", excludes1: [], excludes2: [], includes: [], commonUse: ["Syringomyelia"], documentation: [] };
  codes["G95.1"] = { code: "G95.1", description: "Vascular disorders of spinal cord", category: "G95", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal cord infarction"], documentation: [] };
  codes["G95.8"] = { code: "G95.8", description: "Other specified diseases of spinal cord", category: "G95", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal cord disorder NOS"], documentation: [] };
  codes["G95.9"] = { code: "G95.9", description: "Disease of spinal cord, unspecified", category: "G95", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal cord disorder NOS"], documentation: [] };
  codes["G96.0"] = { code: "G96.0", description: "Cerebrospinal fluid leak", category: "G96", excludes1: [], excludes2: [], includes: [], commonUse: ["CSF leak"], documentation: [] };
  codes["G96.1"] = { code: "G96.1", description: "Disorders of meninges, not elsewhere classified", category: "G96", excludes1: [], excludes2: [], includes: [], commonUse: ["Meninx disorder NOS"], documentation: [] };
  codes["G96.8"] = { code: "G96.8", description: "Other specified disorders of central nervous system", category: "G96", excludes1: [], excludes2: [], includes: [], commonUse: ["CNS disorder NOS"], documentation: [] };
  codes["G96.9"] = { code: "G96.9", description: "Disorder of central nervous system, unspecified", category: "G96", excludes1: [], excludes2: [], includes: [], commonUse: ["CNS disorder NOS"], documentation: [] };
  codes["G97.0"] = { code: "G97.0", description: "Cerebrospinal fluid leak after lumbar puncture", category: "G97", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-LP headache","CSF leak post-LP"], documentation: [] };
  codes["G97.1"] = { code: "G97.1", description: "Other reaction to lumbar and spinal puncture", category: "G97", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-LP reaction"], documentation: [] };
  codes["G97.2"] = { code: "G97.2", description: "Intracranial hypotension following lumbar puncture", category: "G97", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-LP intracranial hypotension"], documentation: [] };
  codes["G97.4"] = { code: "G97.4", description: "Post-lumbar puncture headache", category: "G97", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-LP headache"], documentation: [] };
  codes["G97.8"] = { code: "G97.8", description: "Other postprocedural disorders of nervous system", category: "G97", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-surgical nervous system disorder"], documentation: [] };
  codes["G97.9"] = { code: "G97.9", description: "Postprocedural disorder of nervous system, unspecified", category: "G97", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-procedural nervous system disorder NOS"], documentation: [] };
  codes["G98.0"] = { code: "G98.0", description: "Other disorders of autonomic nervous system", category: "G98", excludes1: [], excludes2: [], includes: [], commonUse: ["Autonomic disorder NOS"], documentation: [] };
  codes["G98.8"] = { code: "G98.8", description: "Other disorders of nervous system", category: "G98", excludes1: [], excludes2: [], includes: [], commonUse: ["Nervous system disorder NOS"], documentation: [] };
  codes["G98.9"] = { code: "G98.9", description: "Disorder of nervous system, unspecified", category: "G98", excludes1: [], excludes2: [], includes: [], commonUse: ["Nervous system disorder NOS"], documentation: [] };

  codes["H10.9"] = { code: "H10.9", description: "Conjunctivitis, unspecified", category: "H10", excludes1: [], excludes2: [], includes: [], commonUse: ["Pink eye", "Eye infection"], documentation: ["Slit lamp exam"] };
  codes["H16.9"] = { code: "H16.9", description: "Keratitis, unspecified", category: "H16", excludes1: [], excludes2: [], includes: [], commonUse: ["Corneal inflammation", "Corneal ulcer NOS"], documentation: ["Slit lamp examination"] };
  codes["H18.8"] = { code: "H18.8", description: "Other specified disorders of cornea", category: "H18", excludes1: [], excludes2: [], includes: [], commonUse: ["Corneal disorder"], documentation: ["Corneal exam"] };
  codes["H20.0"] = { code: "H20.0", description: "Acute and subacute iridocyclitis", category: "H20", excludes1: [], excludes2: [], includes: ["Acute anterior uveitis"], commonUse: ["Anterior uveitis", "Iritis"], documentation: ["Slit lamp exam", "Intraocular pressure"] };
  codes["H25.0"] = { code: "H25.0", description: "Age-related cataract, cortical", category: "H25", excludes1: [], excludes2: [], includes: [], commonUse: ["Cortical cataract"], documentation: ["Slit lamp examination", "Visual acuity testing"] };
  codes["H25.1"] = { code: "H25.1", description: "Age-related cataract, nuclear", category: "H25", excludes1: [], excludes2: [], includes: [], commonUse: ["Nuclear sclerosis", "Nuclear cataract"], documentation: ["Slit lamp examination"] };
  codes["H25.9"] = { code: "H25.9", description: "Age-related cataract, unspecified", category: "H25", excludes1: [], excludes2: [], includes: [], commonUse: ["Senile cataract", "Cataract NOS"], documentation: ["Visual acuity testing", "Slit lamp exam"] };
  codes["H26.9"] = { code: "H26.9", description: "Cataract, unspecified", category: "H26", excludes1: [], excludes2: [], includes: ["Cataract NOS"], commonUse: ["Cataract"], documentation: ["Slit lamp examination"] };
  codes["H34.1"] = { code: "H34.1", description: "Central retinal vein occlusion", category: "H34", excludes1: [], excludes2: [], includes: ["CRVO"], commonUse: ["Retinal vein occlusion", "CRVO"], documentation: ["Fundoscopic exam", "Fluorescein angiography", "OCT"] };
  codes["H35.0"] = { code: "H35.0", description: "Background retinopathy and retinal vascular changes", category: "H35", excludes1: [], excludes2: [], includes: ["Diabetic retinopathy NOS"], commonUse: ["Diabetic retinopathy", "Background retinopathy"], documentation: ["Dilated eye exam", "Retinal photography"] };
  codes["H35.9"] = { code: "H35.9", description: "Retinal disorder, unspecified", category: "H35", excludes1: [], excludes2: [], includes: [], commonUse: ["Retinal disease NOS"], documentation: ["Fundoscopic examination"] };
  codes["H40.1"] = { code: "H40.1", description: "Open-angle glaucoma", category: "H40", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic open-angle glaucoma", "POAG", "Glaucoma"], documentation: ["Intraocular pressure", "Visual field testing", "OCT of optic nerve"] };
  codes["H40.2"] = { code: "H40.2", description: "Primary angle-closure glaucoma", category: "H40", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute glaucoma", "Angle-closure glaucoma"], documentation: ["Intraocular pressure", "Gonioscopy"] };
  codes["H40.9"] = { code: "H40.9", description: "Glaucoma, unspecified", category: "H40", excludes1: [], excludes2: [], includes: ["Glaucoma NOS"], commonUse: ["Glaucoma"], documentation: ["Intraocular pressure testing"] };
  codes["H44.2"] = { code: "H44.2", description: "Degenerative myopia", category: "H44", excludes1: [], excludes2: [], includes: ["Pathological myopia"], commonUse: ["High myopia", "Progressive myopia"], documentation: ["Retinal examination", "OCT"] };
  codes["H47.2"] = { code: "H47.2", description: "Optic atrophy", category: "H47", excludes1: [], excludes2: [], includes: [], commonUse: ["Optic nerve atrophy"], documentation: ["Visual field testing", "OCT of optic nerve"] };
  codes["H49.0"] = { code: "H49.0", description: "Third cranial nerve palsy", category: "H49", excludes1: [], excludes2: [], includes: ["Oculomotor nerve palsy"], commonUse: ["CN III palsy", "Third nerve palsy"], documentation: ["Neurological examination", "MRI brain"] };
  codes["H50.0"] = { code: "H50.0", description: "Convergent strabismus", category: "H50", excludes1: [], excludes2: [], includes: ["Esotropia"], commonUse: ["Esotropia", "Crossed eyes"], documentation: ["Ophthalmologic exam"] };
  codes["H50.1"] = { code: "H50.1", description: "Divergent strabismus", category: "H50", excludes1: [], excludes2: [], includes: ["Exotropia"], commonUse: ["Exotropia", "Wall-eyed"], documentation: ["Ophthalmologic exam"] };
  codes["H52.0"] = { code: "H52.0", description: "Hypermetropia", category: "H52", excludes1: [], excludes2: [], includes: ["Farsightedness"], commonUse: ["Hyperopia", "Farsightedness"], documentation: ["Refraction testing"] };
  codes["H52.1"] = { code: "H52.1", description: "Myopia", category: "H52", excludes1: [], excludes2: [], includes: ["Nearsightedness"], commonUse: ["Nearsightedness", "Myopic disorder"], documentation: ["Refraction testing"] };
  codes["H52.2"] = { code: "H52.2", description: "Astigmatism", category: "H52", excludes1: [], excludes2: [], includes: [], commonUse: ["Astigmatic error"], documentation: ["Refraction testing"] };
  codes["H52.4"] = { code: "H52.4", description: "Presbyopia", category: "H52", excludes1: [], excludes2: [], includes: [], commonUse: ["Age-related loss of accommodation"], documentation: ["Refraction testing"] };
  codes["H53.0"] = { code: "H53.0", description: "Amblyopia ex anopsia", category: "H53", excludes1: [], excludes2: [], includes: ["Lazy eye"], commonUse: ["Lazy eye", "Amblyopia"], documentation: ["Visual acuity testing"] };
  codes["H53.1"] = { code: "H53.1", description: "Subjective visual disturbances", category: "H53", excludes1: [], excludes2: [], includes: [], commonUse: ["Visual hallucinations", "Phosphenes"], documentation: ["Ophthalmologic evaluation"] };
  codes["H53.2"] = { code: "H53.2", description: "Visual scotoma", category: "H53", excludes1: [], excludes2: [], includes: [], commonUse: ["Blind spot", "Scotoma"], documentation: ["Visual field testing"] };
  codes["H53.4"] = { code: "H53.4", description: "Visual field defects", category: "H53", excludes1: [], excludes2: [], includes: [], commonUse: ["Visual field loss", "Peripheral vision loss"], documentation: ["Visual field testing perimetry"] };
  codes["H53.5"] = { code: "H53.5", description: "Color vision deficiency", category: "H53", excludes1: [], excludes2: [], includes: ["Color blindness"], commonUse: ["Color blindness", "Daltonism"], documentation: ["Ishihara testing"] };
  codes["H53.6"] = { code: "H53.6", description: "Night blindness", category: "H53", excludes1: [], excludes2: [], includes: ["Nyctalopia"], commonUse: ["Night blindness", "Nyctalopia"], documentation: ["Dark adaptometry"] };
  codes["H53.8"] = { code: "H53.8", description: "Other visual disturbances", category: "H53", excludes1: [], excludes2: [], includes: [], commonUse: ["Blurred vision NOS", "Visual disturbance"], documentation: ["Ophthalmologic exam"] };
  codes["H53.9"] = { code: "H53.9", description: "Visual disturbance, unspecified", category: "H53", excludes1: [], excludes2: [], includes: ["Visual disturbance NOS"], commonUse: ["Blurred vision", "Vision problems"], documentation: ["Visual acuity testing"] };
  codes["H54.0"] = { code: "H54.0", description: "Blindness, binocular", category: "H54", excludes1: [], excludes2: [], includes: [], commonUse: ["Total blindness both eyes"], documentation: ["Visual acuity testing"] };
  codes["H54.4"] = { code: "H54.4", description: "Blindness, monocular", category: "H54", excludes1: [], excludes2: [], includes: ["Blindness one eye"], commonUse: ["One-eyed blindness"], documentation: ["Visual acuity testing"] };
  codes["H54.6"] = { code: "H54.6", description: "Unspecified visual loss, monocular", category: "H54", excludes1: [], excludes2: [], includes: [], commonUse: ["Low vision one eye"], documentation: ["Visual acuity testing"] };
  codes["H54.9"] = { code: "H54.9", description: "Blindness, unspecified", category: "H54", excludes1: [], excludes2: [], includes: ["Visual loss NOS"], commonUse: ["Blindness NOS", "Vision loss"], documentation: ["Visual acuity testing"] };

  codes["H60.1"] = { code: "H60.1", description: "Malignant otitis externa", category: "H60", excludes1: [], excludes2: [], includes: [], commonUse: ["Necrotizing otitis externa", "Skull base osteomyelitis"], documentation: ["Culture", "CT/MRI temporal bone"] };
  codes["H60.2"] = { code: "H60.2", description: "Acute otitis externa", category: "H60", excludes1: [], excludes2: [], includes: ["Swimmer's ear"], commonUse: ["Swimmer's ear", "Acute external ear infection"], documentation: ["Otoscopic exam"] };
  codes["H60.3"] = { code: "H60.3", description: "Chronic otitis externa", category: "H60", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic swimmer's ear"], documentation: ["Otoscopic exam", "Culture"] };
  codes["H60.5"] = { code: "H60.5", description: "Acute otitis externa, unspecified", category: "H60", excludes1: [], excludes2: [], includes: ["Otitis externa acute NOS"], commonUse: ["External ear infection"], documentation: ["Otoscopic exam"] };
  codes["H60.9"] = { code: "H60.9", description: "Otitis externa, unspecified", category: "H60", excludes1: [], excludes2: [], includes: ["Otitis externa NOS"], commonUse: ["External ear infection NOS"], documentation: ["Otoscopic exam"] };
  codes["H65.0"] = { code: "H65.0", description: "Acute allergic otitis media", category: "H65", excludes1: [], excludes2: [], includes: [], commonUse: ["Allergic middle ear fluid"], documentation: ["Otoscopic exam"] };
  codes["H65.1"] = { code: "H65.1", description: "Other acute nonsuppurative otitis media", category: "H65", excludes1: [], excludes2: [], includes: ["Serous otitis media"], commonUse: ["Serous otitis", "Middle ear effusion", "OME"], documentation: ["Otoscopic exam", "Tympanometry"] };
  codes["H65.2"] = { code: "H65.2", description: "Chronic tubotympanic otitis media", category: "H65", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic serous otitis media"], documentation: ["Otoscopic exam"] };
  codes["H65.4"] = { code: "H65.4", description: "Other chronic otitis media", category: "H65", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic middle ear inflammation"], documentation: ["Otoscopic exam"] };
  codes["H65.9"] = { code: "H65.9", description: "Otitis media, unspecified", category: "H65", excludes1: [], excludes2: [], includes: ["Otitis media NOS"], commonUse: ["Middle ear infection NOS"], documentation: ["Otoscopic exam"] };
  codes["H66.0"] = { code: "H66.0", description: "Acute suppurative otitis media", category: "H66", excludes1: [], excludes2: [], includes: ["Acute perforative otitis media"], commonUse: ["Acute bacterial ear infection", "Acute otitis media"], documentation: ["Otoscopic exam"] };
  codes["H66.9"] = { code: "H66.9", description: "Otitis media, unspecified", category: "H66", excludes1: [], excludes2: [], includes: ["Suppurative otitis media NOS"], commonUse: ["Ear infection"], documentation: ["Otoscopic exam"] };
  codes["H69.0"] = { code: "H69.0", description: "Patulous eustachian tube", category: "H69", excludes1: [], excludes2: [], includes: [], commonUse: ["Eustachian tube dysfunction", "Open eustachian tube"], documentation: ["Audiometry", "Tympanometry"] };
  codes["H72.9"] = { code: "H72.9", description: "Perforation of tympanic membrane, unspecified", category: "H72", excludes1: [], excludes2: [], includes: ["Ruptured eardrum NOS"], commonUse: ["Ruptured eardrum", "Tympanic membrane perforation"], documentation: ["Otoscopic exam"] };
  codes["H73.0"] = { code: "H73.0", description: "Acute myringitis", category: "H73", excludes1: [], excludes2: [], includes: [], commonUse: ["Eardrum inflammation"], documentation: ["Otoscopic exam"] };
  codes["H74.3"] = { code: "H74.3", description: "Other acquired abnormalities of ossicles", category: "H74", excludes1: [], excludes2: [], includes: ["Ossicular fixation"], commonUse: ["Ossicular chain fixation"], documentation: ["Audiometry", "CT temporal bone"] };
  codes["H80.0"] = { code: "H80.0", description: "Otosclerosis, oval window involvement", category: "H80", excludes1: [], excludes2: [], includes: ["Otosclerosis NOS"], commonUse: ["Otosclerosis", "Fixation of stapes"], documentation: ["Audiometry", "CT temporal bone"] };
  codes["H81.0"] = { code: "H81.0", description: "Meniere disease", category: "H81", excludes1: [], excludes2: [], includes: ["Endolymphatic hydrops"], commonUse: ["Meniere's disease", "Vertigo with hearing loss"], documentation: ["Audiometry", "ENG/VNG"] };
  codes["H81.1"] = { code: "H81.1", description: "Benign paroxysmal vertigo", category: "H81", excludes1: [], excludes2: [], includes: ["BPPV"], commonUse: ["BPPV", "Positional vertigo"], documentation: ["Dix-Hallpike maneuver"] };
  codes["H81.2"] = { code: "H81.2", description: "Vestibular neuronitis", category: "H81", excludes1: [], excludes2: [], includes: [], commonUse: ["Vestibular neuritis", "Labyrinthitis"], documentation: ["VNG/ENG testing"] };
  codes["H81.3"] = { code: "H81.3", description: "Other peripheral vertigo", category: "H81", excludes1: [], excludes2: [], includes: [], commonUse: ["Peripheral vertigo"], documentation: ["VNG/ENG testing"] };
  codes["H81.4"] = { code: "H81.4", description: "Vertigo of central origin", category: "H81", excludes1: [], excludes2: [], includes: [], commonUse: ["Central vertigo"], documentation: ["MRI brain", "Neurological exam"] };
  codes["H90.0"] = { code: "H90.0", description: "Conductive hearing loss, bilateral", category: "H90", excludes1: [], excludes2: [], includes: [], commonUse: ["Bilateral conductive hearing loss"], documentation: ["Audiometry"] };
  codes["H90.2"] = { code: "H90.2", description: "Sensorineural hearing loss, bilateral", category: "H90", excludes1: [], excludes2: [], includes: ["Bilateral nerve deafness"], commonUse: ["Bilateral hearing loss", "Sensorineural hearing loss"], documentation: ["Audiometry"] };
  codes["H90.3"] = { code: "H90.3", description: "Sensorineural hearing loss, unilateral", category: "H90", excludes1: [], excludes2: [], includes: ["Unilateral sensorineural hearing loss"], commonUse: ["Unilateral hearing loss"], documentation: ["Audiometry"] };
  codes["H90.5"] = { code: "H90.5", description: "Mixed conductive and sensorineural hearing loss, unspecified", category: "H90", excludes1: [], excludes2: [], includes: ["Mixed hearing loss NOS"], commonUse: ["Mixed hearing loss"], documentation: ["Audiometry"] };
  codes["H90.8"] = { code: "H90.8", description: "Conductive hearing loss, unspecified", category: "H90", excludes1: [], excludes2: [], includes: [], commonUse: ["Conductive hearing loss NOS"], documentation: ["Audiometry"] };
  codes["H90.9"] = { code: "H90.9", description: "Hearing loss, unspecified", category: "H90", excludes1: [], excludes2: [], includes: ["Deafness NOS", "Hearing loss NOS"], commonUse: ["Hearing loss NOS", "Deafness"], documentation: ["Audiometry"] };
  codes["H91.0"] = { code: "H91.0", description: "Ototoxic hearing loss", category: "H91", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced hearing loss"], documentation: ["Audiometry", "Drug exposure history"] };
  codes["H91.1"] = { code: "H91.1", description: "Presbycusis", category: "H91", excludes1: [], excludes2: [], includes: ["Age-related hearing loss"], commonUse: ["Age-related hearing loss", "Presbycusis"], documentation: ["Audiometry"] };
  codes["H91.2"] = { code: "H91.2", description: "Sudden idiopathic hearing loss", category: "H91", excludes1: [], excludes2: [], includes: ["Sudden sensorineural hearing loss"], commonUse: ["Sudden hearing loss", "SSNHL"], documentation: ["Audiometry", "MRI brain"] };
  codes["H91.8"] = { code: "H91.8", description: "Other specified hearing loss", category: "H91", excludes1: [], excludes2: [], includes: [], commonUse: ["Other hearing loss"], documentation: ["Audiometry"] };
  codes["H91.9"] = { code: "H91.9", description: "Hearing loss, unspecified", category: "H91", excludes1: [], excludes2: [], includes: ["Deafness NOS"], commonUse: ["Hearing loss"], documentation: ["Audiometry"] };
  codes["H93.0"] = { code: "H93.0", description: "Tinnitus", category: "H93", excludes1: [], excludes2: [], includes: [], commonUse: ["Ringing in ears", "Tinnitus aurium"], documentation: ["Audiometry", "Otoscopic exam"] };
  codes["H93.2"] = { code: "H93.2", description: "Other auditory disturbances", category: "H93", excludes1: [], excludes2: [], includes: ["Auditory perception disturbance"], commonUse: ["Hyperacusis", "Sound sensitivity"], documentation: ["Audiometry"] };
  codes["H93.3"] = { code: "H93.3", description: "Disorders of acoustic nerve", category: "H93", excludes1: [], excludes2: [], includes: ["Acoustic nerve disorder"], commonUse: ["Vestibular schwannoma", "Acoustic neuroma"], documentation: ["MRI with gadolinium", "Audiometry"] };
  codes["H93.9"] = { code: "H93.9", description: "Disorder of ear, unspecified", category: "H93", excludes1: [], excludes2: [], includes: ["Ear disorder NOS"], commonUse: ["Ear problem NOS"], documentation: ["Otoscopic exam"] };

  codes["I10"] = { code: "I10", description: "Essential (primary) hypertension", category: "I10", excludes1: [], excludes2: [], includes: ["High blood pressure NOS", "Hypertension NOS"], commonUse: ["High blood pressure", "Hypertension", "HTN", "Essential HTN"], documentation: ["Elevated blood pressure readings", "Ambulatory blood pressure monitoring"] };
  codes["I11.0"] = { code: "I11.0", description: "Hypertensive heart disease with heart failure", category: "I11", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertensive heart failure", "HF from HTN"], documentation: ["Echocardiogram", "BNP/NT-proBNP", "Blood pressure monitoring"] };
  codes["I11.9"] = { code: "I11.9", description: "Hypertensive heart disease without heart failure", category: "I11", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertensive heart disease"], documentation: ["Echocardiogram", "Blood pressure monitoring"] };
  codes["I12.0"] = { code: "I12.0", description: "Hypertensive chronic kidney disease with stage 5 CKD or ESRD", category: "I12", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertensive nephropathy ESRD"], documentation: ["GFR", "Serum creatinine", "Urinalysis"] };
  codes["I12.9"] = { code: "I12.9", description: "Hypertensive chronic kidney disease with stage 1-4 CKD", category: "I12", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertensive kidney disease"], documentation: ["GFR", "Serum creatinine", "Urinalysis"] };
  codes["I13.10"] = { code: "I13.10", description: "Hypertensive heart and chronic kidney disease without heart failure", category: "I13", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertensive heart and kidney disease"], documentation: ["Echocardiogram", "GFR", "Blood pressure"] };
  codes["I15.0"] = { code: "I15.0", description: "Renovascular hypertension", category: "I15", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal artery stenosis HTN"], documentation: ["Renal artery Doppler", "CT angiography"] };
  codes["I15.9"] = { code: "I15.9", description: "Secondary hypertension, unspecified", category: "I15", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary hypertension NOS"], documentation: ["Blood pressure monitoring", "Workup for secondary causes"] };
  codes["I20.0"] = { code: "I20.0", description: "Unstable angina", category: "I20", excludes1: [], excludes2: [], includes: ["Crescendo angina"], commonUse: ["Unstable angina", "UA"], documentation: ["ECG", "Troponin", "Stress test or catheterization"] };
  codes["I20.1"] = { code: "I20.1", description: "Angina pectoris with documented spasm", category: "I20", excludes1: [], excludes2: [], includes: ["Prinzmetal angina"], commonUse: ["Vasospastic angina", "Prinzmetal angina"], documentation: ["Coronary angiography with provocation"] };
  codes["I20.8"] = { code: "I20.8", description: "Other forms of angina pectoris", category: "I20", excludes1: [], excludes2: [], includes: [], commonUse: ["Angina NOS"], documentation: ["ECG", "Stress test"] };
  codes["I20.9"] = { code: "I20.9", description: "Angina pectoris, unspecified", category: "I20", excludes1: [], excludes2: [], includes: ["Angina NOS"], commonUse: ["Angina", "Chest pain on exertion"], documentation: ["ECG", "Cardiac workup"] };
  codes["I21.0"] = { code: "I21.0", description: "Acute ST elevation (STEMI) myocardial infarction of anterior wall", category: "I21", excludes1: [], excludes2: [], includes: [], commonUse: ["Anterior STEMI", "Heart attack front wall"], documentation: ["ECG with ST elevation", "Troponin elevation", "Cardiac catheterization"] };
  codes["I21.1"] = { code: "I21.1", description: "Acute ST elevation (STEMI) myocardial infarction of inferior wall", category: "I21", excludes1: [], excludes2: [], includes: [], commonUse: ["Inferior STEMI", "Heart attack bottom wall"], documentation: ["ECG with ST elevation", "Troponin", "Cardiac catheterization"] };
  codes["I21.2"] = { code: "I21.2", description: "Acute ST elevation (STEMI) myocardial infarction involving other sites", category: "I21", excludes1: [], excludes2: [], includes: [], commonUse: ["Lateral STEMI", "Posterior STEMI"], documentation: ["ECG", "Troponin", "Catheterization"] };
  codes["I21.3"] = { code: "I21.3", description: "Acute ST elevation (STEMI) myocardial infarction of unspecified site", category: "I21", excludes1: [], excludes2: [], includes: [], commonUse: ["STEMI unspecified"], documentation: ["ECG", "Troponin", "Catheterization"] };
  codes["I21.4"] = { code: "I21.4", description: "Acute non-ST elevation (NSTEMI) myocardial infarction", category: "I21", excludes1: [], excludes2: [], includes: [], commonUse: ["NSTEMI", "Non-Q-wave MI"], documentation: ["ECG", "Troponin elevation", "Catheterization"] };
  codes["I21.9"] = { code: "I21.9", description: "Acute myocardial infarction, unspecified", category: "I21", excludes1: [], excludes2: [], includes: ["AMI NOS", "Heart attack NOS"], commonUse: ["Heart attack", "MI", "Acute MI"], documentation: ["ECG", "Troponin", "Cardiac catheterization"] };
  codes["I22.0"] = { code: "I22.0", description: "Subsequent ST elevation (STEMI) myocardial infarction of anterior wall", category: "I22", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent anterior STEMI"], documentation: ["ECG", "Troponin"] };
  codes["I22.1"] = { code: "I22.1", description: "Subsequent ST elevation (STEMI) myocardial infarction of inferior wall", category: "I22", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent inferior STEMI"], documentation: ["ECG", "Troponin"] };
  codes["I22.8"] = { code: "I22.8", description: "Subsequent non-ST elevation (NSTEMI) myocardial infarction", category: "I22", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent NSTEMI"], documentation: ["ECG", "Troponin"] };
  codes["I22.9"] = { code: "I22.9", description: "Subsequent myocardial infarction, unspecified", category: "I22", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent MI"], documentation: ["ECG", "Troponin"] };
  codes["I24.0"] = { code: "I24.0", description: "Acute coronary thrombosis, not resulting in myocardial infarction", category: "I24", excludes1: [], excludes2: [], includes: [], commonUse: ["Coronary thrombosis"], documentation: ["Cardiac catheterization"] };
  codes["I24.8"] = { code: "I24.8", description: "Other forms of acute ischemic heart disease", category: "I24", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute ischemic heart disease"], documentation: ["ECG", "Troponin"] };
  codes["I24.9"] = { code: "I24.9", description: "Acute ischemic heart disease, unspecified", category: "I24", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute ischemic heart disease NOS"], documentation: ["ECG", "Troponin"] };
  codes["I25.0"] = { code: "I25.0", description: "Atherosclerotic cardiovascular disease, so described", category: "I25", excludes1: [], excludes2: [], includes: ["ASHD", "ASCVD"], commonUse: ["Atherosclerotic heart disease", "Coronary artery disease", "CAD"], documentation: ["Cardiac catheterization", "Stress test", "CT calcium score"] };
  codes["I25.1"] = { code: "I25.1", description: "Atherosclerotic heart disease of native coronary artery", category: "I25", excludes1: [], excludes2: [], includes: [], commonUse: ["Coronary artery disease", "CAD", "Atherosclerotic CAD"], documentation: ["Cardiac catheterization", "Coronary angiography"] };
  codes["I25.2"] = { code: "I25.2", description: "Old myocardial infarction", category: "I25", excludes1: [], excludes2: [], includes: ["Old MI", "Prior MI"], commonUse: ["Prior heart attack", "Old MI"], documentation: ["ECG", "Echocardiogram"] };
  codes["I25.5"] = { code: "I25.5", description: "Ischemic cardiomyopathy", category: "I25", excludes1: [], excludes2: [], includes: [], commonUse: ["Ischemic cardiomyopathy", "ICM"], documentation: ["Echocardiogram", "Coronary angiography"] };
  codes["I25.9"] = { code: "I25.9", description: "Chronic ischemic heart disease, unspecified", category: "I25", excludes1: [], excludes2: [], includes: ["Ischemic heart disease NOS", "IHD NOS"], commonUse: ["Chronic ischemic heart disease"], documentation: ["ECG", "Cardiac workup"] };
  codes["I26.9"] = { code: "I26.9", description: "Pulmonary embolism without acute cor pulmonale", category: "I26", excludes1: [], excludes2: [], includes: ["PE NOS"], commonUse: ["Pulmonary embolism", "PE", "Blood clot in lung"], documentation: ["CT pulmonary angiography", "D-dimer", "Lower extremity duplex"] };
  codes["I27.0"] = { code: "I27.0", description: "Primary pulmonary hypertension", category: "I27", excludes1: [], excludes2: [], includes: ["Pulmonary arterial hypertension"], commonUse: ["Pulmonary hypertension", "PAH"], documentation: ["Echocardiogram", "Right heart catheterization"] };
  codes["I27.1"] = { code: "I27.1", description: "Cor pulmonale", category: "I27", excludes1: [], excludes2: [], includes: [], commonUse: ["Right heart failure from lung disease"], documentation: ["Echocardiogram", "BNP"] };
  codes["I27.2"] = { code: "I27.2", description: "Other secondary pulmonary hypertension", category: "I27", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary pulmonary hypertension"], documentation: ["Echocardiogram", "Right heart catheterization"] };
  codes["I27.8"] = { code: "I27.8", description: "Other specified diseases of pulmonary vessels", category: "I27", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary vascular disease"], documentation: ["CT angiography", "Echocardiogram"] };
  codes["I27.9"] = { code: "I27.9", description: "Pulmonary heart disease, unspecified", category: "I27", excludes1: [], excludes2: [], includes: ["Pulmonary heart disease NOS"], commonUse: ["Pulmonary heart disease"], documentation: ["Echocardiogram"] };
  codes["I30.0"] = { code: "I30.0", description: "Acute idiopathic pericarditis", category: "I30", excludes1: [], excludes2: [], includes: [], commonUse: ["Viral pericarditis", "Idiopathic pericarditis"], documentation: ["ECG", "Echocardiogram", "CRP/ESR", "Chest X-ray"] };
  codes["I30.1"] = { code: "I30.1", description: "Infective pericarditis", category: "I30", excludes1: [], excludes2: [], includes: ["Bacterial pericarditis"], commonUse: ["Infectious pericarditis"], documentation: ["Pericardiocentesis", "Blood cultures", "Echocardiogram"] };
  codes["I30.9"] = { code: "I30.9", description: "Acute pericarditis, unspecified", category: "I30", excludes1: [], excludes2: [], includes: ["Pericarditis NOS"], commonUse: ["Pericarditis"], documentation: ["ECG", "Echocardiogram", "CRP/ESR"] };
  codes["I34.0"] = { code: "I34.0", description: "Nonrheumatic mitral (valve) insufficiency", category: "I34", excludes1: [], excludes2: [], includes: ["Mitral regurgitation"], commonUse: ["Mitral valve regurgitation", "MR", "Mitral insufficiency"], documentation: ["Echocardiogram"] };
  codes["I34.1"] = { code: "I34.1", description: "Nonrheumatic mitral (valve) prolapse", category: "I34", excludes1: [], excludes2: [], includes: ["Mitral valve prolapse"], commonUse: ["MVP", "Mitral valve prolapse", "Click-murmur syndrome"], documentation: ["Echocardiogram"] };
  codes["I34.2"] = { code: "I34.2", description: "Nonrheumatic mitral (valve) stenosis", category: "I34", excludes1: [], excludes2: [], includes: [], commonUse: ["Mitral stenosis"], documentation: ["Echocardiogram"] };
  codes["I35.0"] = { code: "I35.0", description: "Nonrheumatic aortic (valve) stenosis", category: "I35", excludes1: [], excludes2: [], includes: ["Aortic stenosis"], commonUse: ["Aortic stenosis", "AS", "Aortic valve stenosis"], documentation: ["Echocardiogram", "Cardiac catheterization"] };
  codes["I35.1"] = { code: "I35.1", description: "Nonrheumatic aortic (valve) insufficiency", category: "I35", excludes1: [], excludes2: [], includes: ["Aortic regurgitation"], commonUse: ["Aortic valve regurgitation", "Aortic insufficiency"], documentation: ["Echocardiogram"] };
  codes["I35.2"] = { code: "I35.2", description: "Nonrheumatic aortic (valve) stenosis with insufficiency", category: "I35", excludes1: [], excludes2: [], includes: [], commonUse: ["Aortic stenosis and regurgitation"], documentation: ["Echocardiogram"] };
  codes["I35.9"] = { code: "I35.9", description: "Nonrheumatic aortic valve disorder, unspecified", category: "I35", excludes1: [], excludes2: [], includes: [], commonUse: ["Aortic valve disease NOS"], documentation: ["Echocardiogram"] };
  codes["I42.0"] = { code: "I42.0", description: "Dilated cardiomyopathy", category: "I42", excludes1: [], excludes2: [], includes: ["DCM"], commonUse: ["Dilated cardiomyopathy", "DCM", "Enlarged heart"], documentation: ["Echocardiogram", "Cardiac MRI", "Cardiac catheterization"] };
  codes["I42.1"] = { code: "I42.1", description: "Hypertrophic obstructive cardiomyopathy", category: "I42", excludes1: [], excludes2: [], includes: ["HOCM"], commonUse: ["HCM", "Hypertrophic cardiomyopathy", "HOCM"], documentation: ["Echocardiogram", "Genetic testing"] };
  codes["I42.2"] = { code: "I42.2", description: "Other hypertrophic cardiomyopathy", category: "I42", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertrophic cardiomyopathy NOS"], documentation: ["Echocardiogram"] };
  codes["I42.5"] = { code: "I42.5", description: "Other restrictive cardiomyopathy", category: "I42", excludes1: [], excludes2: [], includes: ["Restrictive cardiomyopathy"], commonUse: ["Restrictive cardiomyopathy"], documentation: ["Echocardiogram", "Cardiac catheterization", "Endomyocardial biopsy"] };
  codes["I42.9"] = { code: "I42.9", description: "Cardiomyopathy, unspecified", category: "I42", excludes1: [], excludes2: [], includes: ["Cardiomyopathy NOS"], commonUse: ["Cardiomyopathy NOS"], documentation: ["Echocardiogram"] };
  codes["I44.0"] = { code: "I44.0", description: "First-degree atrioventricular block", category: "I44", excludes1: [], excludes2: [], includes: ["First-degree heart block"], commonUse: ["1st degree AV block", "Prolonged PR interval"], documentation: ["ECG"] };
  codes["I44.1"] = { code: "I44.1", description: "Second-degree atrioventricular block", category: "I44", excludes1: [], excludes2: [], includes: [], commonUse: ["2nd degree AV block", "Mobitz type I", "Mobitz type II"], documentation: ["ECG", "Holter monitor"] };
  codes["I44.2"] = { code: "I44.2", description: "Complete atrioventricular block", category: "I44", excludes1: [], excludes2: [], includes: ["Third-degree heart block"], commonUse: ["3rd degree AV block", "Complete heart block"], documentation: ["ECG", "Telemetry"] };
  codes["I44.3"] = { code: "I44.3", description: "Other and unspecified atrioventricular block", category: "I44", excludes1: [], excludes2: [], includes: ["AV block NOS"], commonUse: ["AV block"], documentation: ["ECG"] };
  codes["I44.4"] = { code: "I44.4", description: "Left anterior fascicular block", category: "I44", excludes1: [], excludes2: [], includes: ["LAFB"], commonUse: ["Left anterior hemiblock", "LAFB"], documentation: ["ECG"] };
  codes["I44.5"] = { code: "I44.5", description: "Left posterior fascicular block", category: "I44", excludes1: [], excludes2: [], includes: ["LPFB"], commonUse: ["Left posterior hemiblock"], documentation: ["ECG"] };
  codes["I44.6"] = { code: "I44.6", description: "Other and unspecified fascicular block", category: "I44", excludes1: [], excludes2: [], includes: [], commonUse: ["Fascicular block"], documentation: ["ECG"] };
  codes["I44.7"] = { code: "I44.7", description: "Left bundle-branch block, unspecified", category: "I44", excludes1: [], excludes2: [], includes: ["LBBB"], commonUse: ["Left bundle branch block", "LBBB"], documentation: ["ECG"] };
  codes["I45.0"] = { code: "I45.0", description: "Right fascicular block", category: "I45", excludes1: [], excludes2: [], includes: [], commonUse: ["Right hemiblock"], documentation: ["ECG"] };
  codes["I45.1"] = { code: "I45.1", description: "Other and unspecified right bundle-branch block", category: "I45", excludes1: [], excludes2: [], includes: ["RBBB"], commonUse: ["Right bundle branch block", "RBBB"], documentation: ["ECG"] };
  codes["I45.2"] = { code: "I45.2", description: "Bifascicular block", category: "I45", excludes1: [], excludes2: [], includes: [], commonUse: ["Bifascicular block"], documentation: ["ECG"] };
  codes["I45.3"] = { code: "I45.3", description: "Trifascicular block", category: "I45", excludes1: [], excludes2: [], includes: [], commonUse: ["Trifascicular block"], documentation: ["ECG"] };
  codes["I46.0"] = { code: "I46.0", description: "Cardiac arrest with successful resuscitation", category: "I46", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac arrest - ROSC"], documentation: ["ACLS documentation", "Resuscitation record"] };
  codes["I46.1"] = { code: "I46.1", description: "Sudden cardiac death, not otherwise defined", category: "I46", excludes1: [], excludes2: [], includes: ["SCD"], commonUse: ["Sudden cardiac death", "SCD"], documentation: ["Death certificate", "Autopsy report"] };
  codes["I46.9"] = { code: "I46.9", description: "Cardiac arrest, unspecified", category: "I46", excludes1: [], excludes2: [], includes: ["Cardiac arrest NOS"], commonUse: ["Cardiac arrest"], documentation: ["ACLS documentation"] };
  codes["I47.1"] = { code: "I47.1", description: "Supraventricular tachycardia", category: "I47", excludes1: [], excludes2: [], includes: ["SVT", "Paroxysmal SVT"], commonUse: ["SVT", "Supraventricular tachycardia", "PSVT"], documentation: ["ECG", "Holter monitor"] };
  codes["I47.2"] = { code: "I47.2", description: "Ventricular tachycardia", category: "I47", excludes1: [], excludes2: [], includes: ["VT"], commonUse: ["Ventricular tachycardia", "VT"], documentation: ["ECG", "Telemetry", "Electrophysiology study"] };
  codes["I47.9"] = { code: "I47.9", description: "Paroxysmal tachycardia, unspecified", category: "I47", excludes1: [], excludes2: [], includes: ["Tachycardia NOS"], commonUse: ["Paroxysmal tachycardia"], documentation: ["ECG", "Holter monitor"] };
  codes["I48.0"] = { code: "I48.0", description: "Paroxysmal atrial fibrillation", category: "I48", excludes1: [], excludes2: [], includes: ["Paroxysmal AF"], commonUse: ["Paroxysmal atrial fibrillation", "Pafib"], documentation: ["ECG", "Holter monitor", "Echocardiogram"] };
  codes["I48.1"] = { code: "I48.1", description: "Persistent atrial fibrillation", category: "I48", excludes1: [], excludes2: [], includes: [], commonUse: ["Persistent AF"], documentation: ["ECG"] };
  codes["I48.2"] = { code: "I48.2", description: "Chronic atrial fibrillation", category: "I48", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic AF", "Permanent AF"], documentation: ["ECG"] };
  codes["I48.9"] = { code: "I48.9", description: "Atrial fibrillation and atrial flutter, unspecified", category: "I48", excludes1: [], excludes2: [], includes: ["AFib NOS", "A-fib"], commonUse: ["Atrial fibrillation", "AFib", "A-fib", "Irregular heart rhythm"], documentation: ["ECG", "Echocardiogram", "CHADS2-VASc score"] };
  codes["I49.0"] = { code: "I49.0", description: "Ventricular fibrillation and flutter", category: "I49", excludes1: [], excludes2: [], includes: ["VFib"], commonUse: ["Ventricular fibrillation", "V-fib"], documentation: ["ECG"] };
  codes["I49.1"] = { code: "I49.1", description: "Paroxysmal ventricular tachycardia", category: "I49", excludes1: [], excludes2: [], includes: [], commonUse: ["Paroxysmal VT"], documentation: ["ECG", "Holter monitor"] };
  codes["I49.3"] = { code: "I49.3", description: "Ventricular premature depolarization", category: "I49", excludes1: [], excludes2: [], includes: ["PVC"], commonUse: ["PVCs", "Premature ventricular contractions"], documentation: ["ECG", "Holter monitor"] };
  codes["I49.4"] = { code: "I49.4", description: "Other and unspecified premature ventricular depolarization", category: "I49", excludes1: [], excludes2: [], includes: ["PVC NOS"], commonUse: ["Ventricular ectopy"], documentation: ["ECG", "Holter monitor"] };
  codes["I49.5"] = { code: "I49.5", description: "Sick sinus syndrome", category: "I49", excludes1: [], excludes2: [], includes: ["Brady-tachy syndrome"], commonUse: ["Sick sinus syndrome", "SSS"], documentation: ["ECG", "Holter monitor"] };
  codes["I49.8"] = { code: "I49.8", description: "Other specified cardiac arrhythmias", category: "I49", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac arrhythmia NOS"], documentation: ["ECG", "Holter monitor"] };
  codes["I49.9"] = { code: "I49.9", description: "Cardiac arrhythmia, unspecified", category: "I49", excludes1: [], excludes2: [], includes: ["Arrhythmia NOS"], commonUse: ["Heart arrhythmia", "Irregular heartbeat"], documentation: ["ECG"] };
  codes["I50.0"] = { code: "I50.0", description: "Congestive heart failure", category: "I50", excludes1: [], excludes2: [], includes: ["CHF"], commonUse: ["Congestive heart failure", "CHF", "Heart failure"], documentation: ["Echocardiogram", "BNP/NT-proBNP", "Chest X-ray"] };
  codes["I50.1"] = { code: "I50.1", description: "Left ventricular failure", category: "I50", excludes1: [], excludes2: [], includes: [], commonUse: ["Left heart failure", "LV failure"], documentation: ["Echocardiogram", "BNP"] };
  codes["I50.2"] = { code: "I50.2", description: "Right ventricular failure", category: "I50", excludes1: [], excludes2: [], includes: ["Cor pulmonale"], commonUse: ["Right heart failure"], documentation: ["Echocardiogram", "BNP"] };
  codes["I50.3"] = { code: "I50.3", description: "Biventricular heart failure", category: "I50", excludes1: [], excludes2: [], includes: [], commonUse: ["Biventricular failure"], documentation: ["Echocardiogram"] };
  codes["I50.9"] = { code: "I50.9", description: "Heart failure, unspecified", category: "I50", excludes1: [], excludes2: [], includes: ["HF NOS", "Cardiac failure NOS"], commonUse: ["Heart failure NOS", "HF NOS"], documentation: ["Echocardiogram", "BNP/NT-proBNP"] };
  codes["I60.0"] = { code: "I60.0", description: "Subarachnoid hemorrhage from carotid siphon and bifurcation", category: "I60", excludes1: [], excludes2: [], includes: [], commonUse: ["SAH from carotid"], documentation: ["CT head without contrast", "CT angiography head", "Lumbar puncture"] };
  codes["I60.1"] = { code: "I60.1", description: "Subarachnoid hemorrhage from middle cerebral artery", category: "I60", excludes1: [], excludes2: [], includes: [], commonUse: ["SAH from MCA"], documentation: ["CT head", "CT angiography"] };
  codes["I60.9"] = { code: "I60.9", description: "Subarachnoid hemorrhage, unspecified", category: "I60", excludes1: [], excludes2: [], includes: ["SAH NOS"], commonUse: ["Subarachnoid hemorrhage", "SAH"], documentation: ["CT head without contrast", "Lumbar puncture"] };
  codes["I61.0"] = { code: "I61.0", description: "Nontraumatic intracerebral hemorrhage in hemisphere, subcortical", category: "I61", excludes1: [], excludes2: [], includes: ["Hypertensive putaminal hemorrhage"], commonUse: ["Intracerebral hemorrhage", "ICH"], documentation: ["CT head without contrast", "CT angiography"] };
  codes["I61.1"] = { code: "I61.1", description: "Nontraumatic intracerebral hemorrhage in hemisphere, cortical", category: "I61", excludes1: [], excludes2: [], includes: [], commonUse: ["Lobar ICH"], documentation: ["CT head", "CT angiography"] };
  codes["I61.2"] = { code: "I61.2", description: "Nontraumatic intracerebral hemorrhage in hemisphere, unspecified", category: "I61", excludes1: [], excludes2: [], includes: ["ICH NOS"], commonUse: ["Cerebral hemorrhage"], documentation: ["CT head"] };
  codes["I61.3"] = { code: "I61.3", description: "Nontraumatic intracerebral hemorrhage of brainstem", category: "I61", excludes1: [], excludes2: [], includes: [], commonUse: ["Brainstem hemorrhage"], documentation: ["CT head", "MRI brain"] };
  codes["I61.4"] = { code: "I61.4", description: "Nontraumatic intracerebral hemorrhage of cerebellum", category: "I61", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebellar hemorrhage"], documentation: ["CT head"] };
  codes["I61.5"] = { code: "I61.5", description: "Nontraumatic intracerebral hemorrhage, intraventricular", category: "I61", excludes1: [], excludes2: [], includes: [], commonUse: ["Intraventricular hemorrhage"], documentation: ["CT head"] };
  codes["I61.9"] = { code: "I61.9", description: "Nontraumatic intracerebral hemorrhage, unspecified", category: "I61", excludes1: [], excludes2: [], includes: ["ICH NOS"], commonUse: ["Cerebral hemorrhage NOS"], documentation: ["CT head"] };
  codes["I62.0"] = { code: "I62.0", description: "Nontraumatic subdural hemorrhage", category: "I62", excludes1: [], excludes2: [], includes: ["SDH"], commonUse: ["Subdural hematoma", "SDH"], documentation: ["CT head without contrast"] };
  codes["I62.1"] = { code: "I62.1", description: "Nontraumatic extradural hemorrhage", category: "I62", excludes1: [], excludes2: [], includes: ["Epidural hemorrhage"], commonUse: ["Epidural hematoma"], documentation: ["CT head"] };
  codes["I63.0"] = { code: "I63.0", description: "Cerebral infarction due to thrombosis of precerebral arteries", category: "I63", excludes1: [], excludes2: [], includes: [], commonUse: ["Ischemic stroke"], documentation: ["CT head", "CT/MR angiography", "MRI brain diffusion-weighted"] };
  codes["I63.1"] = { code: "I63.1", description: "Cerebral infarction due to embolism of precerebral arteries", category: "I63", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardioembolic stroke"], documentation: ["CT head", "CT angiography", "Echocardiogram"] };
  codes["I63.2"] = { code: "I63.2", description: "Cerebral infarction due to thrombosis of cerebral arteries", category: "I63", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebral artery thrombosis"], documentation: ["CT head", "CT/MR angiography"] };
  codes["I63.3"] = { code: "I63.3", description: "Cerebral infarction due to embolism of cerebral arteries", category: "I63", excludes1: [], excludes2: [], includes: [], commonUse: ["Embolic stroke"], documentation: ["CT head", "CT angiography", "Echocardiogram"] };
  codes["I63.4"] = { code: "I63.4", description: "Cerebral infarction due to unspecified occlusion or stenosis of cerebral arteries", category: "I63", excludes1: [], excludes2: [], includes: [], commonUse: ["Thrombotic stroke NOS"], documentation: ["CT head", "CT/MR angiography"] };
  codes["I63.5"] = { code: "I63.5", description: "Cerebral infarction due to unspecified occlusion or stenosis of cerebral veins", category: "I63", excludes1: [], excludes2: [], includes: [], commonUse: ["Venous infarction"], documentation: ["CT/MR venography"] };
  codes["I63.8"] = { code: "I63.8", description: "Other cerebral infarction", category: "I63", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebral infarction NOS"], documentation: ["CT head", "MRI brain"] };
  codes["I63.9"] = { code: "I63.9", description: "Cerebral infarction, unspecified", category: "I63", excludes1: [], excludes2: [], includes: ["Stroke NOS", "CVA NOS"], commonUse: ["Ischemic stroke", "CVA", "Brain attack"], documentation: ["CT head", "MRI brain", "CT/MR angiography"] };
  codes["I67.1"] = { code: "I67.1", description: "Cerebral aneurysm, nonruptured", category: "I67", excludes1: [], excludes2: [], includes: [], commonUse: ["Intracranial aneurysm"], documentation: ["CT/MR angiography"] };
  codes["I67.4"] = { code: "I67.4", description: "Hypertensive encephalopathy", category: "I67", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertensive emergency with brain involvement"], documentation: ["Blood pressure monitoring", "CT/MRI brain"] };
  codes["I67.8"] = { code: "I67.8", description: "Other specified cerebrovascular diseases", category: "I67", excludes1: [], excludes2: [], includes: ["Vertebrobasilar insufficiency"], commonUse: ["Vertebrobasilar insufficiency", "Cerebrovascular disease NOS"], documentation: ["CT/MR angiography"] };
  codes["I67.9"] = { code: "I67.9", description: "Cerebrovascular disease, unspecified", category: "I67", excludes1: [], excludes2: [], includes: ["CVD NOS"], commonUse: ["Cerebrovascular disease NOS"], documentation: ["CT head", "CT angiography"] };
  codes["I69.3"] = { code: "I69.3", description: "Sequelae of cerebral infarction", category: "I69", excludes1: [], excludes2: [], includes: ["Post-stroke syndrome"], commonUse: ["Post-CVA", "Post-stroke residual effects"], documentation: ["Neurological exam", "CT/MRI brain"] };
  codes["I69.4"] = { code: "I69.4", description: "Sequelae of other cerebrovascular diseases", category: "I69", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-stroke sequelae NOS"], documentation: ["Neurological exam"] };
  codes["I70.0"] = { code: "I70.0", description: "Atherosclerosis of aorta", category: "I70", excludes1: [], excludes2: [], includes: [], commonUse: ["Aortic atherosclerosis"], documentation: ["CT angiography", "Abdominal ultrasound"] };
  codes["I70.1"] = { code: "I70.1", description: "Atherosclerosis of renal artery", category: "I70", excludes1: [], excludes2: [], includes: ["Renal artery stenosis"], commonUse: ["Renal artery atherosclerosis"], documentation: ["Renal artery Doppler", "CT angiography"] };
  codes["I70.2"] = { code: "I70.2", description: "Atherosclerosis of native arteries of extremities", category: "I70", excludes1: [], excludes2: [], includes: ["Peripheral artery disease"], commonUse: ["Peripheral artery disease", "PAD", "Claudication"], documentation: ["Ankle-brachial index", "Arterial Doppler"] };
  codes["I70.9"] = { code: "I70.9", description: "Atherosclerosis of unspecified artery", category: "I70", excludes1: [], excludes2: [], includes: ["Atherosclerosis NOS"], commonUse: ["Atherosclerosis"], documentation: ["Vascular imaging"] };
  codes["I71.0"] = { code: "I71.0", description: "Dissection of aorta, ascending", category: "I71", excludes1: [], excludes2: [], includes: ["Type A aortic dissection"], commonUse: ["Aortic dissection ascending", "Type A dissection"], documentation: ["CT angiography aorta", "TEE"] };
  codes["I71.1"] = { code: "I71.1", description: "Dissection of aorta, thoracic", category: "I71", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic aortic dissection"], documentation: ["CT angiography aorta"] };
  codes["I71.2"] = { code: "I71.2", description: "Dissection of aorta, abdominal", category: "I71", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal aortic dissection"], documentation: ["CT angiography"] };
  codes["I71.3"] = { code: "I71.3", description: "Abdominal aortic aneurysm, ruptured", category: "I71", excludes1: [], excludes2: [], includes: ["Ruptured AAA"], commonUse: ["Ruptured abdominal aortic aneurysm", "Ruptured AAA"], documentation: ["CT abdomen/pelvis", "Abdominal ultrasound"] };
  codes["I71.4"] = { code: "I71.4", description: "Abdominal aortic aneurysm, without rupture", category: "I71", excludes1: [], excludes2: [], includes: ["AAA NOS"], commonUse: ["Abdominal aortic aneurysm", "AAA"], documentation: ["Abdominal ultrasound", "CT abdomen"] };
  codes["I71.9"] = { code: "I71.9", description: "Aortic aneurysm of unspecified site, without rupture", category: "I71", excludes1: [], excludes2: [], includes: ["Aortic aneurysm NOS"], commonUse: ["Aortic aneurysm"], documentation: ["CT angiography", "Echocardiogram"] };
  codes["I73.0"] = { code: "I73.0", description: "Raynaud syndrome", category: "I73", excludes1: [], excludes2: [], includes: ["Raynaud disease"], commonUse: ["Raynaud's disease", "Raynaud's phenomenon", "White finger"], documentation: ["Nailfold capillaroscopy"] };
  codes["I73.1"] = { code: "I73.1", description: "Thromboangiitis obliterans", category: "I73", excludes1: [], excludes2: [], includes: ["Buerger disease"], commonUse: ["Buerger's disease", "Thromboangiitis obliterans"], documentation: ["Angiography", "Arterial Doppler"] };
  codes["I73.8"] = { code: "I73.8", description: "Other specified peripheral vascular diseases", category: "I73", excludes1: [], excludes2: [], includes: ["Peripheral vasospasm"], commonUse: ["Peripheral vascular disease NOS"], documentation: ["Arterial Doppler", "Ankle-brachial index"] };
  codes["I73.9"] = { code: "I73.9", description: "Peripheral vascular disease, unspecified", category: "I73", excludes1: [], excludes2: [], includes: ["PVD NOS", "Peripheral vascular disease NOS"], commonUse: ["PVD", "Peripheral vascular disease"], documentation: ["Ankle-brachial index", "Arterial Doppler"] };
  codes["I74.0"] = { code: "I74.0", description: "Thrombosis of abdominal aorta", category: "I74", excludes1: [], excludes2: [], includes: [], commonUse: ["Aortic thrombosis"], documentation: ["CT angiography"] };
  codes["I74.1"] = { code: "I74.1", description: "Thrombosis of aorta and its bifurcation", category: "I74", excludes1: [], excludes2: [], includes: [], commonUse: ["Aortic bifurcation thrombosis"], documentation: ["CT angiography"] };
  codes["I74.2"] = { code: "I74.2", description: "Thrombosis of upper limb arteries", category: "I74", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper extremity arterial thrombosis"], documentation: ["Arterial Doppler"] };
  codes["I74.3"] = { code: "I74.3", description: "Thrombosis of lower limb arteries", category: "I74", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower extremity arterial thrombosis"], documentation: ["Arterial Doppler"] };
  codes["I74.4"] = { code: "I74.4", description: "Thrombosis of unspecified arteries", category: "I74", excludes1: [], excludes2: [], includes: ["Arterial thrombosis NOS"], commonUse: ["Arterial thrombosis"], documentation: ["Vascular imaging"] };
  codes["I80.0"] = { code: "I80.0", description: "Phlebitis and thrombophlebitis of lower extremities, superficial", category: "I80", excludes1: [], excludes2: [], includes: ["Superficial thrombophlebitis"], commonUse: ["Superficial phlebitis", "Superficial vein thrombosis"], documentation: ["Venous Doppler ultrasound"] };
  codes["I80.1"] = { code: "I80.1", description: "Phlebitis and thrombophlebitis of lower extremities, deep", category: "I80", excludes1: [], excludes2: [], includes: ["DVT"], commonUse: ["Deep vein thrombosis", "DVT", "Blood clot in leg"], documentation: ["Venous Doppler ultrasound", "D-dimer"] };
  codes["I80.2"] = { code: "I80.2", description: "Phlebitis and thrombophlebitis of other deep vessels of lower extremities", category: "I80", excludes1: [], excludes2: [], includes: [], commonUse: ["Deep vein thrombosis NOS"], documentation: ["Venous Doppler ultrasound"] };
  codes["I80.3"] = { code: "I80.3", description: "Phlebitis and thrombophlebitis of lower extremities, unspecified", category: "I80", excludes1: [], excludes2: [], includes: ["Lower extremity thrombophlebitis NOS"], commonUse: ["Leg thrombophlebitis"], documentation: ["Venous Doppler ultrasound"] };
  codes["I82.0"] = { code: "I82.0", description: "Budd-Chiari syndrome", category: "I82", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatic vein thrombosis"], documentation: ["Doppler ultrasound liver", "CT/MR angiography"] };
  codes["I82.2"] = { code: "I82.2", description: "Embolism and thrombosis of vena cava", category: "I82", excludes1: [], excludes2: [], includes: [], commonUse: ["Vena cava thrombosis"], documentation: ["CT angiography"] };
  codes["I82.3"] = { code: "I82.3", description: "Embolism and thrombosis of renal vein", category: "I82", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal vein thrombosis"], documentation: ["Renal Doppler ultrasound"] };
  codes["I82.4"] = { code: "I82.4", description: "Embolism and thrombosis of lower extremity veins", category: "I82", excludes1: [], excludes2: [], includes: ["DVT NOS"], commonUse: ["Lower extremity vein thrombosis"], documentation: ["Venous Doppler ultrasound"] };
  codes["I82.8"] = { code: "I82.8", description: "Embolism and thrombosis of other specified veins", category: "I82", excludes1: [], excludes2: [], includes: [], commonUse: ["Venous thrombosis NOS"], documentation: ["Venous Doppler ultrasound"] };
  codes["I83.0"] = { code: "I83.0", description: "Varicose veins of lower extremities with ulcer", category: "I83", excludes1: [], excludes2: [], includes: [], commonUse: ["Varicose veins with ulceration"], documentation: ["Physical examination", "Venous Doppler"] };
  codes["I83.1"] = { code: "I83.1", description: "Varicose veins of lower extremities with inflammation", category: "I83", excludes1: [], excludes2: [], includes: ["Varicose dermatitis"], commonUse: ["Varicose veins with phlebitis"], documentation: ["Physical examination"] };
  codes["I83.2"] = { code: "I83.2", description: "Varicose veins of lower extremities with both ulcer and inflammation", category: "I83", excludes1: [], excludes2: [], includes: [], commonUse: ["Varicose veins with ulcer and phlebitis"], documentation: ["Physical examination", "Venous Doppler"] };
  codes["I83.9"] = { code: "I83.9", description: "Varicose veins of lower extremities without ulcer or inflammation", category: "I83", excludes1: [], excludes2: [], includes: ["Varicose veins NOS"], commonUse: ["Varicose veins", "Spider veins"], documentation: ["Physical examination", "Venous Doppler"] };
  codes["I84.0"] = { code: "I84.0", description: "Internal hemorrhoids with thrombosis", category: "I84", excludes1: [], excludes2: [], includes: [], commonUse: ["Thrombosed internal hemorrhoid"], documentation: ["Physical examination", "Anoscopy"] };
  codes["I84.1"] = { code: "I84.1", description: "Internal hemorrhoids with other complications", category: "I84", excludes1: [], excludes2: [], includes: ["Bleeding internal hemorrhoid"], commonUse: ["Internal hemorrhoids"], documentation: ["Anoscopy"] };
  codes["I84.2"] = { code: "I84.2", description: "Internal hemorrhoids without complication", category: "I84", excludes1: [], excludes2: [], includes: ["Internal hemorrhoids NOS"], commonUse: ["Hemorrhoids"], documentation: ["Physical examination", "Anoscopy"] };
  codes["I84.3"] = { code: "I84.3", description: "External hemorrhoids with thrombosis", category: "I84", excludes1: [], excludes2: [], includes: [], commonUse: ["Thrombosed external hemorrhoid"], documentation: ["Physical examination"] };
  codes["I84.4"] = { code: "I84.4", description: "External hemorrhoids with other complications", category: "I84", excludes1: [], excludes2: [], includes: ["Bleeding external hemorrhoid"], commonUse: ["External hemorrhoids"], documentation: ["Physical examination"] };
  codes["I84.5"] = { code: "I84.5", description: "External hemorrhoids without complication", category: "I84", excludes1: [], excludes2: [], includes: ["External hemorrhoids NOS"], commonUse: ["Hemorrhoids", "Piles"], documentation: ["Physical examination"] };
  codes["I84.6"] = { code: "I84.6", description: "Unspecified hemorrhoids with thrombosis", category: "I84", excludes1: [], excludes2: [], includes: [], commonUse: ["Thrombosed hemorrhoid"], documentation: ["Physical examination"] };
  codes["I84.7"] = { code: "I84.7", description: "Unspecified hemorrhoids without complication", category: "I84", excludes1: [], excludes2: [], includes: ["Hemorrhoids NOS"], commonUse: ["Hemorrhoids NOS"], documentation: ["Physical examination"] };
  codes["I85.0"] = { code: "I85.0", description: "Esophageal varices with bleeding", category: "I85", excludes1: [], excludes2: [], includes: [], commonUse: ["Bleeding esophageal varices"], documentation: ["Upper endoscopy", "CBC", "Liver function tests"] };
  codes["I85.9"] = { code: "I85.9", description: "Esophageal varices without bleeding", category: "I85", excludes1: [], excludes2: [], includes: ["Esophageal varices NOS"], commonUse: ["Esophageal varices"], documentation: ["Upper endoscopy"] };
  codes["I87.0"] = { code: "I87.0", description: "Postphlebitic syndrome", category: "I87", excludes1: [], excludes2: [], includes: ["Post-thrombotic syndrome"], commonUse: ["Post-thrombotic syndrome"], documentation: ["Venous Doppler ultrasound"] };
  codes["I87.8"] = { code: "I87.8", description: "Other specified disorders of veins", category: "I87", excludes1: [], excludes2: [], includes: [], commonUse: ["Venous insufficiency"], documentation: ["Venous Doppler"] };
  codes["I87.9"] = { code: "I87.9", description: "Disorder of veins, unspecified", category: "I87", excludes1: [], excludes2: [], includes: ["Venous disorder NOS"], commonUse: ["Venous disease"], documentation: ["Venous Doppler"] };
  codes["I95.0"] = { code: "I95.0", description: "Idiopathic hypotension", category: "I95", excludes1: [], excludes2: [], includes: [], commonUse: ["Orthostatic hypotension"], documentation: ["Orthostatic vital signs", "Tilt table test"] };
  codes["I95.1"] = { code: "I95.1", description: "Hypotension due to drugs", category: "I95", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced hypotension"], documentation: ["Blood pressure monitoring", "Medication review"] };
  codes["I95.2"] = { code: "I95.2", description: "Hypotension due to dehydration", category: "I95", excludes1: [], excludes2: [], includes: [], commonUse: ["Dehydration hypotension"], documentation: ["Orthostatic vitals", "BMP"] };
  codes["I95.8"] = { code: "I95.8", description: "Other hypotension", category: "I95", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypotension NOS"], documentation: ["Blood pressure monitoring"] };
  codes["I95.9"] = { code: "I95.9", description: "Hypotension, unspecified", category: "I95", excludes1: [], excludes2: [], includes: ["Low blood pressure"], commonUse: ["Hypotension", "Low blood pressure"], documentation: ["Blood pressure monitoring"] };
  codes["H10.9"] = { code: "H10.9", description: "Conjunctivitis, unspecified", category: "H10", excludes1: [], excludes2: [], includes: [], commonUse: ["Pink eye", "Eye infection"], documentation: ["Slit lamp exam"] };
  codes["H16.9"] = { code: "H16.9", description: "Keratitis, unspecified", category: "H16", excludes1: [], excludes2: [], includes: [], commonUse: ["Corneal inflammation"], documentation: ["Slit lamp examination"] };
  codes["H25.0"] = { code: "H25.0", description: "Age-related cataract, cortical", category: "H25", excludes1: [], excludes2: [], includes: [], commonUse: ["Cortical cataract"], documentation: ["Slit lamp examination"] };
  codes["H25.1"] = { code: "H25.1", description: "Age-related cataract, nuclear", category: "H25", excludes1: [], excludes2: [], includes: [], commonUse: ["Nuclear sclerosis"], documentation: ["Slit lamp examination"] };
  codes["H25.9"] = { code: "H25.9", description: "Age-related cataract, unspecified", category: "H25", excludes1: [], excludes2: [], includes: [], commonUse: ["Senile cataract", "Cataract NOS"], documentation: ["Visual acuity testing"] };
  codes["H26.9"] = { code: "H26.9", description: "Cataract, unspecified", category: "H26", excludes1: [], excludes2: [], includes: [], commonUse: ["Cataract"], documentation: ["Slit lamp examination"] };
  codes["H34.1"] = { code: "H34.1", description: "Central retinal vein occlusion", category: "H34", excludes1: [], excludes2: [], includes: ["CRVO"], commonUse: ["Retinal vein occlusion", "CRVO"], documentation: ["Fundoscopic exam", "OCT"] };
  codes["H35.0"] = { code: "H35.0", description: "Background retinopathy and retinal vascular changes", category: "H35", excludes1: [], excludes2: [], includes: ["Diabetic retinopathy NOS"], commonUse: ["Diabetic retinopathy"], documentation: ["Dilated eye exam"] };
  codes["H35.9"] = { code: "H35.9", description: "Retinal disorder, unspecified", category: "H35", excludes1: [], excludes2: [], includes: [], commonUse: ["Retinal disorder NOS"], documentation: ["Fundoscopic examination"] };
  codes["H40.1"] = { code: "H40.1", description: "Open-angle glaucoma", category: "H40", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic open-angle glaucoma", "POAG"], documentation: ["IOP", "Visual field testing"] };
  codes["H40.2"] = { code: "H40.2", description: "Primary angle-closure glaucoma", category: "H40", excludes1: [], excludes2: [], includes: [], commonUse: ["Angle-closure glaucoma"], documentation: ["IOP", "Gonioscopy"] };
  codes["H40.9"] = { code: "H40.9", description: "Glaucoma, unspecified", category: "H40", excludes1: [], excludes2: [], includes: [], commonUse: ["Glaucoma"], documentation: ["IOP testing"] };
  codes["H49.0"] = { code: "H49.0", description: "Third cranial nerve palsy", category: "H49", excludes1: [], excludes2: [], includes: ["Oculomotor nerve palsy"], commonUse: ["CN III palsy"], documentation: ["Neurological exam"] };
  codes["H52.0"] = { code: "H52.0", description: "Hypermetropia", category: "H52", excludes1: [], excludes2: [], includes: ["Farsightedness"], commonUse: ["Hyperopia", "Farsightedness"], documentation: ["Refraction testing"] };
  codes["H52.1"] = { code: "H52.1", description: "Myopia", category: "H52", excludes1: [], excludes2: [], includes: ["Nearsightedness"], commonUse: ["Nearsightedness"], documentation: ["Refraction testing"] };
  codes["H52.2"] = { code: "H52.2", description: "Astigmatism", category: "H52", excludes1: [], excludes2: [], includes: [], commonUse: ["Astigmatic error"], documentation: ["Refraction testing"] };
  codes["H52.4"] = { code: "H52.4", description: "Presbyopia", category: "H52", excludes1: [], excludes2: [], includes: [], commonUse: ["Age-related loss of accommodation"], documentation: ["Refraction testing"] };
  codes["H53.0"] = { code: "H53.0", description: "Amblyopia ex anopsia", category: "H53", excludes1: [], excludes2: [], includes: ["Lazy eye"], commonUse: ["Lazy eye"], documentation: ["Visual acuity testing"] };
  codes["H53.4"] = { code: "H53.4", description: "Visual field defects", category: "H53", excludes1: [], excludes2: [], includes: [], commonUse: ["Visual field loss"], documentation: ["Visual field testing"] };
  codes["H53.5"] = { code: "H53.5", description: "Color vision deficiency", category: "H53", excludes1: [], excludes2: [], includes: ["Color blindness"], commonUse: ["Color blindness"], documentation: ["Ishihara testing"] };
  codes["H53.9"] = { code: "H53.9", description: "Visual disturbance, unspecified", category: "H53", excludes1: [], excludes2: [], includes: ["Visual disturbance NOS"], commonUse: ["Blurred vision"], documentation: ["Visual acuity testing"] };
  codes["H54.9"] = { code: "H54.9", description: "Blindness, unspecified", category: "H54", excludes1: [], excludes2: [], includes: [], commonUse: ["Vision loss"], documentation: ["Visual acuity testing"] };
  codes["H60.2"] = { code: "H60.2", description: "Acute otitis externa", category: "H60", excludes1: [], excludes2: [], includes: ["Swimmer's ear"], commonUse: ["Swimmer's ear"], documentation: ["Otoscopic exam"] };
  codes["H60.9"] = { code: "H60.9", description: "Otitis externa, unspecified", category: "H60", excludes1: [], excludes2: [], includes: ["Otitis externa NOS"], commonUse: ["External ear infection"], documentation: ["Otoscopic exam"] };
  codes["H65.1"] = { code: "H65.1", description: "Other acute nonsuppurative otitis media", category: "H65", excludes1: [], excludes2: [], includes: ["Serous otitis media"], commonUse: ["Serous otitis", "OME"], documentation: ["Otoscopic exam", "Tympanometry"] };
  codes["H65.9"] = { code: "H65.9", description: "Otitis media, unspecified", category: "H65", excludes1: [], excludes2: [], includes: ["Otitis media NOS"], commonUse: ["Middle ear infection"], documentation: ["Otoscopic exam"] };
  codes["H66.0"] = { code: "H66.0", description: "Acute suppurative otitis media", category: "H66", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute otitis media"], documentation: ["Otoscopic exam"] };
  codes["H66.9"] = { code: "H66.9", description: "Otitis media, unspecified", category: "H66", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear infection"], documentation: ["Otoscopic exam"] };
  codes["H81.0"] = { code: "H81.0", description: "Meniere disease", category: "H81", excludes1: [], excludes2: [], includes: [], commonUse: ["Meniere's disease"], documentation: ["Audiometry", "VNG"] };
  codes["H81.1"] = { code: "H81.1", description: "Benign paroxysmal vertigo", category: "H81", excludes1: [], excludes2: [], includes: ["BPPV"], commonUse: ["BPPV", "Positional vertigo"], documentation: ["Dix-Hallpike maneuver"] };
  codes["H81.2"] = { code: "H81.2", description: "Vestibular neuronitis", category: "H81", excludes1: [], excludes2: [], includes: [], commonUse: ["Vestibular neuritis"], documentation: ["VNG/ENG testing"] };
  codes["H81.3"] = { code: "H81.3", description: "Other peripheral vertigo", category: "H81", excludes1: [], excludes2: [], includes: [], commonUse: ["Peripheral vertigo"], documentation: ["VNG/ENG testing"] };
  codes["H90.0"] = { code: "H90.0", description: "Conductive hearing loss, bilateral", category: "H90", excludes1: [], excludes2: [], includes: [], commonUse: ["Bilateral conductive hearing loss"], documentation: ["Audiometry"] };
  codes["H90.2"] = { code: "H90.2", description: "Sensorineural hearing loss, bilateral", category: "H90", excludes1: [], excludes2: [], includes: [], commonUse: ["Bilateral sensorineural hearing loss"], documentation: ["Audiometry"] };
  codes["H90.3"] = { code: "H90.3", description: "Sensorineural hearing loss, unilateral", category: "H90", excludes1: [], excludes2: [], includes: [], commonUse: ["Unilateral hearing loss"], documentation: ["Audiometry"] };
  codes["H90.9"] = { code: "H90.9", description: "Hearing loss, unspecified", category: "H90", excludes1: [], excludes2: [], includes: ["Deafness NOS"], commonUse: ["Hearing loss"], documentation: ["Audiometry"] };
  codes["H91.1"] = { code: "H91.1", description: "Presbycusis", category: "H91", excludes1: [], excludes2: [], includes: [], commonUse: ["Age-related hearing loss"], documentation: ["Audiometry"] };
  codes["H91.2"] = { code: "H91.2", description: "Sudden idiopathic hearing loss", category: "H91", excludes1: [], excludes2: [], includes: ["SSNHL"], commonUse: ["Sudden hearing loss"], documentation: ["Audiometry", "MRI brain"] };
  codes["H93.0"] = { code: "H93.0", description: "Tinnitus", category: "H93", excludes1: [], excludes2: [], includes: [], commonUse: ["Ringing in ears"], documentation: ["Audiometry"] };
  codes["H93.9"] = { code: "H93.9", description: "Disorder of ear, unspecified", category: "H93", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear disorder NOS"], documentation: ["Otoscopic exam"] };
  codes["J00.0"] = { code: "J00.0", description: "Acute nasopharyngitis [common cold]", category: "J00", excludes1: [], excludes2: [], includes: [], commonUse: ["Common cold"], documentation: ["Clinical diagnosis"] };
  codes["J01.0"] = { code: "J01.0", description: "Acute maxillary sinusitis", category: "J01", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute sinusitis", "Maxillary sinus infection"], documentation: ["CT sinuses"] };
  codes["J01.9"] = { code: "J01.9", description: "Acute sinusitis, unspecified", category: "J01", excludes1: [], excludes2: [], includes: ["Acute sinusitis NOS"], commonUse: ["Sinus infection"], documentation: ["CT sinuses"] };
  codes["J02.0"] = { code: "J02.0", description: "Streptococcal pharyngitis", category: "J02", excludes1: [], excludes2: [], includes: ["Strep throat"], commonUse: ["Strep throat"], documentation: ["Rapid strep test", "Throat culture"] };
  codes["J02.9"] = { code: "J02.9", description: "Pharyngitis, unspecified", category: "J02", excludes1: [], excludes2: [], includes: ["Sore throat NOS"], commonUse: ["Sore throat"], documentation: ["Clinical diagnosis"] };
  codes["J03.0"] = { code: "J03.0", description: "Streptococcal tonsillitis", category: "J03", excludes1: [], excludes2: [], includes: [], commonUse: ["Strep tonsillitis"], documentation: ["Rapid strep test"] };
  codes["J03.9"] = { code: "J03.9", description: "Acute tonsillitis, unspecified", category: "J03", excludes1: [], excludes2: [], includes: [], commonUse: ["Tonsillitis"], documentation: ["Clinical diagnosis"] };
  codes["J04.0"] = { code: "J04.0", description: "Acute laryngitis", category: "J04", excludes1: [], excludes2: [], includes: [], commonUse: ["Laryngitis", "Hoarseness"], documentation: ["Laryngoscopy"] };
  codes["J04.1"] = { code: "J04.1", description: "Acute tracheitis", category: "J04", excludes1: [], excludes2: [], includes: [], commonUse: ["Tracheitis"], documentation: ["Chest X-ray"] };
  codes["J04.2"] = { code: "J04.2", description: "Acute laryngotracheitis", category: "J04", excludes1: [], excludes2: [], includes: [], commonUse: ["Croup"], documentation: ["Clinical diagnosis"] };
  codes["J06.9"] = { code: "J06.9", description: "Acute upper respiratory infection, unspecified", category: "J06", excludes1: [], excludes2: [], includes: ["URI NOS"], commonUse: ["Upper respiratory infection", "URI", "Common cold"], documentation: ["Clinical diagnosis"] };
  codes["J09.X1"] = { code: "J09.X1", description: "Influenza due to novel influenza A virus with pneumonia", category: "J09", excludes1: [], excludes2: [], includes: [], commonUse: ["Novel flu with pneumonia"], documentation: ["Influenza PCR", "Chest X-ray"] };
  codes["J09.X9"] = { code: "J09.X9", description: "Influenza due to novel influenza A virus, unspecified", category: "J09", excludes1: [], excludes2: [], includes: [], commonUse: ["Novel influenza", "Bird flu"], documentation: ["Influenza PCR"] };
  codes["J10.0"] = { code: "J10.0", description: "Influenza due to other identified influenza virus with pneumonia", category: "J10", excludes1: [], excludes2: [], includes: [], commonUse: ["Flu with pneumonia"], documentation: ["Influenza PCR", "Chest X-ray"] };
  codes["J10.1"] = { code: "J10.1", description: "Influenza due to other identified influenza virus with respiratory manifestations", category: "J10", excludes1: [], excludes2: [], includes: [], commonUse: ["Seasonal flu"], documentation: ["Influenza rapid test"] };
  codes["J11.8"] = { code: "J11.8", description: "Influenza due to unidentified virus, unspecified", category: "J11", excludes1: [], excludes2: [], includes: ["Influenza NOS"], commonUse: ["Influenza NOS"], documentation: ["Clinical diagnosis"] };
  codes["J12.3"] = { code: "J12.3", description: "Human metapneumovirus pneumonia", category: "J12", excludes1: [], excludes2: [], includes: [], commonUse: ["hMPV pneumonia"], documentation: ["Viral PCR", "Chest X-ray"] };
  codes["J12.9"] = { code: "J12.9", description: "Viral pneumonia, unspecified", category: "J12", excludes1: [], excludes2: [], includes: ["Viral pneumonia NOS"], commonUse: ["Viral pneumonia"], documentation: ["Chest X-ray"] };
  codes["J13"] = { code: "J13", description: "Pneumonia due to Streptococcus pneumoniae", category: "J15", excludes1: [], excludes2: [], includes: [], commonUse: ["Pneumococcal pneumonia"], documentation: ["Chest X-ray", "Sputum culture"] };
  codes["J14"] = { code: "J14", description: "Pneumonia due to Haemophilus influenzae", category: "J15", excludes1: [], excludes2: [], includes: [], commonUse: ["Hib pneumonia"], documentation: ["Chest X-ray", "Sputum culture"] };
  codes["J15.0"] = { code: "J15.0", description: "Pneumonia due to Klebsiella pneumoniae", category: "J15", excludes1: [], excludes2: [], includes: [], commonUse: ["Klebsiella pneumonia"], documentation: ["Chest X-ray", "Sputum culture"] };
  codes["J15.1"] = { code: "J15.1", description: "Pneumonia due to Pseudomonas", category: "J15", excludes1: [], excludes2: [], includes: [], commonUse: ["Pseudomonal pneumonia"], documentation: ["Chest X-ray", "Sputum culture"] };
  codes["J15.2"] = { code: "J15.2", description: "Pneumonia due to staphylococcus", category: "J15", excludes1: [], excludes2: [], includes: [], commonUse: ["Staphylococcal pneumonia"], documentation: ["Chest X-ray", "Culture"] };
  codes["J15.7"] = { code: "J15.7", description: "Pneumonia due to Mycoplasma pneumoniae", category: "J15", excludes1: [], excludes2: [], includes: ["Atypical pneumonia"], commonUse: ["Walking pneumonia"], documentation: ["Chest X-ray", "Mycoplasma IgM"] };
  codes["J15.9"] = { code: "J15.9", description: "Bacterial pneumonia, unspecified", category: "J15", excludes1: [], excludes2: [], includes: ["Bacterial pneumonia NOS"], commonUse: ["Bacterial pneumonia", "Pneumonia"], documentation: ["Chest X-ray", "Sputum culture"] };
  codes["J18.0"] = { code: "J18.0", description: "Bronchopneumonia, unspecified organism", category: "J18", excludes1: [], excludes2: [], includes: [], commonUse: ["Bronchopneumonia"], documentation: ["Chest X-ray"] };
  codes["J18.1"] = { code: "J18.1", description: "Lobar pneumonia, unspecified organism", category: "J18", excludes1: [], excludes2: [], includes: [], commonUse: ["Lobar pneumonia"], documentation: ["Chest X-ray"] };
  codes["J18.9"] = { code: "J18.9", description: "Pneumonia, unspecified organism", category: "J18", excludes1: [], excludes2: [], includes: ["Pneumonia NOS"], commonUse: ["Pneumonia", "Lung infection"], documentation: ["Chest X-ray"] };
  codes["J20.9"] = { code: "J20.9", description: "Acute bronchitis, unspecified", category: "J20", excludes1: [], excludes2: [], includes: ["Bronchitis NOS"], commonUse: ["Bronchitis"], documentation: ["Clinical diagnosis"] };
  codes["J21.9"] = { code: "J21.9", description: "Acute bronchiolitis, unspecified", category: "J21", excludes1: [], excludes2: [], includes: ["Bronchiolitis NOS"], commonUse: ["Bronchiolitis"], documentation: ["Clinical diagnosis"] };
  codes["J30.0"] = { code: "J30.0", description: "Vasomotor rhinitis", category: "J30", excludes1: [], excludes2: [], includes: [], commonUse: ["Nonallergic rhinitis"], documentation: ["Clinical diagnosis"] };
  codes["J30.1"] = { code: "J30.1", description: "Rhinitis due to pollen", category: "J30", excludes1: [], excludes2: [], includes: ["Hay fever"], commonUse: ["Hay fever", "Seasonal allergies"], documentation: ["Allergy testing"] };
  codes["J30.2"] = { code: "J30.2", description: "Other seasonal allergic rhinitis", category: "J30", excludes1: [], excludes2: [], includes: [], commonUse: ["Seasonal allergies"], documentation: ["Allergy testing"] };
  codes["J30.3"] = { code: "J30.3", description: "Other allergic rhinitis", category: "J30", excludes1: [], excludes2: [], includes: ["Perennial allergic rhinitis"], commonUse: ["Year-round allergies"], documentation: ["Allergy testing"] };
  codes["J30.4"] = { code: "J30.4", description: "Allergic rhinitis, unspecified", category: "J30", excludes1: [], excludes2: [], includes: ["Allergic rhinitis NOS"], commonUse: ["Allergies", "Allergic rhinitis"], documentation: ["Allergy testing"] };
  codes["J31.0"] = { code: "J31.0", description: "Chronic rhinitis", category: "J31", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic runny nose"], documentation: ["Nasal endoscopy"] };
  codes["J32.0"] = { code: "J32.0", description: "Chronic maxillary sinusitis", category: "J32", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic sinusitis"], documentation: ["CT sinuses"] };
  codes["J32.9"] = { code: "J32.9", description: "Chronic sinusitis, unspecified", category: "J32", excludes1: [], excludes2: [], includes: ["Chronic sinusitis NOS"], commonUse: ["Chronic sinusitis"], documentation: ["CT sinuses"] };
  codes["J33.0"] = { code: "J33.0", description: "Polyp of nasal cavity", category: "J33", excludes1: [], excludes2: [], includes: ["Nasal polyps"], commonUse: ["Nasal polyps"], documentation: ["Nasal endoscopy", "CT sinuses"] };
  codes["J35.0"] = { code: "J35.0", description: "Chronic tonsillitis", category: "J35", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic tonsillitis"], documentation: ["Clinical examination"] };
  codes["J35.1"] = { code: "J35.1", description: "Hypertrophy of tonsils", category: "J35", excludes1: [], excludes2: [], includes: [], commonUse: ["Enlarged tonsils"], documentation: ["Physical examination"] };
  codes["J35.2"] = { code: "J35.2", description: "Hypertrophy of adenoids", category: "J35", excludes1: [], excludes2: [], includes: [], commonUse: ["Enlarged adenoids"], documentation: ["Lateral neck X-ray"] };
  codes["J38.0"] = { code: "J38.0", description: "Paralysis of vocal cords and larynx", category: "J38", excludes1: [], excludes2: [], includes: ["Vocal cord paralysis"], commonUse: ["Vocal cord paralysis"], documentation: ["Laryngoscopy"] };
  codes["J38.2"] = { code: "J38.2", description: "Nodules of vocal cords", category: "J38", excludes1: [], excludes2: [], includes: [], commonUse: ["Vocal cord nodules", "Singer's nodules"], documentation: ["Laryngoscopy"] };
  codes["J38.5"] = { code: "J38.5", description: "Spasm of larynx", category: "J38", excludes1: [], excludes2: [], includes: ["Laryngospasm"], commonUse: ["Laryngospasm"], documentation: ["Laryngoscopy"] };
  codes["J40"] = { code: "J40", description: "Bronchitis, not specified as acute or chronic", category: "J40", excludes1: [], excludes2: [], includes: ["Bronchitis NOS"], commonUse: ["Bronchitis"], documentation: ["Clinical diagnosis"] };
  codes["J41.0"] = { code: "J41.0", description: "Simple chronic bronchitis", category: "J41", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic bronchitis"], documentation: ["Spirometry"] };
  codes["J42"] = { code: "J42", description: "Unspecified chronic bronchitis", category: "J42", excludes1: [], excludes2: [], includes: ["Chronic bronchitis NOS"], commonUse: ["Chronic bronchitis NOS"], documentation: ["Spirometry"] };
  codes["J43.0"] = { code: "J43.0", description: "MacLeod syndrome", category: "J43", excludes1: [], excludes2: [], includes: [], commonUse: ["Swyer-James syndrome"], documentation: ["CT chest", "PFTs"] };
  codes["J43.1"] = { code: "J43.1", description: "Panlobular emphysema", category: "J43", excludes1: [], excludes2: [], includes: [], commonUse: ["Panlobular emphysema"], documentation: ["CT chest", "PFTs"] };
  codes["J43.2"] = { code: "J43.2", description: "Centrilobular emphysema", category: "J43", excludes1: [], excludes2: [], includes: [], commonUse: ["Centrilobular emphysema"], documentation: ["CT chest", "PFTs"] };
  codes["J43.9"] = { code: "J43.9", description: "Emphysema, unspecified", category: "J43", excludes1: [], excludes2: [], includes: ["Emphysema NOS"], commonUse: ["Emphysema"], documentation: ["CT chest", "PFTs"] };
  codes["J44.0"] = { code: "J44.0", description: "COPD with acute exacerbation", category: "J44", excludes1: [], excludes2: [], includes: [], commonUse: ["COPD exacerbation"], documentation: ["Chest X-ray", "ABG"] };
  codes["J44.1"] = { code: "J44.1", description: "COPD with (acute) exacerbation", category: "J44", excludes1: [], excludes2: [], includes: ["COPD exacerbation NOS"], commonUse: ["COPD flare"], documentation: ["Chest X-ray", "ABG"] };
  codes["J44.9"] = { code: "J44.9", description: "Chronic obstructive pulmonary disease, unspecified", category: "J44", excludes1: [], excludes2: [], includes: ["COPD NOS"], commonUse: ["COPD", "Chronic obstructive lung disease"], documentation: ["Spirometry", "Chest X-ray"] };
  codes["J45.0"] = { code: "J45.0", description: "Mild intermittent asthma", category: "J45", excludes1: [], excludes2: [], includes: [], commonUse: ["Mild intermittent asthma"], documentation: ["Spirometry"] };
  codes["J45.1"] = { code: "J45.1", description: "Mild persistent asthma", category: "J45", excludes1: [], excludes2: [], includes: [], commonUse: ["Mild persistent asthma"], documentation: ["Spirometry"] };
  codes["J45.2"] = { code: "J45.2", description: "Moderate intermittent asthma", category: "J45", excludes1: [], excludes2: [], includes: [], commonUse: ["Moderate intermittent asthma"], documentation: ["Spirometry"] };
  codes["J45.3"] = { code: "J45.3", description: "Moderate persistent asthma", category: "J45", excludes1: [], excludes2: [], includes: [], commonUse: ["Moderate persistent asthma"], documentation: ["Spirometry"] };
  codes["J45.4"] = { code: "J45.4", description: "Severe persistent asthma", category: "J45", excludes1: [], excludes2: [], includes: [], commonUse: ["Severe persistent asthma"], documentation: ["Spirometry"] };
  codes["J45.9"] = { code: "J45.9", description: "Asthma, unspecified", category: "J45", excludes1: [], excludes2: [], includes: ["Asthma NOS"], commonUse: ["Asthma", "Reactive airway disease"], documentation: ["Spirometry", "Peak flow"] };
  codes["J46"] = { code: "J46", description: "Status asthmaticus", category: "J46", excludes1: [], excludes2: [], includes: ["Acute severe asthma"], commonUse: ["Status asthmaticus", "Asthma attack"], documentation: ["ABG", "Peak flow"] };
  codes["J47.0"] = { code: "J47.0", description: "Bronchiectasis with acute lower respiratory infection", category: "J47", excludes1: [], excludes2: [], includes: [], commonUse: ["Bronchiectasis with infection"], documentation: ["CT chest", "Sputum culture"] };
  codes["J47.9"] = { code: "J47.9", description: "Bronchiectasis, unspecified", category: "J47", excludes1: [], excludes2: [], includes: ["Bronchiectasis NOS"], commonUse: ["Bronchiectasis"], documentation: ["CT chest", "PFTs"] };
  codes["J80"] = { code: "J80", description: "Acute respiratory distress syndrome", category: "J80", excludes1: [], excludes2: [], includes: ["ARDS"], commonUse: ["ARDS"], documentation: ["Chest X-ray", "ABG"] };
  codes["J81.0"] = { code: "J81.0", description: "Acute pulmonary edema", category: "J81", excludes1: [], excludes2: [], includes: [], commonUse: ["Flash pulmonary edema"], documentation: ["Chest X-ray", "BNP"] };
  codes["J81.1"] = { code: "J81.1", description: "Chronic pulmonary edema", category: "J81", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic pulmonary edema"], documentation: ["Chest X-ray", "Echocardiogram"] };
  codes["J84.1"] = { code: "J84.1", description: "Pulmonary fibrosis, not elsewhere classified", category: "J84", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary fibrosis", "IPF"], documentation: ["CT chest high resolution", "PFTs"] };
  codes["J84.2"] = { code: "J84.2", description: "Lymphoid interstitial pneumonia", category: "J84", excludes1: [], excludes2: [], includes: [], commonUse: ["LIP"], documentation: ["CT chest", "BAL"] };
  codes["J84.9"] = { code: "J84.9", description: "Interstitial pulmonary disease, unspecified", category: "J84", excludes1: [], excludes2: [], includes: ["ILD NOS"], commonUse: ["Interstitial lung disease"], documentation: ["CT chest", "PFTs"] };
  codes["J90"] = { code: "J90", description: "Pleural effusion, not elsewhere classified", category: "J90", excludes1: [], excludes2: [], includes: ["Effusion NOS"], commonUse: ["Pleural effusion", "Fluid around lung"], documentation: ["Chest X-ray", "Thoracentesis"] };
  codes["J91.0"] = { code: "J91.0", description: "Pleural effusion in conditions classified elsewhere, malignant", category: "J91", excludes1: [], excludes2: [], includes: ["Malignant pleural effusion"], commonUse: ["Cancerous pleural effusion"], documentation: ["Chest X-ray", "Thoracentesis"] };
  codes["J92.9"] = { code: "J92.9", description: "Pleural plaque without asbestos exposure", category: "J92", excludes1: [], excludes2: [], includes: [], commonUse: ["Pleural plaque"], documentation: ["Chest X-ray"] };
  codes["J93.0"] = { code: "J93.0", description: "Spontaneous tension pneumothorax", category: "J93", excludes1: [], excludes2: [], includes: [], commonUse: ["Tension pneumothorax"], documentation: ["Chest X-ray", "Clinical diagnosis"] };
  codes["J93.1"] = { code: "J93.1", description: "Other spontaneous pneumothorax", category: "J93", excludes1: [], excludes2: [], includes: ["Spontaneous pneumothorax"], commonUse: ["Collapsed lung"], documentation: ["Chest X-ray"] };
  codes["J93.9"] = { code: "J93.9", description: "Pneumothorax, unspecified", category: "J93", excludes1: [], excludes2: [], includes: ["Pneumothorax NOS"], commonUse: ["Pneumothorax"], documentation: ["Chest X-ray"] };
  codes["J96.0"] = { code: "J96.0", description: "Acute respiratory failure with hypoxia", category: "J96", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute respiratory failure"], documentation: ["ABG"] };
  codes["J96.1"] = { code: "J96.1", description: "Acute respiratory failure with hypercapnia", category: "J96", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute respiratory failure with CO2 retention"], documentation: ["ABG"] };
  codes["J96.9"] = { code: "J96.9", description: "Respiratory failure, unspecified", category: "J96", excludes1: [], excludes2: [], includes: ["Respiratory failure NOS"], commonUse: ["Respiratory failure"], documentation: ["ABG"] };
  codes["J98.0"] = { code: "J98.0", description: "Diseases of bronchus, not elsewhere classified", category: "J98", excludes1: [], excludes2: [], includes: [], commonUse: ["Bronchial disease"], documentation: ["Bronchoscopy"] };
  codes["J98.1"] = { code: "J98.1", description: "Pulmonary collapse", category: "J98", excludes1: [], excludes2: [], includes: ["Atelectasis"], commonUse: ["Atelectasis", "Lung collapse"], documentation: ["Chest X-ray"] };
  codes["J98.4"] = { code: "J98.4", description: "Other diseases of lung", category: "J98", excludes1: [], excludes2: [], includes: ["Lung disease NOS"], commonUse: ["Pulmonary disease NOS"], documentation: ["CT chest"] };
  codes["J98.5"] = { code: "J98.5", description: "Diseases of mediastinum, not elsewhere classified", category: "J98", excludes1: [], excludes2: [], includes: [], commonUse: ["Mediastinal disease"], documentation: ["CT chest"] };
  codes["J98.9"] = { code: "J98.9", description: "Respiratory disease, unspecified", category: "J98", excludes1: [], excludes2: [], includes: ["Respiratory disease NOS"], commonUse: ["Respiratory disease"], documentation: ["Chest X-ray"] };
  codes["K02.0"] = { code: "K02.0", description: "Caries limited to enamel", category: "K02", excludes1: [], excludes2: [], includes: [], commonUse: ["Early childhood caries"], documentation: ["Dental examination"] };
  codes["K02.1"] = { code: "K02.1", description: "Caries extending into dentin", category: "K02", excludes1: [], excludes2: [], includes: [], commonUse: ["Tooth decay into dentin"], documentation: ["Dental X-ray"] };
  codes["K02.2"] = { code: "K02.2", description: "Caries involving pulp", category: "K02", excludes1: [], excludes2: [], includes: [], commonUse: ["Cavity into pulp"], documentation: ["Dental X-ray"] };
  codes["K02.9"] = { code: "K02.9", description: "Dental caries, unspecified", category: "K02", excludes1: [], excludes2: [], includes: ["Cavity NOS"], commonUse: ["Cavity", "Tooth decay"], documentation: ["Dental examination"] };
  codes["K05.0"] = { code: "K05.0", description: "Acute gingivitis", category: "K05", excludes1: [], excludes2: [], includes: [], commonUse: ["Swollen gums"], documentation: ["Dental examination"] };
  codes["K05.1"] = { code: "K05.1", description: "Chronic gingivitis", category: "K05", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic gum disease", "Bleeding gums"], documentation: ["Dental examination"] };
  codes["K05.2"] = { code: "K05.2", description: "Acute periodontitis", category: "K05", excludes1: [], excludes2: [], includes: [], commonUse: ["Periodontal abscess"], documentation: ["Dental examination"] };
  codes["K05.3"] = { code: "K05.3", description: "Chronic periodontitis", category: "K05", excludes1: [], excludes2: [], includes: [], commonUse: ["Periodontal disease", "Gum disease"], documentation: ["Periodontal charting"] };
  codes["K12.0"] = { code: "K12.0", description: "Recurrent oral aphthae", category: "K12", excludes1: [], excludes2: [], includes: ["Canker sores"], commonUse: ["Canker sores"], documentation: ["Clinical examination"] };
  codes["K12.1"] = { code: "K12.1", description: "Other forms of stomatitis", category: "K12", excludes1: [], excludes2: [], includes: ["Mucositis"], commonUse: ["Mouth sores"], documentation: ["Clinical examination"] };
  codes["K20.0"] = { code: "K20.0", description: "Eosinophilic esophagitis", category: "K20", excludes1: [], excludes2: [], includes: ["EoE"], commonUse: ["Eosinophilic esophagitis", "EoE"], documentation: ["Upper endoscopy with biopsy"] };
  codes["K20.9"] = { code: "K20.9", description: "Esophagitis, unspecified", category: "K20", excludes1: [], excludes2: [], includes: ["Esophagitis NOS"], commonUse: ["Esophagitis"], documentation: ["Upper endoscopy"] };
  codes["K21.0"] = { code: "K21.0", description: "Gastro-esophageal reflux disease with esophagitis", category: "K21", excludes1: [], excludes2: [], includes: [], commonUse: ["GERD with esophagitis"], documentation: ["Upper endoscopy", "pH monitoring"] };
  codes["K21.9"] = { code: "K21.9", description: "Gastro-esophageal reflux disease without esophagitis", category: "K21", excludes1: [], excludes2: [], includes: ["GERD NOS"], commonUse: ["GERD", "Acid reflux", "Heartburn"], documentation: ["Clinical diagnosis"] };
  codes["K25.3"] = { code: "K25.3", description: "Acute gastric ulcer without hemorrhage or perforation", category: "K25", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute gastric ulcer"], documentation: ["Upper endoscopy"] };
  codes["K25.7"] = { code: "K25.7", description: "Chronic gastric ulcer without hemorrhage or perforation", category: "K25", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic gastric ulcer"], documentation: ["Upper endoscopy"] };
  codes["K25.9"] = { code: "K25.9", description: "Gastric ulcer, unspecified", category: "K25", excludes1: [], excludes2: [], includes: ["Gastric ulcer NOS"], commonUse: ["Stomach ulcer"], documentation: ["Upper endoscopy"] };
  codes["K26.3"] = { code: "K26.3", description: "Acute duodenal ulcer without hemorrhage or perforation", category: "K26", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute duodenal ulcer"], documentation: ["Upper endoscopy"] };
  codes["K26.7"] = { code: "K26.7", description: "Chronic duodenal ulcer without hemorrhage or perforation", category: "K26", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic duodenal ulcer"], documentation: ["Upper endoscopy"] };
  codes["K26.9"] = { code: "K26.9", description: "Duodenal ulcer, unspecified", category: "K26", excludes1: [], excludes2: [], includes: ["Duodenal ulcer NOS"], commonUse: ["Duodenal ulcer"], documentation: ["Upper endoscopy"] };
  codes["K29.0"] = { code: "K29.0", description: "Acute hemorrhagic gastritis", category: "K29", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute gastritis with bleeding"], documentation: ["Upper endoscopy"] };
  codes["K29.1"] = { code: "K29.1", description: "Other acute gastritis", category: "K29", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute gastritis"], documentation: ["Upper endoscopy"] };
  codes["K29.5"] = { code: "K29.5", description: "Chronic gastritis, unspecified", category: "K29", excludes1: [], excludes2: [], includes: ["Chronic gastritis NOS"], commonUse: ["Chronic gastritis"], documentation: ["Upper endoscopy"] };
  codes["K29.7"] = { code: "K29.7", description: "Gastritis, unspecified", category: "K29", excludes1: [], excludes2: [], includes: ["Gastritis NOS"], commonUse: ["Gastritis"], documentation: ["Upper endoscopy"] };
  codes["K30"] = { code: "K30", description: "Functional dyspepsia", category: "K30", excludes1: [], excludes2: [], includes: ["Indigestion"], commonUse: ["Indigestion", "Dyspepsia"], documentation: ["Upper endoscopy if alarm features"] };
  codes["K31.4"] = { code: "K31.4", description: "Gastric atony", category: "K31", excludes1: [], excludes2: [], includes: ["Gastroparesis"], commonUse: ["Gastroparesis"], documentation: ["Gastric emptying study"] };
  codes["K35.80"] = { code: "K35.80", description: "Unspecified acute appendicitis", category: "K35", excludes1: [], excludes2: [], includes: ["Acute appendicitis NOS"], commonUse: ["Appendicitis"], documentation: ["CT abdomen/pelvis"] };
  codes["K40.9"] = { code: "K40.9", description: "Unilateral inguinal hernia, without gangrene or obstruction", category: "K40", excludes1: [], excludes2: [], includes: ["Inguinal hernia NOS"], commonUse: ["Inguinal hernia"], documentation: ["Physical examination"] };
  codes["K42.1"] = { code: "K42.1", description: "Umbilical hernia without gangrene", category: "K42", excludes1: [], excludes2: [], includes: ["Umbilical hernia NOS"], commonUse: ["Umbilical hernia"], documentation: ["Physical examination"] };
  codes["K43.9"] = { code: "K43.9", description: "Ventral hernia without gangrene or obstruction", category: "K43", excludes1: [], excludes2: [], includes: ["Ventral hernia NOS"], commonUse: ["Ventral hernia"], documentation: ["Physical examination"] };
  codes["K44.9"] = { code: "K44.9", description: "Diaphragmatic hernia without gangrene or obstruction", category: "K44", excludes1: [], excludes2: [], includes: ["Hiatal hernia NOS"], commonUse: ["Hiatal hernia"], documentation: ["Upper GI series"] };
  codes["K50.0"] = { code: "K50.0", description: "Crohn disease of upper GI tract", category: "K50", excludes1: [], excludes2: [], includes: [], commonUse: ["Crohn esophagitis"], documentation: ["Endoscopy"] };
  codes["K50.1"] = { code: "K50.1", description: "Crohn disease of small intestine", category: "K50", excludes1: [], excludes2: [], includes: [], commonUse: ["Crohn ileitis"], documentation: ["CT enterography"] };
  codes["K50.8"] = { code: "K50.8", description: "Crohn disease of both small and large intestine", category: "K50", excludes1: [], excludes2: [], includes: [], commonUse: ["Crohn disease of intestine"], documentation: ["Colonoscopy"] };
  codes["K50.9"] = { code: "K50.9", description: "Crohn disease, unspecified", category: "K50", excludes1: [], excludes2: [], includes: ["Crohn disease NOS"], commonUse: ["Crohn's disease", "Crohn disease"], documentation: ["Colonoscopy with biopsy"] };
  codes["K51.1"] = { code: "K51.1", description: "Ulcerative proctitis", category: "K51", excludes1: [], excludes2: [], includes: [], commonUse: ["Ulcerative proctitis"], documentation: ["Sigmoidoscopy"] };
  codes["K51.4"] = { code: "K51.4", description: "Ulcerative left colon", category: "K51", excludes1: [], excludes2: [], includes: ["Left-sided colitis"], commonUse: ["Left-sided colitis"], documentation: ["Colonoscopy"] };
  codes["K51.9"] = { code: "K51.9", description: "Ulcerative colitis, unspecified", category: "K51", excludes1: [], excludes2: [], includes: ["Ulcerative colitis NOS"], commonUse: ["Ulcerative colitis", "UC"], documentation: ["Colonoscopy with biopsy"] };
  codes["K52.9"] = { code: "K52.9", description: "Noninfective gastroenteritis and colitis, unspecified", category: "K52", excludes1: [], excludes2: [], includes: ["Colitis NOS"], commonUse: ["Colitis", "Gastroenteritis"], documentation: ["Clinical diagnosis"] };
  codes["K56.0"] = { code: "K56.0", description: "Paralytic ileus", category: "K56", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-operative ileus"], documentation: ["Abdominal X-ray"] };
  codes["K56.1"] = { code: "K56.1", description: "Intestinal obstruction due to adhesions", category: "K56", excludes1: [], excludes2: [], includes: ["Adhesive obstruction"], commonUse: ["Bowel obstruction from adhesions"], documentation: ["CT abdomen/pelvis"] };
  codes["K56.4"] = { code: "K56.4", description: "Other intestinal obstruction", category: "K56", excludes1: [], excludes2: [], includes: ["Bowel obstruction NOS"], commonUse: ["Bowel obstruction"], documentation: ["CT abdomen/pelvis"] };
  codes["K56.6"] = { code: "K56.6", description: "Other and unspecified intestinal obstruction", category: "K56", excludes1: [], excludes2: [], includes: ["Bowel obstruction NOS"], commonUse: ["Bowel obstruction NOS"], documentation: ["CT abdomen/pelvis"] };
  codes["K56.7"] = { code: "K56.7", description: "Ileus, unspecified", category: "K56", excludes1: [], excludes2: [], includes: ["Ileus NOS"], commonUse: ["Ileus"], documentation: ["Abdominal X-ray"] };
  codes["K57.1"] = { code: "K57.1", description: "Diverticulitis of large intestine without perforation or abscess", category: "K57", excludes1: [], excludes2: [], includes: ["Uncomplicated diverticulitis"], commonUse: ["Diverticulitis"], documentation: ["CT abdomen/pelvis"] };
  codes["K57.2"] = { code: "K57.2", description: "Diverticulitis with perforation and abscess", category: "K57", excludes1: [], excludes2: [], includes: ["Complicated diverticulitis"], commonUse: ["Complicated diverticulitis"], documentation: ["CT abdomen/pelvis"] };
  codes["K57.3"] = { code: "K57.3", description: "Diverticulosis of large intestine", category: "K57", excludes1: [], excludes2: [], includes: ["Diverticulosis NOS"], commonUse: ["Diverticulosis"], documentation: ["Colonoscopy", "CT abdomen"] };
  codes["K57.9"] = { code: "K57.9", description: "Diverticular disease of intestine, unspecified", category: "K57", excludes1: [], excludes2: [], includes: ["Diverticulosis NOS"], commonUse: ["Diverticular disease"], documentation: ["CT abdomen"] };
  codes["K58.0"] = { code: "K58.0", description: "IBS with diarrhea", category: "K58", excludes1: [], excludes2: [], includes: ["IBS-D"], commonUse: ["IBS-D", "IBS with diarrhea"], documentation: ["Clinical diagnosis"] };
  codes["K58.1"] = { code: "K58.1", description: "IBS with constipation", category: "K58", excludes1: [], excludes2: [], includes: ["IBS-C"], commonUse: ["IBS-C", "IBS with constipation"], documentation: ["Clinical diagnosis"] };
  codes["K58.9"] = { code: "K58.9", description: "IBS, unspecified", category: "K58", excludes1: [], excludes2: [], includes: ["IBS NOS"], commonUse: ["IBS", "Irritable bowel syndrome"], documentation: ["Clinical diagnosis"] };
  codes["K59.0"] = { code: "K59.0", description: "Functional constipation", category: "K59", excludes1: [], excludes2: [], includes: ["Constipation NOS"], commonUse: ["Constipation"], documentation: ["Clinical diagnosis"] };
  codes["K59.1"] = { code: "K59.1", description: "Functional diarrhea", category: "K59", excludes1: [], excludes2: [], includes: ["Diarrhea NOS"], commonUse: ["Chronic diarrhea"], documentation: ["Stool studies"] };
  codes["K60.0"] = { code: "K60.0", description: "Acute anal fissure", category: "K60", excludes1: [], excludes2: [], includes: ["Anal fissure"], commonUse: ["Anal fissure"], documentation: ["Digital rectal exam"] };
  codes["K60.3"] = { code: "K60.3", description: "Anal fistula", category: "K60", excludes1: [], excludes2: [], includes: ["Fistula-in-ano"], commonUse: ["Anal fistula"], documentation: ["Anoscopy", "MRI pelvis"] };
  codes["K60.5"] = { code: "K60.5", description: "Anorectal abscess", category: "K60", excludes1: [], excludes2: [], includes: [], commonUse: ["Anal abscess", "Perianal abscess"], documentation: ["Physical examination"] };
  codes["K62.1"] = { code: "K62.1", description: "Rectal polyp", category: "K62", excludes1: [], excludes2: [], includes: [], commonUse: ["Rectal polyp"], documentation: ["Colonoscopy"] };
  codes["K62.2"] = { code: "K62.2", description: "Rectal prolapse", category: "K62", excludes1: [], excludes2: [], includes: [], commonUse: ["Rectal prolapse"], documentation: ["Physical examination"] };
  codes["K62.3"] = { code: "K62.3", description: "Rectal hemorrhage", category: "K62", excludes1: [], excludes2: [], includes: ["Rectal bleeding NOS"], commonUse: ["Rectal bleeding"], documentation: ["Colonoscopy"] };
  codes["K63.0"] = { code: "K63.0", description: "Abscess of intestine", category: "K63", excludes1: [], excludes2: [], includes: [], commonUse: ["Intestinal abscess"], documentation: ["CT abdomen"] };
  codes["K63.5"] = { code: "K63.5", description: "Polyp of colon", category: "K63", excludes1: [], excludes2: [], includes: ["Colon polyp NOS"], commonUse: ["Colon polyp"], documentation: ["Colonoscopy with biopsy"] };
  codes["K70.0"] = { code: "K70.0", description: "Alcoholic fatty liver", category: "K70", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcoholic steatosis"], documentation: ["LFTs", "Ultrasound"] };
  codes["K70.1"] = { code: "K70.1", description: "Alcoholic hepatitis", category: "K70", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcohol-related hepatitis"], documentation: ["LFTs", "Liver biopsy"] };
  codes["K70.3"] = { code: "K70.3", description: "Alcoholic cirrhosis of liver", category: "K70", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcoholic cirrhosis"], documentation: ["LFTs", "Liver biopsy"] };
  codes["K70.9"] = { code: "K70.9", description: "Alcoholic liver disease, unspecified", category: "K70", excludes1: [], excludes2: [], includes: ["Alcoholic liver disease NOS"], commonUse: ["Alcoholic liver disease"], documentation: ["LFTs"] };
  codes["K72.9"] = { code: "K72.9", description: "Hepatic failure, unspecified", category: "K72", excludes1: [], excludes2: [], includes: ["Liver failure NOS"], commonUse: ["Liver failure"], documentation: ["LFTs"] };
  codes["K74.6"] = { code: "K74.6", description: "Unspecified cirrhosis of liver", category: "K74", excludes1: [], excludes2: [], includes: ["Cirrhosis NOS"], commonUse: ["Cirrhosis"], documentation: ["LFTs", "Liver biopsy"] };
  codes["K75.0"] = { code: "K75.0", description: "Abscess of liver", category: "K75", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatic abscess"], documentation: ["CT abdomen", "Blood cultures"] };
  codes["K75.4"] = { code: "K75.4", description: "Autoimmune hepatitis", category: "K75", excludes1: [], excludes2: [], includes: [], commonUse: ["Autoimmune hepatitis"], documentation: ["ANA", "Liver biopsy"] };
  codes["K76.0"] = { code: "K76.0", description: "Fatty liver, not elsewhere classified", category: "K76", excludes1: [], excludes2: [], includes: ["NAFLD", "NASH"], commonUse: ["Fatty liver", "NAFLD", "NASH"], documentation: ["Ultrasound liver", "LFTs"] };
  codes["K76.6"] = { code: "K76.6", description: "Portal hypertension", category: "K76", excludes1: [], excludes2: [], includes: [], commonUse: ["Portal HTN"], documentation: ["Doppler ultrasound"] };
  codes["K76.9"] = { code: "K76.9", description: "Disease of liver, unspecified", category: "K76", excludes1: [], excludes2: [], includes: ["Liver disease NOS"], commonUse: ["Liver disease"], documentation: ["LFTs"] };
  codes["K80.0"] = { code: "K80.0", description: "Calculus of gallbladder with acute cholecystitis", category: "K80", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute cholecystitis"], documentation: ["RUQ ultrasound", "HIDA scan"] };
  codes["K80.1"] = { code: "K80.1", description: "Calculus of gallbladder with other cholecystitis", category: "K80", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic cholecystitis"], documentation: ["RUQ ultrasound"] };
  codes["K80.2"] = { code: "K80.2", description: "Calculus of gallbladder without cholecystitis", category: "K80", excludes1: [], excludes2: [], includes: ["Gallstones NOS"], commonUse: ["Gallstones", "Cholelithiasis"], documentation: ["RUQ ultrasound"] };
  codes["K80.3"] = { code: "K80.3", description: "Calculus of bile duct with cholangitis", category: "K80", excludes1: [], excludes2: [], includes: [], commonUse: ["Cholangitis"], documentation: ["RUQ ultrasound", "MRCP"] };
  codes["K80.5"] = { code: "K80.5", description: "Calculus of bile duct without cholangitis", category: "K80", excludes1: [], excludes2: [], includes: [], commonUse: ["Choledocholithiasis"], documentation: ["RUQ ultrasound", "MRCP"] };
  codes["K80.9"] = { code: "K80.9", description: "Cholelithiasis, unspecified", category: "K80", excludes1: [], excludes2: [], includes: ["Gallstones NOS"], commonUse: ["Gallstones"], documentation: ["RUQ ultrasound"] };
  codes["K81.0"] = { code: "K81.0", description: "Acute cholecystitis", category: "K81", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute gallbladder inflammation"], documentation: ["RUQ ultrasound", "HIDA scan"] };
  codes["K81.1"] = { code: "K81.1", description: "Chronic cholecystitis", category: "K81", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic gallbladder inflammation"], documentation: ["RUQ ultrasound"] };
  codes["K81.9"] = { code: "K81.9", description: "Cholecystitis, unspecified", category: "K81", excludes1: [], excludes2: [], includes: ["Cholecystitis NOS"], commonUse: ["Cholecystitis"], documentation: ["RUQ ultrasound"] };
  codes["K83.0"] = { code: "K83.0", description: "Cholangitis", category: "K83", excludes1: [], excludes2: [], includes: [], commonUse: ["Bile duct infection"], documentation: ["LFTs", "MRCP"] };
  codes["K83.1"] = { code: "K83.1", description: "Obstruction of bile duct", category: "K83", excludes1: [], excludes2: [], includes: [], commonUse: ["Biliary obstruction"], documentation: ["RUQ ultrasound", "MRCP"] };
  codes["K85.0"] = { code: "K85.0", description: "Idiopathic acute pancreatitis", category: "K85", excludes1: [], excludes2: [], includes: [], commonUse: ["Idiopathic pancreatitis"], documentation: ["Lipase", "CT abdomen"] };
  codes["K85.1"] = { code: "K85.1", description: "Biliary acute pancreatitis", category: "K85", excludes1: [], excludes2: [], includes: ["Gallstone pancreatitis"], commonUse: ["Gallstone pancreatitis"], documentation: ["Lipase", "RUQ ultrasound"] };
  codes["K85.2"] = { code: "K85.2", description: "Alcohol-induced acute pancreatitis", category: "K85", excludes1: [], excludes2: [], includes: ["Alcoholic pancreatitis"], commonUse: ["Alcohol-related pancreatitis"], documentation: ["Lipase"] };
  codes["K85.8"] = { code: "K85.8", description: "Other acute pancreatitis", category: "K85", excludes1: [], excludes2: [], includes: ["Acute pancreatitis NOS"], commonUse: ["Acute pancreatitis"], documentation: ["Lipase", "CT abdomen"] };
  codes["K85.9"] = { code: "K85.9", description: "Acute pancreatitis, unspecified", category: "K85", excludes1: [], excludes2: [], includes: ["Acute pancreatitis NOS"], commonUse: ["Pancreatitis"], documentation: ["Serum lipase"] };
  codes["K86.1"] = { code: "K86.1", description: "Alcoholic chronic pancreatitis", category: "K86", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcohol-related chronic pancreatitis"], documentation: ["CT abdomen"] };
  codes["K86.9"] = { code: "K86.9", description: "Disease of pancreas, unspecified", category: "K86", excludes1: [], excludes2: [], includes: ["Pancreatic disease NOS"], commonUse: ["Pancreatic disease"], documentation: ["CT abdomen"] };
  codes["K90.0"] = { code: "K90.0", description: "Celiac disease", category: "K90", excludes1: [], excludes2: [], includes: ["Gluten-sensitive enteropathy"], commonUse: ["Celiac disease", "Celiac sprue", "Gluten intolerance"], documentation: ["tTG-IgA", "Duodenal biopsy"] };
  codes["K90.4"] = { code: "K90.4", description: "Malabsorption due to intolerance", category: "K90", excludes1: [], excludes2: [], includes: ["Lactose intolerance"], commonUse: ["Lactose intolerance"], documentation: ["Breath testing"] };
  codes["K92.0"] = { code: "K92.0", description: "Hematemesis", category: "K92", excludes1: [], excludes2: [], includes: ["Vomiting blood"], commonUse: ["Vomiting blood"], documentation: ["Upper endoscopy", "CBC"] };
  codes["K92.1"] = { code: "K92.1", description: "Melena", category: "K92", excludes1: [], excludes2: [], includes: ["Black tarry stools"], commonUse: ["Black stools", "Melena"], documentation: ["Upper endoscopy"] };
  codes["K92.2"] = { code: "K92.2", description: "Gastrointestinal hemorrhage, unspecified", category: "K92", excludes1: [], excludes2: [], includes: ["GI bleed NOS"], commonUse: ["GI bleeding", "GI bleed"], documentation: ["Stool guaiac", "CBC"] };
  codes["L02.0"] = { code: "L02.0", description: "Cutaneous abscess of face", category: "L02", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial boil"], documentation: ["Clinical examination"] };
  codes["L02.2"] = { code: "L02.2", description: "Cutaneous abscess of trunk", category: "L02", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk abscess"], documentation: ["Clinical examination"] };
  codes["L02.3"] = { code: "L02.3", description: "Cutaneous abscess of buttock", category: "L02", excludes1: [], excludes2: [], includes: [], commonUse: ["Buttock abscess"], documentation: ["Clinical examination"] };
  codes["L02.4"] = { code: "L02.4", description: "Cutaneous abscess of limb", category: "L02", excludes1: [], excludes2: [], includes: [], commonUse: ["Extremity abscess"], documentation: ["Clinical examination"] };
  codes["L02.9"] = { code: "L02.9", description: "Cutaneous abscess, unspecified", category: "L02", excludes1: [], excludes2: [], includes: ["Skin abscess NOS"], commonUse: ["Skin abscess", "Boil"], documentation: ["Clinical examination"] };
  codes["L03.0"] = { code: "L03.0", description: "Cellulitis of finger and toe", category: "L03", excludes1: [], excludes2: [], includes: ["Felon"], commonUse: ["Felon", "Finger infection"], documentation: ["Clinical examination"] };
  codes["L03.1"] = { code: "L03.1", description: "Cellulitis of other parts of limb", category: "L03", excludes1: [], excludes2: [], includes: [], commonUse: ["Limb cellulitis"], documentation: ["Clinical examination"] };
  codes["L03.2"] = { code: "L03.2", description: "Cellulitis of face and neck", category: "L03", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial cellulitis"], documentation: ["Clinical examination"] };
  codes["L03.3"] = { code: "L03.3", description: "Cellulitis of trunk", category: "L03", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk cellulitis"], documentation: ["Clinical examination"] };
  codes["L03.9"] = { code: "L03.9", description: "Cellulitis, unspecified", category: "L03", excludes1: [], excludes2: [], includes: ["Cellulitis NOS"], commonUse: ["Cellulitis", "Skin infection"], documentation: ["Clinical examination"] };
  codes["L20.9"] = { code: "L20.9", description: "Atopic dermatitis, unspecified", category: "L20", excludes1: [], excludes2: [], includes: ["Atopic dermatitis NOS"], commonUse: ["Eczema", "Atopic dermatitis"], documentation: ["Clinical examination"] };
  codes["L21.0"] = { code: "L21.0", description: "Seborrheic dermatitis of scalp", category: "L21", excludes1: [], excludes2: [], includes: ["Dandruff"], commonUse: ["Dandruff"], documentation: ["Clinical examination"] };
  codes["L21.9"] = { code: "L21.9", description: "Seborrheic dermatitis, unspecified", category: "L21", excludes1: [], excludes2: [], includes: ["Seborrhea NOS"], commonUse: ["Seborrheic dermatitis"], documentation: ["Clinical examination"] };
  codes["L23.9"] = { code: "L23.9", description: "Allergic contact dermatitis, unspecified cause", category: "L23", excludes1: [], excludes2: [], includes: ["Contact dermatitis NOS"], commonUse: ["Contact dermatitis"], documentation: ["Patch testing"] };
  codes["L24.9"] = { code: "L24.9", description: "Irritant contact dermatitis, unspecified cause", category: "L24", excludes1: [], excludes2: [], includes: ["Irritant dermatitis NOS"], commonUse: ["Irritant contact dermatitis"], documentation: ["Clinical examination"] };
  codes["L25.9"] = { code: "L25.9", description: "Unspecified contact dermatitis, unspecified cause", category: "L25", excludes1: [], excludes2: [], includes: ["Contact dermatitis NOS"], commonUse: ["Contact dermatitis"], documentation: ["Clinical examination"] };
  codes["L28.0"] = { code: "L28.0", description: "Lichen simplex chronicus", category: "L28", excludes1: [], excludes2: [], includes: ["Neurodermatitis"], commonUse: ["Neurodermatitis"], documentation: ["Clinical examination"] };
  codes["L29.0"] = { code: "L29.0", description: "Pruritus ani", category: "L29", excludes1: [], excludes2: [], includes: [], commonUse: ["Anal itching"], documentation: ["Clinical examination"] };
  codes["L29.9"] = { code: "L29.9", description: "Pruritus, unspecified", category: "L29", excludes1: [], excludes2: [], includes: ["Pruritus NOS"], commonUse: ["Itching", "Pruritus"], documentation: ["Clinical examination"] };
  codes["L30.9"] = { code: "L30.9", description: "Dermatitis, unspecified", category: "L30", excludes1: [], excludes2: [], includes: ["Dermatitis NOS"], commonUse: ["Dermatitis", "Eczema"], documentation: ["Clinical examination"] };
  codes["L40.0"] = { code: "L40.0", description: "Psoriasis vulgaris", category: "L40", excludes1: [], excludes2: [], includes: ["Plaque psoriasis"], commonUse: ["Plaque psoriasis", "Psoriasis"], documentation: ["Clinical examination"] };
  codes["L40.5"] = { code: "L40.5", description: "Arthropathic psoriasis", category: "L40", excludes1: [], excludes2: [], includes: ["Psoriatic arthritis"], commonUse: ["Psoriatic arthritis"], documentation: ["X-rays"] };
  codes["L40.9"] = { code: "L40.9", description: "Psoriasis, unspecified", category: "L40", excludes1: [], excludes2: [], includes: ["Psoriasis NOS"], commonUse: ["Psoriasis"], documentation: ["Clinical examination"] };
  codes["L43.0"] = { code: "L43.0", description: "Lichen planus", category: "L43", excludes1: [], excludes2: [], includes: [], commonUse: ["Lichen planus"], documentation: ["Skin biopsy"] };
  codes["L50.0"] = { code: "L50.0", description: "Allergic urticaria", category: "L50", excludes1: [], excludes2: [], includes: ["Hives"], commonUse: ["Hives"], documentation: ["Clinical examination"] };
  codes["L50.9"] = { code: "L50.9", description: "Urticaria, unspecified", category: "L50", excludes1: [], excludes2: [], includes: ["Urticaria NOS"], commonUse: ["Hives", "Urticaria"], documentation: ["Clinical examination"] };
  codes["L60.0"] = { code: "L60.0", description: "Ingrowing nail", category: "L60", excludes1: [], excludes2: [], includes: [], commonUse: ["Ingrown toenail"], documentation: ["Physical examination"] };
  codes["L63.9"] = { code: "L63.9", description: "Alopecia areata, unspecified", category: "L63", excludes1: [], excludes2: [], includes: ["Alopecia areata NOS"], commonUse: ["Alopecia areata", "Patchy hair loss"], documentation: ["Clinical examination"] };
  codes["L65.9"] = { code: "L65.9", description: "Nonscarring hair loss, unspecified", category: "L65", excludes1: [], excludes2: [], includes: ["Hair loss NOS"], commonUse: ["Hair loss"], documentation: ["Clinical examination"] };
  codes["L70.0"] = { code: "L70.0", description: "Acne vulgaris", category: "L70", excludes1: [], excludes2: [], includes: [], commonUse: ["Acne", "Pimples"], documentation: ["Clinical examination"] };
  codes["L70.9"] = { code: "L70.9", description: "Acne, unspecified", category: "L70", excludes1: [], excludes2: [], includes: ["Acne NOS"], commonUse: ["Acne"], documentation: ["Clinical examination"] };
  codes["L71.9"] = { code: "L71.9", description: "Rosacea, unspecified", category: "L71", excludes1: [], excludes2: [], includes: ["Rosacea NOS"], commonUse: ["Rosacea"], documentation: ["Clinical examination"] };
  codes["L72.0"] = { code: "L72.0", description: "Epidermal cyst", category: "L72", excludes1: [], excludes2: [], includes: ["Epidermoid cyst"], commonUse: ["Epidermoid cyst"], documentation: ["Clinical examination"] };
  codes["L80"] = { code: "L80", description: "Vitiligo", category: "L80", excludes1: [], excludes2: [], includes: [], commonUse: ["Vitiligo"], documentation: ["Clinical examination"] };
  codes["L81.0"] = { code: "L81.0", description: "Postinflammatory hyperpigmentation", category: "L81", excludes1: [], excludes2: [], includes: [], commonUse: ["Dark spots after inflammation"], documentation: ["Clinical examination"] };
  codes["L81.4"] = { code: "L81.4", description: "Other melanin hyperpigmentation", category: "L81", excludes1: [], excludes2: [], includes: ["Melasma"], commonUse: ["Melasma"], documentation: ["Clinical examination"] };
  codes["L82.0"] = { code: "L82.0", description: "Seborrheic keratosis, localized", category: "L82", excludes1: [], excludes2: [], includes: ["Senile wart"], commonUse: ["Age spot"], documentation: ["Clinical examination"] };
  codes["L82.1"] = { code: "L82.1", description: "Other seborrheic keratosis", category: "L82", excludes1: [], excludes2: [], includes: [], commonUse: ["Seborrheic keratosis NOS"], documentation: ["Clinical examination"] };
  codes["L82.9"] = { code: "L82.9", description: "Seborrheic keratosis, unspecified", category: "L82", excludes1: [], excludes2: [], includes: ["Seborrheic keratosis NOS"], commonUse: ["Seborrheic keratosis"], documentation: ["Clinical examination"] };
  codes["L89.0"] = { code: "L89.0", description: "Pressure ulcer of elbow", category: "L89", excludes1: [], excludes2: [], includes: [], commonUse: ["Pressure sore"], documentation: ["Wound assessment", "NPUAP staging"] };
  codes["L89.1"] = { code: "L89.1", description: "Pressure ulcer of back", category: "L89", excludes1: [], excludes2: [], includes: [], commonUse: ["Pressure sore"], documentation: ["Wound assessment", "NPUAP staging"] };
  codes["L89.2"] = { code: "L89.2", description: "Pressure ulcer of hip", category: "L89", excludes1: [], excludes2: [], includes: [], commonUse: ["Pressure sore"], documentation: ["Wound assessment", "NPUAP staging"] };
  codes["L89.3"] = { code: "L89.3", description: "Pressure ulcer of buttock", category: "L89", excludes1: [], excludes2: [], includes: [], commonUse: ["Pressure sore"], documentation: ["Wound assessment", "NPUAP staging"] };
  codes["L89.9"] = { code: "L89.9", description: "Pressure ulcer, unspecified site", category: "L89", excludes1: [], excludes2: [], includes: ["Pressure ulcer NOS"], commonUse: ["Pressure ulcer", "Pressure sore", "Decubitus ulcer"], documentation: ["Wound assessment", "NPUAP staging"] };
  codes["L97.5"] = { code: "L97.5", description: "Non-healing ulcer of other part of foot", category: "L97", excludes1: [], excludes2: [], includes: ["Diabetic foot ulcer"], commonUse: ["Diabetic foot ulcer"], documentation: ["Wound assessment"] };
  codes["L97.9"] = { code: "L97.9", description: "Non-healing ulcer of lower limb, unspecified", category: "L97", excludes1: [], excludes2: [], includes: ["Leg ulcer NOS"], commonUse: ["Leg ulcer"], documentation: ["Wound assessment"] };
  codes["L98.0"] = { code: "L98.0", description: "Pyoderma gangrenosum", category: "L98", excludes1: [], excludes2: [], includes: [], commonUse: ["Pyoderma gangrenosum"], documentation: ["Skin biopsy"] };
  codes["L98.4"] = { code: "L98.4", description: "Chronic ulcer of skin, not elsewhere classified", category: "L98", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic skin ulcer"], documentation: ["Wound assessment"] };
  codes["L98.6"] = { code: "L98.6", description: "Other soft tissue disorders", category: "L98", excludes1: [], excludes2: [], includes: [], commonUse: ["Soft tissue disorder NOS"], documentation: ["Clinical examination"] };
  codes["L98.9"] = { code: "L98.9", description: "Disorder of skin and subcutaneous tissue, unspecified", category: "L98", excludes1: [], excludes2: [], includes: ["Skin disorder NOS"], commonUse: ["Skin disorder"], documentation: ["Clinical examination"] };
  codes["M05.0"] = { code: "M05.0", description: "Rheumatoid arthritis with rheumatoid factor, shoulder", category: "M05", excludes1: [], excludes2: [], includes: [], commonUse: ["Rheumatoid shoulder"], documentation: ["RF", "X-ray"] };
  codes["M05.79"] = { code: "M05.79", description: "Rheumatoid arthritis with rheumatoid factor, multiple sites", category: "M05", excludes1: [], excludes2: [], includes: ["Rheumatoid arthritis with RF NOS"], commonUse: ["Seropositive RA"], documentation: ["RF", "ESR"] };
  codes["M06.09"] = { code: "M06.09", description: "Rheumatoid arthritis without rheumatoid factor, multiple sites", category: "M06", excludes1: [], excludes2: [], includes: ["Seronegative RA"], commonUse: ["Seronegative rheumatoid arthritis"], documentation: ["ESR", "CRP"] };
  codes["M10.0"] = { code: "M10.0", description: "Primary gout", category: "M10", excludes1: [], excludes2: [], includes: ["Gout NOS"], commonUse: ["Gout", "Acute gout"], documentation: ["Uric acid level"] };
  codes["M10.9"] = { code: "M10.9", description: "Gout, unspecified", category: "M10", excludes1: [], excludes2: [], includes: [], commonUse: ["Gout NOS"], documentation: ["Uric acid"] };
  codes["M15.0"] = { code: "M15.0", description: "Primary generalized osteoarthritis", category: "M15", excludes1: [], excludes2: [], includes: ["Polyarthritis osteoarthritis"], commonUse: ["Generalized OA"], documentation: ["X-ray"] };
  codes["M16.0"] = { code: "M16.0", description: "Primary osteoarthritis of hip", category: "M16", excludes1: [], excludes2: [], includes: [], commonUse: ["Hip OA"], documentation: ["X-ray hip"] };
  codes["M16.1"] = { code: "M16.1", description: "Other primary osteoarthritis of hip", category: "M16", excludes1: [], excludes2: [], includes: [], commonUse: ["Coxarthrosis"], documentation: ["X-ray hip"] };
  codes["M16.9"] = { code: "M16.9", description: "Osteoarthritis of hip, unspecified", category: "M16", excludes1: [], excludes2: [], includes: [], commonUse: ["Hip osteoarthritis"], documentation: ["X-ray hip"] };
  codes["M17.0"] = { code: "M17.0", description: "Primary osteoarthritis of knee", category: "M17", excludes1: [], excludes2: [], includes: [], commonUse: ["Knee OA"], documentation: ["X-ray knee"] };
  codes["M17.1"] = { code: "M17.1", description: "Other primary osteoarthritis of knee", category: "M17", excludes1: [], excludes2: [], includes: [], commonUse: ["Gonarthrosis"], documentation: ["X-ray knee"] };
  codes["M17.9"] = { code: "M17.9", description: "Osteoarthritis of knee, unspecified", category: "M17", excludes1: [], excludes2: [], includes: [], commonUse: ["Knee osteoarthritis"], documentation: ["X-ray knee"] };
  codes["M19.01"] = { code: "M19.01", description: "Primary osteoarthritis, shoulder", category: "M19", excludes1: [], excludes2: [], includes: [], commonUse: ["Shoulder OA"], documentation: ["X-ray shoulder"] };
  codes["M19.04"] = { code: "M19.04", description: "Primary osteoarthritis, hand", category: "M19", excludes1: [], excludes2: [], includes: [], commonUse: ["Hand OA"], documentation: ["X-ray hand"] };
  codes["M19.11"] = { code: "M19.11", description: "Post-traumatic osteoarthritis, shoulder", category: "M19", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-traumatic shoulder OA"], documentation: ["X-ray shoulder"] };
  codes["M19.17"] = { code: "M19.17", description: "Post-traumatic osteoarthritis, ankle and foot", category: "M19", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-traumatic ankle OA"], documentation: ["X-ray ankle"] };
  codes["M19.90"] = { code: "M19.90", description: "Osteoarthritis, unspecified site", category: "M19", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteoarthritis NOS"], documentation: ["X-ray"] };
  codes["M21.05"] = { code: "M21.05", description: "Valgus deformity, other and unspecified site not involving ankle or foot", category: "M21", excludes1: [], excludes2: [], includes: [], commonUse: ["Knock-knee"], documentation: ["Clinical exam"] };
  codes["M21.15"] = { code: "M21.15", description: "Varus deformity, not elsewhere classified, knee", category: "M21", excludes1: [], excludes2: [], includes: [], commonUse: ["Bowleg"], documentation: ["Clinical exam", "X-ray"] };
  codes["M23.0"] = { code: "M23.0", description: "Derangement of medial meniscus due to old tear", category: "M23", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic medial meniscal tear"], documentation: ["MRI knee"] };
  codes["M23.2"] = { code: "M23.2", description: "Derangement of posterior horn of medial meniscus", category: "M23", excludes1: [], excludes2: [], includes: [], commonUse: ["Posterior horn meniscal tear"], documentation: ["MRI knee"] };
  codes["M23.3"] = { code: "M23.3", description: "Other meniscal derangements", category: "M23", excludes1: [], excludes2: [], includes: [], commonUse: ["Meniscal tear"], documentation: ["MRI knee"] };
  codes["M24.0"] = { code: "M24.0", description: "Derangement of joint, not elsewhere classified", category: "M24", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint derangement"], documentation: ["X-ray"] };
  codes["M24.1"] = { code: "M24.1", description: "Other articular cartilage disorders", category: "M24", excludes1: [], excludes2: [], includes: [], commonUse: ["Cartilage disorder"], documentation: ["MRI"] };
  codes["M24.2"] = { code: "M24.2", description: "Disorder of ligament, not elsewhere classified", category: "M24", excludes1: [], excludes2: [], includes: [], commonUse: ["Ligament disorder"], documentation: ["MRI"] };
  codes["M24.3"] = { code: "M24.3", description: "Pathological dislocation and subluxation of joint, not elsewhere classified", category: "M24", excludes1: [], excludes2: [], includes: [], commonUse: ["Pathological dislocation"], documentation: ["X-ray"] };
  codes["M24.4"] = { code: "M24.4", description: "Recurrent dislocation of joint", category: "M24", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent joint dislocation"], documentation: ["X-ray"] };
  codes["M24.5"] = { code: "M24.5", description: "Contracture of joint", category: "M24", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint contracture"], documentation: ["Clinical exam"] };
  codes["M24.6"] = { code: "M24.6", description: "Ankylosis of joint", category: "M24", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint ankylosis"], documentation: ["X-ray"] };
  codes["M24.7"] = { code: "M24.7", description: "Protrusio acetabuli", category: "M24", excludes1: [], excludes2: [], includes: [], commonUse: ["Hip protrusion"], documentation: ["X-ray pelvis"] };
  codes["M25.0"] = { code: "M25.0", description: "Hemarthrosis", category: "M25", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint hemorrhage"], documentation: ["Joint aspiration"] };
  codes["M25.1"] = { code: "M25.1", description: "Joint effusion, not elsewhere classified", category: "M25", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint effusion"], documentation: ["Joint aspiration", "Ultrasound"] };
  codes["M25.2"] = { code: "M25.2", description: "Flail joint", category: "M25", excludes1: [], excludes2: [], includes: [], commonUse: ["Flail joint"], documentation: ["Clinical exam"] };
  codes["M25.3"] = { code: "M25.3", description: "Other instability of joint, not elsewhere classified", category: "M25", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint instability"], documentation: ["Stress test"] };
  codes["M25.4"] = { code: "M25.4", description: "Effusion of joint, not elsewhere classified", category: "M25", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint swelling"], documentation: ["Ultrasound"] };
  codes["M25.5"] = { code: "M25.5", description: "Pain in joint, not elsewhere classified", category: "M25", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint pain"], documentation: ["X-ray"] };
  codes["M25.6"] = { code: "M25.6", description: "Stiffness of joint, not elsewhere classified", category: "M25", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint stiffness"], documentation: ["X-ray"] };
  codes["M40.0"] = { code: "M40.0", description: "Postural kyphosis", category: "M40", excludes1: [], excludes2: [], includes: [], commonUse: ["Rounded back"], documentation: ["X-ray spine"] };
  codes["M41.0"] = { code: "M41.0", description: "Juvenile idiopathic scoliosis", category: "M41", excludes1: [], excludes2: [], includes: [], commonUse: ["Juvenile scoliosis"], documentation: ["X-ray spine"] };
  codes["M41.1"] = { code: "M41.1", description: "Adolescent idiopathic scoliosis", category: "M41", excludes1: [], excludes2: [], includes: [], commonUse: ["Adolescent scoliosis"], documentation: ["X-ray spine"] };
  codes["M41.2"] = { code: "M41.2", description: "Other idiopathic scoliosis", category: "M41", excludes1: [], excludes2: [], includes: [], commonUse: ["Idiopathic scoliosis"], documentation: ["X-ray spine"] };
  codes["M41.9"] = { code: "M41.9", description: "Scoliosis, unspecified", category: "M41", excludes1: [], excludes2: [], includes: [], commonUse: ["Scoliosis NOS"], documentation: ["X-ray spine"] };
  codes["M43.0"] = { code: "M43.0", description: "Spondylolysis", category: "M43", excludes1: [], excludes2: [], includes: [], commonUse: ["Spondylolysis"], documentation: ["X-ray spine", "CT"] };
  codes["M43.1"] = { code: "M43.1", description: "Spondylolisthesis", category: "M43", excludes1: [], excludes2: [], includes: [], commonUse: ["Spondylolisthesis"], documentation: ["X-ray spine"] };
  codes["M43.2"] = { code: "M43.2", description: "Other fusion of spine, not elsewhere classified", category: "M43", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal fusion"], documentation: ["X-ray spine"] };
  codes["M43.3"] = { code: "M43.3", description: "Recurrent atlantoaxial subluxation with myelopathy", category: "M43", excludes1: [], excludes2: [], includes: [], commonUse: ["Atlantoaxial subluxation"], documentation: ["MRI cervical spine"] };
  codes["M43.4"] = { code: "M43.4", description: "Other recurrent atlantoaxial subluxation", category: "M43", excludes1: [], excludes2: [], includes: [], commonUse: ["Recurrent C1-C2 subluxation"], documentation: ["X-ray flexion/extension"] };
  codes["M43.5"] = { code: "M43.5", description: "Other vertebral subluxation, not elsewhere classified", category: "M43", excludes1: [], excludes2: [], includes: [], commonUse: ["Vertebral subluxation"], documentation: ["X-ray spine"] };
  codes["M43.6"] = { code: "M43.6", description: "Torticollis", category: "M43", excludes1: [], excludes2: [], includes: [], commonUse: ["Torticollis", "Wryneck"], documentation: ["Clinical exam"] };
  codes["M46.0"] = { code: "M46.0", description: "Spinal enthesopathy, not elsewhere classified", category: "M46", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal enthesitis"], documentation: ["MRI spine"] };
  codes["M46.1"] = { code: "M46.1", description: "Sacroiliitis, not elsewhere classified", category: "M46", excludes1: [], excludes2: [], includes: [], commonUse: ["Sacroiliitis"], documentation: ["X-ray SI joint", "MRI"] };
  codes["M46.2"] = { code: "M46.2", description: "Osteomyelitis of vertebra", category: "M46", excludes1: [], excludes2: [], includes: [], commonUse: ["Vertebral osteomyelitis"], documentation: ["MRI spine", "Blood cultures"] };
  codes["M46.3"] = { code: "M46.3", description: "Intervertebral disc infection, not elsewhere classified", category: "M46", excludes1: [], excludes2: [], includes: ["Discitis"], commonUse: ["Discitis"], documentation: ["MRI spine"] };
  codes["M46.4"] = { code: "M46.4", description: "Discitis, unspecified", category: "M46", excludes1: [], excludes2: [], includes: [], commonUse: ["Discitis NOS"], documentation: ["MRI spine"] };
  codes["M47.0"] = { code: "M47.0", description: "Anterior spinal and vertebral artery compression syndromes", category: "M47", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical spondylotic myelopathy"], documentation: ["MRI cervical spine"] };
  codes["M47.81"] = { code: "M47.81", description: "Spondylosis without myelopathy or radiculopathy, cervical region", category: "M47", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical spondylosis"], documentation: ["X-ray cervical spine"] };
  codes["M47.816"] = { code: "M47.816", description: "Spondylosis without myelopathy or radiculopathy, lumbar region", category: "M47", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar spondylosis"], documentation: ["X-ray lumbar spine"] };
  codes["M47.817"] = { code: "M47.817", description: "Spondylosis without myelopathy or radiculopathy, lumbosacral region", category: "M47", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbosacral spondylosis"], documentation: ["X-ray lumbosacral"] };
  codes["M47.82"] = { code: "M47.82", description: "Spondylosis with myelopathy, cervical region", category: "M47", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical spondylotic myelopathy"], documentation: ["MRI cervical spine"] };
  codes["M48.0"] = { code: "M48.0", description: "Spinal stenosis", category: "M48", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal stenosis"], documentation: ["MRI spine"] };
  codes["M48.06"] = { code: "M48.06", description: "Spinal stenosis, lumbar region", category: "M48", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar spinal stenosis"], documentation: ["MRI lumbar spine"] };
  codes["M48.1"] = { code: "M48.1", description: "Ligamentous spinal stenosis, not elsewhere classified", category: "M48", excludes1: [], excludes2: [], includes: [], commonUse: ["Ligamentous stenosis"], documentation: ["MRI spine"] };
  codes["M48.2"] = { code: "M48.2", description: "Intervertebral disc stenosis of spinal canal", category: "M48", excludes1: [], excludes2: [], includes: [], commonUse: ["Disc stenosis"], documentation: ["MRI spine"] };
  codes["M48.3"] = { code: "M48.3", description: "Traumatic spondylopathy, not elsewhere classified", category: "M48", excludes1: [], excludes2: [], includes: [], commonUse: ["Traumatic spondylopathy"], documentation: ["X-ray spine"] };
  codes["M48.4"] = { code: "M48.4", description: "Fatigue fracture of vertebra", category: "M48", excludes1: [], excludes2: [], includes: ["Stress fracture of vertebra"], commonUse: ["Vertebral stress fracture"], documentation: ["MRI spine", "X-ray"] };
  codes["M48.5"] = { code: "M48.5", description: "Collapsed vertebra, not elsewhere classified", category: "M48", excludes1: [], excludes2: [], includes: [], commonUse: ["Vertebral compression fracture"], documentation: ["X-ray spine", "DEXA"] };
  codes["M48.6"] = { code: "M48.6", description: "Ankylosing spondylitis of spine, not elsewhere classified", category: "M48", excludes1: [], excludes2: [], includes: [], commonUse: ["Ankylosing spondylitis"], documentation: ["X-ray spine", "HLA-B27"] };
  codes["M48.9"] = { code: "M48.9", description: "Spondylopathy, unspecified", category: "M48", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal disorder NOS"], documentation: ["X-ray spine"] };
  codes["M51.0"] = { code: "M51.0", description: "Intervertebral disc disorders with radiculopathy, cervical region", category: "M51", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical radiculopathy", "Cervical disc herniation"], documentation: ["MRI cervical spine"] };
  codes["M51.1"] = { code: "M51.1", description: "Intervertebral disc disorders with radiculopathy, thoracic region", category: "M51", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic radiculopathy"], documentation: ["MRI thoracic spine"] };
  codes["M51.16"] = { code: "M51.16", description: "Intervertebral disc disorders with radiculopathy, lumbar region", category: "M51", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar radiculopathy"], documentation: ["MRI lumbar spine"] };
  codes["M51.17"] = { code: "M51.17", description: "Intervertebral disc disorders with radiculopathy, lumbosacral region", category: "M51", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbosacral radiculopathy"], documentation: ["MRI lumbosacral"] };
  codes["M54.0"] = { code: "M54.0", description: "Pilonidal cyst with abscess", category: "M54", excludes1: [], excludes2: [], includes: [], commonUse: ["Pilonidal abscess"], documentation: ["Clinical exam"] };
  codes["M54.1"] = { code: "M54.1", description: "Radiculopathy, cervical region", category: "M54", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical radiculopathy"], documentation: ["MRI cervical spine"] };
  codes["M54.2"] = { code: "M54.2", description: "Cervicalgia", category: "M54", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck pain", "Cervical pain"], documentation: ["X-ray cervical spine"] };
  codes["M54.3"] = { code: "M54.3", description: "Sciatica, right side", category: "M54", excludes1: [], excludes2: [], includes: [], commonUse: ["Right sciatica"], documentation: ["MRI lumbar spine"] };
  codes["M54.4"] = { code: "M54.4", description: "Sciatica, left side", category: "M54", excludes1: [], excludes2: [], includes: [], commonUse: ["Left sciatica"], documentation: ["MRI lumbar spine"] };
  codes["M54.5"] = { code: "M54.5", description: "Low back pain", category: "M54", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbago", "Lower back pain"], documentation: ["X-ray lumbar spine"] };
  codes["M54.6"] = { code: "M54.6", description: "Pain in thoracic spine", category: "M54", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic back pain"], documentation: ["X-ray thoracic spine"] };
  codes["M54.7"] = { code: "M54.7", description: "Lumbar spondylosis without myelopathy or radiculopathy", category: "M54", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar spondylosis"], documentation: ["X-ray lumbar spine"] };
  codes["M54.9"] = { code: "M54.9", description: "Dorsalgia, unspecified", category: "M54", excludes1: [], excludes2: [], includes: [], commonUse: ["Back pain NOS"], documentation: ["X-ray"] };
  codes["M61.0"] = { code: "M61.0", description: "Myositis ossificans", category: "M61", excludes1: [], excludes2: [], includes: [], commonUse: ["Myositis ossificans"], documentation: ["X-ray", "MRI"] };
  codes["M61.1"] = { code: "M61.1", description: "Myositis ossificans progressiva", category: "M61", excludes1: [], excludes2: [], includes: [], commonUse: ["Fibrodysplasia ossificans progressiva"], documentation: ["X-ray", "Genetic testing"] };
  codes["M62.0"] = { code: "M62.0", description: "Diastasis of muscle", category: "M62", excludes1: [], excludes2: [], includes: [], commonUse: ["Muscle diastasis"], documentation: ["Ultrasound"] };
  codes["M62.1"] = { code: "M62.1", description: "Other rupture of muscle, not elsewhere classified", category: "M62", excludes1: [], excludes2: [], includes: ["Muscle rupture"], commonUse: ["Muscle tear"], documentation: ["MRI", "Ultrasound"] };
  codes["M62.2"] = { code: "M62.2", description: "Muscle contusion, not elsewhere classified", category: "M62", excludes1: [], excludes2: [], includes: [], commonUse: ["Muscle bruise"], documentation: ["Ultrasound"] };
  codes["M62.3"] = { code: "M62.3", description: "Other muscle injury, not elsewhere classified", category: "M62", excludes1: [], excludes2: [], includes: [], commonUse: ["Muscle injury"], documentation: ["MRI"] };
  codes["M62.4"] = { code: "M62.4", description: "Contracture of muscle, not elsewhere classified", category: "M62", excludes1: [], excludes2: [], includes: [], commonUse: ["Muscle contracture"], documentation: ["Clinical exam"] };
  codes["M62.5"] = { code: "M62.5", description: "Other muscle wasting and atrophy, not elsewhere classified", category: "M62", excludes1: [], excludes2: [], includes: [], commonUse: ["Muscle atrophy"], documentation: ["EMG"] };
  codes["M62.6"] = { code: "M62.6", description: "Muscle strain, not elsewhere classified", category: "M62", excludes1: [], excludes2: [], includes: [], commonUse: ["Muscle strain"], documentation: ["MRI"] };
  codes["M62.81"] = { code: "M62.81", description: "Generalized muscle weakness", category: "M62", excludes1: [], excludes2: [], includes: [], commonUse: ["Muscle weakness"], documentation: ["EMG", "CK level"] };
  codes["M65.0"] = { code: "M65.0", description: "Abscess of tendon sheath", category: "M65", excludes1: [], excludes2: [], includes: [], commonUse: ["Tendon sheath abscess"], documentation: ["Ultrasound"] };
  codes["M65.1"] = { code: "M65.1", description: "Other infective tenosynovitis, not elsewhere classified", category: "M65", excludes1: [], excludes2: [], includes: [], commonUse: ["Infective tenosynovitis"], documentation: ["Joint aspiration"] };
  codes["M65.2"] = { code: "M65.2", description: "Calcific tendinitis", category: "M65", excludes1: [], excludes2: [], includes: [], commonUse: ["Calcific tendinitis"], documentation: ["X-ray", "Ultrasound"] };
  codes["M65.3"] = { code: "M65.3", description: "Trigger finger", category: "M65", excludes1: [], excludes2: [], includes: [], commonUse: ["Trigger finger", "Snapping finger"], documentation: ["Clinical exam"] };
  codes["M65.4"] = { code: "M65.4", description: "De Quervain syndrome", category: "M65", excludes1: [], excludes2: [], includes: [], commonUse: ["De Quervain tenosynovitis", "Radial styloid tenosynovitis"], documentation: ["Finkelstein test"] };
  codes["M65.8"] = { code: "M65.8", description: "Other synovitis and tenosynovitis, not elsewhere classified", category: "M65", excludes1: [], excludes2: [], includes: [], commonUse: ["Tenosynovitis"], documentation: ["Ultrasound"] };
  codes["M66.0"] = { code: "M66.0", description: "Rupture of popliteal cyst", category: "M66", excludes1: [], excludes2: [], includes: [], commonUse: ["Baker cyst rupture"], documentation: ["Ultrasound"] };
  codes["M66.1"] = { code: "M66.1", description: "Rupture of synovium, not elsewhere classified", category: "M66", excludes1: [], excludes2: [], includes: [], commonUse: ["Synovial rupture"], documentation: ["MRI"] };
  codes["M66.2"] = { code: "M66.2", description: "Spontaneous rupture of extensor tendons of hand and wrist", category: "M66", excludes1: [], excludes2: [], includes: [], commonUse: ["Extensor tendon rupture"], documentation: ["Clinical exam"] };
  codes["M66.3"] = { code: "M66.3", description: "Spontaneous rupture of flexor tendons of hand and wrist", category: "M66", excludes1: [], excludes2: [], includes: [], commonUse: ["Flexor tendon rupture"], documentation: ["Clinical exam"] };
  codes["M66.4"] = { code: "M66.4", description: "Spontaneous rupture of other tendons, not elsewhere classified", category: "M66", excludes1: [], excludes2: [], includes: [], commonUse: ["Tendon rupture"], documentation: ["MRI", "Ultrasound"] };
  codes["M66.5"] = { code: "M66.5", description: "Spontaneous rupture of unspecified tendons, not elsewhere classified", category: "M66", excludes1: [], excludes2: [], includes: [], commonUse: ["Tendon rupture NOS"], documentation: ["MRI"] };
  codes["M67.0"] = { code: "M67.0", description: "Short Achilles tendon (acquired)", category: "M67", excludes1: [], excludes2: [], includes: [], commonUse: ["Achilles tendon contracture"], documentation: ["Clinical exam"] };
  codes["M67.1"] = { code: "M67.1", description: "Other contracture of tendon (sheath), not elsewhere classified", category: "M67", excludes1: [], excludes2: [], includes: [], commonUse: ["Tendon contracture"], documentation: ["Clinical exam"] };
  codes["M67.2"] = { code: "M67.2", description: "Other hypertrophy of tendon, not elsewhere classified", category: "M67", excludes1: [], excludes2: [], includes: [], commonUse: ["Tendon hypertrophy"], documentation: ["MRI"] };
  codes["M67.3"] = { code: "M67.3", description: "Transient synovitis, hip", category: "M67", excludes1: [], excludes2: [], includes: [], commonUse: ["Transient synovitis"], documentation: ["Ultrasound hip"] };
  codes["M67.4"] = { code: "M67.4", description: "Ganglion, not elsewhere classified", category: "M67", excludes1: [], excludes2: [], includes: [], commonUse: ["Ganglion cyst"], documentation: ["Ultrasound"] };
  codes["M67.8"] = { code: "M67.8", description: "Other specified disorders of synovium and tendon, not elsewhere classified", category: "M67", excludes1: [], excludes2: [], includes: [], commonUse: ["Tendon disorder"], documentation: ["MRI"] };
  codes["M70.0"] = { code: "M70.0", description: "Adventitious bursitis", category: "M70", excludes1: [], excludes2: [], includes: [], commonUse: ["Bursitis"], documentation: ["Ultrasound"] };
  codes["M70.1"] = { code: "M70.1", description: "Bursitis of elbow", category: "M70", excludes1: [], excludes2: [], includes: [], commonUse: ["Elbow bursitis"], documentation: ["Ultrasound"] };
  codes["M70.2"] = { code: "M70.2", description: "Olecranon bursitis", category: "M70", excludes1: [], excludes2: [], includes: [], commonUse: ["Olecranon bursitis", "Student elbow"], documentation: ["Ultrasound"] };
  codes["M70.3"] = { code: "M70.3", description: "Other bursitis of elbow", category: "M70", excludes1: [], excludes2: [], includes: [], commonUse: ["Elbow bursitis"], documentation: ["Ultrasound"] };
  codes["M70.4"] = { code: "M70.4", description: "Prepatellar bursitis", category: "M70", excludes1: [], excludes2: [], includes: [], commonUse: ["Prepatellar bursitis", "Housemaid knee"], documentation: ["Ultrasound"] };
  codes["M70.5"] = { code: "M70.5", description: "Other bursitis of knee", category: "M70", excludes1: [], excludes2: [], includes: [], commonUse: ["Knee bursitis"], documentation: ["Ultrasound"] };
  codes["M70.6"] = { code: "M70.6", description: "Trochanteric bursitis", category: "M70", excludes1: [], excludes2: [], includes: [], commonUse: ["Hip bursitis", "Greater trochanteric pain syndrome"], documentation: ["MRI hip"] };
  codes["M70.7"] = { code: "M70.7", description: "Other bursitis of hip", category: "M70", excludes1: [], excludes2: [], includes: [], commonUse: ["Hip bursitis"], documentation: ["Ultrasound"] };
  codes["M70.8"] = { code: "M70.8", description: "Other soft tissue disorders related to use, overuse and pressure, not elsewhere classified", category: "M70", excludes1: [], excludes2: [], includes: [], commonUse: ["Overuse syndrome"], documentation: ["MRI"] };
  codes["M71.0"] = { code: "M71.0", description: "Abscess of bursa", category: "M71", excludes1: [], excludes2: [], includes: [], commonUse: ["Bursal abscess"], documentation: ["Ultrasound"] };
  codes["M71.1"] = { code: "M71.1", description: "Other infective bursitis, not elsewhere classified", category: "M71", excludes1: [], excludes2: [], includes: [], commonUse: ["Septic bursitis"], documentation: ["Bursal aspiration"] };
  codes["M71.2"] = { code: "M71.2", description: "Synovial cyst of popliteal space (Baker)", category: "M71", excludes1: [], excludes2: [], includes: [], commonUse: ["Baker cyst"], documentation: ["Ultrasound"] };
  codes["M71.3"] = { code: "M71.3", description: "Other bursal cyst, not elsewhere classified", category: "M71", excludes1: [], excludes2: [], includes: [], commonUse: ["Bursal cyst"], documentation: ["Ultrasound"] };
  codes["M71.4"] = { code: "M71.4", description: "Calcium deposit in bursa", category: "M71", excludes1: [], excludes2: [], includes: [], commonUse: ["Calcific bursitis"], documentation: ["X-ray"] };
  codes["M71.5"] = { code: "M71.5", description: "Other bursitis, not elsewhere classified", category: "M71", excludes1: [], excludes2: [], includes: [], commonUse: ["Bursitis NOS"], documentation: ["Ultrasound"] };
  codes["M72.0"] = { code: "M72.0", description: "Palmar fascial fibromatosis [Dupuytren]", category: "M72", excludes1: [], excludes2: [], includes: [], commonUse: ["Dupuytren contracture"], documentation: ["Clinical exam"] };
  codes["M72.1"] = { code: "M72.1", description: "Knuckle pads", category: "M72", excludes1: [], excludes2: [], includes: [], commonUse: ["Knuckle pads"], documentation: ["Clinical exam"] };
  codes["M72.2"] = { code: "M72.2", description: "Plantar fascial fibromatosis", category: "M72", excludes1: [], excludes2: [], includes: [], commonUse: ["Plantar fibromatosis"], documentation: ["Ultrasound"] };
  codes["M72.3"] = { code: "M72.3", description: "Nodular fasciitis, not elsewhere classified", category: "M72", excludes1: [], excludes2: [], includes: [], commonUse: ["Nodular fasciitis"], documentation: ["Ultrasound", "Biopsy"] };
  codes["M72.4"] = { code: "M72.4", description: "Pseudosarcomatous fasciitis, not elsewhere classified", category: "M72", excludes1: [], excludes2: [], includes: [], commonUse: ["Pseudosarcomatous fasciitis"], documentation: ["Biopsy"] };
  codes["M72.5"] = { code: "M72.5", description: "Fasciitis, not elsewhere classified", category: "M72", excludes1: [], excludes2: [], includes: [], commonUse: ["Fasciitis"], documentation: ["MRI"] };
  codes["M72.6"] = { code: "M72.6", description: "Necrotizing fasciitis, not elsewhere classified", category: "M72", excludes1: [], excludes2: [], includes: [], commonUse: ["Necrotizing fasciitis"], documentation: ["Surgical exploration"] };
  codes["M72.8"] = { code: "M72.8", description: "Other fibroblastic disorders, not elsewhere classified", category: "M72", excludes1: [], excludes2: [], includes: [], commonUse: ["Fibroblastic disorder"], documentation: ["MRI"] };
  codes["M75.0"] = { code: "M75.0", description: "Adhesive capsule of shoulder [frozen shoulder]", category: "M75", excludes1: [], excludes2: [], includes: [], commonUse: ["Frozen shoulder", "Adhesive capsulitis"], documentation: ["X-ray shoulder", "MRI"] };
  codes["M75.1"] = { code: "M75.1", description: "Rotator cuff syndrome, not specified as traumatic", category: "M75", excludes1: [], excludes2: [], includes: [], commonUse: ["Rotator cuff tendinopathy"], documentation: ["MRI shoulder"] };
  codes["M75.2"] = { code: "M75.2", description: "Bicipital tendinitis", category: "M75", excludes1: [], excludes2: [], includes: [], commonUse: ["Biceps tendinitis"], documentation: ["MRI shoulder"] };
  codes["M75.3"] = { code: "M75.3", description: "Calcific tendinitis of shoulder", category: "M75", excludes1: [], excludes2: [], includes: [], commonUse: ["Calcific tendinitis shoulder"], documentation: ["X-ray shoulder"] };
  codes["M75.4"] = { code: "M75.4", description: "Impingement syndrome of shoulder", category: "M75", excludes1: [], excludes2: [], includes: [], commonUse: ["Shoulder impingement"], documentation: ["MRI shoulder", "X-ray"] };
  codes["M75.5"] = { code: "M75.5", description: "Bursitis of shoulder", category: "M75", excludes1: [], excludes2: [], includes: [], commonUse: ["Shoulder bursitis"], documentation: ["Ultrasound shoulder"] };
  codes["M76.0"] = { code: "M76.0", description: "Medial epicondylitis", category: "M76", excludes1: [], excludes2: [], includes: [], commonUse: ["Golfer elbow"], documentation: ["Clinical exam"] };
  codes["M76.1"] = { code: "M76.1", description: "Lateral epicondylitis", category: "M76", excludes1: [], excludes2: [], includes: [], commonUse: ["Tennis elbow"], documentation: ["Clinical exam"] };
  codes["M76.2"] = { code: "M76.2", description: "Iliac crest spur", category: "M76", excludes1: [], excludes2: [], includes: [], commonUse: ["Iliac crest spur"], documentation: ["X-ray pelvis"] };
  codes["M76.3"] = { code: "M76.3", description: "Lateral hip syndrome", category: "M76", excludes1: [], excludes2: [], includes: [], commonUse: ["Lateral hip pain"], documentation: ["MRI hip"] };
  codes["M76.4"] = { code: "M76.4", description: "Tibial collateral ligament bursitis", category: "M76", excludes1: [], excludes2: [], includes: [], commonUse: ["MCL bursitis"], documentation: ["Ultrasound knee"] };
  codes["M76.5"] = { code: "M76.5", description: "Patellar tendinitis", category: "M76", excludes1: [], excludes2: [], includes: [], commonUse: ["Jumper knee"], documentation: ["MRI knee"] };
  codes["M76.6"] = { code: "M76.6", description: "Achilles tendinitis", category: "M76", excludes1: [], excludes2: [], includes: [], commonUse: ["Achilles tendinopathy"], documentation: ["Ultrasound ankle"] };
  codes["M76.7"] = { code: "M76.7", description: "Peroneal tendinitis", category: "M76", excludes1: [], excludes2: [], includes: [], commonUse: ["Peroneal tendinopathy"], documentation: ["MRI ankle"] };
  codes["M76.8"] = { code: "M76.8", description: "Other enthesopathies of lower limb, not elsewhere classified", category: "M76", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb enthesopathy"], documentation: ["MRI"] };
  codes["M77.0"] = { code: "M77.0", description: "Medial epicondylitis of elbow", category: "M77", excludes1: [], excludes2: [], includes: [], commonUse: ["Golfer elbow"], documentation: ["Clinical exam"] };
  codes["M77.1"] = { code: "M77.1", description: "Lateral epicondylitis of elbow", category: "M77", excludes1: [], excludes2: [], includes: [], commonUse: ["Tennis elbow"], documentation: ["Clinical exam"] };
  codes["M77.2"] = { code: "M77.2", description: "Periarthritis of wrist", category: "M77", excludes1: [], excludes2: [], includes: [], commonUse: ["Wrist periarthritis"], documentation: ["X-ray wrist"] };
  codes["M77.3"] = { code: "M77.3", description: "Calcaneal spur", category: "M77", excludes1: [], excludes2: [], includes: [], commonUse: ["Heel spur"], documentation: ["X-ray heel"] };
  codes["M77.4"] = { code: "M77.4", description: "Metatarsalgia", category: "M77", excludes1: [], excludes2: [], includes: [], commonUse: ["Metatarsalgia", "Ball of foot pain"], documentation: ["X-ray foot"] };
  codes["M77.5"] = { code: "M77.5", description: "Other enthesopathy of foot, not elsewhere classified", category: "M77", excludes1: [], excludes2: [], includes: [], commonUse: ["Foot enthesopathy"], documentation: ["X-ray foot", "MRI"] };
  codes["M77.8"] = { code: "M77.8", description: "Other enthesopathies, not elsewhere classified", category: "M77", excludes1: [], excludes2: [], includes: [], commonUse: ["Enthesopathy NOS"], documentation: ["MRI"] };
  codes["M79.0"] = { code: "M79.0", description: "Rheumatism, unspecified, soft tissue disorders", category: "M79", excludes1: [], excludes2: [], includes: [], commonUse: ["Soft tissue rheumatism"], documentation: ["ESR"] };
  codes["M79.1"] = { code: "M79.1", description: "Myalgia, not elsewhere classified", category: "M79", excludes1: [], excludes2: [], includes: [], commonUse: ["Muscle pain"], documentation: ["CK level"] };
  codes["M79.2"] = { code: "M79.2", description: "Neuralgia and neuritis, not elsewhere classified", category: "M79", excludes1: [], excludes2: [], includes: [], commonUse: ["Neuralgia", "Neuritis"], documentation: ["Nerve conduction study"] };
  codes["M79.3"] = { code: "M79.3", description: "Panniculitis, not elsewhere classified", category: "M79", excludes1: [], excludes2: [], includes: [], commonUse: ["Panniculitis"], documentation: ["Biopsy"] };
  codes["M79.4"] = { code: "M79.4", description: "Hypertrophy of (infrapatellar) fat pad", category: "M79", excludes1: [], excludes2: [], includes: [], commonUse: ["Hoffa fat pad syndrome"], documentation: ["MRI knee"] };
  codes["M79.5"] = { code: "M79.5", description: "Residual foreign body in soft tissue, not elsewhere classified", category: "M79", excludes1: [], excludes2: [], includes: [], commonUse: ["Foreign body in soft tissue"], documentation: ["X-ray"] };
  codes["M79.6"] = { code: "M79.6", description: "Soft tissue pain, not elsewhere classified", category: "M79", excludes1: [], excludes2: [], includes: [], commonUse: ["Soft tissue pain"], documentation: ["MRI"] };
  codes["M80.0"] = { code: "M80.0", description: "Age-related osteoporosis with current pathological fracture", category: "M80", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteoporotic fracture"], documentation: ["DEXA", "X-ray"] };
  codes["M80.00"] = { code: "M80.00", description: "Age-related osteoporosis with current pathological fracture, unspecified site", category: "M80", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteoporotic fracture NOS"], documentation: ["DEXA"] };
  codes["M81.0"] = { code: "M81.0", description: "Age-related osteoporosis without current pathological fracture", category: "M81", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteoporosis NOS"], documentation: ["DEXA"] };
  codes["M81.6"] = { code: "M81.6", description: "Local osteoporosis, not elsewhere classified", category: "M81", excludes1: [], excludes2: [], includes: [], commonUse: ["Localized osteoporosis"], documentation: ["DEXA"] };
  codes["M81.9"] = { code: "M81.9", description: "Osteoporosis, unspecified", category: "M81", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteoporosis NOS"], documentation: ["DEXA"] };
  codes["M84.0"] = { code: "M84.0", description: "Malunion of fracture", category: "M84", excludes1: [], excludes2: [], includes: [], commonUse: ["Malunion"], documentation: ["X-ray"] };
  codes["M84.1"] = { code: "M84.1", description: "Nonunion of fracture [pseudarthrosis]", category: "M84", excludes1: [], excludes2: [], includes: [], commonUse: ["Nonunion", "Pseudarthrosis"], documentation: ["X-ray"] };
  codes["M84.2"] = { code: "M84.2", description: "Delayed union of fracture", category: "M84", excludes1: [], excludes2: [], includes: [], commonUse: ["Delayed union"], documentation: ["X-ray"] };
  codes["M84.3"] = { code: "M84.3", description: "Stress fracture, not elsewhere classified", category: "M84", excludes1: [], excludes2: [], includes: [], commonUse: ["Stress fracture"], documentation: ["X-ray", "MRI bone"] };
  codes["M84.4"] = { code: "M84.4", description: "Pathological fracture, not elsewhere classified", category: "M84", excludes1: [], excludes2: [], includes: [], commonUse: ["Pathological fracture"], documentation: ["X-ray"] };
  codes["M84.5"] = { code: "M84.5", description: "Pathological fracture in neoplastic disease", category: "M84", excludes1: [], excludes2: [], includes: [], commonUse: ["Pathologic fracture tumor"], documentation: ["X-ray", "CT"] };
  codes["M84.6"] = { code: "M84.6", description: "Pathological fracture in other disease", category: "M84", excludes1: [], excludes2: [], includes: [], commonUse: ["Pathologic fracture metabolic"], documentation: ["X-ray"] };
  codes["M84.7"] = { code: "M84.7", description: "Fracture of unspecified bone", category: "M84", excludes1: [], excludes2: [], includes: [], commonUse: ["Fracture NOS"], documentation: ["X-ray"] };
  codes["M86.0"] = { code: "M86.0", description: "Acute hematogenous osteomyelitis", category: "M86", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute osteomyelitis"], documentation: ["X-ray", "MRI bone", "Blood cultures"] };
  codes["M86.1"] = { code: "M86.1", description: "Other acute osteomyelitis", category: "M86", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute osteomyelitis"], documentation: ["X-ray", "MRI bone"] };
  codes["M86.2"] = { code: "M86.2", description: "Subacute osteomyelitis", category: "M86", excludes1: [], excludes2: [], includes: [], commonUse: ["Subacute osteomyelitis"], documentation: ["X-ray", "MRI bone"] };
  codes["M86.3"] = { code: "M86.3", description: "Chronic multifocal osteomyelitis", category: "M86", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic multifocal osteomyelitis"], documentation: ["X-ray", "MRI bone"] };
  codes["M86.4"] = { code: "M86.4", description: "Chronic osteomyelitis with draining sinus", category: "M86", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic osteomyelitis"], documentation: ["X-ray", "MRI bone"] };
  codes["M86.5"] = { code: "M86.5", description: "Other chronic osteomyelitis", category: "M86", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic osteomyelitis NOS"], documentation: ["X-ray", "MRI bone"] };
  codes["M86.6"] = { code: "M86.6", description: "Other osteomyelitis, not elsewhere classified", category: "M86", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteomyelitis NOS"], documentation: ["X-ray", "MRI bone"] };
  codes["M87.0"] = { code: "M87.0", description: "Idiopathic aseptic necrosis of bone", category: "M87", excludes1: [], excludes2: [], includes: [], commonUse: ["Avascular necrosis"], documentation: ["MRI bone"] };
  codes["M87.1"] = { code: "M87.1", description: "Aseptic necrosis of bone associated with drugs", category: "M87", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug-induced AVN"], documentation: ["MRI bone"] };
  codes["M87.2"] = { code: "M87.2", description: "Aseptic necrosis of bone associated with trauma", category: "M87", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-traumatic AVN"], documentation: ["MRI bone"] };
  codes["M87.3"] = { code: "M87.3", description: "Other secondary aseptic necrosis of bone", category: "M87", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary AVN"], documentation: ["MRI bone"] };
  codes["M87.8"] = { code: "M87.8", description: "Other osteonecrosis", category: "M87", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteonecrosis NOS"], documentation: ["MRI bone"] };
  codes["M87.9"] = { code: "M87.9", description: "Osteonecrosis, unspecified", category: "M87", excludes1: [], excludes2: [], includes: [], commonUse: ["Avascular necrosis NOS"], documentation: ["MRI bone"] };
  codes["M88.0"] = { code: "M88.0", description: "Paget disease of skull", category: "M88", excludes1: [], excludes2: [], includes: [], commonUse: ["Paget skull"], documentation: ["X-ray skull", "Alkaline phosphatase"] };
  codes["M88.1"] = { code: "M88.1", description: "Paget disease of vertebrae", category: "M88", excludes1: [], excludes2: [], includes: [], commonUse: ["Paget spine"], documentation: ["X-ray spine"] };
  codes["M88.2"] = { code: "M88.2", description: "Paget disease of pelvis", category: "M88", excludes1: [], excludes2: [], includes: [], commonUse: ["Paget pelvis"], documentation: ["X-ray pelvis"] };
  codes["M88.8"] = { code: "M88.8", description: "Other osteitis deformans", category: "M88", excludes1: [], excludes2: [], includes: [], commonUse: ["Paget disease"], documentation: ["Alkaline phosphatase", "X-ray"] };
  codes["M88.9"] = { code: "M88.9", description: "Osteitis deformans, unspecified", category: "M88", excludes1: [], excludes2: [], includes: [], commonUse: ["Paget disease NOS"], documentation: ["Alkaline phosphatase"] };
  codes["M93.0"] = { code: "M93.0", description: "Legg-Calve-Perthes disease", category: "M93", excludes1: [], excludes2: [], includes: [], commonUse: ["Perthes disease"], documentation: ["X-ray hip", "MRI hip"] };
  codes["M93.1"] = { code: "M93.1", description: "Osteochondritis juvenilis of hip", category: "M93", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteochondritis hip"], documentation: ["X-ray hip"] };
  codes["M93.2"] = { code: "M93.2", description: "Osteochondritis dissecans", category: "M93", excludes1: [], excludes2: [], includes: [], commonUse: ["OCD"], documentation: ["MRI"] };
  codes["M93.3"] = { code: "M93.3", description: "Osteochondritis of tuberosity of calcaneus", category: "M93", excludes1: [], excludes2: [], includes: [], commonUse: ["Sever disease"], documentation: ["X-ray heel"] };
  codes["M93.4"] = { code: "M93.4", description: "Osteochondritis of capitulum of humerus", category: "M93", excludes1: [], excludes2: [], includes: [], commonUse: ["Panner disease"], documentation: ["X-ray elbow"] };
  codes["M93.8"] = { code: "M93.8", description: "Other osteochondropathies, not elsewhere classified", category: "M93", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteochondropathy"], documentation: ["X-ray"] };
  codes["M93.9"] = { code: "M93.9", description: "Osteochondropathy, unspecified", category: "M93", excludes1: [], excludes2: [], includes: [], commonUse: ["Osteochondropathy NOS"], documentation: ["X-ray"] };
  codes["M94.0"] = { code: "M94.0", description: "Chondromalacia patellae", category: "M94", excludes1: [], excludes2: [], includes: [], commonUse: ["Chondromalacia patella", "Runner knee"], documentation: ["MRI knee"] };
  codes["M94.1"] = { code: "M94.1", description: "Relapsing polychondritis", category: "M94", excludes1: [], excludes2: [], includes: [], commonUse: ["Relapsing polychondritis"], documentation: ["Biopsy", "Inflammatory markers"] };
  codes["M94.2"] = { code: "M94.2", description: "Chondromalacia, not elsewhere classified", category: "M94", excludes1: [], excludes2: [], includes: [], commonUse: ["Chondromalacia"], documentation: ["MRI"] };
  codes["M94.3"] = { code: "M94.3", description: "Chondrolysis", category: "M94", excludes1: [], excludes2: [], includes: [], commonUse: ["Chondrolysis"], documentation: ["MRI", "X-ray"] };
  codes["M94.8"] = { code: "M94.8", description: "Other specified disorders of cartilage, not elsewhere classified", category: "M94", excludes1: [], excludes2: [], includes: [], commonUse: ["Cartilage disorder"], documentation: ["MRI"] };
  codes["M94.9"] = { code: "M94.9", description: "Disorder of cartilage, unspecified", category: "M94", excludes1: [], excludes2: [], includes: [], commonUse: ["Cartilage disorder NOS"], documentation: ["MRI"] };
  codes["N10"] = { code: "N10", description: "Acute pyelonephritis", category: "N10", excludes1: [], excludes2: [], includes: [], commonUse: ["Kidney infection"], documentation: ["Urinalysis", "Urine culture"] };
  codes["N11.0"] = { code: "N11.0", description: "Chronic pyelonephritis", category: "N11", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic kidney infection"], documentation: ["Urinalysis", "Renal ultrasound"] };
  codes["N12"] = { code: "N12", description: "Pyelonephritis, unspecified as acute or chronic", category: "N12", excludes1: [], excludes2: [], includes: [], commonUse: ["Pyelonephritis NOS"], documentation: ["Urinalysis"] };
  codes["N17.0"] = { code: "N17.0", description: "Acute kidney failure with tubular necrosis", category: "N17", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute tubular necrosis"], documentation: ["Creatinine", "Urinalysis"] };
  codes["N17.1"] = { code: "N17.1", description: "Acute kidney failure with acute cortical necrosis", category: "N17", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute cortical necrosis"], documentation: ["Creatinine", "Renal biopsy"] };
  codes["N17.2"] = { code: "N17.2", description: "Acute kidney failure with medullary necrosis", category: "N17", excludes1: [], excludes2: [], includes: [], commonUse: ["Medullary necrosis"], documentation: ["Creatinine"] };
  codes["N17.8"] = { code: "N17.8", description: "Other acute kidney failure", category: "N17", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute renal failure"], documentation: ["Creatinine"] };
  codes["N17.9"] = { code: "N17.9", description: "Acute kidney failure, unspecified", category: "N17", excludes1: [], excludes2: [], includes: [], commonUse: ["AKI", "Acute kidney injury"], documentation: ["Creatinine"] };
  codes["N18.1"] = { code: "N18.1", description: "Chronic kidney disease, stage 1", category: "N18", excludes1: [], excludes2: [], includes: [], commonUse: ["CKD stage 1"], documentation: ["GFR", "Creatinine"] };
  codes["N18.2"] = { code: "N18.2", description: "Chronic kidney disease, stage 2", category: "N18", excludes1: [], excludes2: [], includes: [], commonUse: ["CKD stage 2"], documentation: ["GFR", "Creatinine"] };
  codes["N18.3"] = { code: "N18.3", description: "Chronic kidney disease, stage 3", category: "N18", excludes1: [], excludes2: [], includes: [], commonUse: ["CKD stage 3"], documentation: ["GFR", "Creatinine"] };
  codes["N18.4"] = { code: "N18.4", description: "Chronic kidney disease, stage 4", category: "N18", excludes1: [], excludes2: [], includes: [], commonUse: ["CKD stage 4"], documentation: ["GFR", "Creatinine"] };
  codes["N18.5"] = { code: "N18.5", description: "Chronic kidney disease, stage 5", category: "N18", excludes1: [], excludes2: [], includes: [], commonUse: ["CKD stage 5", "ESRD"], documentation: ["GFR", "Creatinine"] };
  codes["N18.9"] = { code: "N18.9", description: "Chronic kidney disease, unspecified", category: "N18", excludes1: [], excludes2: [], includes: [], commonUse: ["CKD NOS"], documentation: ["GFR"] };
  codes["N19"] = { code: "N19", description: "Unspecified kidney failure", category: "N19", excludes1: [], excludes2: [], includes: [], commonUse: ["Kidney failure NOS"], documentation: ["Creatinine"] };
  codes["N20.0"] = { code: "N20.0", description: "Calculus of kidney", category: "N20", excludes1: [], excludes2: [], includes: [], commonUse: ["Kidney stone", "Nephrolithiasis"], documentation: ["CT abdomen", "Urinalysis"] };
  codes["N20.1"] = { code: "N20.1", description: "Calculus of ureter", category: "N20", excludes1: [], excludes2: [], includes: [], commonUse: ["Ureteral stone", "Ureterolithiasis"], documentation: ["CT abdomen"] };
  codes["N20.2"] = { code: "N20.2", description: "Calculus of kidney with calculus of ureter", category: "N20", excludes1: [], excludes2: [], includes: [], commonUse: ["Kidney and ureter stone"], documentation: ["CT abdomen"] };
  codes["N20.9"] = { code: "N20.9", description: "Urinary calculus, unspecified", category: "N20", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary stone NOS"], documentation: ["CT abdomen"] };
  codes["N21.0"] = { code: "N21.0", description: "Calculus in bladder", category: "N21", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder stone", "Cystolithiasis"], documentation: ["CT pelvis", "Cystoscopy"] };
  codes["N21.1"] = { code: "N21.1", description: "Calculus in urethra", category: "N21", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral stone"], documentation: ["X-ray", "Cystoscopy"] };
  codes["N21.9"] = { code: "N21.9", description: "Lower urinary tract calculus, unspecified", category: "N21", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower urinary stone"], documentation: ["CT pelvis"] };
  codes["N23"] = { code: "N23", description: "Unspecified renal colic", category: "N23", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal colic NOS"], documentation: ["Urinalysis"] };
  codes["N30.0"] = { code: "N30.0", description: "Acute cystitis", category: "N30", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder infection", "Acute bladder infection"], documentation: ["Urinalysis", "Urine culture"] };
  codes["N30.1"] = { code: "N30.1", description: "Interstitial cystitis (chronic)", category: "N30", excludes1: [], excludes2: [], includes: [], commonUse: ["Interstitial cystitis", "Painful bladder syndrome"], documentation: ["Cystoscopy", "Biopsy"] };
  codes["N30.2"] = { code: "N30.2", description: "Other chronic cystitis", category: "N30", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic cystitis"], documentation: ["Urinalysis", "Cystoscopy"] };
  codes["N30.3"] = { code: "N30.3", description: "Trigonitis", category: "N30", excludes1: [], excludes2: [], includes: [], commonUse: ["Trigonitis"], documentation: ["Cystoscopy"] };
  codes["N30.4"] = { code: "N30.4", description: "Irradiation cystitis", category: "N30", excludes1: [], excludes2: [], includes: [], commonUse: ["Radiation cystitis"], documentation: ["Cystoscopy"] };
  codes["N30.8"] = { code: "N30.8", description: "Other cystitis", category: "N30", excludes1: [], excludes2: [], includes: [], commonUse: ["Cystitis NOS"], documentation: ["Urinalysis"] };
  codes["N30.9"] = { code: "N30.9", description: "Cystitis, unspecified", category: "N30", excludes1: [], excludes2: [], includes: [], commonUse: ["Cystitis NOS"], documentation: ["Urinalysis"] };
  codes["N31.0"] = { code: "N31.0", description: "Uninhibited neuropathic bladder, not elsewhere classified", category: "N31", excludes1: [], excludes2: [], includes: [], commonUse: ["Neurogenic bladder"], documentation: ["Urodynamics"] };
  codes["N31.1"] = { code: "N31.1", description: "Reflex neuropathic bladder, not elsewhere classified", category: "N31", excludes1: [], excludes2: [], includes: [], commonUse: ["Reflex neurogenic bladder"], documentation: ["Urodynamics"] };
  codes["N31.2"] = { code: "N31.2", description: "Flaccid neurogenic bladder, not elsewhere classified", category: "N31", excludes1: [], excludes2: [], includes: [], commonUse: ["Flaccid neurogenic bladder"], documentation: ["Urodynamics"] };
  codes["N31.9"] = { code: "N31.9", description: "Neurogenic bladder, unspecified", category: "N31", excludes1: [], excludes2: [], includes: [], commonUse: ["Neurogenic bladder NOS"], documentation: ["Urodynamics"] };
  codes["N32.0"] = { code: "N32.0", description: "Bladder neck obstruction", category: "N32", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder outlet obstruction"], documentation: ["Urodynamics", "Cystoscopy"] };
  codes["N32.1"] = { code: "N32.1", description: "Vesicointestinal fistula", category: "N32", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder-bowel fistula"], documentation: ["CT pelvis", "Cystoscopy"] };
  codes["N32.2"] = { code: "N32.2", description: "Vesicourethral fistula", category: "N32", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder-urethra fistula"], documentation: ["Cystoscopy"] };
  codes["N32.3"] = { code: "N32.3", description: "Diverticulum of bladder", category: "N32", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder diverticulum"], documentation: ["Cystoscopy"] };
  codes["N32.8"] = { code: "N32.8", description: "Other specified disorders of bladder", category: "N32", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder disorder"], documentation: ["Cystoscopy"] };
  codes["N32.9"] = { code: "N32.9", description: "Bladder disorder, unspecified", category: "N32", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder disorder NOS"], documentation: ["Urinalysis"] };
  codes["N34.0"] = { code: "N34.0", description: "Urethral abscess", category: "N34", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral abscess"], documentation: ["Clinical exam", "Ultrasound"] };
  codes["N34.1"] = { code: "N34.1", description: "Urethral syndrome, not elsewhere classified", category: "N34", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral syndrome"], documentation: ["Urinalysis"] };
  codes["N34.2"] = { code: "N34.2", description: "Other urethritis", category: "N34", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethritis NOS"], documentation: ["Urethral swab"] };
  codes["N34.3"] = { code: "N34.3", description: "Urethral stricture, unspecified", category: "N34", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral stricture"], documentation: ["Urethrogram"] };
  codes["N35.0"] = { code: "N35.0", description: "Urethral stricture, meatal", category: "N35", excludes1: [], excludes2: [], includes: [], commonUse: ["Meatal stricture"], documentation: ["Urethrogram"] };
  codes["N35.1"] = { code: "N35.1", description: "Urethral stricture, anterior bulbous urethra", category: "N35", excludes1: [], excludes2: [], includes: [], commonUse: ["Bulbar stricture"], documentation: ["Urethrogram"] };
  codes["N35.9"] = { code: "N35.9", description: "Urethral stricture, unspecified site", category: "N35", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral stricture NOS"], documentation: ["Urethrogram"] };
  codes["N39.0"] = { code: "N39.0", description: "Urinary tract infection, site not specified", category: "N39", excludes1: [], excludes2: [], includes: [], commonUse: ["UTI", "Urinary infection"], documentation: ["Urinalysis", "Urine culture"] };
  codes["N39.1"] = { code: "N39.1", description: "Persistent proteinuria, unspecified", category: "N39", excludes1: [], excludes2: [], includes: [], commonUse: ["Proteinuria NOS"], documentation: ["Urinalysis"] };
  codes["N39.2"] = { code: "N39.2", description: "Functional disorder of bladder, not elsewhere classified", category: "N39", excludes1: [], excludes2: [], includes: [], commonUse: ["Functional bladder disorder"], documentation: ["Urodynamics"] };
  codes["N39.3"] = { code: "N39.3", description: "Overactive bladder", category: "N39", excludes1: [], excludes2: [], includes: [], commonUse: ["OAB", "Urge incontinence"], documentation: ["Bladder diary", "Urodynamics"] };
  codes["N39.4"] = { code: "N39.4", description: "Other specified disorders of urinary tract", category: "N39", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary disorder"], documentation: ["Urinalysis"] };
  codes["N39.8"] = { code: "N39.8", description: "Other specified disorders of urinary tract", category: "N39", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary disorder"], documentation: ["Urinalysis"] };
  codes["N39.9"] = { code: "N39.9", description: "Urinary tract disorder, unspecified", category: "N39", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary disorder NOS"], documentation: ["Urinalysis"] };
  codes["N40.0"] = { code: "N40.0", description: "Benign prostatic hyperplasia without lower urinary tract symptoms", category: "N40", excludes1: [], excludes2: [], includes: [], commonUse: ["BPH"], documentation: ["PSA", "DRE"] };
  codes["N40.1"] = { code: "N40.1", description: "Benign prostatic hyperplasia with lower urinary tract symptoms", category: "N40", excludes1: [], excludes2: [], includes: [], commonUse: ["BPH with LUTS"], documentation: ["PSA", "Uroflowmetry"] };
  codes["N40.2"] = { code: "N40.2", description: "Nodular prostate without lower urinary tract symptoms", category: "N40", excludes1: [], excludes2: [], includes: [], commonUse: ["Nodular prostate"], documentation: ["PSA", "DRE"] };
  codes["N40.3"] = { code: "N40.3", description: "Nodular prostate with lower urinary tract symptoms", category: "N40", excludes1: [], excludes2: [], includes: [], commonUse: ["Nodular prostate with LUTS"], documentation: ["PSA", "Uroflowmetry"] };
  codes["N41.0"] = { code: "N41.0", description: "Acute prostatitis", category: "N41", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute prostatitis"], documentation: ["UA", "Urine culture"] };
  codes["N41.1"] = { code: "N41.1", description: "Chronic prostatitis", category: "N41", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic prostatitis", "Chronic pelvic pain syndrome"], documentation: ["UA", "Urine culture"] };
  codes["N41.2"] = { code: "N41.2", description: "Abscess of prostate", category: "N41", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostatic abscess"], documentation: ["Transrectal ultrasound"] };
  codes["N41.3"] = { code: "N41.3", description: "Prostatocystitis", category: "N41", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostatocystitis"], documentation: ["UA"] };
  codes["N41.9"] = { code: "N41.9", description: "Inflammatory disease of prostate, unspecified", category: "N41", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostatitis NOS"], documentation: ["UA"] };
  codes["N42.0"] = { code: "N42.0", description: "Calcification of prostate", category: "N42", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostate calcification"], documentation: ["Transrectal ultrasound"] };
  codes["N42.1"] = { code: "N42.1", description: "Congestion and hemorrhage of prostate", category: "N42", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostatic congestion"], documentation: ["DRE"] };
  codes["N42.2"] = { code: "N42.2", description: "Atrophy of prostate", category: "N42", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostatic atrophy"], documentation: ["PSA"] };
  codes["N42.8"] = { code: "N42.8", description: "Other specified disorders of prostate", category: "N42", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostate disorder"], documentation: ["PSA"] };
  codes["N42.9"] = { code: "N42.9", description: "Disorder of prostate, unspecified", category: "N42", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostate disorder NOS"], documentation: ["PSA"] };
  codes["N43.0"] = { code: "N43.0", description: "Hydrocele and spermatocele", category: "N43", excludes1: [], excludes2: [], includes: [], commonUse: ["Hydrocele", "Spermatocele"], documentation: ["Ultrasound scrotum"] };
  codes["N43.1"] = { code: "N43.1", description: "Spermatocele", category: "N43", excludes1: [], excludes2: [], includes: [], commonUse: ["Spermatocele"], documentation: ["Ultrasound scrotum"] };
  codes["N43.2"] = { code: "N43.2", description: "Other hydrocele", category: "N43", excludes1: [], excludes2: [], includes: [], commonUse: ["Hydrocele NOS"], documentation: ["Ultrasound scrotum"] };
  codes["N43.3"] = { code: "N43.3", description: "Hydrocele, unspecified", category: "N43", excludes1: [], excludes2: [], includes: [], commonUse: ["Hydrocele NOS"], documentation: ["Ultrasound scrotum"] };
  codes["N43.4"] = { code: "N43.4", description: "Pyocele of tunica vaginalis", category: "N43", excludes1: [], excludes2: [], includes: [], commonUse: ["Pyocele"], documentation: ["Ultrasound scrotum"] };
  codes["N43.5"] = { code: "N43.5", description: "Encysted hydrocele of canal of Nuck", category: "N43", excludes1: [], excludes2: [], includes: [], commonUse: ["Encysted hydrocele"], documentation: ["Ultrasound"] };
  codes["N44.0"] = { code: "N44.0", description: "Torsion of testis", category: "N44", excludes1: [], excludes2: [], includes: [], commonUse: ["Testicular torsion"], documentation: ["Ultrasound Doppler scrotum"] };
  codes["N44.1"] = { code: "N44.1", description: "Torsion of appendix testis", category: "N44", excludes1: [], excludes2: [], includes: [], commonUse: ["Appendix testis torsion"], documentation: ["Ultrasound scrotum"] };
  codes["N44.2"] = { code: "N44.2", description: "Hematocele of tunica vaginalis", category: "N44", excludes1: [], excludes2: [], includes: [], commonUse: ["Hematocele"], documentation: ["Ultrasound scrotum"] };
  codes["N44.3"] = { code: "N44.3", description: "Torsion of appendix epididymis", category: "N44", excludes1: [], excludes2: [], includes: [], commonUse: ["Appendix epididymis torsion"], documentation: ["Ultrasound scrotum"] };
  codes["N44.8"] = { code: "N44.8", description: "Other noninflammatory disorders of scrotum", category: "N44", excludes1: [], excludes2: [], includes: [], commonUse: ["Scrotal disorder"], documentation: ["Ultrasound scrotum"] };
  codes["N44.9"] = { code: "N44.9", description: "Noninflammatory disorder of scrotum, unspecified", category: "N44", excludes1: [], excludes2: [], includes: [], commonUse: ["Scrotal disorder NOS"], documentation: ["Ultrasound scrotum"] };
  codes["N45.0"] = { code: "N45.0", description: "Epididymitis, orchitis", category: "N45", excludes1: [], excludes2: [], includes: [], commonUse: ["Epididymo-orchitis"], documentation: ["Ultrasound scrotum", "UA"] };
  codes["N45.1"] = { code: "N45.1", description: "Epididymitis, orchitis, unspecified", category: "N45", excludes1: [], excludes2: [], includes: [], commonUse: ["Epididymitis NOS"], documentation: ["Ultrasound scrotum"] };
  codes["N45.2"] = { code: "N45.2", description: "Abscess of epididymis, testis", category: "N45", excludes1: [], excludes2: [], includes: [], commonUse: ["Epididymo-testicular abscess"], documentation: ["Ultrasound scrotum"] };
  codes["N45.3"] = { code: "N45.3", description: "Funiculitis", category: "N45", excludes1: [], excludes2: [], includes: [], commonUse: ["Funiculitis"], documentation: ["Ultrasound scrotum"] };
  codes["N45.9"] = { code: "N45.9", description: "Epididymitis, orchitis, unspecified", category: "N45", excludes1: [], excludes2: [], includes: [], commonUse: ["Epididymo-orchitis NOS"], documentation: ["Ultrasound scrotum"] };
  codes["N46.0"] = { code: "N46.0", description: "Azoospermia", category: "N46", excludes1: [], excludes2: [], includes: [], commonUse: ["Azoospermia"], documentation: ["Semen analysis"] };
  codes["N46.1"] = { code: "N46.1", description: "Oligospermia, not elsewhere classified", category: "N46", excludes1: [], excludes2: [], includes: [], commonUse: ["Low sperm count"], documentation: ["Semen analysis"] };
  codes["N46.2"] = { code: "N46.2", description: "Empty scrotum", category: "N46", excludes1: [], excludes2: [], includes: [], commonUse: ["Empty scrotum"], documentation: ["Ultrasound scrotum"] };
  codes["N46.3"] = { code: "N46.3", description: "Infertility due to seminiferous tubule dysfunction", category: "N46", excludes1: [], excludes2: [], includes: [], commonUse: ["Seminiferous tubule dysfunction"], documentation: ["Semen analysis"] };
  codes["N46.4"] = { code: "N46.4", description: "Azoospermia factor locus deletion", category: "N46", excludes1: [], excludes2: [], includes: [], commonUse: ["AZF deletion"], documentation: ["Genetic testing"] };
  codes["N46.5"] = { code: "N46.5", description: "Disorders of spermatozoa, not elsewhere classified", category: "N46", excludes1: [], excludes2: [], includes: [], commonUse: ["Sperm disorder"], documentation: ["Semen analysis"] };
  codes["N46.6"] = { code: "N46.6", description: "Male infertility, unspecified", category: "N46", excludes1: [], excludes2: [], includes: [], commonUse: ["Male infertility NOS"], documentation: ["Semen analysis"] };
  codes["N46.9"] = { code: "N46.9", description: "Male genital organ disorder, unspecified", category: "N46", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital disorder NOS"], documentation: ["Physical exam"] };
  codes["N47.0"] = { code: "N47.0", description: "Phimosis", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Phimosis"], documentation: ["Clinical exam"] };
  codes["N47.1"] = { code: "N47.1", description: "Paraphimosis", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Paraphimosis"], documentation: ["Clinical exam"] };
  codes["N47.2"] = { code: "N47.2", description: "Balanitis", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Balanitis"], documentation: ["Clinical exam"] };
  codes["N47.3"] = { code: "N47.3", description: "Balanoposthitis", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Balanoposthitis"], documentation: ["Clinical exam"] };
  codes["N47.4"] = { code: "N47.4", description: "Other inflammatory conditions of prepuce and glans penis", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile inflammation"], documentation: ["Clinical exam"] };
  codes["N47.5"] = { code: "N47.5", description: "Adhesions of prepuce and glans penis", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Preputial adhesions"], documentation: ["Clinical exam"] };
  codes["N47.6"] = { code: "N47.6", description: "Other disorders of prepuce", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Prepuce disorder"], documentation: ["Clinical exam"] };
  codes["N47.7"] = { code: "N47.7", description: "Other disorders of penis", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile disorder"], documentation: ["Clinical exam"] };
  codes["N47.8"] = { code: "N47.8", description: "Other disorders of penis, not elsewhere classified", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile disorder"], documentation: ["Clinical exam"] };
  codes["N47.9"] = { code: "N47.9", description: "Disorder of prepuce, unspecified", category: "N47", excludes1: [], excludes2: [], includes: [], commonUse: ["Prepuce disorder NOS"], documentation: ["Clinical exam"] };
  codes["N48.0"] = { code: "N48.0", description: "Leukoplakia of penis", category: "N48", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile leukoplakia"], documentation: ["Biopsy"] };
  codes["N48.1"] = { code: "N48.1", description: "Balanitis xerotica obliterans", category: "N48", excludes1: [], excludes2: [], includes: [], commonUse: ["Lichen sclerosus penis"], documentation: ["Biopsy"] };
  codes["N48.2"] = { code: "N48.2", description: "Other inflammatory disorders of penis", category: "N48", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile inflammation"], documentation: ["Clinical exam"] };
  codes["N48.3"] = { code: "N48.3", description: "Peyronie disease", category: "N48", excludes1: [], excludes2: [], includes: [], commonUse: ["Peyronie disease"], documentation: ["Clinical exam", "Ultrasound"] };
  codes["N48.4"] = { code: "N48.4", description: "Impotence of organic origin", category: "N48", excludes1: [], excludes2: [], includes: [], commonUse: ["Erectile dysfunction"], documentation: ["Testosterone level"] };
  codes["N48.5"] = { code: "N48.5", description: "Ulcer of penis, noninfective", category: "N48", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile ulcer"], documentation: ["Biopsy"] };
  codes["N48.6"] = { code: "N48.6", description: "Induration of penis, noninflammatory", category: "N48", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile induration"], documentation: ["Clinical exam"] };
  codes["N48.8"] = { code: "N48.8", description: "Other specified disorders of penis", category: "N48", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile disorder"], documentation: ["Clinical exam"] };
  codes["N48.9"] = { code: "N48.9", description: "Disorder of penis, unspecified", category: "N48", excludes1: [], excludes2: [], includes: [], commonUse: ["Penile disorder NOS"], documentation: ["Clinical exam"] };
  codes["N49.0"] = { code: "N49.0", description: "Inflammatory disorders of male genital organs, unspecified", category: "N49", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital inflammation"], documentation: ["UA"] };
  codes["N49.1"] = { code: "N49.1", description: "Seminal vesiculitis", category: "N49", excludes1: [], excludes2: [], includes: [], commonUse: ["Seminal vesiculitis"], documentation: ["Ultrasound"] };
  codes["N49.2"] = { code: "N49.2", description: "Abscess of male genital organs", category: "N49", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital abscess"], documentation: ["Ultrasound"] };
  codes["N49.8"] = { code: "N49.8", description: "Other specified inflammatory disorders of male genital organs", category: "N49", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital inflammation"], documentation: ["Clinical exam"] };
  codes["N49.9"] = { code: "N49.9", description: "Inflammatory disorder of male genital organ, unspecified", category: "N49", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital inflammation NOS"], documentation: ["Clinical exam"] };
  codes["N50.0"] = { code: "N50.0", description: "Atrophy of testis", category: "N50", excludes1: [], excludes2: [], includes: [], commonUse: ["Testicular atrophy"], documentation: ["Testosterone level", "Ultrasound"] };
  codes["N50.1"] = { code: "N50.1", description: "Hydrocele of tunica vaginalis", category: "N50", excludes1: [], excludes2: [], includes: [], commonUse: ["Hydrocele"], documentation: ["Ultrasound scrotum"] };
  codes["N50.8"] = { code: "N50.8", description: "Other specified disorders of male genital organs", category: "N50", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital disorder"], documentation: ["Clinical exam"] };
  codes["N50.9"] = { code: "N50.9", description: "Disorder of male genital organs, unspecified", category: "N50", excludes1: [], excludes2: [], includes: [], commonUse: ["Male genital disorder NOS"], documentation: ["Clinical exam"] };
  codes["O00.0"] = { code: "O00.0", description: "Abdominal pregnancy", category: "O00", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal pregnancy"], documentation: ["Ultrasound", "HCG"] };
  codes["O00.1"] = { code: "O00.1", description: "Tubal pregnancy", category: "O00", excludes1: [], excludes2: [], includes: [], commonUse: ["Ectopic tubal pregnancy"], documentation: ["Ultrasound", "HCG"] };
  codes["O00.2"] = { code: "O00.2", description: "Ovarian pregnancy", category: "O00", excludes1: [], excludes2: [], includes: [], commonUse: ["Ovarian ectopic"], documentation: ["Ultrasound", "HCG"] };
  codes["O00.8"] = { code: "O00.8", description: "Other ectopic pregnancy", category: "O00", excludes1: [], excludes2: [], includes: [], commonUse: ["Ectopic pregnancy NOS"], documentation: ["Ultrasound", "HCG"] };
  codes["O00.9"] = { code: "O00.9", description: "Ectopic pregnancy, unspecified", category: "O00", excludes1: [], excludes2: [], includes: [], commonUse: ["Ectopic pregnancy NOS"], documentation: ["HCG", "Ultrasound"] };
  codes["O01.0"] = { code: "O01.0", description: "Classical hydatidiform mole", category: "O01", excludes1: [], excludes2: [], includes: [], commonUse: ["Complete mole"], documentation: ["Ultrasound", "HCG"] };
  codes["O01.1"] = { code: "O01.1", description: "Incomplete and partial hydatidiform mole", category: "O01", excludes1: [], excludes2: [], includes: [], commonUse: ["Partial mole"], documentation: ["Ultrasound", "HCG"] };
  codes["O01.9"] = { code: "O01.9", description: "Hydatidiform mole, unspecified", category: "O01", excludes1: [], excludes2: [], includes: [], commonUse: ["Mole NOS"], documentation: ["Ultrasound"] };
  codes["O02.0"] = { code: "O02.0", description: "Blighted ovum and anembryonic pregnancy", category: "O02", excludes1: [], excludes2: [], includes: [], commonUse: ["Blighted ovum"], documentation: ["Ultrasound"] };
  codes["O02.1"] = { code: "O02.1", description: "Missed abortion", category: "O02", excludes1: [], excludes2: [], includes: [], commonUse: ["Missed abortion"], documentation: ["Ultrasound", "HCG"] };
  codes["O03.0"] = { code: "O03.0", description: "Spontaneous abortion, unspecified, without complication", category: "O03", excludes1: [], excludes2: [], includes: [], commonUse: ["Spontaneous abortion NOS"], documentation: ["Ultrasound", "HCG"] };
  codes["O03.1"] = { code: "O03.1", description: "Spontaneous abortion, unspecified, with incomplete expulsion", category: "O03", excludes1: [], excludes2: [], includes: [], commonUse: ["Incomplete abortion"], documentation: ["Ultrasound"] };
  codes["O03.2"] = { code: "O03.2", description: "Spontaneous abortion, unspecified, with retained products", category: "O03", excludes1: [], excludes2: [], includes: [], commonUse: ["Retained products"], documentation: ["Ultrasound"] };
  codes["O03.3"] = { code: "O03.3", description: "Spontaneous abortion, unspecified, with complications", category: "O03", excludes1: [], excludes2: [], includes: [], commonUse: ["Abortion with complications"], documentation: ["Ultrasound", "CBC"] };
  codes["O03.4"] = { code: "O03.4", description: "Spontaneous abortion, incomplete, without complication", category: "O03", excludes1: [], excludes2: [], includes: [], commonUse: ["Incomplete abortion NOS"], documentation: ["Ultrasound"] };
  codes["O03.8"] = { code: "O03.8", description: "Spontaneous abortion, other types, without complication", category: "O03", excludes1: [], excludes2: [], includes: [], commonUse: ["Spontaneous abortion"], documentation: ["Ultrasound"] };
  codes["O03.9"] = { code: "O03.9", description: "Spontaneous abortion, other types, with complications", category: "O03", excludes1: [], excludes2: [], includes: [], commonUse: ["Abortion with complications"], documentation: ["Ultrasound"] };
  codes["O04.0"] = { code: "O04.0", description: "Legal abortion, unspecified, without complication", category: "O04", excludes1: [], excludes2: [], includes: [], commonUse: ["Legal abortion NOS"], documentation: ["Ultrasound", "HCG"] };
  codes["O04.1"] = { code: "O04.1", description: "Legal abortion, unspecified, with incomplete expulsion", category: "O04", excludes1: [], excludes2: [], includes: [], commonUse: ["Incomplete legal abortion"], documentation: ["Ultrasound"] };
  codes["O04.2"] = { code: "O04.2", description: "Legal abortion, unspecified, with retained products", category: "O04", excludes1: [], excludes2: [], includes: [], commonUse: ["Retained products after abortion"], documentation: ["Ultrasound"] };
  codes["O04.3"] = { code: "O04.3", description: "Legal abortion, unspecified, with complications", category: "O04", excludes1: [], excludes2: [], includes: [], commonUse: ["Legal abortion with complications"], documentation: ["Ultrasound"] };
  codes["O04.6"] = { code: "O04.6", description: "Legal abortion, unspecified, delayed or excessive hemorrhage", category: "O04", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemorrhage after abortion"], documentation: ["CBC", "Ultrasound"] };
  codes["O06.0"] = { code: "O06.0", description: "Unspecified abortion, without complication", category: "O06", excludes1: [], excludes2: [], includes: [], commonUse: ["Abortion NOS"], documentation: ["Ultrasound", "HCG"] };
  codes["O06.1"] = { code: "O06.1", description: "Unspecified abortion, with incomplete expulsion", category: "O06", excludes1: [], excludes2: [], includes: [], commonUse: ["Incomplete abortion"], documentation: ["Ultrasound"] };
  codes["O06.2"] = { code: "O06.2", description: "Unspecified abortion, with retained products", category: "O06", excludes1: [], excludes2: [], includes: [], commonUse: ["Retained products"], documentation: ["Ultrasound"] };
  codes["O06.3"] = { code: "O06.3", description: "Unspecified abortion, with complications", category: "O06", excludes1: [], excludes2: [], includes: [], commonUse: ["Abortion with complications"], documentation: ["Ultrasound"] };
  codes["O06.4"] = { code: "O06.4", description: "Unspecified incomplete abortion, without complication", category: "O06", excludes1: [], excludes2: [], includes: [], commonUse: ["Incomplete abortion NOS"], documentation: ["Ultrasound"] };
  codes["O06.8"] = { code: "O06.8", description: "Unspecified, other types of abortion, without complication", category: "O06", excludes1: [], excludes2: [], includes: [], commonUse: ["Abortion NOS"], documentation: ["Ultrasound"] };
  codes["O06.9"] = { code: "O06.9", description: "Unspecified, other types of abortion, with complications", category: "O06", excludes1: [], excludes2: [], includes: [], commonUse: ["Abortion with complications"], documentation: ["Ultrasound"] };
  codes["O07.0"] = { code: "O07.0", description: "Failed medical abortion, unspecified, without complication", category: "O07", excludes1: [], excludes2: [], includes: [], commonUse: ["Failed medical abortion"], documentation: ["HCG", "Ultrasound"] };
  codes["O07.1"] = { code: "O07.1", description: "Failed medical abortion, unspecified, with incomplete expulsion", category: "O07", excludes1: [], excludes2: [], includes: [], commonUse: ["Failed medical abortion incomplete"], documentation: ["Ultrasound"] };
  codes["O07.2"] = { code: "O07.2", description: "Failed medical abortion, unspecified, with retained products", category: "O07", excludes1: [], excludes2: [], includes: [], commonUse: ["Failed medical abortion retained"], documentation: ["Ultrasound"] };
  codes["O07.3"] = { code: "O07.3", description: "Failed medical abortion, unspecified, with other complications", category: "O07", excludes1: [], excludes2: [], includes: [], commonUse: ["Failed medical abortion complication"], documentation: ["Ultrasound"] };
  codes["O07.4"] = { code: "O07.4", description: "Failed medical abortion, unspecified, without complication", category: "O07", excludes1: [], excludes2: [], includes: [], commonUse: ["Failed medical abortion"], documentation: ["HCG"] };
  codes["O08.0"] = { code: "O08.0", description: "Infection following ectopic and molar pregnancy", category: "O08", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-ectopic infection"], documentation: ["UA", "Blood cultures"] };
  codes["O08.1"] = { code: "O08.1", description: "Delayed or excessive hemorrhage following ectopic and molar pregnancy", category: "O08", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemorrhage post-ectopic"], documentation: ["CBC"] };
  codes["O08.2"] = { code: "O08.2", description: "Embolism following ectopic and molar pregnancy", category: "O08", excludes1: [], excludes2: [], includes: [], commonUse: ["Embolism post-ectopic"], documentation: ["CT chest"] };
  codes["O08.3"] = { code: "O08.3", description: "Shock following ectopic and molar pregnancy", category: "O08", excludes1: [], excludes2: [], includes: [], commonUse: ["Shock post-ectopic"], documentation: ["BP", "Lactate"] };
  codes["O09.0"] = { code: "O09.0", description: "Pregnancy with abortive outcome, unspecified, gestation less than 6 weeks", category: "O09", excludes1: [], excludes2: [], includes: [], commonUse: ["Early pregnancy loss"], documentation: ["Ultrasound", "HCG"] };
  codes["O09.1"] = { code: "O09.1", description: "Pregnancy with abortive outcome, unspecified, gestation 6-10 weeks", category: "O09", excludes1: [], excludes2: [], includes: [], commonUse: ["Early pregnancy loss"], documentation: ["Ultrasound", "HCG"] };
  codes["O09.2"] = { code: "O09.2", description: "Pregnancy with abortive outcome, unspecified, gestation 11-12 weeks", category: "O09", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy loss"], documentation: ["Ultrasound"] };
  codes["O09.3"] = { code: "O09.3", description: "Pregnancy with abortive outcome, unspecified, gestation 13-27 weeks", category: "O09", excludes1: [], excludes2: [], includes: [], commonUse: ["Mid-trimester loss"], documentation: ["Ultrasound"] };
  codes["O09.5"] = { code: "O09.5", description: "Pregnancy with abortive outcome, unspecified, gestation unspecified", category: "O09", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy loss NOS"], documentation: ["Ultrasound", "HCG"] };
  codes["O10.0"] = { code: "O10.0", description: "Pre-existing essential hypertension complicating pregnancy", category: "O10", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic hypertension in pregnancy"], documentation: ["BP monitoring"] };
  codes["O10.1"] = { code: "O10.1", description: "Pre-existing hypertensive heart disease complicating pregnancy", category: "O10", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertensive heart disease pregnancy"], documentation: ["Echocardiogram"] };
  codes["O10.2"] = { code: "O10.2", description: "Pre-existing hypertensive chronic kidney disease complicating pregnancy", category: "O10", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertensive CKD pregnancy"], documentation: ["Creatinine"] };
  codes["O10.3"] = { code: "O10.3", description: "Pre-existing hypertensive heart and chronic kidney disease in pregnancy", category: "O10", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypertensive heart/KD pregnancy"], documentation: ["Echocardiogram", "Creatinine"] };
  codes["O10.4"] = { code: "O10.4", description: "Pre-existing secondary hypertension complicating pregnancy", category: "O10", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondary hypertension pregnancy"], documentation: ["BP monitoring"] };
  codes["O10.9"] = { code: "O10.9", description: "Pre-existing hypertension, unspecified, complicating pregnancy", category: "O10", excludes1: [], excludes2: [], includes: [], commonUse: ["Pre-existing hypertension NOS"], documentation: ["BP monitoring"] };
  codes["O11"] = { code: "O11", description: "Pre-existing hypertensive disorder with superimposed proteinuria", category: "O11", excludes1: [], excludes2: [], includes: [], commonUse: ["Pre-eclampsia superimposed on chronic HTN"], documentation: ["BP", "Urinalysis", "Creatinine"] };
  codes["O12.0"] = { code: "O12.0", description: "Gestational edema", category: "O12", excludes1: [], excludes2: [], includes: [], commonUse: ["Gestational edema"], documentation: ["Physical exam"] };
  codes["O12.1"] = { code: "O12.1", description: "Gestational proteinuria", category: "O12", excludes1: [], excludes2: [], includes: [], commonUse: ["Gestational proteinuria"], documentation: ["Urinalysis"] };
  codes["O12.2"] = { code: "O12.2", description: "Gestational edema with proteinuria", category: "O12", excludes1: [], excludes2: [], includes: [], commonUse: ["Gestational edema/proteinuria"], documentation: ["Urinalysis", "Physical exam"] };
  codes["O13"] = { code: "O13", description: "Gestational hypertension without significant proteinuria", category: "O13", excludes1: [], excludes2: [], includes: [], commonUse: ["Gestational hypertension"], documentation: ["BP monitoring"] };
  codes["O14.0"] = { code: "O14.0", description: "Mild to moderate pre-eclampsia", category: "O14", excludes1: [], excludes2: [], includes: [], commonUse: ["Mild pre-eclampsia"], documentation: ["BP", "Urinalysis", "LFTs"] };
  codes["O14.1"] = { code: "O14.1", description: "Severe pre-eclampsia", category: "O14", excludes1: [], excludes2: [], includes: [], commonUse: ["Severe pre-eclampsia"], documentation: ["BP", "Urinalysis", "LFTs", "CBC"] };
  codes["O14.2"] = { code: "O14.2", description: "HELLP syndrome", category: "O14", excludes1: [], excludes2: [], includes: [], commonUse: ["HELLP syndrome"], documentation: ["CBC", "LFTs", "LDH"] };
  codes["O14.9"] = { code: "O14.9", description: "Pre-eclampsia, unspecified", category: "O14", excludes1: [], excludes2: [], includes: [], commonUse: ["Pre-eclampsia NOS"], documentation: ["BP", "Urinalysis"] };
  codes["O15.0"] = { code: "O15.0", description: "Eclampsia complicating pregnancy, 20 weeks or more", category: "O15", excludes1: [], excludes2: [], includes: [], commonUse: ["Eclampsia"], documentation: ["Neuro exam", "BP"] };
  codes["O15.1"] = { code: "O15.1", description: "Eclampsia complicating labor", category: "O15", excludes1: [], excludes2: [], includes: [], commonUse: ["Eclampsia in labor"], documentation: ["Neuro exam", "BP"] };
  codes["O15.2"] = { code: "O15.2", description: "Eclampsia, unspecified as to episode of care", category: "O15", excludes1: [], excludes2: [], includes: [], commonUse: ["Eclampsia NOS"], documentation: ["Neuro exam"] };
  codes["O15.9"] = { code: "O15.9", description: "Eclampsia, unspecified", category: "O15", excludes1: [], excludes2: [], includes: [], commonUse: ["Eclampsia NOS"], documentation: ["Neuro exam"] };
  codes["O16"] = { code: "O16", description: "Maternal hypertension, unspecified", category: "O16", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal hypertension NOS"], documentation: ["BP monitoring"] };
  codes["O20.0"] = { code: "O20.0", description: "Threatened abortion", category: "O20", excludes1: [], excludes2: [], includes: [], commonUse: ["Threatened abortion"], documentation: ["Ultrasound", "HCG"] };
  codes["O20.8"] = { code: "O20.8", description: "Other hemorrhage in early pregnancy", category: "O20", excludes1: [], excludes2: [], includes: [], commonUse: ["Bleeding in early pregnancy"], documentation: ["Ultrasound", "HCG"] };
  codes["O20.9"] = { code: "O20.9", description: "Hemorrhage in early pregnancy, unspecified", category: "O20", excludes1: [], excludes2: [], includes: [], commonUse: ["First trimester bleeding"], documentation: ["Ultrasound", "HCG"] };
  codes["O21.0"] = { code: "O21.0", description: "Mild hyperemesis gravidarum", category: "O21", excludes1: [], excludes2: [], includes: [], commonUse: ["Morning sickness"], documentation: ["Weight", "Electrolytes"] };
  codes["O21.1"] = { code: "O21.1", description: "Hyperemesis gravidarum with metabolic disturbance", category: "O21", excludes1: [], excludes2: [], includes: [], commonUse: ["Severe hyperemesis"], documentation: ["Electrolytes", "Ketones"] };
  codes["O21.2"] = { code: "O21.2", description: "Late vomiting of pregnancy", category: "O21", excludes1: [], excludes2: [], includes: [], commonUse: ["Late pregnancy vomiting"], documentation: ["Electrolytes"] };
  codes["O21.8"] = { code: "O21.8", description: "Other vomiting complicating pregnancy", category: "O21", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy vomiting"], documentation: ["Electrolytes"] };
  codes["O21.9"] = { code: "O21.9", description: "Vomiting of pregnancy, unspecified", category: "O21", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy vomiting NOS"], documentation: ["Electrolytes"] };
  codes["O22.0"] = { code: "O22.0", description: "Deep phlebitis in pregnancy", category: "O22", excludes1: [], excludes2: [], includes: [], commonUse: ["DVT in pregnancy"], documentation: ["Doppler ultrasound"] };
  codes["O22.1"] = { code: "O22.1", description: "Superficial thrombophlebitis in pregnancy", category: "O22", excludes1: [], excludes2: [], includes: [], commonUse: ["Superficial thrombophlebitis"], documentation: ["Ultrasound"] };
  codes["O22.2"] = { code: "O22.2", description: "Superficial thrombophlebitis in pregnancy", category: "O22", excludes1: [], excludes2: [], includes: [], commonUse: ["Superficial DVT in pregnancy"], documentation: ["Ultrasound"] };
  codes["O22.3"] = { code: "O22.3", description: "Deep phlebitis in pregnancy", category: "O22", excludes1: [], excludes2: [], includes: [], commonUse: ["DVT in pregnancy"], documentation: ["Doppler ultrasound"] };
  codes["O22.4"] = { code: "O22.4", description: "Hemorrhoids in pregnancy", category: "O22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy hemorrhoids"], documentation: ["Clinical exam"] };
  codes["O22.5"] = { code: "O22.5", description: "Cerebral venous thrombosis in pregnancy", category: "O22", excludes1: [], excludes2: [], includes: [], commonUse: ["CVT in pregnancy"], documentation: ["CT venogram"] };
  codes["O23.0"] = { code: "O23.0", description: "Infections of kidney in pregnancy", category: "O23", excludes1: [], excludes2: [], includes: [], commonUse: ["Pyelonephritis in pregnancy"], documentation: ["UA", "Urine culture"] };
  codes["O23.1"] = { code: "O23.1", description: "Infections of bladder in pregnancy", category: "O23", excludes1: [], excludes2: [], includes: [], commonUse: ["UTI in pregnancy"], documentation: ["UA", "Urine culture"] };
  codes["O23.3"] = { code: "O23.3", description: "Other urinary tract infections in pregnancy", category: "O23", excludes1: [], excludes2: [], includes: [], commonUse: ["UTI in pregnancy"], documentation: ["UA", "Urine culture"] };
  codes["O23.9"] = { code: "O23.9", description: "Infection of genitourinary tract in pregnancy, unspecified", category: "O23", excludes1: [], excludes2: [], includes: [], commonUse: ["GU infection NOS"], documentation: ["UA"] };
  codes["O24.0"] = { code: "O24.0", description: "Pre-existing diabetes mellitus type 1 in pregnancy", category: "O24", excludes1: [], excludes2: [], includes: [], commonUse: ["Type 1 DM in pregnancy"], documentation: ["Glucose monitoring", "HbA1c"] };
  codes["O24.1"] = { code: "O24.1", description: "Pre-existing diabetes mellitus type 2 in pregnancy", category: "O24", excludes1: [], excludes2: [], includes: [], commonUse: ["Type 2 DM in pregnancy"], documentation: ["Glucose monitoring", "HbA1c"] };
  codes["O24.3"] = { code: "O24.3", description: "Gestational diabetes mellitus, diet controlled", category: "O24", excludes1: [], excludes2: [], includes: [], commonUse: ["GDM diet controlled"], documentation: ["Glucose tolerance test"] };
  codes["O24.4"] = { code: "O24.4", description: "Gestational diabetes mellitus, unspecified", category: "O24", excludes1: [], excludes2: [], includes: [], commonUse: ["GDM NOS"], documentation: ["Glucose tolerance test"] };
  codes["O24.8"] = { code: "O24.8", description: "Other pre-existing diabetes in pregnancy", category: "O24", excludes1: [], excludes2: [], includes: [], commonUse: ["Other DM in pregnancy"], documentation: ["Glucose"] };
  codes["O24.9"] = { code: "O24.9", description: "Diabetes mellitus in pregnancy, unspecified", category: "O24", excludes1: [], excludes2: [], includes: [], commonUse: ["DM in pregnancy NOS"], documentation: ["Glucose"] };
  codes["O25.0"] = { code: "O25.0", description: "Inadequate weight gain in pregnancy", category: "O25", excludes1: [], excludes2: [], includes: [], commonUse: ["Poor weight gain pregnancy"], documentation: ["Weight monitoring"] };
  codes["O25.1"] = { code: "O25.1", description: "Malnutrition in pregnancy", category: "O25", excludes1: [], excludes2: [], includes: [], commonUse: ["Malnutrition pregnancy"], documentation: ["Albumin", "Prealbumin"] };
  codes["O25.3"] = { code: "O25.3", description: "Excessive weight gain in pregnancy", category: "O25", excludes1: [], excludes2: [], includes: [], commonUse: ["Excessive weight gain pregnancy"], documentation: ["Weight monitoring"] };
  codes["O26.0"] = { code: "O26.0", description: "Low placental implantation", category: "O26", excludes1: [], excludes2: [], includes: [], commonUse: ["Low-lying placenta"], documentation: ["Ultrasound"] };
  codes["O26.1"] = { code: "O26.1", description: "Placenta previa", category: "O26", excludes1: [], excludes2: [], includes: [], commonUse: ["Placenta previa"], documentation: ["Ultrasound"] };
  codes["O26.2"] = { code: "O26.2", description: "Placental insufficiency", category: "O26", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental insufficiency"], documentation: ["Doppler ultrasound"] };
  codes["O26.3"] = { code: "O26.3", description: "Retained placenta, unspecified", category: "O26", excludes1: [], excludes2: [], includes: [], commonUse: ["Retained placenta"], documentation: ["Ultrasound"] };
  codes["O26.4"] = { code: "O26.4", description: "Placental infarction", category: "O26", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental infarction"], documentation: ["Pathology"] };
  codes["O26.5"] = { code: "O26.5", description: "Venous complications in pregnancy", category: "O26", excludes1: [], excludes2: [], includes: [], commonUse: ["Venous complication pregnancy"], documentation: ["Doppler ultrasound"] };
  codes["O26.6"] = { code: "O26.6", description: "Liver complications in pregnancy", category: "O26", excludes1: [], excludes2: [], includes: [], commonUse: ["Liver complication pregnancy"], documentation: ["LFTs"] };
  codes["O26.8"] = { code: "O26.8", description: "Other specified pregnancy-related conditions", category: "O26", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy-related condition"], documentation: ["Various"] };
  codes["O26.9"] = { code: "O26.9", description: "Pregnancy-related condition, unspecified", category: "O26", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy condition NOS"], documentation: ["Various"] };
  codes["O28.0"] = { code: "O28.0", description: "Abnormal hematological finding in pregnancy", category: "O28", excludes1: [], excludes2: [], includes: [], commonUse: ["Hematologic abnormality pregnancy"], documentation: ["CBC"] };
  codes["O28.1"] = { code: "O28.1", description: "Abnormal biochemical finding in pregnancy", category: "O28", excludes1: [], excludes2: [], includes: [], commonUse: ["Biochemical abnormality pregnancy"], documentation: ["Chem panel"] };
  codes["O28.2"] = { code: "O28.2", description: "Abnormal cytological finding in pregnancy", category: "O28", excludes1: [], excludes2: [], includes: [], commonUse: ["Cytologic abnormality pregnancy"], documentation: ["Pap smear"] };
  codes["O28.3"] = { code: "O28.3", description: "Abnormal radiological finding in pregnancy", category: "O28", excludes1: [], excludes2: [], includes: [], commonUse: ["Radiologic abnormality pregnancy"], documentation: ["X-ray"] };
  codes["O28.4"] = { code: "O28.4", description: "Abnormal ultrasonic finding in pregnancy", category: "O28", excludes1: [], excludes2: [], includes: [], commonUse: ["Ultrasound abnormality pregnancy"], documentation: ["Ultrasound"] };
  codes["O28.5"] = { code: "O28.5", description: "Abnormal chromosomal and genetic finding in pregnancy", category: "O28", excludes1: [], excludes2: [], includes: [], commonUse: ["Genetic abnormality pregnancy"], documentation: ["Amniocentesis", "CVS"] };
  codes["O28.8"] = { code: "O28.8", description: "Other abnormal findings on antenatal screening of mother", category: "O28", excludes1: [], excludes2: [], includes: [], commonUse: ["Antenatal screening abnormal"], documentation: ["Various"] };
  codes["O30.0"] = { code: "O30.0", description: "Twin pregnancy, unspecified", category: "O30", excludes1: [], excludes2: [], includes: [], commonUse: ["Twin pregnancy"], documentation: ["Ultrasound"] };
  codes["O30.1"] = { code: "O30.1", description: "Twin pregnancy, dichorionic, diamniotic", category: "O30", excludes1: [], excludes2: [], includes: [], commonUse: ["Dichorionic twins"], documentation: ["Ultrasound"] };
  codes["O30.2"] = { code: "O30.2", description: "Twin pregnancy, monochorionic, diamniotic", category: "O30", excludes1: [], excludes2: [], includes: [], commonUse: ["Monochorionic diamniotic twins"], documentation: ["Ultrasound"] };
  codes["O30.8"] = { code: "O30.8", description: "Other multiple gestation", category: "O30", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple gestation"], documentation: ["Ultrasound"] };
  codes["O30.9"] = { code: "O30.9", description: "Multiple gestation, unspecified", category: "O30", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple gestation NOS"], documentation: ["Ultrasound"] };
  codes["O32.0"] = { code: "O32.0", description: "Maternal care for breech presentation before labor", category: "O32", excludes1: [], excludes2: [], includes: [], commonUse: ["Breech presentation"], documentation: ["Ultrasound"] };
  codes["O32.1"] = { code: "O32.1", description: "Maternal care for transverse or oblique lie", category: "O32", excludes1: [], excludes2: [], includes: [], commonUse: ["Transverse lie"], documentation: ["Ultrasound"] };
  codes["O32.2"] = { code: "O32.2", description: "Maternal care for face, brow, or chin presentation", category: "O32", excludes1: [], excludes2: [], includes: [], commonUse: ["Face presentation"], documentation: ["Ultrasound"] };
  codes["O32.3"] = { code: "O32.3", description: "Maternal care for high head at term", category: "O32", excludes1: [], excludes2: [], includes: [], commonUse: ["High head"], documentation: ["Clinical exam"] };
  codes["O32.6"] = { code: "O32.6", description: "Maternal care for fetal malposition", category: "O32", excludes1: [], excludes2: [], includes: [], commonUse: ["Fetal malposition"], documentation: ["Ultrasound"] };
  codes["O35.0"] = { code: "O35.0", description: "Maternal care for central nervous system malformation in fetus", category: "O35", excludes1: [], excludes2: [], includes: [], commonUse: ["Fetal CNS malformation"], documentation: ["Ultrasound"] };
  codes["O35.1"] = { code: "O35.1", description: "Maternal care for chromosomal abnormality in fetus", category: "O35", excludes1: [], excludes2: [], includes: [], commonUse: ["Fetal chromosomal abnormality"], documentation: ["Amniocentesis", "CVS"] };
  codes["O35.5"] = { code: "O35.5", description: "Maternal care for fetal growth restriction", category: "O35", excludes1: [], excludes2: [], includes: [], commonUse: ["FGR", "IUGR"], documentation: ["Ultrasound"] };
  codes["O35.7"] = { code: "O35.7", description: "Maternal care for hemolytic disease of fetus", category: "O35", excludes1: [], excludes2: [], includes: [], commonUse: ["Fetal hemolytic disease"], documentation: ["Ultrasound", "Amniocentesis"] };
  codes["O36.0"] = { code: "O36.0", description: "Maternal care for Rh incompatibility", category: "O36", excludes1: [], excludes2: [], includes: [], commonUse: ["Rh incompatibility"], documentation: ["Antibody screen"] };
  codes["O36.3"] = { code: "O36.3", description: "Maternal care for hydrops fetalis", category: "O36", excludes1: [], excludes2: [], includes: [], commonUse: ["Hydrops fetalis"], documentation: ["Ultrasound"] };
  codes["O36.4"] = { code: "O36.4", description: "Maternal care for intrauterine fetal death", category: "O36", excludes1: [], excludes2: [], includes: [], commonUse: ["Fetal demise"], documentation: ["Ultrasound"] };
  codes["O36.5"] = { code: "O36.5", description: "Maternal care for poor fetal growth", category: "O36", excludes1: [], excludes2: [], includes: [], commonUse: ["FGR"], documentation: ["Ultrasound"] };
  codes["O36.6"] = { code: "O36.6", description: "Maternal care for excessive fetal growth", category: "O36", excludes1: [], excludes2: [], includes: [], commonUse: ["Macrosomia"], documentation: ["Ultrasound"] };
  codes["O40.0"] = { code: "O40.0", description: "Polyhydramnios", category: "O40", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyhydramnios"], documentation: ["Ultrasound"] };
  codes["O40.1"] = { code: "O40.1", description: "Oligohydramnios", category: "O40", excludes1: [], excludes2: [], includes: [], commonUse: ["Oligohydramnios"], documentation: ["Ultrasound"] };
  codes["O41.0"] = { code: "O41.0", description: "Oligohydramnios", category: "O41", excludes1: [], excludes2: [], includes: [], commonUse: ["Oligohydramnios"], documentation: ["Ultrasound"] };
  codes["O41.1"] = { code: "O41.1", description: "Infection of amniotic sac and membranes", category: "O41", excludes1: [], excludes2: [], includes: [], commonUse: ["Chorioamnionitis"], documentation: ["Amniocentesis"] };
  codes["O42.0"] = { code: "O42.0", description: "Premature rupture of membranes, onset of labor within 24 hours", category: "O42", excludes1: [], excludes2: [], includes: [], commonUse: ["PROM"], documentation: ["Sterile speculum exam"] };
  codes["O42.1"] = { code: "O42.1", description: "Premature rupture of membranes, onset of labor after 24 hours", category: "O42", excludes1: [], excludes2: [], includes: [], commonUse: ["PROM delayed"], documentation: ["Sterile speculum exam"] };
  codes["O42.2"] = { code: "O42.2", description: "Premature rupture of membranes, labor delayed by therapy", category: "O42", excludes1: [], excludes2: [], includes: [], commonUse: ["PROM with tocolysis"], documentation: ["Sterile speculum exam"] };
  codes["O42.9"] = { code: "O42.9", description: "Premature rupture of membranes, unspecified", category: "O42", excludes1: [], excludes2: [], includes: [], commonUse: ["PROM NOS"], documentation: ["Sterile speculum exam"] };
  codes["O44.0"] = { code: "O44.0", description: "Low-lying placenta", category: "O44", excludes1: [], excludes2: [], includes: [], commonUse: ["Low-lying placenta"], documentation: ["Ultrasound"] };
  codes["O44.1"] = { code: "O44.1", description: "Placenta previa", category: "O44", excludes1: [], excludes2: [], includes: [], commonUse: ["Placenta previa"], documentation: ["Ultrasound"] };
  codes["O45.0"] = { code: "O45.0", description: "Placental abruption, unspecified", category: "O45", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental abruption"], documentation: ["Ultrasound", "CBC"] };
  codes["O46.0"] = { code: "O46.0", description: "Antepartum hemorrhage, unspecified", category: "O46", excludes1: [], excludes2: [], includes: [], commonUse: ["Antepartum hemorrhage"], documentation: ["Ultrasound", "CBC"] };
  codes["O47.0"] = { code: "O47.0", description: "False labor before 37 completed weeks", category: "O47", excludes1: [], excludes2: [], includes: [], commonUse: ["False labor preterm"], documentation: ["CTG", "Vaginal exam"] };
  codes["O47.1"] = { code: "O47.1", description: "False labor after 37 completed weeks", category: "O47", excludes1: [], excludes2: [], includes: [], commonUse: ["False labor term"], documentation: ["CTG", "Vaginal exam"] };
  codes["O48.0"] = { code: "O48.0", description: "Prolonged pregnancy", category: "O48", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-term pregnancy"], documentation: ["Ultrasound", "NST"] };
  codes["O60.0"] = { code: "O60.0", description: "Preterm labor without delivery", category: "O60", excludes1: [], excludes2: [], includes: [], commonUse: ["Preterm labor"], documentation: ["CTG", "Fibronectin"] };
  codes["O60.1"] = { code: "O60.1", description: "Preterm labor with delivery", category: "O60", excludes1: [], excludes2: [], includes: [], commonUse: ["Preterm delivery"], documentation: ["CTG"] };
  codes["O60.2"] = { code: "O60.2", description: "Preterm labor with delivery before 32 completed weeks", category: "O60", excludes1: [], excludes2: [], includes: [], commonUse: ["Very preterm delivery"], documentation: ["CTG"] };
  codes["O60.3"] = { code: "O60.3", description: "Preterm labor with delivery after 32 completed weeks", category: "O60", excludes1: [], excludes2: [], includes: [], commonUse: ["Late preterm delivery"], documentation: ["CTG"] };
  codes["O61.0"] = { code: "O61.0", description: "Ineffective uterine contractions", category: "O61", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine atony"], documentation: ["CTG", "Vaginal exam"] };
  codes["O62.0"] = { code: "O62.0", description: "Primary functional dystocia", category: "O62", excludes1: [], excludes2: [], includes: [], commonUse: ["Primary dystocia"], documentation: ["CTG", "Vaginal exam"] };
  codes["O62.2"] = { code: "O62.2", description: "Other uterine inertia", category: "O62", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine inertia"], documentation: ["CTG"] };
  codes["O62.3"] = { code: "O62.3", description: "Precipitate labor", category: "O62", excludes1: [], excludes2: [], includes: [], commonUse: ["Precipitate labor"], documentation: ["Clinical exam"] };
  codes["O62.4"] = { code: "O62.4", description: "Hypertonic, incoordinate, and prolonged uterine contractions", category: "O62", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine tachysystole"], documentation: ["CTG"] };
  codes["O63.0"] = { code: "O63.0", description: "Prolonged first stage of labor", category: "O63", excludes1: [], excludes2: [], includes: [], commonUse: ["Prolonged first stage"], documentation: ["CTG", "Vaginal exam"] };
  codes["O63.1"] = { code: "O63.1", description: "Prolonged second stage of labor", category: "O63", excludes1: [], excludes2: [], includes: [], commonUse: ["Prolonged second stage"], documentation: ["CTG"] };
  codes["O64.0"] = { code: "O64.0", description: "Obstructed labor due to incomplete cephalic presentation", category: "O64", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstructed labor presentation"], documentation: ["Vaginal exam"] };
  codes["O64.1"] = { code: "O64.1", description: "Obstructed labor due to breech presentation", category: "O64", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstructed breech"], documentation: ["Vaginal exam"] };
  codes["O64.2"] = { code: "O64.2", description: "Obstructed labor due to face presentation", category: "O64", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstructed face presentation"], documentation: ["Vaginal exam"] };
  codes["O64.3"] = { code: "O64.3", description: "Obstructed labor due to brow presentation", category: "O64", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstructed brow presentation"], documentation: ["Vaginal exam"] };
  codes["O64.4"] = { code: "O64.4", description: "Obstructed labor due to transverse lie", category: "O64", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstructed transverse lie"], documentation: ["Vaginal exam"] };
  codes["O65.0"] = { code: "O65.0", description: "Obstructed labor due to contracted pelvis", category: "O65", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstructed labor pelvis"], documentation: ["CT"] };
  codes["O66.0"] = { code: "O66.0", description: "Obstructed labor due to shoulder dystocia", category: "O66", excludes1: [], excludes2: [], includes: [], commonUse: ["Shoulder dystocia"], documentation: ["Clinical assessment"] };
  codes["O66.4"] = { code: "O66.4", description: "Obstructed labor due to fetal macrosomia", category: "O66", excludes1: [], excludes2: [], includes: [], commonUse: ["Macrosomia obstructed"], documentation: ["Ultrasound"] };
  codes["O67.0"] = { code: "O67.0", description: "Intrapartum hemorrhage due to placenta previa", category: "O67", excludes1: [], excludes2: [], includes: [], commonUse: ["Placenta previa hemorrhage"], documentation: ["Ultrasound", "CBC"] };
  codes["O67.1"] = { code: "O67.1", description: "Intrapartum hemorrhage due to placental abruption", category: "O67", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental abruption hemorrhage"], documentation: ["Ultrasound", "CBC"] };
  codes["O68.0"] = { code: "O68.0", description: "Fetal heart rate anomaly", category: "O68", excludes1: [], excludes2: [], includes: [], commonUse: ["Fetal heart rate abnormality"], documentation: ["CTG"] };
  codes["O68.1"] = { code: "O68.1", description: "Fetal heart rate anomaly with meconium staining", category: "O68", excludes1: [], excludes2: [], includes: [], commonUse: ["FHR anomaly meconium"], documentation: ["CTG"] };
  codes["O68.2"] = { code: "O68.2", description: "Fetal heart rate anomaly with meconium staining and acidosis", category: "O68", excludes1: [], excludes2: [], includes: [], commonUse: ["FHR anomaly meconium acidosis"], documentation: ["CTG", "Fetal pH"] };
  codes["O68.3"] = { code: "O68.3", description: "Fetal heart rate anomaly with acidosis", category: "O68", excludes1: [], excludes2: [], includes: [], commonUse: ["FHR anomaly acidosis"], documentation: ["CTG", "Fetal pH"] };
  codes["O68.8"] = { code: "O68.8", description: "Other fetal distress, unspecified", category: "O68", excludes1: [], excludes2: [], includes: [], commonUse: ["Fetal distress"], documentation: ["CTG"] };
  codes["O69.0"] = { code: "O69.0", description: "Cord prolapse", category: "O69", excludes1: [], excludes2: [], includes: [], commonUse: ["Umbilical cord prolapse"], documentation: ["Vaginal exam", "CTG"] };
  codes["O69.1"] = { code: "O69.1", description: "Cord entanglement, without compression", category: "O69", excludes1: [], excludes2: [], includes: [], commonUse: ["Cord entanglement"], documentation: ["Doppler"] };
  codes["O69.4"] = { code: "O69.4", description: "True knot of umbilical cord", category: "O69", excludes1: [], excludes2: [], includes: [], commonUse: ["Cord knot"], documentation: ["Ultrasound"] };
  codes["O70.0"] = { code: "O70.0", description: "First degree perineal laceration", category: "O70", excludes1: [], excludes2: [], includes: [], commonUse: ["First degree tear"], documentation: ["Clinical exam"] };
  codes["O70.1"] = { code: "O70.1", description: "Second degree perineal laceration", category: "O70", excludes1: [], excludes2: [], includes: [], commonUse: ["Second degree tear"], documentation: ["Clinical exam"] };
  codes["O70.2"] = { code: "O70.2", description: "Third degree perineal laceration", category: "O70", excludes1: [], excludes2: [], includes: [], commonUse: ["Third degree tear"], documentation: ["Clinical exam"] };
  codes["O70.3"] = { code: "O70.3", description: "Fourth degree perineal laceration", category: "O70", excludes1: [], excludes2: [], includes: [], commonUse: ["Fourth degree tear"], documentation: ["Clinical exam"] };
  codes["O71.0"] = { code: "O71.0", description: "Obstetric rupture of uterus before onset of labor", category: "O71", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine rupture"], documentation: ["Surgical exploration"] };
  codes["O71.1"] = { code: "O71.1", description: "Obstetric rupture of uterus during labor", category: "O71", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine rupture labor"], documentation: ["Surgical exploration"] };
  codes["O72.0"] = { code: "O72.0", description: "Primary postpartum hemorrhage", category: "O72", excludes1: [], excludes2: [], includes: [], commonUse: ["Postpartum hemorrhage"], documentation: ["CBC", "Clinical assessment"] };
  codes["O72.1"] = { code: "O72.1", description: "Secondary and delayed postpartum hemorrhage", category: "O72", excludes1: [], excludes2: [], includes: [], commonUse: ["Delayed PPH"], documentation: ["CBC"] };
  codes["O72.2"] = { code: "O72.2", description: "Primary postpartum hemorrhage due to retained placenta", category: "O72", excludes1: [], excludes2: [], includes: [], commonUse: ["PPH retained placenta"], documentation: ["Ultrasound", "CBC"] };
  codes["O72.3"] = { code: "O72.3", description: "Postpartum coagulopathy", category: "O72", excludes1: [], excludes2: [], includes: [], commonUse: ["PPH coagulopathy"], documentation: ["PT/INR", "Fibrinogen", "CBC"] };
  codes["O73.0"] = { code: "O73.0", description: "Retained placenta without hemorrhage", category: "O73", excludes1: [], excludes2: [], includes: [], commonUse: ["Retained placenta"], documentation: ["Ultrasound"] };
  codes["O73.1"] = { code: "O73.1", description: "Retained portions of placenta or membranes without hemorrhage", category: "O73", excludes1: [], excludes2: [], includes: [], commonUse: ["Retained products"], documentation: ["Ultrasound"] };
  codes["O75.1"] = { code: "O75.1", description: "Shock during or following labor and delivery", category: "O75", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstetric shock"], documentation: ["BP", "Lactate"] };
  codes["O75.5"] = { code: "O75.5", description: "Cardiac arrest during labor and delivery", category: "O75", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstetric cardiac arrest"], documentation: ["ECG"] };
  codes["O80.0"] = { code: "O80.0", description: "Spontaneous vertex delivery", category: "O80", excludes1: [], excludes2: [], includes: [], commonUse: ["Spontaneous vaginal delivery"], documentation: ["Clinical exam"] };
  codes["O80.1"] = { code: "O80.1", description: "Spontaneous breech delivery", category: "O80", excludes1: [], excludes2: [], includes: [], commonUse: ["Spontaneous breech delivery"], documentation: ["Clinical exam"] };
  codes["O80.8"] = { code: "O80.8", description: "Other spontaneous delivery", category: "O80", excludes1: [], excludes2: [], includes: [], commonUse: ["Spontaneous delivery NOS"], documentation: ["Clinical exam"] };
  codes["O81.0"] = { code: "O81.0", description: "Low forceps delivery", category: "O81", excludes1: [], excludes2: [], includes: [], commonUse: ["Low forceps"], documentation: ["Clinical exam"] };
  codes["O81.5"] = { code: "O81.5", description: "Vacuum-assisted delivery", category: "O81", excludes1: [], excludes2: [], includes: [], commonUse: ["Vacuum delivery"], documentation: ["Clinical exam"] };
  codes["O82.0"] = { code: "O82.0", description: "Cesarean delivery", category: "O82", excludes1: [], excludes2: [], includes: [], commonUse: ["C-section"], documentation: ["Surgical note"] };
  codes["O82.1"] = { code: "O82.1", description: "Cesarean delivery with total hysterectomy", category: "O82", excludes1: [], excludes2: [], includes: [], commonUse: ["C-section hysterectomy"], documentation: ["Surgical note"] };
  codes["O82.8"] = { code: "O82.8", description: "Other cesarean delivery", category: "O82", excludes1: [], excludes2: [], includes: [], commonUse: ["C-section NOS"], documentation: ["Surgical note"] };
  codes["O85.0"] = { code: "O85.0", description: "Sepsis following delivery", category: "O85", excludes1: [], excludes2: [], includes: [], commonUse: ["Postpartum sepsis"], documentation: ["Blood cultures", "CBC"] };
  codes["O86.0"] = { code: "O86.0", description: "Infection of obstetric surgical wound", category: "O86", excludes1: [], excludes2: [], includes: [], commonUse: ["C-section wound infection"], documentation: ["Wound culture"] };
  codes["O86.1"] = { code: "O86.1", description: "Infection of other obstetric wound", category: "O86", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstetric wound infection"], documentation: ["Wound culture"] };
  codes["O86.2"] = { code: "O86.2", description: "Urinary tract infection following delivery", category: "O86", excludes1: [], excludes2: [], includes: [], commonUse: ["Postpartum UTI"], documentation: ["UA"] };
  codes["O87.0"] = { code: "O87.0", description: "Deep phlebitis in the puerperium", category: "O87", excludes1: [], excludes2: [], includes: [], commonUse: ["Postpartum DVT"], documentation: ["Doppler ultrasound"] };
  codes["O88.0"] = { code: "O88.0", description: "Obstetric pulmonary embolism", category: "O88", excludes1: [], excludes2: [], includes: [], commonUse: ["Obstetric PE"], documentation: ["CT chest", "D-dimer"] };
  codes["O88.3"] = { code: "O88.3", description: "Obstetric amniotic fluid embolism", category: "O88", excludes1: [], excludes2: [], includes: [], commonUse: ["Amniotic fluid embolism"], documentation: ["Clinical assessment"] };
  codes["O90.0"] = { code: "O90.0", description: "Cardiac complications of the puerperium", category: "O90", excludes1: [], excludes2: [], includes: [], commonUse: ["Postpartum cardiac complication"], documentation: ["ECG", "Echocardiogram"] };
  codes["O90.1"] = { code: "O90.1", description: "Hemorrhagic complications of the puerperium", category: "O90", excludes1: [], excludes2: [], includes: [], commonUse: ["Postpartum hemorrhage"], documentation: ["CBC"] };
  codes["O90.3"] = { code: "O90.3", description: "Cardiomyopathy in the puerperium", category: "O90", excludes1: [], excludes2: [], includes: [], commonUse: ["Peripartum cardiomyopathy"], documentation: ["Echocardiogram"] };
  codes["O91.0"] = { code: "O91.0", description: "Infection of breast, areola", category: "O91", excludes1: [], excludes2: [], includes: [], commonUse: ["Areolar infection"], documentation: ["Wound culture"] };
  codes["O91.1"] = { code: "O91.1", description: "Abscess of breast", category: "O91", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast abscess"], documentation: ["Ultrasound"] };
  codes["O91.2"] = { code: "O91.2", description: "Nonpurulent mastitis", category: "O91", excludes1: [], excludes2: [], includes: [], commonUse: ["Mastitis"], documentation: ["Clinical exam"] };
  codes["O92.0"] = { code: "O92.0", description: "Retracted nipple", category: "O92", excludes1: [], excludes2: [], includes: [], commonUse: ["Retracted nipple"], documentation: ["Clinical exam"] };
  codes["O92.1"] = { code: "O92.1", description: "Cracked nipple", category: "O92", excludes1: [], excludes2: [], includes: [], commonUse: ["Cracked nipple"], documentation: ["Clinical exam"] };
  codes["O92.3"] = { code: "O92.3", description: "Agalactia", category: "O92", excludes1: [], excludes2: [], includes: [], commonUse: ["Agalactia", "Failure of lactation"], documentation: ["Clinical exam"] };
  codes["P00.0"] = { code: "P00.0", description: "Newborn affected by maternal hypertension", category: "P00", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal hypertension effect on newborn"], documentation: ["Clinical exam"] };
  codes["P00.1"] = { code: "P00.1", description: "Newborn affected by maternal renal disease", category: "P00", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal renal disease newborn"], documentation: ["Clinical exam"] };
  codes["P00.2"] = { code: "P00.2", description: "Newborn affected by maternal infections", category: "P00", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal infection effect"], documentation: ["Clinical exam"] };
  codes["P00.3"] = { code: "P00.3", description: "Newborn affected by maternal nutritional disorders", category: "P00", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal malnutrition effect"], documentation: ["Clinical exam"] };
  codes["P00.4"] = { code: "P00.4", description: "Newborn affected by maternal nutritional deficiency", category: "P00", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal deficiency effect"], documentation: ["Clinical exam"] };
  codes["P00.8"] = { code: "P00.8", description: "Newborn affected by other maternal conditions", category: "P00", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal condition effect on newborn"], documentation: ["Clinical exam"] };
  codes["P00.9"] = { code: "P00.9", description: "Newborn affected by maternal condition, unspecified", category: "P00", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal condition NOS"], documentation: ["Clinical exam"] };
  codes["P01.0"] = { code: "P01.0", description: "Newborn affected by incompetent cervix", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["Incompetent cervix effect"], documentation: ["Clinical exam"] };
  codes["P01.1"] = { code: "P01.1", description: "Newborn affected by premature rupture of membranes", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["PROM effect on newborn"], documentation: ["Clinical exam"] };
  codes["P01.2"] = { code: "P01.2", description: "Newborn affected by oligohydramnios", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["Oligohydramnios effect"], documentation: ["Clinical exam"] };
  codes["P01.3"] = { code: "P01.3", description: "Newborn affected by polyhydramnios", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyhydramnios effect"], documentation: ["Clinical exam"] };
  codes["P01.4"] = { code: "P01.4", description: "Newborn affected by ectopic pregnancy", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["Ectopic pregnancy effect"], documentation: ["Clinical exam"] };
  codes["P01.5"] = { code: "P01.5", description: "Newborn affected by multiple pregnancy", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple pregnancy effect"], documentation: ["Clinical exam"] };
  codes["P01.6"] = { code: "P01.6", description: "Newborn affected by maternal death", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal death effect"], documentation: ["Clinical exam"] };
  codes["P01.7"] = { code: "P01.7", description: "Newborn affected by malpresentation before labor", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["Malpresentation effect"], documentation: ["Clinical exam"] };
  codes["P01.8"] = { code: "P01.8", description: "Newborn affected by other maternal conditions", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal condition effect"], documentation: ["Clinical exam"] };
  codes["P01.9"] = { code: "P01.9", description: "Newborn affected by maternal condition, unspecified", category: "P01", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal condition NOS"], documentation: ["Clinical exam"] };
  codes["P02.0"] = { code: "P02.0", description: "Newborn affected by placenta previa", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Placenta previa effect"], documentation: ["Clinical exam"] };
  codes["P02.1"] = { code: "P02.1", description: "Newborn affected by placental abruption", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental abruption effect"], documentation: ["Clinical exam"] };
  codes["P02.2"] = { code: "P02.2", description: "Newborn affected by other disorders of placenta", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental disorder effect"], documentation: ["Clinical exam"] };
  codes["P02.3"] = { code: "P02.3", description: "Newborn affected by placental insufficiency", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental insufficiency effect"], documentation: ["Clinical exam"] };
  codes["P02.4"] = { code: "P02.4", description: "Newborn affected by prolapsed umbilical cord", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Cord prolapse effect"], documentation: ["Clinical exam"] };
  codes["P02.5"] = { code: "P02.5", description: "Newborn affected by other cord complications", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Cord complication effect"], documentation: ["Clinical exam"] };
  codes["P02.6"] = { code: "P02.6", description: "Newborn affected by other problems of umbilical cord", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Cord problem effect"], documentation: ["Clinical exam"] };
  codes["P02.7"] = { code: "P02.7", description: "Newborn affected by chorioamnionitis", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Chorioamnionitis effect"], documentation: ["Clinical exam"] };
  codes["P02.8"] = { code: "P02.8", description: "Newborn affected by other placental and membrane conditions", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental condition effect"], documentation: ["Clinical exam"] };
  codes["P02.9"] = { code: "P02.9", description: "Newborn affected by placental condition, unspecified", category: "P02", excludes1: [], excludes2: [], includes: [], commonUse: ["Placental condition NOS"], documentation: ["Clinical exam"] };
  codes["P03.0"] = { code: "P03.0", description: "Newborn affected by breech delivery and extraction", category: "P03", excludes1: [], excludes2: [], includes: [], commonUse: ["Breech delivery effect"], documentation: ["Clinical exam"] };
  codes["P03.1"] = { code: "P03.1", description: "Newborn affected by other malpresentation, malposition and disproportion", category: "P03", excludes1: [], excludes2: [], includes: [], commonUse: ["Malpresentation effect"], documentation: ["Clinical exam"] };
  codes["P03.2"] = { code: "P03.2", description: "Newborn affected by forceps delivery", category: "P03", excludes1: [], excludes2: [], includes: [], commonUse: ["Forceps delivery effect"], documentation: ["Clinical exam"] };
  codes["P03.3"] = { code: "P03.3", description: "Newborn affected by vacuum delivery", category: "P03", excludes1: [], excludes2: [], includes: [], commonUse: ["Vacuum delivery effect"], documentation: ["Clinical exam"] };
  codes["P03.4"] = { code: "P03.4", description: "Newborn affected by cesarean delivery", category: "P03", excludes1: [], excludes2: [], includes: [], commonUse: ["C-section effect"], documentation: ["Clinical exam"] };
  codes["P03.5"] = { code: "P03.5", description: "Newborn affected by precipitate labor", category: "P03", excludes1: [], excludes2: [], includes: [], commonUse: ["Precipitate labor effect"], documentation: ["Clinical exam"] };
  codes["P03.6"] = { code: "P03.6", description: "Newborn affected by abnormal uterine contractions", category: "P03", excludes1: [], excludes2: [], includes: [], commonUse: ["Abnormal contractions effect"], documentation: ["Clinical exam"] };
  codes["P03.8"] = { code: "P03.8", description: "Newborn affected by other complications of labor and delivery", category: "P03", excludes1: [], excludes2: [], includes: [], commonUse: ["Labor complication effect"], documentation: ["Clinical exam"] };
  codes["P03.9"] = { code: "P03.9", description: "Newborn affected by complication of labor and delivery, unspecified", category: "P03", excludes1: [], excludes2: [], includes: [], commonUse: ["Labor complication NOS"], documentation: ["Clinical exam"] };
  codes["P04.0"] = { code: "P04.0", description: "Newborn affected by maternal anesthesia and analgesia", category: "P04", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal anesthesia effect"], documentation: ["Clinical exam"] };
  codes["P04.1"] = { code: "P04.1", description: "Newborn affected by maternal use of tobacco", category: "P04", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal smoking effect"], documentation: ["Clinical exam"] };
  codes["P04.2"] = { code: "P04.2", description: "Newborn affected by maternal use of alcohol", category: "P04", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal alcohol effect"], documentation: ["Clinical exam"] };
  codes["P04.3"] = { code: "P04.3", description: "Newborn affected by maternal use of nutritional chemical substance", category: "P04", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal nutrition substance effect"], documentation: ["Clinical exam"] };
  codes["P04.4"] = { code: "P04.4", description: "Newborn affected by maternal use of drugs of dependence", category: "P04", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal drug dependence effect"], documentation: ["Clinical exam"] };
  codes["P04.5"] = { code: "P04.5", description: "Newborn affected by maternal use of nutritional pharmacological agents", category: "P04", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal medication effect"], documentation: ["Clinical exam"] };
  codes["P04.6"] = { code: "P04.6", description: "Newborn affected by maternal exposure to environmental chemical substances", category: "P04", excludes1: [], excludes2: [], includes: [], commonUse: ["Environmental chemical effect"], documentation: ["Clinical exam"] };
  codes["P04.8"] = { code: "P04.8", description: "Newborn affected by other maternal noxious substances", category: "P04", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal substance effect"], documentation: ["Clinical exam"] };
  codes["P04.9"] = { code: "P04.9", description: "Newborn affected by maternal noxious substance, unspecified", category: "P04", excludes1: [], excludes2: [], includes: [], commonUse: ["Maternal substance NOS"], documentation: ["Clinical exam"] };
  codes["P05.0"] = { code: "P05.0", description: "Light for gestational age", category: "P05", excludes1: [], excludes2: [], includes: [], commonUse: ["Small for gestational age"], documentation: ["Weight", "Gestational age"] };
  codes["P05.1"] = { code: "P05.1", description: "Small for gestational age", category: "P05", excludes1: [], excludes2: [], includes: [], commonUse: ["SGA"], documentation: ["Weight", "Gestational age"] };
  codes["P05.2"] = { code: "P05.2", description: "Fetal malnutrition without mention of light or small for gestational age", category: "P05", excludes1: [], excludes2: [], includes: [], commonUse: ["Fetal malnutrition"], documentation: ["Weight"] };
  codes["P05.9"] = { code: "P05.9", description: "Slow intrauterine growth, unspecified", category: "P05", excludes1: [], excludes2: [], includes: [], commonUse: ["IUGR NOS"], documentation: ["Ultrasound"] };
  codes["P07.0"] = { code: "P07.0", description: "Extremely low birth weight, less than 1000 grams", category: "P07", excludes1: [], excludes2: [], includes: [], commonUse: ["Extremely low birth weight"], documentation: ["Birth weight"] };
  codes["P07.1"] = { code: "P07.1", description: "Other low birth weight, 1000-2499 grams", category: "P07", excludes1: [], excludes2: [], includes: [], commonUse: ["Low birth weight"], documentation: ["Birth weight"] };
  codes["P07.2"] = { code: "P07.2", description: "Extreme immaturity", category: "P07", excludes1: [], excludes2: [], includes: [], commonUse: ["Extreme prematurity"], documentation: ["Gestational age"] };
  codes["P07.3"] = { code: "P07.3", description: "Other preterm or immaturity", category: "P07", excludes1: [], excludes2: [], includes: [], commonUse: ["Preterm infant"], documentation: ["Gestational age"] };
  codes["P07.9"] = { code: "P07.9", description: "Disorders related to short gestation and low birth weight, unspecified", category: "P07", excludes1: [], excludes2: [], includes: [], commonUse: ["Low birth weight NOS"], documentation: ["Birth weight"] };
  codes["P08.0"] = { code: "P08.0", description: "Exceptionally high birth weight", category: "P08", excludes1: [], excludes2: [], includes: [], commonUse: ["High birth weight"], documentation: ["Birth weight"] };
  codes["P08.1"] = { code: "P08.1", description: "Other high birth weight infant", category: "P08", excludes1: [], excludes2: [], includes: [], commonUse: ["Macrosomia"], documentation: ["Birth weight"] };
  codes["P08.2"] = { code: "P08.2", description: "Post-term infant, not heavy for gestational age", category: "P08", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-term infant"], documentation: ["Gestational age"] };
  codes["P08.9"] = { code: "P08.9", description: "Disorders related to long gestation and high birth weight, unspecified", category: "P08", excludes1: [], excludes2: [], includes: [], commonUse: ["High birth weight NOS"], documentation: ["Birth weight"] };
  codes["P10.0"] = { code: "P10.0", description: "Subdural hemorrhage", category: "P10", excludes1: [], excludes2: [], includes: [], commonUse: ["Neonatal subdural hemorrhage"], documentation: ["Head ultrasound", "CT head"] };
  codes["P10.1"] = { code: "P10.1", description: "Cerebral hemorrhage", category: "P10", excludes1: [], excludes2: [], includes: [], commonUse: ["Neonatal cerebral hemorrhage"], documentation: ["Head ultrasound"] };
  codes["P10.2"] = { code: "P10.2", description: "Intraventricular hemorrhage", category: "P10", excludes1: [], excludes2: [], includes: [], commonUse: ["IVH"], documentation: ["Head ultrasound"] };
  codes["P10.3"] = { code: "P10.3", description: "Subarachnoid hemorrhage", category: "P10", excludes1: [], excludes2: [], includes: [], commonUse: ["Neonatal subarachnoid hemorrhage"], documentation: ["Head ultrasound"] };
  codes["P10.4"] = { code: "P10.4", description: "Tentorial tear", category: "P10", excludes1: [], excludes2: [], includes: [], commonUse: ["Tentorial tear"], documentation: ["Head ultrasound"] };
  codes["P10.8"] = { code: "P10.8", description: "Other intracranial hemorrhages", category: "P10", excludes1: [], excludes2: [], includes: [], commonUse: ["Intracranial hemorrhage"], documentation: ["Head ultrasound"] };
  codes["P10.9"] = { code: "P10.9", description: "Intracranial hemorrhage, unspecified", category: "P10", excludes1: [], excludes2: [], includes: [], commonUse: ["Intracranial hemorrhage NOS"], documentation: ["Head ultrasound"] };
  codes["P11.0"] = { code: "P11.0", description: "Cerebral edema", category: "P11", excludes1: [], excludes2: [], includes: [], commonUse: ["Neonatal cerebral edema"], documentation: ["Head ultrasound", "CT head"] };
  codes["P11.1"] = { code: "P11.1", description: "Other specified brain injuries due to birth trauma", category: "P11", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain injury birth"], documentation: ["Head ultrasound"] };
  codes["P11.2"] = { code: "P11.2", description: "Perinatal injury of spinal cord", category: "P11", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal cord injury birth"], documentation: ["MRI spine"] };
  codes["P11.3"] = { code: "P11.3", description: "Perinatal injury of facial nerve", category: "P11", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial nerve palsy birth"], documentation: ["Clinical exam"] };
  codes["P11.4"] = { code: "P11.4", description: "Perinatal injury of brachial plexus", category: "P11", excludes1: [], excludes2: [], includes: [], commonUse: ["Brachial plexus injury birth"], documentation: ["Clinical exam", "EMG"] };
  codes["P11.5"] = { code: "P11.5", description: "Perinatal injury of skull", category: "P11", excludes1: [], excludes2: [], includes: [], commonUse: ["Skull fracture birth"], documentation: ["X-ray skull"] };
  codes["P11.9"] = { code: "P11.9", description: "Perinatal injury to central nervous system, unspecified", category: "P11", excludes1: [], excludes2: [], includes: [], commonUse: ["Birth injury CNS NOS"], documentation: ["Clinical exam"] };
  codes["P12.0"] = { code: "P12.0", description: "Cephalohematoma", category: "P12", excludes1: [], excludes2: [], includes: [], commonUse: ["Cephalohematoma"], documentation: ["Clinical exam", "X-ray skull"] };
  codes["P12.1"] = { code: "P12.1", description: "Birth injury to scalp", category: "P12", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp injury birth"], documentation: ["Clinical exam"] };
  codes["P12.2"] = { code: "P12.2", description: "Extracranial hemorrhage of newborn", category: "P12", excludes1: [], excludes2: [], includes: [], commonUse: ["Extracranial hemorrhage"], documentation: ["Clinical exam"] };
  codes["P12.3"] = { code: "P12.3", description: "Subgaleal hemorrhage", category: "P12", excludes1: [], excludes2: [], includes: [], commonUse: ["Subgaleal hemorrhage"], documentation: ["Clinical exam"] };
  codes["P12.4"] = { code: "P12.4", description: "Forceps mark", category: "P12", excludes1: [], excludes2: [], includes: [], commonUse: ["Forceps mark"], documentation: ["Clinical exam"] };
  codes["P12.8"] = { code: "P12.8", description: "Other injuries to scalp", category: "P12", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp injury"], documentation: ["Clinical exam"] };
  codes["P12.9"] = { code: "P12.9", description: "Injury to scalp, unspecified", category: "P12", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp injury NOS"], documentation: ["Clinical exam"] };
  codes["P13.0"] = { code: "P13.0", description: "Fracture of skull", category: "P13", excludes1: [], excludes2: [], includes: [], commonUse: ["Skull fracture birth"], documentation: ["X-ray skull", "CT head"] };
  codes["P13.1"] = { code: "P13.1", description: "Molding of head", category: "P13", excludes1: [], excludes2: [], includes: [], commonUse: ["Head molding"], documentation: ["Clinical exam"] };
  codes["P13.2"] = { code: "P13.2", description: "Injury to sternocleidomastoid muscle", category: "P13", excludes1: [], excludes2: [], includes: [], commonUse: ["Sternocleidomastoid injury"], documentation: ["Clinical exam"] };
  codes["P13.3"] = { code: "P13.3", description: "Fracture of clavicle", category: "P13", excludes1: [], excludes2: [], includes: [], commonUse: ["Clavicle fracture birth"], documentation: ["X-ray"] };
  codes["P13.4"] = { code: "P13.4", description: "Fracture of humerus", category: "P13", excludes1: [], excludes2: [], includes: [], commonUse: ["Humerus fracture birth"], documentation: ["X-ray"] };
  codes["P13.8"] = { code: "P13.8", description: "Other skeletal injuries", category: "P13", excludes1: [], excludes2: [], includes: [], commonUse: ["Skeletal injury birth"], documentation: ["X-ray"] };
  codes["P13.9"] = { code: "P13.9", description: "Skeletal injury, unspecified", category: "P13", excludes1: [], excludes2: [], includes: [], commonUse: ["Skeletal injury NOS"], documentation: ["X-ray"] };
  codes["P14.0"] = { code: "P14.0", description: "Erb palsy", category: "P14", excludes1: [], excludes2: [], includes: [], commonUse: ["Erb palsy", "Erb-Duchenne palsy"], documentation: ["Clinical exam", "EMG"] };
  codes["P14.1"] = { code: "P14.1", description: "Klumpke palsy", category: "P14", excludes1: [], excludes2: [], includes: [], commonUse: ["Klumpke palsy"], documentation: ["Clinical exam", "EMG"] };
  codes["P14.2"] = { code: "P14.2", description: "Phrenic nerve paralysis", category: "P14", excludes1: [], excludes2: [], includes: [], commonUse: ["Phrenic nerve injury"], documentation: ["Chest X-ray"] };
  codes["P14.3"] = { code: "P14.3", description: "Other brachial plexus injuries", category: "P14", excludes1: [], excludes2: [], includes: [], commonUse: ["Brachial plexus injury"], documentation: ["Clinical exam"] };
  codes["P14.8"] = { code: "P14.8", description: "Other peripheral nerve injuries", category: "P14", excludes1: [], excludes2: [], includes: [], commonUse: ["Peripheral nerve injury"], documentation: ["EMG"] };
  codes["P14.9"] = { code: "P14.9", description: "Peripheral nerve injury, unspecified", category: "P14", excludes1: [], excludes2: [], includes: [], commonUse: ["Nerve injury NOS"], documentation: ["EMG"] };
  codes["P15.0"] = { code: "P15.0", description: "Birth injury to liver", category: "P15", excludes1: [], excludes2: [], includes: [], commonUse: ["Liver injury birth"], documentation: ["Ultrasound", "LFTs"] };
  codes["P15.1"] = { code: "P15.1", description: "Birth injury to spleen", category: "P15", excludes1: [], excludes2: [], includes: [], commonUse: ["Spleen injury birth"], documentation: ["Ultrasound"] };
  codes["P15.2"] = { code: "P15.2", description: "Subcutaneous fat necrosis", category: "P15", excludes1: [], excludes2: [], includes: [], commonUse: ["Subcutaneous fat necrosis"], documentation: ["Clinical exam"] };
  codes["P15.3"] = { code: "P15.3", description: "Osteomyelitis of newborn", category: "P15", excludes1: [], excludes2: [], includes: [], commonUse: ["Neonatal osteomyelitis"], documentation: ["X-ray", "Blood cultures"] };
  codes["P15.8"] = { code: "P15.8", description: "Other specified birth injuries", category: "P15", excludes1: [], excludes2: [], includes: [], commonUse: ["Birth injury"], documentation: ["Various"] };
  codes["P15.9"] = { code: "P15.9", description: "Birth injury, unspecified", category: "P15", excludes1: [], excludes2: [], includes: [], commonUse: ["Birth injury NOS"], documentation: ["Clinical exam"] };
  codes["Q00.0"] = { code: "Q00.0", description: "Anencephaly and similar anomalies", category: "Q00", excludes1: [], excludes2: [], includes: [], commonUse: ["Anencephaly"], documentation: ["Ultrasound", "AFP"] };
  codes["Q00.1"] = { code: "Q00.1", description: "Craniorachischisis", category: "Q00", excludes1: [], excludes2: [], includes: [], commonUse: ["Craniorachischisis"], documentation: ["Ultrasound"] };
  codes["Q00.2"] = { code: "Q00.2", description: "Iniencephaly", category: "Q00", excludes1: [], excludes2: [], includes: [], commonUse: ["Iniencephaly"], documentation: ["Ultrasound"] };
  codes["Q01.0"] = { code: "Q01.0", description: "Frontal encephalocele", category: "Q01", excludes1: [], excludes2: [], includes: [], commonUse: ["Frontal encephalocele"], documentation: ["Ultrasound", "CT head"] };
  codes["Q01.1"] = { code: "Q01.1", description: "Nasoethmoidal encephalocele", category: "Q01", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasoethmoidal encephalocele"], documentation: ["Ultrasound"] };
  codes["Q01.2"] = { code: "Q01.2", description: "Occipital encephalocele", category: "Q01", excludes1: [], excludes2: [], includes: [], commonUse: ["Occipital encephalocele"], documentation: ["Ultrasound"] };
  codes["Q01.8"] = { code: "Q01.8", description: "Other encephalocele", category: "Q01", excludes1: [], excludes2: [], includes: [], commonUse: ["Encephalocele"], documentation: ["Ultrasound"] };
  codes["Q01.9"] = { code: "Q01.9", description: "Encephalocele, unspecified", category: "Q01", excludes1: [], excludes2: [], includes: [], commonUse: ["Encephalocele NOS"], documentation: ["Ultrasound"] };
  codes["Q02"] = { code: "Q02", description: "Microcephaly", category: "Q02", excludes1: [], excludes2: [], includes: [], commonUse: ["Microcephaly"], documentation: ["Head circumference", "Ultrasound"] };
  codes["Q03.0"] = { code: "Q03.0", description: "Malformations of Magendie foramen", category: "Q03", excludes1: [], excludes2: [], includes: [], commonUse: ["Dandy-Walker malformation"], documentation: ["Ultrasound", "MRI head"] };
  codes["Q03.1"] = { code: "Q03.1", description: "Atresia of foramina of Magendie and Luschka", category: "Q03", excludes1: [], excludes2: [], includes: [], commonUse: ["Foramina atresia"], documentation: ["MRI head"] };
  codes["Q03.8"] = { code: "Q03.8", description: "Other hydrocephalus", category: "Q03", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital hydrocephalus"], documentation: ["Ultrasound", "CT head"] };
  codes["Q03.9"] = { code: "Q03.9", description: "Hydrocephalus, unspecified", category: "Q03", excludes1: [], excludes2: [], includes: [], commonUse: ["Hydrocephalus NOS"], documentation: ["CT head"] };
  codes["Q04.0"] = { code: "Q04.0", description: "Agenesis of corpus callosum", category: "Q04", excludes1: [], excludes2: [], includes: [], commonUse: ["ACC", "Agenesis of corpus callosum"], documentation: ["MRI head"] };
  codes["Q04.1"] = { code: "Q04.1", description: "Arhinencephaly", category: "Q04", excludes1: [], excludes2: [], includes: [], commonUse: ["Arhinencephaly"], documentation: ["MRI head"] };
  codes["Q04.2"] = { code: "Q04.2", description: "Holoprosencephaly", category: "Q04", excludes1: [], excludes2: [], includes: [], commonUse: ["Holoprosencephaly"], documentation: ["Ultrasound", "MRI head"] };
  codes["Q04.3"] = { code: "Q04.3", description: "Other reduction deformities of brain", category: "Q04", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain reduction deformity"], documentation: ["MRI head"] };
  codes["Q04.4"] = { code: "Q04.4", description: "Septo-optic dysplasia", category: "Q04", excludes1: [], excludes2: [], includes: [], commonUse: ["Septo-optic dysplasia"], documentation: ["MRI head", "Eye exam"] };
  codes["Q04.5"] = { code: "Q04.5", description: "Megalencephaly", category: "Q04", excludes1: [], excludes2: [], includes: [], commonUse: ["Megalencephaly"], documentation: ["MRI head"] };
  codes["Q04.6"] = { code: "Q04.6", description: "Cerebral cysts", category: "Q04", excludes1: [], excludes2: [], includes: [], commonUse: ["Cerebral cyst"], documentation: ["MRI head"] };
  codes["Q04.8"] = { code: "Q04.8", description: "Other specified malformations of brain", category: "Q04", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain malformation"], documentation: ["MRI head"] };
  codes["Q04.9"] = { code: "Q04.9", description: "Malformation of brain, unspecified", category: "Q04", excludes1: [], excludes2: [], includes: [], commonUse: ["Brain malformation NOS"], documentation: ["MRI head"] };
  codes["Q05.0"] = { code: "Q05.0", description: "Cervical spina bifida with hydrocephalus", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical spina bifida with hydrocephalus"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q05.1"] = { code: "Q05.1", description: "Thoracic spina bifida with hydrocephalus", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic spina bifida with hydrocephalus"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q05.2"] = { code: "Q05.2", description: "Lumbar spina bifida with hydrocephalus", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar spina bifida with hydrocephalus"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q05.3"] = { code: "Q05.3", description: "Sacral spina bifida with hydrocephalus", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Sacral spina bifida with hydrocephalus"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q05.4"] = { code: "Q05.4", description: "Spina bifida, unspecified, with hydrocephalus", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Spina bifida with hydrocephalus"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q05.5"] = { code: "Q05.5", description: "Cervical spina bifida without hydrocephalus", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical spina bifida"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q05.6"] = { code: "Q05.6", description: "Thoracic spina bifida without hydrocephalus", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic spina bifida"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q05.7"] = { code: "Q05.7", description: "Lumbar spina bifida without hydrocephalus", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar spina bifida"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q05.8"] = { code: "Q05.8", description: "Sacral spina bifida without hydrocephalus", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Sacral spina bifida"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q05.9"] = { code: "Q05.9", description: "Spina bifida, unspecified", category: "Q05", excludes1: [], excludes2: [], includes: [], commonUse: ["Spina bifida NOS"], documentation: ["Ultrasound", "MRI spine"] };
  codes["Q10.0"] = { code: "Q10.0", description: "Congenital ptosis", category: "Q10", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital ptosis"], documentation: ["Clinical exam"] };
  codes["Q10.1"] = { code: "Q10.1", description: "Congenital ectropion", category: "Q10", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital ectropion"], documentation: ["Clinical exam"] };
  codes["Q10.2"] = { code: "Q10.2", description: "Congenital entropion", category: "Q10", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital entropion"], documentation: ["Clinical exam"] };
  codes["Q10.3"] = { code: "Q10.3", description: "Other congenital malformations of eyelid", category: "Q10", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital eyelid malformation"], documentation: ["Clinical exam"] };
  codes["Q10.4"] = { code: "Q10.4", description: "Absence of lacrimal apparatus", category: "Q10", excludes1: [], excludes2: [], includes: [], commonUse: ["Absent lacrimal apparatus"], documentation: ["Clinical exam"] };
  codes["Q10.5"] = { code: "Q10.5", description: "Congenital stenosis and stricture of lacrimal duct", category: "Q10", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital nasolacrimal duct stenosis"], documentation: ["Clinical exam"] };
  codes["Q10.6"] = { code: "Q10.6", description: "Other congenital malformations of lacrimal apparatus", category: "Q10", excludes1: [], excludes2: [], includes: [], commonUse: ["Lacrimal apparatus malformation"], documentation: ["Clinical exam"] };
  codes["Q11.0"] = { code: "Q11.0", description: "Anophthalmos", category: "Q11", excludes1: [], excludes2: [], includes: [], commonUse: ["Anophthalmos"], documentation: ["Clinical exam"] };
  codes["Q11.1"] = { code: "Q11.1", description: "Microphthalmos", category: "Q11", excludes1: [], excludes2: [], includes: [], commonUse: ["Microphthalmos"], documentation: ["Clinical exam"] };
  codes["Q11.2"] = { code: "Q11.2", description: "Macrophthalmos", category: "Q11", excludes1: [], excludes2: [], includes: [], commonUse: ["Macrophthalmos"], documentation: ["Clinical exam"] };
  codes["Q12.0"] = { code: "Q12.0", description: "Congenital cataract", category: "Q12", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital cataract"], documentation: ["Slit lamp exam"] };
  codes["Q12.1"] = { code: "Q12.1", description: "Congenital displaced lens", category: "Q12", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital lens dislocation"], documentation: ["Slit lamp exam"] };
  codes["Q12.2"] = { code: "Q12.2", description: "Congenital coloboma of lens", category: "Q12", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital lens coloboma"], documentation: ["Slit lamp exam"] };
  codes["Q12.3"] = { code: "Q12.3", description: "Congenital aphakia", category: "Q12", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital aphakia"], documentation: ["Slit lamp exam"] };
  codes["Q12.8"] = { code: "Q12.8", description: "Other congenital malformations of lens", category: "Q12", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital lens malformation"], documentation: ["Slit lamp exam"] };
  codes["Q13.0"] = { code: "Q13.0", description: "Coloboma of iris", category: "Q13", excludes1: [], excludes2: [], includes: [], commonUse: ["Iris coloboma"], documentation: ["Slit lamp exam"] };
  codes["Q13.1"] = { code: "Q13.1", description: "Absence of iris", category: "Q13", excludes1: [], excludes2: [], includes: [], commonUse: ["Iris absence"], documentation: ["Clinical exam"] };
  codes["Q13.2"] = { code: "Q13.2", description: "Other congenital malformations of iris", category: "Q13", excludes1: [], excludes2: [], includes: [], commonUse: ["Iris malformation"], documentation: ["Clinical exam"] };
  codes["Q13.3"] = { code: "Q13.3", description: "Congenital phacolenticular cyst", category: "Q13", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital lens cyst"], documentation: ["Slit lamp exam"] };
  codes["Q13.4"] = { code: "Q13.4", description: "Other congenital malformations of anterior segment of eye", category: "Q13", excludes1: [], excludes2: [], includes: [], commonUse: ["Anterior segment malformation"], documentation: ["Clinical exam"] };
  codes["Q14.0"] = { code: "Q14.0", description: "Congenital malformation of choroid", category: "Q14", excludes1: [], excludes2: [], includes: [], commonUse: ["Choroidal malformation"], documentation: ["Fundoscopy"] };
  codes["Q14.1"] = { code: "Q14.1", description: "Congenital malformation of retina", category: "Q14", excludes1: [], excludes2: [], includes: [], commonUse: ["Retinal malformation"], documentation: ["Fundoscopy"] };
  codes["Q14.2"] = { code: "Q14.2", description: "Congenital malformation of optic disc", category: "Q14", excludes1: [], excludes2: [], includes: [], commonUse: ["Optic disc malformation"], documentation: ["Fundoscopy"] };
  codes["Q14.3"] = { code: "Q14.3", description: "Congenital malformation of optic nerve", category: "Q14", excludes1: [], excludes2: [], includes: [], commonUse: ["Optic nerve malformation"], documentation: ["Fundoscopy", "OCT"] };
  codes["Q14.8"] = { code: "Q14.8", description: "Other congenital malformations of posterior segment of eye", category: "Q14", excludes1: [], excludes2: [], includes: [], commonUse: ["Posterior segment malformation"], documentation: ["Fundoscopy"] };
  codes["Q14.9"] = { code: "Q14.9", description: "Congenital malformation of eye, unspecified", category: "Q14", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital eye malformation NOS"], documentation: ["Clinical exam"] };
  codes["Q15.0"] = { code: "Q15.0", description: "Congenital ptosis", category: "Q15", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital ptosis"], documentation: ["Clinical exam"] };
  codes["Q16.0"] = { code: "Q16.0", description: "Congenital absence of ear (pinna)", category: "Q16", excludes1: [], excludes2: [], includes: [], commonUse: ["Microtia", "Absent pinna"], documentation: ["Clinical exam"] };
  codes["Q16.1"] = { code: "Q16.1", description: "Congenital absence, atresia and stricture of auditory canal (external)", category: "Q16", excludes1: [], excludes2: [], includes: [], commonUse: ["Aural atresia"], documentation: ["CT temporal bone"] };
  codes["Q16.2"] = { code: "Q16.2", description: "Atresia of eustachian tube", category: "Q16", excludes1: [], excludes2: [], includes: [], commonUse: ["Eustachian tube atresia"], documentation: ["CT"] };
  codes["Q16.3"] = { code: "Q16.3", description: "Congenital malformation of ear ossicles", category: "Q16", excludes1: [], excludes2: [], includes: [], commonUse: ["Ossicle malformation"], documentation: ["CT temporal bone"] };
  codes["Q16.4"] = { code: "Q16.4", description: "Other congenital malformations of ear", category: "Q16", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital ear malformation"], documentation: ["Clinical exam"] };
  codes["Q16.9"] = { code: "Q16.9", description: "Congenital malformation of ear, unspecified", category: "Q16", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital ear malformation NOS"], documentation: ["Clinical exam"] };
  codes["Q17.0"] = { code: "Q17.0", description: "Accessory auricle", category: "Q17", excludes1: [], excludes2: [], includes: [], commonUse: ["Accessory ear", "Preauricular tag"], documentation: ["Clinical exam"] };
  codes["Q17.1"] = { code: "Q17.1", description: "Macrotia", category: "Q17", excludes1: [], excludes2: [], includes: [], commonUse: ["Macrotia"], documentation: ["Clinical exam"] };
  codes["Q17.2"] = { code: "Q17.2", description: "Microtia", category: "Q17", excludes1: [], excludes2: [], includes: [], commonUse: ["Microtia"], documentation: ["Clinical exam"] };
  codes["Q17.3"] = { code: "Q17.3", description: "Other misshapen ear", category: "Q17", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear deformity"], documentation: ["Clinical exam"] };
  codes["Q17.4"] = { code: "Q17.4", description: "Other congenital malformations of ear, not elsewhere classified", category: "Q17", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear malformation"], documentation: ["Clinical exam"] };
  codes["Q17.5"] = { code: "Q17.5", description: "Prominent ear", category: "Q17", excludes1: [], excludes2: [], includes: [], commonUse: ["Prominent ears"], documentation: ["Clinical exam"] };
  codes["Q17.8"] = { code: "Q17.8", description: "Other congenital malformations of ear", category: "Q17", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear malformation"], documentation: ["Clinical exam"] };
  codes["Q17.9"] = { code: "Q17.9", description: "Congenital malformation of ear, unspecified", category: "Q17", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear malformation NOS"], documentation: ["Clinical exam"] };
  codes["Q18.0"] = { code: "Q18.0", description: "Branchial cleft cyst", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Branchial cleft cyst"], documentation: ["Ultrasound", "CT"] };
  codes["Q18.1"] = { code: "Q18.1", description: "Branchial cleft sinus", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Branchial cleft sinus"], documentation: ["CT"] };
  codes["Q18.2"] = { code: "Q18.2", description: "Branchial cleft fistula", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Branchial cleft fistula"], documentation: ["CT"] };
  codes["Q18.3"] = { code: "Q18.3", description: "Cystic hygroma", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Cystic hygroma"], documentation: ["Ultrasound", "Genetic testing"] };
  codes["Q18.4"] = { code: "Q18.4", description: "Macrostia", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Macrostia"], documentation: ["Clinical exam"] };
  codes["Q18.5"] = { code: "Q18.5", description: "Microstia", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Microstia"], documentation: ["Clinical exam"] };
  codes["Q18.6"] = { code: "Q18.6", description: "Macroglossia", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Macroglossia"], documentation: ["Clinical exam"] };
  codes["Q18.7"] = { code: "Q18.7", description: "Microglossia", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Microglossia"], documentation: ["Clinical exam"] };
  codes["Q18.8"] = { code: "Q18.8", description: "Other congenital malformations of face and neck", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Face/neck malformation"], documentation: ["Clinical exam"] };
  codes["Q18.9"] = { code: "Q18.9", description: "Congenital malformation of face and neck, unspecified", category: "Q18", excludes1: [], excludes2: [], includes: [], commonUse: ["Face/neck malformation NOS"], documentation: ["Clinical exam"] };
  codes["Q20.0"] = { code: "Q20.0", description: "Common arterial trunk", category: "Q20", excludes1: [], excludes2: [], includes: [], commonUse: ["Truncus arteriosus"], documentation: ["Echocardiogram"] };
  codes["Q20.1"] = { code: "Q20.1", description: "Double outlet right ventricle", category: "Q20", excludes1: [], excludes2: [], includes: [], commonUse: ["DORV"], documentation: ["Echocardiogram"] };
  codes["Q20.2"] = { code: "Q20.2", description: "Double inlet left ventricle", category: "Q20", excludes1: [], excludes2: [], includes: [], commonUse: ["DILV"], documentation: ["Echocardiogram"] };
  codes["Q20.3"] = { code: "Q20.3", description: "Discordant ventriculoarterial connection", category: "Q20", excludes1: [], excludes2: [], includes: [], commonUse: ["Transposition of great arteries"], documentation: ["Echocardiogram"] };
  codes["Q20.4"] = { code: "Q20.4", description: "Double outlet left ventricle", category: "Q20", excludes1: [], excludes2: [], includes: [], commonUse: ["Double outlet left ventricle"], documentation: ["Echocardiogram"] };
  codes["Q20.5"] = { code: "Q20.5", description: "Discordant atrioventricular connection", category: "Q20", excludes1: [], excludes2: [], includes: [], commonUse: ["AV discordance"], documentation: ["Echocardiogram"] };
  codes["Q20.6"] = { code: "Q20.6", description: "Isomerism of atrial appendages", category: "Q20", excludes1: [], excludes2: [], includes: [], commonUse: ["Heterotaxy"], documentation: ["Echocardiogram"] };
  codes["Q20.8"] = { code: "Q20.8", description: "Other congenital malformations of cardiac chambers and connections", category: "Q20", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac chamber malformation"], documentation: ["Echocardiogram"] };
  codes["Q20.9"] = { code: "Q20.9", description: "Congenital malformation of cardiac chambers and connections, unspecified", category: "Q20", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac malformation NOS"], documentation: ["Echocardiogram"] };
  codes["Q21.0"] = { code: "Q21.0", description: "Ventricular septal defect", category: "Q21", excludes1: [], excludes2: [], includes: [], commonUse: ["VSD"], documentation: ["Echocardiogram"] };
  codes["Q21.1"] = { code: "Q21.1", description: "Atrial septal defect", category: "Q21", excludes1: [], excludes2: [], includes: [], commonUse: ["ASD"], documentation: ["Echocardiogram"] };
  codes["Q21.2"] = { code: "Q21.2", description: "Atrioventricular septal defect", category: "Q21", excludes1: [], excludes2: [], includes: [], commonUse: ["AV canal defect"], documentation: ["Echocardiogram"] };
  codes["Q21.3"] = { code: "Q21.3", description: "Tetralogy of Fallot", category: "Q21", excludes1: [], excludes2: [], includes: [], commonUse: ["Tetralogy of Fallot"], documentation: ["Echocardiogram"] };
  codes["Q21.4"] = { code: "Q21.4", description: "Aortopulmonary septal defect", category: "Q21", excludes1: [], excludes2: [], includes: [], commonUse: ["Aortopulmonary window"], documentation: ["Echocardiogram"] };
  codes["Q21.8"] = { code: "Q21.8", description: "Other congenital malformations of cardiac septa", category: "Q21", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac septal defect"], documentation: ["Echocardiogram"] };
  codes["Q21.9"] = { code: "Q21.9", description: "Congenital malformation of cardiac septum, unspecified", category: "Q21", excludes1: [], excludes2: [], includes: [], commonUse: ["Septal defect NOS"], documentation: ["Echocardiogram"] };
  codes["Q22.0"] = { code: "Q22.0", description: "Pulmonary valve atresia", category: "Q22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary atresia"], documentation: ["Echocardiogram"] };
  codes["Q22.1"] = { code: "Q22.1", description: "Pulmonary valve stenosis", category: "Q22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary stenosis"], documentation: ["Echocardiogram"] };
  codes["Q22.2"] = { code: "Q22.2", description: "Pulmonary valve insufficiency", category: "Q22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary regurgitation"], documentation: ["Echocardiogram"] };
  codes["Q22.3"] = { code: "Q22.3", description: "Other pulmonary valve malformations", category: "Q22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary valve malformation"], documentation: ["Echocardiogram"] };
  codes["Q22.4"] = { code: "Q22.4", description: "Congenital pulmonary valve stenosis", category: "Q22", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital PS"], documentation: ["Echocardiogram"] };
  codes["Q22.5"] = { code: "Q22.5", description: "Absent pulmonary valve", category: "Q22", excludes1: [], excludes2: [], includes: [], commonUse: ["Absent pulmonary valve"], documentation: ["Echocardiogram"] };
  codes["Q22.6"] = { code: "Q22.6", description: "Hypoplastic right heart", category: "Q22", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypoplastic right heart"], documentation: ["Echocardiogram"] };
  codes["Q22.8"] = { code: "Q22.8", description: "Other congenital malformations of pulmonary valve", category: "Q22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary valve malformation"], documentation: ["Echocardiogram"] };
  codes["Q22.9"] = { code: "Q22.9", description: "Congenital malformation of pulmonary valve, unspecified", category: "Q22", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary valve malformation NOS"], documentation: ["Echocardiogram"] };
  codes["Q23.0"] = { code: "Q23.0", description: "Congenital stenosis of aortic valve", category: "Q23", excludes1: [], excludes2: [], includes: [], commonUse: ["Bicuspid aortic valve", "Congenital AS"], documentation: ["Echocardiogram"] };
  codes["Q23.1"] = { code: "Q23.1", description: "Congenital insufficiency of aortic valve", category: "Q23", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital AR"], documentation: ["Echocardiogram"] };
  codes["Q23.2"] = { code: "Q23.2", description: "Congenital mitral stenosis", category: "Q23", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital MS"], documentation: ["Echocardiogram"] };
  codes["Q23.3"] = { code: "Q23.3", description: "Congenital mitral insufficiency", category: "Q23", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital MR"], documentation: ["Echocardiogram"] };
  codes["Q23.4"] = { code: "Q23.4", description: "Hypoplastic left heart syndrome", category: "Q23", excludes1: [], excludes2: [], includes: [], commonUse: ["HLHS"], documentation: ["Echocardiogram"] };
  codes["Q23.8"] = { code: "Q23.8", description: "Other congenital malformations of aortic and mitral valves", category: "Q23", excludes1: [], excludes2: [], includes: [], commonUse: ["Valve malformation"], documentation: ["Echocardiogram"] };
  codes["Q23.9"] = { code: "Q23.9", description: "Congenital malformation of aortic and mitral valves, unspecified", category: "Q23", excludes1: [], excludes2: [], includes: [], commonUse: ["Valve malformation NOS"], documentation: ["Echocardiogram"] };
  codes["Q24.0"] = { code: "Q24.0", description: "Dextrocardia", category: "Q24", excludes1: [], excludes2: [], includes: [], commonUse: ["Dextrocardia"], documentation: ["Echocardiogram", "ECG"] };
  codes["Q24.1"] = { code: "Q24.1", description: "Levocardia", category: "Q24", excludes1: [], excludes2: [], includes: [], commonUse: ["Levocardia"], documentation: ["Echocardiogram"] };
  codes["Q24.2"] = { code: "Q24.2", description: "Cor triatriatum", category: "Q24", excludes1: [], excludes2: [], includes: [], commonUse: ["Cor triatriatum"], documentation: ["Echocardiogram"] };
  codes["Q24.3"] = { code: "Q24.3", description: "Pulmonary infundibular stenosis", category: "Q24", excludes1: [], excludes2: [], includes: [], commonUse: ["Infundibular stenosis"], documentation: ["Echocardiogram"] };
  codes["Q24.4"] = { code: "Q24.4", description: "Congenital subaortic stenosis", category: "Q24", excludes1: [], excludes2: [], includes: [], commonUse: ["Subaortic stenosis"], documentation: ["Echocardiogram"] };
  codes["Q24.5"] = { code: "Q24.5", description: "Coronary artery anomaly", category: "Q24", excludes1: [], excludes2: [], includes: [], commonUse: ["Coronary anomaly"], documentation: ["Echocardiogram", "Angiography"] };
  codes["Q24.6"] = { code: "Q24.6", description: "Congenital heart block", category: "Q24", excludes1: [], excludes2: [], includes: [], commonUse: ["Congenital heart block"], documentation: ["ECG"] };
  codes["Q24.8"] = { code: "Q24.8", description: "Other specified congenital malformations of heart", category: "Q24", excludes1: [], excludes2: [], includes: [], commonUse: ["Heart malformation"], documentation: ["Echocardiogram"] };
  codes["Q24.9"] = { code: "Q24.9", description: "Congenital malformation of heart, unspecified", category: "Q24", excludes1: [], excludes2: [], includes: [], commonUse: ["Heart malformation NOS"], documentation: ["Echocardiogram"] };
  codes["Q25.0"] = { code: "Q25.0", description: "Patent ductus arteriosus", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["PDA"], documentation: ["Echocardiogram"] };
  codes["Q25.1"] = { code: "Q25.1", description: "Coarctation of aorta", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["Coarctation of aorta"], documentation: ["Echocardiogram", "BP arms/legs"] };
  codes["Q25.2"] = { code: "Q25.2", description: "Atresia of aorta", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["Aortic atresia"], documentation: ["Echocardiogram"] };
  codes["Q25.3"] = { code: "Q25.3", description: "Stenosis of aorta", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["Aortic stenosis"], documentation: ["Echocardiogram"] };
  codes["Q25.4"] = { code: "Q25.4", description: "Other congenital malformations of aorta", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["Aortic malformation"], documentation: ["Echocardiogram"] };
  codes["Q25.5"] = { code: "Q25.5", description: "Atresia of pulmonary artery", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary artery atresia"], documentation: ["Echocardiogram"] };
  codes["Q25.6"] = { code: "Q25.6", description: "Stenosis of pulmonary artery", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary artery stenosis"], documentation: ["Echocardiogram"] };
  codes["Q25.7"] = { code: "Q25.7", description: "Other congenital malformations of pulmonary artery", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary artery malformation"], documentation: ["Echocardiogram"] };
  codes["Q25.8"] = { code: "Q25.8", description: "Other congenital malformations of great arteries", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["Great artery malformation"], documentation: ["Echocardiogram"] };
  codes["Q25.9"] = { code: "Q25.9", description: "Congenital malformation of great arteries, unspecified", category: "Q25", excludes1: [], excludes2: [], includes: [], commonUse: ["Great artery malformation NOS"], documentation: ["Echocardiogram"] };
  codes["R00.0"] = { code: "R00.0", description: "Tachycardia, unspecified", category: "R00", excludes1: [], excludes2: [], includes: [], commonUse: ["Tachycardia NOS"], documentation: ["ECG"] };
  codes["R00.1"] = { code: "R00.1", description: "Bradycardia, unspecified", category: "R00", excludes1: [], excludes2: [], includes: [], commonUse: ["Bradycardia NOS"], documentation: ["ECG"] };
  codes["R00.2"] = { code: "R00.2", description: "Palpitations", category: "R00", excludes1: [], excludes2: [], includes: [], commonUse: ["Palpitations"], documentation: ["ECG", "Holter monitor"] };
  codes["R00.8"] = { code: "R00.8", description: "Other abnormalities of heart beat", category: "R00", excludes1: [], excludes2: [], includes: [], commonUse: ["Heart rhythm abnormality"], documentation: ["ECG"] };
  codes["R00.9"] = { code: "R00.9", description: "Abnormalities of heart beat, unspecified", category: "R00", excludes1: [], excludes2: [], includes: [], commonUse: ["Heart rhythm abnormality NOS"], documentation: ["ECG"] };
  codes["R01.0"] = { code: "R01.0", description: "Benign and incidental cardiac murmur", category: "R01", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac murmur"], documentation: ["Echocardiogram"] };
  codes["R01.1"] = { code: "R01.1", description: "Cardiac murmur, unspecified", category: "R01", excludes1: [], excludes2: [], includes: [], commonUse: ["Heart murmur NOS"], documentation: ["Echocardiogram"] };
  codes["R01.2"] = { code: "R01.2", description: "Other cardiac sounds", category: "R01", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac sounds"], documentation: ["Echocardiogram"] };
  codes["R02"] = { code: "R02", description: "Gangrene, not elsewhere classified", category: "R02", excludes1: [], excludes2: [], includes: [], commonUse: ["Gangrene"], documentation: ["Vascular study"] };
  codes["R03.0"] = { code: "R03.0", description: "Elevation of blood pressure reading without diagnosis of hypertension", category: "R03", excludes1: [], excludes2: [], includes: [], commonUse: ["Elevated BP reading"], documentation: ["BP monitoring"] };
  codes["R03.1"] = { code: "R03.1", description: "Nonspecific low blood pressure reading", category: "R03", excludes1: [], excludes2: [], includes: [], commonUse: ["Low BP reading"], documentation: ["BP monitoring"] };
  codes["R03.2"] = { code: "R03.2", description: "Nonspecific reading of blood pressure without diagnosis of hypertension", category: "R03", excludes1: [], excludes2: [], includes: [], commonUse: ["BP reading NOS"], documentation: ["BP monitoring"] };
  codes["R04.0"] = { code: "R04.0", description: "Epistaxis", category: "R04", excludes1: [], excludes2: [], includes: [], commonUse: ["Nosebleed"], documentation: ["Nasal exam"] };
  codes["R04.1"] = { code: "R04.1", description: "Hemorrhage from throat", category: "R04", excludes1: [], excludes2: [], includes: [], commonUse: ["Throat hemorrhage"], documentation: ["Laryngoscopy"] };
  codes["R04.2"] = { code: "R04.2", description: "Hemoptysis", category: "R04", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemoptysis"], documentation: ["Chest X-ray", "CT chest"] };
  codes["R04.8"] = { code: "R04.8", description: "Hemorrhage from other sites in respiratory passages", category: "R04", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory hemorrhage"], documentation: ["CT"] };
  codes["R04.9"] = { code: "R04.9", description: "Hemorrhage from respiratory passages, unspecified", category: "R04", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory hemorrhage NOS"], documentation: ["CT"] };
  codes["R05.0"] = { code: "R05.0", description: "Whooping cough", category: "R05", excludes1: [], excludes2: [], includes: [], commonUse: ["Whooping cough"], documentation: ["Nasal swab PCR"] };
  codes["R05.1"] = { code: "R05.1", description: "Acute cough", category: "R05", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute cough"], documentation: ["Chest X-ray"] };
  codes["R05.2"] = { code: "R05.2", description: "Subacute cough", category: "R05", excludes1: [], excludes2: [], includes: [], commonUse: ["Subacute cough"], documentation: ["Chest X-ray"] };
  codes["R05.3"] = { code: "R05.3", description: "Chronic cough", category: "R05", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic cough"], documentation: ["Chest X-ray", "CT chest"] };
  codes["R05.4"] = { code: "R05.4", description: "Cough syncope", category: "R05", excludes1: [], excludes2: [], includes: [], commonUse: ["Cough syncope"], documentation: ["ECG", "Echocardiogram"] };
  codes["R05.8"] = { code: "R05.8", description: "Other specified cough", category: "R05", excludes1: [], excludes2: [], includes: [], commonUse: ["Cough"], documentation: ["Chest X-ray"] };
  codes["R05.9"] = { code: "R05.9", description: "Cough, unspecified", category: "R05", excludes1: [], excludes2: [], includes: [], commonUse: ["Cough NOS"], documentation: ["Chest X-ray"] };
  codes["R06.0"] = { code: "R06.0", description: "Dyspnea", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Shortness of breath", "Dyspnea"], documentation: ["Chest X-ray", "ABG"] };
  codes["R06.1"] = { code: "R06.1", description: "Stridor", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Stridor"], documentation: ["Laryngoscopy"] };
  codes["R06.2"] = { code: "R06.2", description: "Wheezing", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Wheezing"], documentation: ["Spirometry"] };
  codes["R06.3"] = { code: "R06.3", description: "Periodic breathing", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Periodic breathing"], documentation: ["Sleep study"] };
  codes["R06.4"] = { code: "R06.4", description: "Hyperventilation", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperventilation"], documentation: ["ABG"] };
  codes["R06.5"] = { code: "R06.5", description: "Mouth breathing", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Mouth breathing"], documentation: ["Clinical exam"] };
  codes["R06.6"] = { code: "R06.6", description: "Hiccough", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Hiccups"], documentation: ["Chest X-ray"] };
  codes["R06.7"] = { code: "R06.7", description: "Sneezing", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Sneezing"], documentation: ["Clinical exam"] };
  codes["R06.8"] = { code: "R06.8", description: "Other abnormalities of breathing", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Breathing abnormality"], documentation: ["Spirometry"] };
  codes["R06.9"] = { code: "R06.9", description: "Abnormalities of breathing, unspecified", category: "R06", excludes1: [], excludes2: [], includes: [], commonUse: ["Breathing abnormality NOS"], documentation: ["Clinical exam"] };
  codes["R07.0"] = { code: "R07.0", description: "Precordial pain", category: "R07", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall pain"], documentation: ["ECG"] };
  codes["R07.1"] = { code: "R07.1", description: "Pleuritic chest pain", category: "R07", excludes1: [], excludes2: [], includes: [], commonUse: ["Pleuritic chest pain"], documentation: ["ECG", "D-dimer"] };
  codes["R07.2"] = { code: "R07.2", description: "Precordial pain", category: "R07", excludes1: [], excludes2: [], includes: [], commonUse: ["Precordial pain"], documentation: ["ECG"] };
  codes["R07.3"] = { code: "R07.3", description: "Other chest pain", category: "R07", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest pain NOS"], documentation: ["ECG", "Troponin"] };
  codes["R07.4"] = { code: "R07.4", description: "Chest pain, unspecified", category: "R07", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest pain NOS"], documentation: ["ECG", "Troponin"] };
  codes["R07.8"] = { code: "R07.8", description: "Other chest pain", category: "R07", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest pain"], documentation: ["ECG"] };
  codes["R07.9"] = { code: "R07.9", description: "Chest pain, unspecified", category: "R07", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest pain NOS"], documentation: ["ECG"] };
  codes["R09.0"] = { code: "R09.0", description: "Asphyxia", category: "R09", excludes1: [], excludes2: [], includes: [], commonUse: ["Asphyxia"], documentation: ["ABG"] };
  codes["R09.1"] = { code: "R09.1", description: "Pleurisy", category: "R09", excludes1: [], excludes2: [], includes: [], commonUse: ["Pleurisy"], documentation: ["Chest X-ray"] };
  codes["R09.2"] = { code: "R09.2", description: "Respiratory arrest", category: "R09", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory arrest"], documentation: ["ABG"] };
  codes["R09.3"] = { code: "R09.3", description: "Abnormal sputum", category: "R09", excludes1: [], excludes2: [], includes: [], commonUse: ["Sputum abnormality"], documentation: ["Sputum culture"] };
  codes["R09.8"] = { code: "R09.8", description: "Other specified symptoms and signs involving the circulatory and respiratory systems", category: "R09", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory symptom"], documentation: ["Various"] };
  codes["R09.9"] = { code: "R09.9", description: "Symptoms and signs involving the circulatory and respiratory systems, unspecified", category: "R09", excludes1: [], excludes2: [], includes: [], commonUse: ["Respiratory symptom NOS"], documentation: ["Various"] };
  codes["R10.0"] = { code: "R10.0", description: "Acute abdomen", category: "R10", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute abdomen"], documentation: ["CT abdomen", "Surgical consult"] };
  codes["R10.1"] = { code: "R10.1", description: "Pain localized to upper abdomen", category: "R10", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper abdominal pain"], documentation: ["CT abdomen"] };
  codes["R10.2"] = { code: "R10.2", description: "Pelvic and perineal pain", category: "R10", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic pain"], documentation: ["CT pelvis"] };
  codes["R10.3"] = { code: "R10.3", description: "Pain localized to lower abdomen", category: "R10", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower abdominal pain"], documentation: ["CT abdomen"] };
  codes["R10.4"] = { code: "R10.4", description: "Other abdominal pain", category: "R10", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal pain NOS"], documentation: ["CT abdomen"] };
  codes["R10.8"] = { code: "R10.8", description: "Other abdominal pain", category: "R10", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal pain"], documentation: ["CT abdomen"] };
  codes["R10.9"] = { code: "R10.9", description: "Abdominal pain, unspecified", category: "R10", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal pain NOS"], documentation: ["CT abdomen"] };
  codes["R11.0"] = { code: "R11.0", description: "Nausea", category: "R11", excludes1: [], excludes2: [], includes: [], commonUse: ["Nausea"], documentation: ["Clinical exam"] };
  codes["R11.1"] = { code: "R11.1", description: "Vomiting", category: "R11", excludes1: [], excludes2: [], includes: [], commonUse: ["Vomiting"], documentation: ["Electrolytes"] };
  codes["R11.2"] = { code: "R11.2", description: "Nausea with vomiting, unspecified", category: "R11", excludes1: [], excludes2: [], includes: [], commonUse: ["Nausea and vomiting"], documentation: ["Electrolytes"] };
  codes["R11.3"] = { code: "R11.3", description: "Projectile vomiting", category: "R11", excludes1: [], excludes2: [], includes: [], commonUse: ["Projectile vomiting"], documentation: ["CT head"] };
  codes["R11.4"] = { code: "R11.4", description: "Hematemesis", category: "R11", excludes1: [], excludes2: [], includes: [], commonUse: ["Hematemesis"], documentation: ["CBC", "EGD"] };
  codes["R11.8"] = { code: "R11.8", description: "Other symptoms involving digestive system", category: "R11", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive symptom"], documentation: ["Various"] };
  codes["R11.9"] = { code: "R11.9", description: "Nausea and vomiting, unspecified", category: "R11", excludes1: [], excludes2: [], includes: [], commonUse: ["Nausea/vomiting NOS"], documentation: ["Electrolytes"] };
  codes["R12"] = { code: "R12", description: "Heartburn", category: "R12", excludes1: [], excludes2: [], includes: [], commonUse: ["Heartburn", "Pyrosis"], documentation: ["Trial of PPI"] };
  codes["R13.0"] = { code: "R13.0", description: "Aphagia", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Difficulty swallowing"], documentation: ["Barium swallow"] };
  codes["R13.1"] = { code: "R13.1", description: "Dysphagia, unspecified", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Dysphagia NOS"], documentation: ["Barium swallow", "Endoscopy"] };
  codes["R13.10"] = { code: "R13.10", description: "Dysphagia, unspecified", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Dysphagia"], documentation: ["Barium swallow"] };
  codes["R13.12"] = { code: "R13.12", description: "Oropharyngeal dysphagia", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Oropharyngeal dysphagia"], documentation: ["Barium swallow"] };
  codes["R13.13"] = { code: "R13.13", description: "Cervical esophageal dysphagia", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical dysphagia"], documentation: ["Barium swallow"] };
  codes["R13.14"] = { code: "R13.14", description: "Pharyngoesophageal dysphagia", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Pharyngoesophageal dysphagia"], documentation: ["Barium swallow"] };
  codes["R13.19"] = { code: "R13.19", description: "Other dysphagia", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Dysphagia other"], documentation: ["Barium swallow"] };
  codes["R13.2"] = { code: "R13.2", description: "Symptoms involving swallowing", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Swallowing symptom"], documentation: ["Barium swallow"] };
  codes["R13.3"] = { code: "R13.3", description: "Drooling", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Drooling", "Sialorrhea"], documentation: ["Clinical exam"] };
  codes["R13.4"] = { code: "R13.4", description: "Globus sensation", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Globus sensation"], documentation: ["Endoscopy"] };
  codes["R13.8"] = { code: "R13.8", description: "Other symptoms and signs involving the digestive system", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Digestive symptom"], documentation: ["Various"] };
  codes["R13.9"] = { code: "R13.9", description: "Abnormalities of swallowing and esophagus, unspecified", category: "R13", excludes1: [], excludes2: [], includes: [], commonUse: ["Swallowing abnormality NOS"], documentation: ["Barium swallow"] };
  codes["R14.0"] = { code: "R14.0", description: "Abdominal distension", category: "R14", excludes1: [], excludes2: [], includes: [], commonUse: ["Bloating", "Abdominal distension"], documentation: ["CT abdomen"] };
  codes["R14.1"] = { code: "R14.1", description: "Abdominal pain and distension", category: "R14", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal pain and bloating"], documentation: ["CT abdomen"] };
  codes["R14.2"] = { code: "R14.2", description: "Flatulence", category: "R14", excludes1: [], excludes2: [], includes: [], commonUse: ["Gas", "Flatulence"], documentation: ["Clinical exam"] };
  codes["R14.3"] = { code: "R14.3", description: "Excessive gas", category: "R14", excludes1: [], excludes2: [], includes: [], commonUse: ["Excessive gas"], documentation: ["Clinical exam"] };
  codes["R15.0"] = { code: "R15.0", description: "Fecal incontinence", category: "R15", excludes1: [], excludes2: [], includes: [], commonUse: ["Fecal incontinence"], documentation: ["Anorectal manometry"] };
  codes["R15.1"] = { code: "R15.1", description: "Fecal urgency", category: "R15", excludes1: [], excludes2: [], includes: [], commonUse: ["Fecal urgency"], documentation: ["Clinical exam"] };
  codes["R15.2"] = { code: "R15.2", description: "Involuntary expulsion of feces", category: "R15", excludes1: [], excludes2: [], includes: [], commonUse: ["Involuntary fecal expulsion"], documentation: ["Clinical exam"] };
  codes["R15.9"] = { code: "R15.9", description: "Other fecal incontinence", category: "R15", excludes1: [], excludes2: [], includes: [], commonUse: ["Fecal incontinence NOS"], documentation: ["Clinical exam"] };
  codes["R16.0"] = { code: "R16.0", description: "Hepatomegaly, not elsewhere classified", category: "R16", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatomegaly"], documentation: ["Ultrasound abdomen", "LFTs"] };
  codes["R16.1"] = { code: "R16.1", description: "Splenomegaly, not elsewhere classified", category: "R16", excludes1: [], excludes2: [], includes: [], commonUse: ["Splenomegaly"], documentation: ["Ultrasound abdomen"] };
  codes["R16.2"] = { code: "R16.2", description: "Hepatomegaly with splenomegaly, not elsewhere classified", category: "R16", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatosplenomegaly"], documentation: ["Ultrasound abdomen"] };
  codes["R17"] = { code: "R17", description: "Unspecified jaundice", category: "R17", excludes1: [], excludes2: [], includes: [], commonUse: ["Jaundice NOS"], documentation: ["LFTs", "Bilirubin"] };
  codes["R18.0"] = { code: "R18.0", description: "Malignant ascites", category: "R18", excludes1: [], excludes2: [], includes: [], commonUse: ["Malignant ascites"], documentation: ["CT abdomen", "Ascitic fluid analysis"] };
  codes["R18.1"] = { code: "R18.1", description: "Ascites", category: "R18", excludes1: [], excludes2: [], includes: [], commonUse: ["Ascites"], documentation: ["Ultrasound abdomen"] };
  codes["R18.2"] = { code: "R18.2", description: "Chylous ascites", category: "R18", excludes1: [], excludes2: [], includes: [], commonUse: ["Chylous ascites"], documentation: ["Ascitic fluid analysis"] };
  codes["R18.8"] = { code: "R18.8", description: "Other ascites", category: "R18", excludes1: [], excludes2: [], includes: [], commonUse: ["Ascites"], documentation: ["CT abdomen"] };
  codes["R18.9"] = { code: "R18.9", description: "Ascites, unspecified", category: "R18", excludes1: [], excludes2: [], includes: [], commonUse: ["Ascites NOS"], documentation: ["Ultrasound"] };
  codes["R19.0"] = { code: "R19.0", description: "Intra-abdominal and pelvic swelling, mass and lump", category: "R19", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal mass"], documentation: ["CT abdomen"] };
  codes["R19.1"] = { code: "R19.1", description: "Abdominal mass, localized to upper abdomen", category: "R19", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper abdominal mass"], documentation: ["CT abdomen"] };
  codes["R19.2"] = { code: "R19.2", description: "Abdominal mass, localized to right upper quadrant", category: "R19", excludes1: [], excludes2: [], includes: [], commonUse: ["RUQ mass"], documentation: ["CT abdomen"] };
  codes["R19.3"] = { code: "R19.3", description: "Abdominal mass, localized to left upper quadrant", category: "R19", excludes1: [], excludes2: [], includes: [], commonUse: ["LUQ mass"], documentation: ["CT abdomen"] };
  codes["R19.4"] = { code: "R19.4", description: "Abdominal mass, localized to epigastric area", category: "R19", excludes1: [], excludes2: [], includes: [], commonUse: ["Epigastric mass"], documentation: ["CT abdomen"] };
  codes["R19.5"] = { code: "R19.5", description: "Other abdominal mass", category: "R19", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal mass"], documentation: ["CT abdomen"] };
  codes["R19.6"] = { code: "R19.6", description: "Intra-abdominal swelling", category: "R19", excludes1: [], excludes2: [], includes: [], commonUse: ["Intra-abdominal swelling"], documentation: ["CT abdomen"] };
  codes["R19.7"] = { code: "R19.7", description: "Diarrhea, unspecified", category: "R19", excludes1: [], excludes2: [], includes: [], commonUse: ["Diarrhea NOS"], documentation: ["Stool culture"] };
  codes["R19.8"] = { code: "R19.8", description: "Other intra-abdominal and pelvic symptoms", category: "R19", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal symptom"], documentation: ["Various"] };
  codes["R20.0"] = { code: "R20.0", description: "Anesthesia of skin", category: "R20", excludes1: [], excludes2: [], includes: [], commonUse: ["Skin numbness"], documentation: ["Nerve conduction study"] };
  codes["R20.1"] = { code: "R20.1", description: "Hypoesthesia of skin", category: "R20", excludes1: [], excludes2: [], includes: [], commonUse: ["Decreased skin sensation"], documentation: ["Neurological exam"] };
  codes["R20.2"] = { code: "R20.2", description: "Paresthesia of skin", category: "R20", excludes1: [], excludes2: [], includes: [], commonUse: ["Paresthesia", "Tingling"], documentation: ["Nerve conduction study"] };
  codes["R20.3"] = { code: "R20.3", description: "Hyperesthesia", category: "R20", excludes1: [], excludes2: [], includes: [], commonUse: ["Increased skin sensitivity"], documentation: ["Clinical exam"] };
  codes["R20.8"] = { code: "R20.8", description: "Other disturbances of skin sensation", category: "R20", excludes1: [], excludes2: [], includes: [], commonUse: ["Skin sensation disturbance"], documentation: ["Clinical exam"] };
  codes["R20.9"] = { code: "R20.9", description: "Disturbances of skin sensation, unspecified", category: "R20", excludes1: [], excludes2: [], includes: [], commonUse: ["Sensory disturbance NOS"], documentation: ["Clinical exam"] };
  codes["R21"] = { code: "R21", description: "Rash and other nonspecific skin eruption", category: "R21", excludes1: [], excludes2: [], includes: [], commonUse: ["Rash", "Skin eruption"], documentation: ["Dermatology consult"] };
  codes["R22.0"] = { code: "R22.0", description: "Local swelling and mass, head", category: "R22", excludes1: [], excludes2: [], includes: [], commonUse: ["Head swelling"], documentation: ["CT head"] };
  codes["R22.1"] = { code: "R22.1", description: "Local swelling and mass, neck", category: "R22", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck swelling"], documentation: ["CT neck", "Ultrasound"] };
  codes["R22.2"] = { code: "R22.2", description: "Local swelling and mass, trunk", category: "R22", excludes1: [], excludes2: [], includes: [], commonUse: ["Trunk swelling"], documentation: ["CT"] };
  codes["R22.3"] = { code: "R22.3", description: "Local swelling and mass, upper limb", category: "R22", excludes1: [], excludes2: [], includes: [], commonUse: ["Upper limb swelling"], documentation: ["Ultrasound"] };
  codes["R22.4"] = { code: "R22.4", description: "Local swelling and mass, lower limb", category: "R22", excludes1: [], excludes2: [], includes: [], commonUse: ["Lower limb swelling"], documentation: ["Ultrasound"] };
  codes["R22.7"] = { code: "R22.7", description: "Multiple local swelling and mass", category: "R22", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple swelling"], documentation: ["CT"] };
  codes["R22.9"] = { code: "R22.9", description: "Local swelling and mass, unspecified", category: "R22", excludes1: [], excludes2: [], includes: [], commonUse: ["Swelling NOS"], documentation: ["Imaging"] };
  codes["R23.0"] = { code: "R23.0", description: "Cyanosis", category: "R23", excludes1: [], excludes2: [], includes: [], commonUse: ["Cyanosis"], documentation: ["Pulse oximetry", "ABG"] };
  codes["R23.1"] = { code: "R23.1", description: "Pallor", category: "R23", excludes1: [], excludes2: [], includes: [], commonUse: ["Pallor"], documentation: ["CBC"] };
  codes["R23.2"] = { code: "R23.2", description: "Flushing", category: "R23", excludes1: [], excludes2: [], includes: [], commonUse: ["Flushing"], documentation: ["Clinical exam"] };
  codes["R23.3"] = { code: "R23.3", description: "Ecchymosis", category: "R23", excludes1: [], excludes2: [], includes: [], commonUse: ["Ecchymosis", "Bruising"], documentation: ["CBC", "PT/INR"] };
  codes["R23.4"] = { code: "R23.4", description: "Petechiae", category: "R23", excludes1: [], excludes2: [], includes: [], commonUse: ["Petechiae"], documentation: ["CBC", "PT/INR"] };
  codes["R23.8"] = { code: "R23.8", description: "Other skin changes", category: "R23", excludes1: [], excludes2: [], includes: [], commonUse: ["Skin change"], documentation: ["Clinical exam"] };
  codes["R23.9"] = { code: "R23.9", description: "Skin change, unspecified", category: "R23", excludes1: [], excludes2: [], includes: [], commonUse: ["Skin change NOS"], documentation: ["Clinical exam"] };
  codes["R25.0"] = { code: "R25.0", description: "Abnormal head movements", category: "R25", excludes1: [], excludes2: [], includes: [], commonUse: ["Abnormal head movements"], documentation: ["Clinical exam"] };
  codes["R25.1"] = { code: "R25.1", description: "Tremor, unspecified", category: "R25", excludes1: [], excludes2: [], includes: [], commonUse: ["Tremor NOS"], documentation: ["Clinical exam"] };
  codes["R25.2"] = { code: "R25.2", description: "Cramp and spasm", category: "R25", excludes1: [], excludes2: [], includes: [], commonUse: ["Cramp", "Muscle spasm"], documentation: ["EMG"] };
  codes["R25.3"] = { code: "R25.3", description: "Fasciculation", category: "R25", excludes1: [], excludes2: [], includes: [], commonUse: ["Fasciculation"], documentation: ["EMG"] };
  codes["R25.8"] = { code: "R25.8", description: "Other abnormal involuntary movements", category: "R25", excludes1: [], excludes2: [], includes: [], commonUse: ["Involuntary movement"], documentation: ["Clinical exam"] };
  codes["R25.9"] = { code: "R25.9", description: "Abnormal involuntary movements, unspecified", category: "R25", excludes1: [], excludes2: [], includes: [], commonUse: ["Involuntary movement NOS"], documentation: ["Clinical exam"] };
  codes["R26.0"] = { code: "R26.0", description: "Ataxia, unspecified", category: "R26", excludes1: [], excludes2: [], includes: [], commonUse: ["Ataxia NOS"], documentation: ["Neurological exam", "MRI brain"] };
  codes["R26.1"] = { code: "R26.1", description: "Paralytic gait", category: "R26", excludes1: [], excludes2: [], includes: [], commonUse: ["Paralytic gait"], documentation: ["Neurological exam"] };
  codes["R26.2"] = { code: "R26.2", description: "Difficulty in walking, not elsewhere classified", category: "R26", excludes1: [], excludes2: [], includes: [], commonUse: ["Difficulty walking"], documentation: ["Gait assessment"] };
  codes["R26.3"] = { code: "R26.3", description: "Unsteadiness on feet", category: "R26", excludes1: [], excludes2: [], includes: [], commonUse: ["Unsteadiness"], documentation: ["Gait assessment"] };
  codes["R26.8"] = { code: "R26.8", description: "Other abnormalities of gait and mobility", category: "R26", excludes1: [], excludes2: [], includes: [], commonUse: ["Gait abnormality"], documentation: ["Gait assessment"] };
  codes["R26.9"] = { code: "R26.9", description: "Abnormalities of gait and mobility, unspecified", category: "R26", excludes1: [], excludes2: [], includes: [], commonUse: ["Gait abnormality NOS"], documentation: ["Gait assessment"] };
  codes["R27.0"] = { code: "R27.0", description: "Ataxia, unspecified", category: "R27", excludes1: [], excludes2: [], includes: [], commonUse: ["Ataxia NOS"], documentation: ["Neurological exam"] };
  codes["R27.8"] = { code: "R27.8", description: "Other lack of coordination", category: "R27", excludes1: [], excludes2: [], includes: [], commonUse: ["Coordination loss"], documentation: ["Neurological exam"] };
  codes["R27.9"] = { code: "R27.9", description: "Lack of coordination, unspecified", category: "R27", excludes1: [], excludes2: [], includes: [], commonUse: ["Coordination loss NOS"], documentation: ["Neurological exam"] };
  codes["R29.0"] = { code: "R29.0", description: "Tetany", category: "R29", excludes1: [], excludes2: [], includes: [], commonUse: ["Tetany"], documentation: ["Calcium level"] };
  codes["R29.1"] = { code: "R29.1", description: "Meningism", category: "R29", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningismus"], documentation: ["Lumbar puncture"] };
  codes["R29.2"] = { code: "R29.2", description: "Abnormal reflex", category: "R29", excludes1: [], excludes2: [], includes: [], commonUse: ["Abnormal reflex"], documentation: ["Neurological exam"] };
  codes["R29.3"] = { code: "R29.3", description: "Abnormal posture", category: "R29", excludes1: [], excludes2: [], includes: [], commonUse: ["Abnormal posture"], documentation: ["Clinical exam"] };
  codes["R29.4"] = { code: "R29.4", description: "Clumsiness", category: "R29", excludes1: [], excludes2: [], includes: [], commonUse: ["Clumsiness"], documentation: ["Neurological exam"] };
  codes["R29.6"] = { code: "R29.6", description: "Repeated falls", category: "R29", excludes1: [], excludes2: [], includes: [], commonUse: ["Falls"], documentation: ["Gait assessment"] };
  codes["R29.7"] = { code: "R29.7", description: "Nonspecific findings and abnormalities of nervous and musculoskeletal system", category: "R29", excludes1: [], excludes2: [], includes: [], commonUse: ["Neuro/musculoskeletal abnormality"], documentation: ["Various"] };
  codes["R29.8"] = { code: "R29.8", description: "Other symptoms and signs involving the nervous and musculoskeletal systems", category: "R29", excludes1: [], excludes2: [], includes: [], commonUse: ["Neuro/musculoskeletal symptom"], documentation: ["Various"] };
  codes["R29.9"] = { code: "R29.9", description: "Symptoms and signs involving the nervous and musculoskeletal systems, unspecified", category: "R29", excludes1: [], excludes2: [], includes: [], commonUse: ["Neuro/musculoskeletal symptom NOS"], documentation: ["Various"] };
  codes["R30.0"] = { code: "R30.0", description: "Dysuria", category: "R30", excludes1: [], excludes2: [], includes: [], commonUse: ["Painful urination"], documentation: ["Urinalysis"] };
  codes["R30.1"] = { code: "R30.1", description: "Vesical tenesmus", category: "R30", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder tenesmus"], documentation: ["Urinalysis"] };
  codes["R30.2"] = { code: "R30.2", description: "Other pain associated with micturition", category: "R30", excludes1: [], excludes2: [], includes: [], commonUse: ["Painful urination"], documentation: ["Urinalysis"] };
  codes["R30.3"] = { code: "R30.3", description: "Enuresis", category: "R30", excludes1: [], excludes2: [], includes: [], commonUse: ["Bedwetting", "Enuresis"], documentation: ["Urinalysis"] };
  codes["R30.8"] = { code: "R30.8", description: "Other symptoms and signs of urinary frequency", category: "R30", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary frequency"], documentation: ["Urinalysis"] };
  codes["R30.9"] = { code: "R30.9", description: "Micturition, unspecified", category: "R30", excludes1: [], excludes2: [], includes: [], commonUse: ["Urination NOS"], documentation: ["Urinalysis"] };
  codes["R31"] = { code: "R31", description: "Hematuria, unspecified", category: "R31", excludes1: [], excludes2: [], includes: [], commonUse: ["Hematuria NOS"], documentation: ["Urinalysis", "CT urogram"] };
  codes["R32"] = { code: "R32", description: "Urinary incontinence, unspecified", category: "R32", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary incontinence NOS"], documentation: ["Urinalysis"] };
  codes["R33.0"] = { code: "R33.0", description: "Retention of urine, unspecified", category: "R33", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary retention"], documentation: ["Bladder scan", "Catheterization"] };
  codes["R33.1"] = { code: "R33.1", description: "Retention of urine due to urethral stricture", category: "R33", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral stricture retention"], documentation: ["Urethrogram"] };
  codes["R33.8"] = { code: "R33.8", description: "Other retention of urine", category: "R33", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary retention"], documentation: ["Bladder scan"] };
  codes["R33.9"] = { code: "R33.9", description: "Retention of urine, unspecified", category: "R33", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary retention NOS"], documentation: ["Bladder scan"] };
  codes["R34"] = { code: "R34", description: "Anuria and oliguria", category: "R34", excludes1: [], excludes2: [], includes: [], commonUse: ["Anuria", "Oliguria"], documentation: ["Creatinine", "Urinalysis"] };
  codes["R35"] = { code: "R35", description: "Polyuria", category: "R35", excludes1: [], excludes2: [], includes: [], commonUse: ["Polyuria"], documentation: ["Urinalysis", "BMP"] };
  codes["R36.0"] = { code: "R36.0", description: "Discharge from urethra", category: "R36", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral discharge"], documentation: ["Urethral swab"] };
  codes["R36.1"] = { code: "R36.1", description: "Hematospermia", category: "R36", excludes1: [], excludes2: [], includes: [], commonUse: ["Hematospermia"], documentation: ["Semen analysis"] };
  codes["R36.8"] = { code: "R36.8", description: "Other symptoms and signs involving the urinary system", category: "R36", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary symptom"], documentation: ["Various"] };
  codes["R36.9"] = { code: "R36.9", description: "Symptoms and signs involving the urinary system, unspecified", category: "R36", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary symptom NOS"], documentation: ["Various"] };
  codes["R39.0"] = { code: "R39.0", description: "Extravasation of urine", category: "R39", excludes1: [], excludes2: [], includes: [], commonUse: ["Urine extravasation"], documentation: ["CT abdomen"] };
  codes["R39.1"] = { code: "R39.1", description: "Other difficulties of micturition", category: "R39", excludes1: [], excludes2: [], includes: [], commonUse: ["Micturition difficulty"], documentation: ["Uroflowmetry"] };
  codes["R39.2"] = { code: "R39.2", description: "Incontinence of sphincter (anus)", category: "R39", excludes1: [], excludes2: [], includes: [], commonUse: ["Fecal incontinence"], documentation: ["Anorectal manometry"] };
  codes["R39.3"] = { code: "R39.3", description: "Urgency of micturition", category: "R39", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary urgency"], documentation: ["Urinalysis"] };
  codes["R39.4"] = { code: "R39.4", description: "Pollakiuria", category: "R39", excludes1: [], excludes2: [], includes: [], commonUse: ["Frequent urination"], documentation: ["Urinalysis"] };
  codes["R39.8"] = { code: "R39.8", description: "Other symptoms and signs involving the genitourinary system", category: "R39", excludes1: [], excludes2: [], includes: [], commonUse: ["Genitourinary symptom"], documentation: ["Various"] };
  codes["R39.9"] = { code: "R39.9", description: "Symptoms and signs involving the genitourinary system, unspecified", category: "R39", excludes1: [], excludes2: [], includes: [], commonUse: ["Genitourinary symptom NOS"], documentation: ["Various"] };
  codes["R40.0"] = { code: "R40.0", description: "Somnolence", category: "R40", excludes1: [], excludes2: [], includes: [], commonUse: ["Drowsiness", "Somnolence"], documentation: ["Neurological exam"] };
  codes["R40.1"] = { code: "R40.1", description: "Stupor", category: "R40", excludes1: [], excludes2: [], includes: [], commonUse: ["Stupor"], documentation: ["Neurological exam", "CT head"] };
  codes["R40.2"] = { code: "R40.2", description: "Coma, unspecified", category: "R40", excludes1: [], excludes2: [], includes: [], commonUse: ["Coma"], documentation: ["Glasgow Coma Scale", "CT head"] };
  codes["R40.3"] = { code: "R40.3", description: "Persistent vegetative state", category: "R40", excludes1: [], excludes2: [], includes: [], commonUse: ["Vegetative state"], documentation: ["EEG"] };
  codes["R41.0"] = { code: "R41.0", description: "Disorientation, unspecified", category: "R41", excludes1: [], excludes2: [], includes: [], commonUse: ["Disorientation"], documentation: ["Neurological exam", "CT head"] };
  codes["R41.1"] = { code: "R41.1", description: "Anterograde amnesia", category: "R41", excludes1: [], excludes2: [], includes: [], commonUse: ["Anterograde amnesia"], documentation: ["Neurological exam", "CT head"] };
  codes["R41.2"] = { code: "R41.2", description: "Retrograde amnesia", category: "R41", excludes1: [], excludes2: [], includes: [], commonUse: ["Retrograde amnesia"], documentation: ["Neurological exam"] };
  codes["R41.3"] = { code: "R41.3", description: "Other amnesia", category: "R41", excludes1: [], excludes2: [], includes: [], commonUse: ["Amnesia"], documentation: ["Neurological exam"] };
  codes["R41.8"] = { code: "R41.8", description: "Other symptoms and signs involving cognitive functions and awareness", category: "R41", excludes1: [], excludes2: [], includes: [], commonUse: ["Cognitive symptom"], documentation: ["Neurological exam"] };
  codes["R41.9"] = { code: "R41.9", description: "Symptoms and signs involving cognitive functions and awareness, unspecified", category: "R41", excludes1: [], excludes2: [], includes: [], commonUse: ["Cognitive symptom NOS"], documentation: ["Neurological exam"] };
  codes["R42"] = { code: "R42", description: "Dizziness and giddiness", category: "R42", excludes1: [], excludes2: [], includes: [], commonUse: ["Dizziness"], documentation: ["Audiometry", "CT head"] };
  codes["R43.0"] = { code: "R43.0", description: "Anosmia", category: "R43", excludes1: [], excludes2: [], includes: [], commonUse: ["Loss of smell"], documentation: ["Smell test"] };
  codes["R43.1"] = { code: "R43.1", description: "Hyposmia", category: "R43", excludes1: [], excludes2: [], includes: [], commonUse: ["Decreased smell"], documentation: ["Smell test"] };
  codes["R43.2"] = { code: "R43.2", description: "Parosmia", category: "R43", excludes1: [], excludes2: [], includes: [], commonUse: ["Distorted smell"], documentation: ["Smell test"] };
  codes["R43.3"] = { code: "R43.3", description: "Ageusia", category: "R43", excludes1: [], excludes2: [], includes: [], commonUse: ["Loss of taste"], documentation: ["Taste test"] };
  codes["R43.8"] = { code: "R43.8", description: "Other disturbances of smell and taste", category: "R43", excludes1: [], excludes2: [], includes: [], commonUse: ["Smell/taste disturbance"], documentation: ["Smell test"] };
  codes["R43.9"] = { code: "R43.9", description: "Disturbance of smell and taste, unspecified", category: "R43", excludes1: [], excludes2: [], includes: [], commonUse: ["Smell/taste disturbance NOS"], documentation: ["Smell test"] };
  codes["R44.0"] = { code: "R44.0", description: "Auditory hallucinations", category: "R44", excludes1: [], excludes2: [], includes: [], commonUse: ["Auditory hallucinations"], documentation: ["Psychiatric eval"] };
  codes["R44.1"] = { code: "R44.1", description: "Visual hallucinations", category: "R44", excludes1: [], excludes2: [], includes: [], commonUse: ["Visual hallucinations"], documentation: ["Psychiatric eval", "CT head"] };
  codes["R44.2"] = { code: "R44.2", description: "Other hallucinations", category: "R44", excludes1: [], excludes2: [], includes: [], commonUse: ["Hallucinations"], documentation: ["Psychiatric eval"] };
  codes["R44.3"] = { code: "R44.3", description: "Hallucinations, unspecified", category: "R44", excludes1: [], excludes2: [], includes: [], commonUse: ["Hallucinations NOS"], documentation: ["Psychiatric eval"] };
  codes["R44.8"] = { code: "R44.8", description: "Other symptoms and signs involving general sensations and perceptions", category: "R44", excludes1: [], excludes2: [], includes: [], commonUse: ["Sensory symptom"], documentation: ["Various"] };
  codes["R44.9"] = { code: "R44.9", description: "Symptoms and signs involving general sensations and perceptions, unspecified", category: "R44", excludes1: [], excludes2: [], includes: [], commonUse: ["Sensory symptom NOS"], documentation: ["Various"] };
  codes["R45.0"] = { code: "R45.0", description: "Nervousness", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Nervousness"], documentation: ["Psychiatric eval"] };
  codes["R45.1"] = { code: "R45.1", description: "Tension", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Tension"], documentation: ["Psychiatric eval"] };
  codes["R45.2"] = { code: "R45.2", description: "Unhappiness", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Unhappiness"], documentation: ["Psychiatric eval"] };
  codes["R45.3"] = { code: "R45.3", description: "Demoralization and apathy", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Demoralization"], documentation: ["Psychiatric eval"] };
  codes["R45.4"] = { code: "R45.4", description: "Irritability and anger", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Irritability"], documentation: ["Psychiatric eval"] };
  codes["R45.5"] = { code: "R45.5", description: "Anger", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Anger"], documentation: ["Psychiatric eval"] };
  codes["R45.6"] = { code: "R45.6", description: "Violent behavior", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Violent behavior"], documentation: ["Psychiatric eval"] };
  codes["R45.7"] = { code: "R45.7", description: "State of emotional shock and stress, unspecified", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Emotional shock"], documentation: ["Psychiatric eval"] };
  codes["R45.8"] = { code: "R45.8", description: "Other symptoms and signs involving emotional state", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Emotional symptom"], documentation: ["Psychiatric eval"] };
  codes["R45.9"] = { code: "R45.9", description: "Symptoms and signs involving emotional state, unspecified", category: "R45", excludes1: [], excludes2: [], includes: [], commonUse: ["Emotional symptom NOS"], documentation: ["Psychiatric eval"] };
  codes["R46.0"] = { code: "R46.0", description: "Very low level of personal hygiene", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Poor hygiene"], documentation: ["Clinical exam"] };
  codes["R46.1"] = { code: "R46.1", description: "Unusual personal appearance", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Unusual appearance"], documentation: ["Clinical exam"] };
  codes["R46.2"] = { code: "R46.2", description: "Strange behavior", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Strange behavior"], documentation: ["Psychiatric eval"] };
  codes["R46.3"] = { code: "R46.3", description: "Excessive levels of energy", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Excessive energy"], documentation: ["Psychiatric eval"] };
  codes["R46.4"] = { code: "R46.4", description: "Slowness and poor responsiveness", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Psychomotor slowing"], documentation: ["Neurological exam"] };
  codes["R46.5"] = { code: "R46.5", description: "Unusual motor behavior", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Unusual motor behavior"], documentation: ["Clinical exam"] };
  codes["R46.6"] = { code: "R46.6", description: "Unusual concerns about body odors", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Body odor concern"], documentation: ["Psychiatric eval"] };
  codes["R46.7"] = { code: "R46.7", description: "Elaboration of symptoms and signs, which cannot be established by an objective diagnostic procedure", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Symptom elaboration"], documentation: ["Psychiatric eval"] };
  codes["R46.8"] = { code: "R46.8", description: "Other symptoms and signs involving behavior and psychomotor function", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Behavioral symptom"], documentation: ["Various"] };
  codes["R46.9"] = { code: "R46.9", description: "Symptoms and signs involving behavior and psychomotor function, unspecified", category: "R46", excludes1: [], excludes2: [], includes: [], commonUse: ["Behavioral symptom NOS"], documentation: ["Various"] };
  codes["R47.0"] = { code: "R47.0", description: "Dysphasia", category: "R47", excludes1: [], excludes2: [], includes: [], commonUse: ["Dysphasia"], documentation: ["Speech therapy eval", "CT head"] };
  codes["R47.1"] = { code: "R47.1", description: "Anarthria", category: "R47", excludes1: [], excludes2: [], includes: [], commonUse: ["Anarthria"], documentation: ["Speech therapy eval"] };
  codes["R47.8"] = { code: "R47.8", description: "Other symptoms and signs involving speech and voice", category: "R47", excludes1: [], excludes2: [], includes: [], commonUse: ["Speech symptom"], documentation: ["Speech therapy eval"] };
  codes["R47.9"] = { code: "R47.9", description: "Speech disturbances, not elsewhere classified", category: "R47", excludes1: [], excludes2: [], includes: [], commonUse: ["Speech disturbance NOS"], documentation: ["Speech therapy eval"] };
  codes["R48.0"] = { code: "R48.0", description: "Dyslexia and alexia", category: "R48", excludes1: [], excludes2: [], includes: [], commonUse: ["Dyslexia", "Alexia"], documentation: ["Neuropsychological testing"] };
  codes["R48.1"] = { code: "R48.1", description: "Anomia", category: "R48", excludes1: [], excludes2: [], includes: [], commonUse: ["Anomia"], documentation: ["Speech therapy eval"] };
  codes["R48.2"] = { code: "R48.2", description: "Apraxia", category: "R48", excludes1: [], excludes2: [], includes: [], commonUse: ["Apraxia"], documentation: ["Neurological exam"] };
  codes["R48.3"] = { code: "R48.3", description: "Agnosia", category: "R48", excludes1: [], excludes2: [], includes: [], commonUse: ["Agnosia"], documentation: ["Neurological exam"] };
  codes["R48.8"] = { code: "R48.8", description: "Other symbolic dysfunction", category: "R48", excludes1: [], excludes2: [], includes: [], commonUse: ["Symbolic dysfunction"], documentation: ["Neuropsychological testing"] };
  codes["R48.9"] = { code: "R48.9", description: "Symbolic dysfunction, unspecified", category: "R48", excludes1: [], excludes2: [], includes: [], commonUse: ["Symbolic dysfunction NOS"], documentation: ["Neuropsychological testing"] };
  codes["R49.0"] = { code: "R49.0", description: "Dysphonia", category: "R49", excludes1: [], excludes2: [], includes: [], commonUse: ["Hoarseness", "Dysphonia"], documentation: ["Laryngoscopy"] };
  codes["R49.1"] = { code: "R49.1", description: "Aphonia", category: "R49", excludes1: [], excludes2: [], includes: [], commonUse: ["Aphonia", "Voice loss"], documentation: ["Laryngoscopy"] };
  codes["R49.2"] = { code: "R49.2", description: "Nasality (hypernasality and hyponasality)", category: "R49", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasal speech"], documentation: ["Speech therapy eval"] };
  codes["R49.8"] = { code: "R49.8", description: "Other voice and resonance disorders", category: "R49", excludes1: [], excludes2: [], includes: [], commonUse: ["Voice disorder"], documentation: ["Laryngoscopy"] };
  codes["R49.9"] = { code: "R49.9", description: "Voice and resonance disorder, unspecified", category: "R49", excludes1: [], excludes2: [], includes: [], commonUse: ["Voice disorder NOS"], documentation: ["Laryngoscopy"] };
  codes["R50.0"] = { code: "R50.0", description: "Fever with chills", category: "R50", excludes1: [], excludes2: [], includes: [], commonUse: ["Fever with chills"], documentation: ["Blood cultures"] };
  codes["R50.1"] = { code: "R50.1", description: "Persistent fever", category: "R50", excludes1: [], excludes2: [], includes: [], commonUse: ["Persistent fever"], documentation: ["Various"] };
  codes["R50.2"] = { code: "R50.2", description: "Drug fever", category: "R50", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug fever"], documentation: ["Various"] };
  codes["R50.8"] = { code: "R50.8", description: "Other specified fever", category: "R50", excludes1: [], excludes2: [], includes: [], commonUse: ["Fever"], documentation: ["Various"] };
  codes["R50.9"] = { code: "R50.9", description: "Fever, unspecified", category: "R50", excludes1: [], excludes2: [], includes: [], commonUse: ["Fever NOS"], documentation: ["Temperature"] };
  codes["R51.0"] = { code: "R51.0", description: "Headache with visual disturbances", category: "R51", excludes1: [], excludes2: [], includes: [], commonUse: ["Migraine", "Headache with visual changes"], documentation: ["CT head", "MRI brain"] };
  codes["R51.1"] = { code: "R51.1", description: "Headache with aura", category: "R51", excludes1: [], excludes2: [], includes: [], commonUse: ["Migraine with aura"], documentation: ["MRI brain"] };
  codes["R51.2"] = { code: "R51.2", description: "Tension-type headache", category: "R51", excludes1: [], excludes2: [], includes: [], commonUse: ["Tension headache"], documentation: ["Clinical exam"] };
  codes["R51.3"] = { code: "R51.3", description: "Other headache", category: "R51", excludes1: [], excludes2: [], includes: [], commonUse: ["Headache NOS"], documentation: ["CT head"] };
  codes["R51.9"] = { code: "R51.9", description: "Headache, unspecified", category: "R51", excludes1: [], excludes2: [], includes: [], commonUse: ["Headache NOS"], documentation: ["CT head"] };
  codes["R52.0"] = { code: "R52.0", description: "Acute pain", category: "R52", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute pain"], documentation: ["Clinical exam"] };
  codes["R52.1"] = { code: "R52.1", description: "Chronic pain", category: "R52", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic pain"], documentation: ["Various"] };
  codes["R52.2"] = { code: "R52.2", description: "Other chronic pain", category: "R52", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic pain NOS"], documentation: ["Various"] };
  codes["R52.9"] = { code: "R52.9", description: "Pain, unspecified", category: "R52", excludes1: [], excludes2: [], includes: [], commonUse: ["Pain NOS"], documentation: ["Clinical exam"] };
  codes["R53.0"] = { code: "R53.0", description: "Weakness", category: "R53", excludes1: [], excludes2: [], includes: [], commonUse: ["Weakness"], documentation: ["Various"] };
  codes["R53.1"] = { code: "R53.1", description: "Weakness, unspecified", category: "R53", excludes1: [], excludes2: [], includes: [], commonUse: ["Weakness NOS"], documentation: ["Various"] };
  codes["R53.2"] = { code: "R53.2", description: "Muscle weakness", category: "R53", excludes1: [], excludes2: [], includes: [], commonUse: ["Muscle weakness"], documentation: ["EMG", "CK level"] };
  codes["R53.8"] = { code: "R53.8", description: "Other malaise", category: "R53", excludes1: [], excludes2: [], includes: [], commonUse: ["Malaise"], documentation: ["Various"] };
  codes["R53.81"] = { code: "R53.81", description: "Other malaise", category: "R53", excludes1: [], excludes2: [], includes: [], commonUse: ["Malaise"], documentation: ["Various"] };
  codes["R53.83"] = { code: "R53.83", description: "Chronic fatigue", category: "R53", excludes1: [], excludes2: [], includes: [], commonUse: ["Chronic fatigue"], documentation: ["Various"] };
  codes["R53.9"] = { code: "R53.9", description: "Fatigue, malaise and ill-defined, unspecified", category: "R53", excludes1: [], excludes2: [], includes: [], commonUse: ["Fatigue NOS"], documentation: ["Various"] };
  codes["R54"] = { code: "R54", description: "Age-related physical debility", category: "R54", excludes1: [], excludes2: [], includes: [], commonUse: ["Frailty", "Age-related debility"], documentation: ["Functional assessment"] };
  codes["R55"] = { code: "R55", description: "Syncope and collapse", category: "R55", excludes1: [], excludes2: [], includes: [], commonUse: ["Fainting", "Syncope"], documentation: ["ECG", "Echocardiogram", "Tilt table test"] };
  codes["R56.0"] = { code: "R56.0", description: "Pre-syncopal condition", category: "R56", excludes1: [], excludes2: [], includes: [], commonUse: ["Near-syncope", "Presyncope"], documentation: ["ECG", "Orthostatics"] };
  codes["R56.1"] = { code: "R56.1", description: "Convulsions, not elsewhere classified", category: "R56", excludes1: [], excludes2: [], includes: [], commonUse: ["Seizure"], documentation: ["EEG", "CT head"] };
  codes["R56.9"] = { code: "R56.9", description: "Unspecified convulsions", category: "R56", excludes1: [], excludes2: [], includes: [], commonUse: ["Seizure NOS"], documentation: ["EEG", "CT head"] };
  codes["R57.0"] = { code: "R57.0", description: "Cardiogenic shock", category: "R57", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiogenic shock"], documentation: ["ECG", "Echocardiogram", "Troponin"] };
  codes["R57.1"] = { code: "R57.1", description: "Hypovolemic shock", category: "R57", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypovolemic shock"], documentation: ["Lactate", "CBC"] };
  codes["R57.8"] = { code: "R57.8", description: "Other shock", category: "R57", excludes1: [], excludes2: [], includes: [], commonUse: ["Shock"], documentation: ["Various"] };
  codes["R57.9"] = { code: "R57.9", description: "Shock, unspecified", category: "R57", excludes1: [], excludes2: [], includes: [], commonUse: ["Shock NOS"], documentation: ["Lactate"] };
  codes["R58"] = { code: "R58", description: "Hemorrhage, not elsewhere classified", category: "R58", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemorrhage NOS"], documentation: ["CBC", "CT"] };
  codes["R59.0"] = { code: "R59.0", description: "Localized lymphadenopathy", category: "R59", excludes1: [], excludes2: [], includes: [], commonUse: ["Localized lymphadenopathy"], documentation: ["Ultrasound", "Biopsy"] };
  codes["R59.1"] = { code: "R59.1", description: "Generalized lymphadenopathy", category: "R59", excludes1: [], excludes2: [], includes: [], commonUse: ["Generalized lymphadenopathy"], documentation: ["CT chest/abdomen/pelvis"] };
  codes["R59.9"] = { code: "R59.9", description: "Lymphadenopathy, unspecified", category: "R59", excludes1: [], excludes2: [], includes: [], commonUse: ["Lymphadenopathy NOS"], documentation: ["Ultrasound"] };
  codes["R60.0"] = { code: "R60.0", description: "Localized edema", category: "R60", excludes1: [], excludes2: [], includes: [], commonUse: ["Localized edema"], documentation: ["Clinical exam"] };
  codes["R60.1"] = { code: "R60.1", description: "Generalized edema", category: "R60", excludes1: [], excludes2: [], includes: [], commonUse: ["Generalized edema", "Anasarca"], documentation: ["BNP", "Albumin"] };
  codes["R60.2"] = { code: "R60.2", description: "Edema, unspecified", category: "R60", excludes1: [], excludes2: [], includes: [], commonUse: ["Edema NOS"], documentation: ["BNP", "Albumin"] };
  codes["R60.9"] = { code: "R60.9", description: "Edema, unspecified", category: "R60", excludes1: [], excludes2: [], includes: [], commonUse: ["Edema NOS"], documentation: ["BNP"] };
  codes["R61"] = { code: "R61", description: "Hyperhidrosis", category: "R61", excludes1: [], excludes2: [], includes: [], commonUse: ["Excessive sweating"], documentation: ["Thyroid function tests"] };
  codes["R62.0"] = { code: "R62.0", description: "Delayed growth in childhood", category: "R62", excludes1: [], excludes2: [], includes: [], commonUse: ["Growth delay"], documentation: ["Growth chart"] };
  codes["R62.8"] = { code: "R62.8", description: "Other failure to thrive", category: "R62", excludes1: [], excludes2: [], includes: [], commonUse: ["Failure to thrive"], documentation: ["Weight monitoring"] };
  codes["R62.9"] = { code: "R62.9", description: "Failure to thrive, unspecified", category: "R62", excludes1: [], excludes2: [], includes: [], commonUse: ["FTT NOS"], documentation: ["Weight monitoring"] };
  codes["R63.0"] = { code: "R63.0", description: "Anorexia", category: "R63", excludes1: [], excludes2: [], includes: [], commonUse: ["Anorexia"], documentation: ["Weight monitoring"] };
  codes["R63.1"] = { code: "R63.1", description: "Polyphagia", category: "R63", excludes1: [], excludes2: [], includes: [], commonUse: ["Excessive eating"], documentation: ["Glucose"] };
  codes["R63.2"] = { code: "R63.2", description: "Polydipsia", category: "R63", excludes1: [], excludes2: [], includes: [], commonUse: ["Excessive thirst"], documentation: ["BMP", "Glucose"] };
  codes["R63.3"] = { code: "R63.3", description: "Feeding difficulties and mismanagement", category: "R63", excludes1: [], excludes2: [], includes: [], commonUse: ["Feeding difficulty"], documentation: ["Speech therapy eval"] };
  codes["R63.4"] = { code: "R63.4", description: "Unintentional weight loss", category: "R63", excludes1: [], excludes2: [], includes: [], commonUse: ["Weight loss"], documentation: ["Various"] };
  codes["R63.5"] = { code: "R63.5", description: "Abnormal weight gain", category: "R63", excludes1: [], excludes2: [], includes: [], commonUse: ["Weight gain"], documentation: ["Various"] };
  codes["R63.6"] = { code: "R63.6", description: "Underweight", category: "R63", excludes1: [], excludes2: [], includes: [], commonUse: ["Underweight"], documentation: ["BMI"] };
  codes["R63.7"] = { code: "R63.7", description: "Overweight and obesity", category: "R63", excludes1: [], excludes2: [], includes: [], commonUse: ["Overweight", "Obesity"], documentation: ["BMI"] };
  codes["R63.8"] = { code: "R63.8", description: "Other symptoms and signs concerning food and fluid intake", category: "R63", excludes1: [], excludes2: [], includes: [], commonUse: ["Nutritional symptom"], documentation: ["Various"] };
  codes["R64"] = { code: "R64", description: "Cachexia", category: "R64", excludes1: [], excludes2: [], includes: [], commonUse: ["Cachexia", "Wasting"], documentation: ["Various"] };
  codes["R65.0"] = { code: "R65.0", description: "Severe sepsis with septic shock", category: "R65", excludes1: [], excludes2: [], includes: [], commonUse: ["Severe sepsis with shock"], documentation: ["Blood cultures", "Lactate", "SOFA score"] };
  codes["R65.1"] = { code: "R65.1", description: "Severe sepsis without septic shock", category: "R65", excludes1: [], excludes2: [], includes: [], commonUse: ["Severe sepsis"], documentation: ["Blood cultures", "Lactate"] };
  codes["R65.2"] = { code: "R65.2", description: "Other severe sepsis", category: "R65", excludes1: [], excludes2: [], includes: [], commonUse: ["Severe sepsis NOS"], documentation: ["Blood cultures"] };
  codes["R65.3"] = { code: "R65.3", description: "Septic shock", category: "R65", excludes1: [], excludes2: [], includes: [], commonUse: ["Septic shock"], documentation: ["Blood cultures", "Lactate"] };
  codes["R65.8"] = { code: "R65.8", description: "Other severe sepsis-related organ dysfunction", category: "R65", excludes1: [], excludes2: [], includes: [], commonUse: ["Sepsis organ dysfunction"], documentation: ["SOFA score"] };
  codes["R65.9"] = { code: "R65.9", description: "Severe sepsis, unspecified", category: "R65", excludes1: [], excludes2: [], includes: [], commonUse: ["Sepsis NOS"], documentation: ["Blood cultures", "Lactate"] };
  codes["R68.0"] = { code: "R68.0", description: "Hypothermia of newborn, unspecified", category: "R68", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypothermia"], documentation: ["Temperature"] };
  codes["R68.1"] = { code: "R68.1", description: "Nonspecific symptoms specific to neonates", category: "R68", excludes1: [], excludes2: [], includes: [], commonUse: ["Neonatal symptom"], documentation: ["Various"] };
  codes["R68.2"] = { code: "R68.2", description: "Hypothermia, unspecified", category: "R68", excludes1: [], excludes2: [], includes: [], commonUse: ["Hypothermia NOS"], documentation: ["Core temperature"] };
  codes["R68.3"] = { code: "R68.3", description: "Hyperthermia, unspecified", category: "R68", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperthermia"], documentation: ["Core temperature"] };
  codes["R68.8"] = { code: "R68.8", description: "Other general symptoms and signs", category: "R68", excludes1: [], excludes2: [], includes: [], commonUse: ["General symptom"], documentation: ["Various"] };
  codes["R68.89"] = { code: "R68.89", description: "Other general symptoms and signs", category: "R68", excludes1: [], excludes2: [], includes: [], commonUse: ["General symptom"], documentation: ["Various"] };
  codes["R69"] = { code: "R69", description: "Ill-defined conditions", category: "R69", excludes1: [], excludes2: [], includes: [], commonUse: ["Ill-defined condition"], documentation: ["Various"] };
  codes["R70.0"] = { code: "R70.0", description: "Elevated erythrocyte sedimentation rate", category: "R70", excludes1: [], excludes2: [], includes: [], commonUse: ["Elevated ESR"], documentation: ["ESR"] };
  codes["R70.1"] = { code: "R70.1", description: "Elevated plasma viscosity", category: "R70", excludes1: [], excludes2: [], includes: [], commonUse: ["Elevated viscosity"], documentation: ["Viscosity level"] };
  codes["R70.2"] = { code: "R70.2", description: "Elevated C-reactive protein (CRP)", category: "R70", excludes1: [], excludes2: [], includes: [], commonUse: ["Elevated CRP"], documentation: ["CRP"] };
  codes["R70.9"] = { code: "R70.9", description: "Elevated acute phase reactant, unspecified", category: "R70", excludes1: [], excludes2: [], includes: [], commonUse: ["Acute phase reactant elevated"], documentation: ["ESR", "CRP"] };
  codes["R73.0"] = { code: "R73.0", description: "Abnormal glucose tolerance test", category: "R73", excludes1: [], excludes2: [], includes: [], commonUse: ["Abnormal glucose tolerance"], documentation: ["Oral glucose tolerance test"] };
  codes["R73.01"] = { code: "R73.01", description: "Impaired fasting glucose", category: "R73", excludes1: [], excludes2: [], includes: [], commonUse: ["Impaired fasting glucose"], documentation: ["Fasting glucose"] };
  codes["R73.02"] = { code: "R73.02", description: "Impaired glucose tolerance", category: "R73", excludes1: [], excludes2: [], includes: [], commonUse: ["Impaired glucose tolerance"], documentation: ["OGTT"] };
  codes["R73.03"] = { code: "R73.03", description: "Prediabetes mellitus", category: "R73", excludes1: [], excludes2: [], includes: [], commonUse: ["Prediabetes"], documentation: ["Fasting glucose", "HbA1c"] };
  codes["R73.09"] = { code: "R73.09", description: "Other abnormal glucose", category: "R73", excludes1: [], excludes2: [], includes: [], commonUse: ["Abnormal glucose"], documentation: ["Fasting glucose"] };
  codes["R73.8"] = { code: "R73.8", description: "Other specified abnormalities of glucose regulation", category: "R73", excludes1: [], excludes2: [], includes: [], commonUse: ["Glucose abnormality"], documentation: ["Various"] };
  codes["R73.9"] = { code: "R73.9", description: "Hyperglycemia, unspecified", category: "R73", excludes1: [], excludes2: [], includes: [], commonUse: ["Hyperglycemia NOS"], documentation: ["Fasting glucose"] };
  codes["R74.0"] = { code: "R74.0", description: "Nonspecific elevation of levels of transaminases and lactic acid dehydrogenase (LDH)", category: "R74", excludes1: [], excludes2: [], includes: [], commonUse: ["Elevated LFTs"], documentation: ["LFTs"] };
  codes["R74.8"] = { code: "R74.8", description: "Other nonspecific abnormalities of chemical constituents of blood", category: "R74", excludes1: [], excludes2: [], includes: [], commonUse: ["Chemical abnormality"], documentation: ["Various"] };
  codes["R74.9"] = { code: "R74.9", description: "Nonspecific abnormal level of unspecified enzyme in blood", category: "R74", excludes1: [], excludes2: [], includes: [], commonUse: ["Enzyme abnormality"], documentation: ["Various"] };
  codes["R76.0"] = { code: "R76.0", description: "Raised antibody titer", category: "R76", excludes1: [], excludes2: [], includes: [], commonUse: ["Elevated antibody titers"], documentation: ["Various antibody tests"] };
  codes["R76.1"] = { code: "R76.1", description: "Abnormal immunological finding, not elsewhere classified", category: "R76", excludes1: [], excludes2: [], includes: [], commonUse: ["Immunological abnormality"], documentation: ["Immunoglobulin levels"] };
  codes["R76.2"] = { code: "R76.2", description: "False positive serological test for syphilis", category: "R76", excludes1: [], excludes2: [], includes: [], commonUse: ["False positive RPR"], documentation: ["RPR/VDRL", "FTA-ABS"] };
  codes["R76.8"] = { code: "R76.8", description: "Other specified abnormalities of immunological findings", category: "R76", excludes1: [], excludes2: [], includes: [], commonUse: ["Immunological abnormality"], documentation: ["Various"] };
  codes["R76.9"] = { code: "R76.9", description: "Abnormal immunological finding, unspecified", category: "R76", excludes1: [], excludes2: [], includes: [], commonUse: ["Immunological abnormality NOS"], documentation: ["Various"] };
  codes["R77.0"] = { code: "R77.0", description: "Abnormality of albumin", category: "R77", excludes1: [], excludes2: [], includes: [], commonUse: ["Albumin abnormality"], documentation: ["Albumin level"] };
  codes["R77.1"] = { code: "R77.1", description: "Abnormality of globulin", category: "R77", excludes1: [], excludes2: [], includes: [], commonUse: ["Globulin abnormality"], documentation: ["Protein electrophoresis"] };
  codes["R77.2"] = { code: "R77.2", description: "Abnormality of lipid, not elsewhere classified", category: "R77", excludes1: [], excludes2: [], includes: [], commonUse: ["Lipid abnormality"], documentation: ["Lipid panel"] };
  codes["R77.8"] = { code: "R77.8", description: "Other specified abnormalities of plasma proteins", category: "R77", excludes1: [], excludes2: [], includes: [], commonUse: ["Plasma protein abnormality"], documentation: ["Various"] };
  codes["R77.9"] = { code: "R77.9", description: "Plasma protein abnormality, unspecified", category: "R77", excludes1: [], excludes2: [], includes: [], commonUse: ["Protein abnormality NOS"], documentation: ["Albumin", "Total protein"] };
  codes["S00.0"] = { code: "S00.0", description: "Contusion of scalp", category: "S00", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp contusion"], documentation: ["CT head if concern for fracture"] };
  codes["S00.1"] = { code: "S00.1", description: "Contusion of eyelid and periocular area", category: "S00", excludes1: [], excludes2: [], includes: [], commonUse: ["Black eye"], documentation: ["Clinical exam"] };
  codes["S00.2"] = { code: "S00.2", description: "Contusion of ear", category: "S00", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear contusion"], documentation: ["Clinical exam"] };
  codes["S00.3"] = { code: "S00.3", description: "Contusion of nose", category: "S00", excludes1: [], excludes2: [], includes: [], commonUse: ["Nose contusion"], documentation: ["X-ray nose if fracture suspected"] };
  codes["S00.7"] = { code: "S00.7", description: "Contusion of face", category: "S00", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial contusion"], documentation: ["CT face if concern"] };
  codes["S00.8"] = { code: "S00.8", description: "Contusion of other parts of head", category: "S00", excludes1: [], excludes2: [], includes: [], commonUse: ["Head contusion"], documentation: ["CT head if concern"] };
  codes["S00.9"] = { code: "S00.9", description: "Contusion of head, part unspecified", category: "S00", excludes1: [], excludes2: [], includes: [], commonUse: ["Head contusion NOS"], documentation: ["CT head if concern"] };
  codes["S01.0"] = { code: "S01.0", description: "Laceration of scalp", category: "S01", excludes1: [], excludes2: [], includes: [], commonUse: ["Scalp laceration"], documentation: ["Wound repair"] };
  codes["S01.1"] = { code: "S01.1", description: "Laceration of eyelid and periocular area", category: "S01", excludes1: [], excludes2: [], includes: [], commonUse: ["Eyelid laceration"], documentation: ["Ophthalmology consult"] };
  codes["S01.2"] = { code: "S01.2", description: "Laceration of nose", category: "S01", excludes1: [], excludes2: [], includes: [], commonUse: ["Nose laceration"], documentation: ["ENT consult"] };
  codes["S01.3"] = { code: "S01.3", description: "Laceration of ear", category: "S01", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear laceration"], documentation: ["Wound repair"] };
  codes["S01.4"] = { code: "S01.4", description: "Laceration of cheek and temporomandibular region", category: "S01", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial laceration"], documentation: ["Wound repair", "CT face"] };
  codes["S01.5"] = { code: "S01.5", description: "Laceration of lip and oral cavity", category: "S01", excludes1: [], excludes2: [], includes: [], commonUse: ["Lip/oral laceration"], documentation: ["Dental consult"] };
  codes["S01.8"] = { code: "S01.8", description: "Laceration of other parts of head", category: "S01", excludes1: [], excludes2: [], includes: [], commonUse: ["Head laceration"], documentation: ["Wound repair"] };
  codes["S01.9"] = { code: "S01.9", description: "Laceration of head, part unspecified", category: "S01", excludes1: [], excludes2: [], includes: [], commonUse: ["Head laceration NOS"], documentation: ["Wound repair"] };
  codes["S02.0"] = { code: "S02.0", description: "Fracture of vault of skull", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Skull vault fracture"], documentation: ["CT head"] };
  codes["S02.1"] = { code: "S02.1", description: "Fracture of base of skull", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Basilar skull fracture"], documentation: ["CT head"] };
  codes["S02.2"] = { code: "S02.2", description: "Fracture of nasal bones", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Nasal fracture"], documentation: ["X-ray nose"] };
  codes["S02.3"] = { code: "S02.3", description: "Fracture of orbital floor", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Orbital floor fracture"], documentation: ["CT orbit"] };
  codes["S02.4"] = { code: "S02.4", description: "Fracture of malar and maxillary bones", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Zygomatic fracture", "Maxillary fracture"], documentation: ["CT face"] };
  codes["S02.5"] = { code: "S02.5", description: "Fracture of mandible", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Jaw fracture"], documentation: ["Panorex", "CT face"] };
  codes["S02.6"] = { code: "S02.6", description: "Fracture of temporal bone", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Temporal bone fracture"], documentation: ["CT temporal bone"] };
  codes["S02.7"] = { code: "S02.7", description: "Multiple fractures of skull and facial bones", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple skull fractures"], documentation: ["CT head/face"] };
  codes["S02.8"] = { code: "S02.8", description: "Fracture of other specified skull and facial bones", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Skull fracture"], documentation: ["CT head"] };
  codes["S02.9"] = { code: "S02.9", description: "Fracture of skull and facial bones, part unspecified", category: "S02", excludes1: [], excludes2: [], includes: [], commonUse: ["Skull fracture NOS"], documentation: ["CT head"] };
  codes["S04.0"] = { code: "S04.0", description: "Injury of optic nerve", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["Optic nerve injury"], documentation: ["CT orbits", "Ophthalmology consult"] };
  codes["S04.1"] = { code: "S04.1", description: "Injury of oculomotor nerve", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["CN III injury"], documentation: ["CT head", "Ophthalmology consult"] };
  codes["S04.2"] = { code: "S04.2", description: "Injury of trochlear nerve", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["CN IV injury"], documentation: ["CT head", "Ophthalmology consult"] };
  codes["S04.3"] = { code: "S04.3", description: "Injury of trigeminal nerve", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["CN V injury"], documentation: ["CT head", "Neurology consult"] };
  codes["S04.4"] = { code: "S04.4", description: "Injury of abducens nerve", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["CN VI injury"], documentation: ["CT head", "Ophthalmology consult"] };
  codes["S04.5"] = { code: "S04.5", description: "Injury of facial nerve", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["Facial nerve injury"], documentation: ["CT temporal bone", "EMG"] };
  codes["S04.6"] = { code: "S04.6", description: "Injury of acoustic nerve", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["CN VIII injury"], documentation: ["Audiometry", "CT temporal bone"] };
  codes["S04.7"] = { code: "S04.7", description: "Injury of accessory nerve", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["CN XI injury"], documentation: ["EMG"] };
  codes["S04.8"] = { code: "S04.8", description: "Injury of other cranial nerves", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["Cranial nerve injury"], documentation: ["Various"] };
  codes["S04.9"] = { code: "S04.9", description: "Injury of cranial nerve, unspecified", category: "S04", excludes1: [], excludes2: [], includes: [], commonUse: ["Cranial nerve injury NOS"], documentation: ["CT head"] };
  codes["S05.0"] = { code: "S05.0", description: "Injury of conjunctiva and cornea without surface injury", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Conjunctival/corneal injury"], documentation: ["Slit lamp exam"] };
  codes["S05.1"] = { code: "S05.1", description: "Contusion of eyeball and orbital tissues", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Orbital contusion"], documentation: ["CT orbits"] };
  codes["S05.2"] = { code: "S05.2", description: "Ocular lacertion with prolapse of intraocular tissue", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Open globe injury"], documentation: ["Ophthalmology consult", "CT orbits"] };
  codes["S05.3"] = { code: "S05.3", description: "Other ocular lacertion with partial loss of intraocular tissue", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Partial open globe"], documentation: ["Ophthalmology consult"] };
  codes["S05.4"] = { code: "S05.4", description: "Penetrating wound of orbit with or without retained foreign body", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Orbital penetrating wound"], documentation: ["CT orbits", "Ophthalmology consult"] };
  codes["S05.5"] = { code: "S05.5", description: "Penetrating wound of eyeball with foreign body", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Open globe with foreign body"], documentation: ["CT orbits", "Ophthalmology consult"] };
  codes["S05.6"] = { code: "S05.6", description: "Penetrating wound of eyeball without foreign body", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Open globe without foreign body"], documentation: ["Ophthalmology consult"] };
  codes["S05.7"] = { code: "S05.7", description: "Avulsion of eye", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Eye avulsion"], documentation: ["Ophthalmology consult"] };
  codes["S05.8"] = { code: "S05.8", description: "Other injuries of eye and orbit", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Eye injury"], documentation: ["Ophthalmology consult"] };
  codes["S05.9"] = { code: "S05.9", description: "Unspecified injury of eye and orbit", category: "S05", excludes1: [], excludes2: [], includes: [], commonUse: ["Eye injury NOS"], documentation: ["Ophthalmology consult"] };
  codes["S06.0"] = { code: "S06.0", description: "Concussion", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Concussion"], documentation: ["CT head", "GCS"] };
  codes["S06.1"] = { code: "S06.1", description: "Traumatic cerebral edema", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Traumatic cerebral edema"], documentation: ["CT head"] };
  codes["S06.2"] = { code: "S06.2", description: "Diffuse brain injury", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Diffuse brain injury"], documentation: ["CT head", "GCS"] };
  codes["S06.3"] = { code: "S06.3", description: "Focal brain injury", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Focal brain injury"], documentation: ["CT head"] };
  codes["S06.4"] = { code: "S06.4", description: "Epidural hemorrhage", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Epidural hematoma"], documentation: ["CT head"] };
  codes["S06.5"] = { code: "S06.5", description: "Subdural hemorrhage, traumatic", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Traumatic subdural hematoma"], documentation: ["CT head"] };
  codes["S06.6"] = { code: "S06.6", description: "Traumatic subarachnoid hemorrhage", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Traumatic SAH"], documentation: ["CT head"] };
  codes["S06.7"] = { code: "S06.7", description: "Intracranial hemorrhage with prolonged loss of consciousness", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Intracranial hemorrhage"], documentation: ["CT head", "GCS"] };
  codes["S06.8"] = { code: "S06.8", description: "Other intracranial injuries", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Intracranial injury"], documentation: ["CT head"] };
  codes["S06.9"] = { code: "S06.9", description: "Intracranial injury, unspecified", category: "S06", excludes1: [], excludes2: [], includes: [], commonUse: ["Intracranial injury NOS"], documentation: ["CT head"] };
  codes["S09.0"] = { code: "S09.0", description: "Injury of blood vessel of head, not elsewhere classified", category: "S09", excludes1: [], excludes2: [], includes: [], commonUse: ["Head vessel injury"], documentation: ["CT angiography"] };
  codes["S09.1"] = { code: "S09.1", description: "Injury of muscle and tendon of head", category: "S09", excludes1: [], excludes2: [], includes: [], commonUse: ["Head muscle/tendon injury"], documentation: ["MRI"] };
  codes["S09.2"] = { code: "S09.2", description: "Traumatic rupture of ear drum", category: "S09", excludes1: [], excludes2: [], includes: [], commonUse: ["Tympanic membrane rupture"], documentation: ["Otoscopy"] };
  codes["S09.3"] = { code: "S09.3", description: "Injury of ear, not elsewhere classified", category: "S09", excludes1: [], excludes2: [], includes: [], commonUse: ["Ear injury"], documentation: ["Audiometry"] };
  codes["S09.8"] = { code: "S09.8", description: "Other specified injuries of head", category: "S09", excludes1: [], excludes2: [], includes: [], commonUse: ["Head injury"], documentation: ["CT head"] };
  codes["S09.9"] = { code: "S09.9", description: "Injury of head, unspecified", category: "S09", excludes1: [], excludes2: [], includes: [], commonUse: ["Head injury NOS"], documentation: ["CT head"] };
  codes["S10.0"] = { code: "S10.0", description: "Contusion of throat", category: "S10", excludes1: [], excludes2: [], includes: [], commonUse: ["Throat contusion"], documentation: ["CT neck"] };
  codes["S10.1"] = { code: "S10.1", description: "Contusion of other and unspecified parts of neck", category: "S10", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck contusion"], documentation: ["CT neck"] };
  codes["S10.8"] = { code: "S10.8", description: "Contusion of other specified parts of neck", category: "S10", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck contusion"], documentation: ["CT neck"] };
  codes["S10.9"] = { code: "S10.9", description: "Contusion of neck, part unspecified", category: "S10", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck contusion NOS"], documentation: ["CT neck"] };
  codes["S11.0"] = { code: "S11.0", description: "Laceration of larynx and trachea", category: "S11", excludes1: [], excludes2: [], includes: [], commonUse: ["Laryngeal/tracheal laceration"], documentation: ["CT neck", "Laryngoscopy"] };
  codes["S11.1"] = { code: "S11.1", description: "Laceration of thyroid gland", category: "S11", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid laceration"], documentation: ["CT neck"] };
  codes["S11.2"] = { code: "S11.2", description: "Laceration of pharynx and cervical esophagus", category: "S11", excludes1: [], excludes2: [], includes: [], commonUse: ["Pharyngeal/esophageal laceration"], documentation: ["CT neck", "Contrast swallow"] };
  codes["S11.8"] = { code: "S11.8", description: "Laceration of other specified parts of neck", category: "S11", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck laceration"], documentation: ["CT neck"] };
  codes["S11.9"] = { code: "S11.9", description: "Laceration of neck, part unspecified", category: "S11", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck laceration NOS"], documentation: ["CT neck"] };
  codes["S12.0"] = { code: "S12.0", description: "Fracture of first cervical vertebra", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["C1 fracture", "Atlas fracture"], documentation: ["CT cervical spine"] };
  codes["S12.1"] = { code: "S12.1", description: "Fracture of second cervical vertebra", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["C2 fracture", "Axis fracture", "Odontoid fracture"], documentation: ["CT cervical spine"] };
  codes["S12.2"] = { code: "S12.2", description: "Fracture of third to sixth cervical vertebra", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["C3-C6 fracture"], documentation: ["CT cervical spine"] };
  codes["S12.3"] = { code: "S12.3", description: "Fracture of seventh cervical vertebra", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["C7 fracture"], documentation: ["CT cervical spine"] };
  codes["S12.4"] = { code: "S12.4", description: "Fracture of cervical vertebra, part unspecified", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical fracture NOS"], documentation: ["CT cervical spine"] };
  codes["S12.5"] = { code: "S12.5", description: "Fracture of thyroid cartilage", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["Thyroid cartilage fracture"], documentation: ["CT neck"] };
  codes["S12.6"] = { code: "S12.6", description: "Fracture of cricoid cartilage", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["Cricoid cartilage fracture"], documentation: ["CT neck"] };
  codes["S12.7"] = { code: "S12.7", description: "Fracture of other and unspecified cartilages of larynx and trachea", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["Laryngeal cartilage fracture"], documentation: ["CT neck"] };
  codes["S12.8"] = { code: "S12.8", description: "Fracture of other specified parts of neck", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck fracture"], documentation: ["CT neck"] };
  codes["S12.9"] = { code: "S12.9", description: "Fracture of neck, part unspecified", category: "S12", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck fracture NOS"], documentation: ["CT cervical spine"] };
  codes["S13.0"] = { code: "S13.0", description: "Traumatic rupture of cervical intervertebral disc", category: "S13", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical disc rupture"], documentation: ["MRI cervical spine"] };
  codes["S13.1"] = { code: "S13.1", description: "Subluxation of cervical vertebra", category: "S13", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical subluxation"], documentation: ["X-ray cervical spine"] };
  codes["S13.2"] = { code: "S13.2", description: "Dislocation of cervical vertebra", category: "S13", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical dislocation"], documentation: ["CT cervical spine"] };
  codes["S13.3"] = { code: "S13.3", description: "Multiple dislocation of cervical vertebra", category: "S13", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple cervical dislocation"], documentation: ["CT cervical spine"] };
  codes["S13.4"] = { code: "S13.4", description: "Sprain of cervical spine", category: "S13", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical sprain", "Whiplash"], documentation: ["X-ray cervical spine"] };
  codes["S13.8"] = { code: "S13.8", description: "Sprain of other specified parts of neck", category: "S13", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck sprain"], documentation: ["X-ray cervical spine"] };
  codes["S13.9"] = { code: "S13.9", description: "Sprain of neck, part unspecified", category: "S13", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck sprain NOS"], documentation: ["X-ray cervical spine"] };
  codes["S14.0"] = { code: "S14.0", description: "Complete transection of spinal cord of neck", category: "S14", excludes1: [], excludes2: [], includes: [], commonUse: ["Complete spinal cord transection"], documentation: ["MRI spine"] };
  codes["S14.1"] = { code: "S14.1", description: "Other specified injuries of spinal cord of neck", category: "S14", excludes1: [], excludes2: [], includes: [], commonUse: ["Spinal cord injury"], documentation: ["MRI spine", "ASIA scale"] };
  codes["S14.2"] = { code: "S14.2", description: "Fracture of vertebral column with spinal cord injury of neck", category: "S14", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical fracture with cord injury"], documentation: ["CT spine", "MRI spine"] };
  codes["S14.3"] = { code: "S14.3", description: "Injury of nerve roots of cervical spine", category: "S14", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical nerve root injury"], documentation: ["MRI spine", "EMG"] };
  codes["S14.4"] = { code: "S14.4", description: "Injury of peripheral nerves of neck", category: "S14", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck nerve injury"], documentation: ["EMG"] };
  codes["S14.5"] = { code: "S14.5", description: "Injury of cervical sympathetic nervous system", category: "S14", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical sympathetic injury"], documentation: ["Clinical exam"] };
  codes["S14.6"] = { code: "S14.6", description: "Injury of other nerves of neck", category: "S14", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck nerve injury"], documentation: ["EMG"] };
  codes["S14.7"] = { code: "S14.7", description: "Injury of multiple nerves of cervical plexus", category: "S14", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical plexus injury"], documentation: ["EMG"] };
  codes["S15.0"] = { code: "S15.0", description: "Injury of carotid artery", category: "S15", excludes1: [], excludes2: [], includes: [], commonUse: ["Carotid artery injury"], documentation: ["CT angiography neck"] };
  codes["S15.1"] = { code: "S15.1", description: "Injury of vertebral artery", category: "S15", excludes1: [], excludes2: [], includes: [], commonUse: ["Vertebral artery injury"], documentation: ["CT angiography neck"] };
  codes["S15.2"] = { code: "S15.2", description: "Injury of external jugular vein", category: "S15", excludes1: [], excludes2: [], includes: [], commonUse: ["External jugular injury"], documentation: ["CT neck"] };
  codes["S15.3"] = { code: "S15.3", description: "Injury of internal jugular vein", category: "S15", excludes1: [], excludes2: [], includes: [], commonUse: ["Internal jugular injury"], documentation: ["CT neck"] };
  codes["S15.8"] = { code: "S15.8", description: "Injury of other specified blood vessels of neck", category: "S15", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck vessel injury"], documentation: ["CT angiography"] };
  codes["S15.9"] = { code: "S15.9", description: "Injury of blood vessel of neck, unspecified", category: "S15", excludes1: [], excludes2: [], includes: [], commonUse: ["Neck vessel injury NOS"], documentation: ["CT angiography"] };
  codes["S20.0"] = { code: "S20.0", description: "Contusion of breast", category: "S20", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast contusion"], documentation: ["Mammogram if concern"] };
  codes["S20.1"] = { code: "S20.1", description: "Contusion of chest wall", category: "S20", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall contusion"], documentation: ["CT chest if concern"] };
  codes["S20.2"] = { code: "S20.2", description: "Contusion of back of thorax", category: "S20", excludes1: [], excludes2: [], includes: [], commonUse: ["Back contusion"], documentation: ["CT if concern"] };
  codes["S20.3"] = { code: "S20.3", description: "Laceration of breast", category: "S20", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast laceration"], documentation: ["Wound repair"] };
  codes["S20.4"] = { code: "S20.4", description: "Laceration of chest wall", category: "S20", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall laceration"], documentation: ["Wound repair", "CT chest"] };
  codes["S20.5"] = { code: "S20.5", description: "Laceration of back of thorax", category: "S20", excludes1: [], excludes2: [], includes: [], commonUse: ["Back laceration"], documentation: ["Wound repair"] };
  codes["S20.7"] = { code: "S20.7", description: "Multiple superficial injuries of chest wall", category: "S20", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple chest wall injuries"], documentation: ["CT chest"] };
  codes["S20.8"] = { code: "S20.8", description: "Injury of other specified parts of chest wall", category: "S20", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall injury"], documentation: ["CT chest"] };
  codes["S20.9"] = { code: "S20.9", description: "Injury of chest wall, part unspecified", category: "S20", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall injury NOS"], documentation: ["CT chest"] };
  codes["S21.0"] = { code: "S21.0", description: "Open wound of breast", category: "S21", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast wound"], documentation: ["Wound repair"] };
  codes["S21.1"] = { code: "S21.1", description: "Open wound of chest wall", category: "S21", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall wound"], documentation: ["CT chest", "Wound repair"] };
  codes["S21.2"] = { code: "S21.2", description: "Open wound of back of thorax", category: "S21", excludes1: [], excludes2: [], includes: [], commonUse: ["Back wound"], documentation: ["Wound repair"] };
  codes["S21.3"] = { code: "S21.3", description: "Open wound of thorax", category: "S21", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wound"], documentation: ["CT chest", "Wound repair"] };
  codes["S21.7"] = { code: "S21.7", description: "Multiple open wounds of chest wall", category: "S21", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple chest wounds"], documentation: ["CT chest"] };
  codes["S21.8"] = { code: "S21.8", description: "Injury of other specified parts of chest wall", category: "S21", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall injury"], documentation: ["CT chest"] };
  codes["S21.9"] = { code: "S21.9", description: "Open wound of chest wall, part unspecified", category: "S21", excludes1: [], excludes2: [], includes: [], commonUse: ["Chest wall wound NOS"], documentation: ["CT chest"] };
  codes["S22.0"] = { code: "S22.0", description: "Fracture of thoracic vertebra", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic fracture"], documentation: ["CT thoracic spine"] };
  codes["S22.1"] = { code: "S22.1", description: "Fracture of lumbar vertebra", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar fracture"], documentation: ["CT lumbar spine"] };
  codes["S22.2"] = { code: "S22.2", description: "Fracture of sacrum", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Sacral fracture"], documentation: ["CT pelvis"] };
  codes["S22.3"] = { code: "S22.3", description: "Fracture of coccyx", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Coccyx fracture"], documentation: ["X-ray sacrum/coccyx"] };
  codes["S22.4"] = { code: "S22.4", description: "Multiple fractures of thoracic vertebra", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple thoracic fractures"], documentation: ["CT thoracic spine"] };
  codes["S22.5"] = { code: "S22.5", description: "Flail chest", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Flail chest"], documentation: ["CT chest", "Chest X-ray"] };
  codes["S22.6"] = { code: "S22.6", description: "Fracture of rib", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Rib fracture"], documentation: ["CT chest"] };
  codes["S22.7"] = { code: "S22.7", description: "Fracture of sternum", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Sternum fracture"], documentation: ["CT chest"] };
  codes["S22.8"] = { code: "S22.8", description: "Fracture of other bony thorax", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Thorax fracture"], documentation: ["CT chest"] };
  codes["S22.9"] = { code: "S22.9", description: "Fracture of bony thorax, part unspecified", category: "S22", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic fracture NOS"], documentation: ["CT chest"] };
  codes["S23.0"] = { code: "S23.0", description: "Traumatic rupture of thoracic intervertebral disc", category: "S23", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic disc rupture"], documentation: ["MRI thoracic spine"] };
  codes["S23.1"] = { code: "S23.1", description: "Subluxation of thoracic vertebra", category: "S23", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic subluxation"], documentation: ["CT thoracic spine"] };
  codes["S23.2"] = { code: "S23.2", description: "Dislocation of thoracic vertebra", category: "S23", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic dislocation"], documentation: ["CT thoracic spine"] };
  codes["S23.3"] = { code: "S23.3", description: "Sprain of thoracic vertebra", category: "S23", excludes1: [], excludes2: [], includes: [], commonUse: ["Thoracic sprain"], documentation: ["X-ray thoracic spine"] };
  codes["S26.0"] = { code: "S26.0", description: "Injury of heart with hemopericardium", category: "S26", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac injury with hemopericardium"], documentation: ["Echocardiogram", "CT chest"] };
  codes["S26.1"] = { code: "S26.1", description: "Primary blast injury of heart", category: "S26", excludes1: [], excludes2: [], includes: [], commonUse: ["Blast cardiac injury"], documentation: ["Echocardiogram", "Troponin"] };
  codes["S26.2"] = { code: "S26.2", description: "Contusion of heart", category: "S26", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac contusion"], documentation: ["Echocardiogram", "Troponin"] };
  codes["S26.3"] = { code: "S26.3", description: "Injury of other and unspecified parts of heart", category: "S26", excludes1: [], excludes2: [], includes: [], commonUse: ["Heart injury"], documentation: ["Echocardiogram"] };
  codes["S26.8"] = { code: "S26.8", description: "Injury of other intrathoracic organs", category: "S26", excludes1: [], excludes2: [], includes: [], commonUse: ["Intrathoracic organ injury"], documentation: ["CT chest"] };
  codes["S26.9"] = { code: "S26.9", description: "Injury of intrathoracic organ, unspecified", category: "S26", excludes1: [], excludes2: [], includes: [], commonUse: ["Intrathoracic organ injury NOS"], documentation: ["CT chest"] };
  codes["S27.0"] = { code: "S27.0", description: "Injury of lung", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Lung injury"], documentation: ["CT chest"] };
  codes["S27.1"] = { code: "S27.1", description: "Primary blast injury of lung", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Blast lung injury"], documentation: ["CT chest", "ABG"] };
  codes["S27.2"] = { code: "S27.2", description: "Hemothorax", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Hemothorax"], documentation: ["CT chest", "Chest X-ray"] };
  codes["S27.3"] = { code: "S27.3", description: "Other injuries of lung", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Lung injury"], documentation: ["CT chest"] };
  codes["S27.4"] = { code: "S27.4", description: "Injury of bronchus", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Bronchial injury"], documentation: ["CT chest", "Bronchoscopy"] };
  codes["S27.5"] = { code: "S27.5", description: "Injury of thoracic trachea", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Tracheal injury"], documentation: ["CT chest", "Bronchoscopy"] };
  codes["S27.6"] = { code: "S27.6", description: "Injury of pleura", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Pleural injury"], documentation: ["CT chest"] };
  codes["S27.7"] = { code: "S27.7", description: "Injury of diaphragm", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Diaphragmatic injury"], documentation: ["CT chest/abdomen"] };
  codes["S27.8"] = { code: "S27.8", description: "Injury of other intrathoracic organs", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Intrathoracic injury"], documentation: ["CT chest"] };
  codes["S27.9"] = { code: "S27.9", description: "Injury of intrathoracic organ, unspecified", category: "S27", excludes1: [], excludes2: [], includes: [], commonUse: ["Intrathoracic injury NOS"], documentation: ["CT chest"] };
  codes["S30.0"] = { code: "S30.0", description: "Contusion of lower back and pelvis", category: "S30", excludes1: [], excludes2: [], includes: [], commonUse: ["Back/pelvic contusion"], documentation: ["CT abdomen/pelvis"] };
  codes["S30.1"] = { code: "S30.1", description: "Contusion of abdomen", category: "S30", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal contusion"], documentation: ["CT abdomen"] };
  codes["S30.2"] = { code: "S30.2", description: "Contusion of external genital organs", category: "S30", excludes1: [], excludes2: [], includes: [], commonUse: ["Genital contusion"], documentation: ["Clinical exam", "CT pelvis"] };
  codes["S30.3"] = { code: "S30.3", description: "Contusion of perineum", category: "S30", excludes1: [], excludes2: [], includes: [], commonUse: ["Perineal contusion"], documentation: ["Clinical exam"] };
  codes["S30.8"] = { code: "S30.8", description: "Contusion of other specified parts of abdomen, lower back and pelvis", category: "S30", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal contusion"], documentation: ["CT abdomen"] };
  codes["S30.9"] = { code: "S30.9", description: "Contusion of abdomen, lower back and pelvis, part unspecified", category: "S30", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal contusion NOS"], documentation: ["CT abdomen"] };
  codes["S31.0"] = { code: "S31.0", description: "Open wound of lower back and pelvis", category: "S31", excludes1: [], excludes2: [], includes: [], commonUse: ["Back/pelvic wound"], documentation: ["CT abdomen/pelvis"] };
  codes["S31.1"] = { code: "S31.1", description: "Open wound of abdomen", category: "S31", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal wound"], documentation: ["CT abdomen", "Exploratory surgery"] };
  codes["S31.2"] = { code: "S31.2", description: "Open wound of external genital organs", category: "S31", excludes1: [], excludes2: [], includes: [], commonUse: ["Genital wound"], documentation: ["Surgical repair"] };
  codes["S31.3"] = { code: "S31.3", description: "Open wound of perineum", category: "S31", excludes1: [], excludes2: [], includes: [], commonUse: ["Perineal wound"], documentation: ["Wound repair"] };
  codes["S31.4"] = { code: "S31.4", description: "Open wound of anus", category: "S31", excludes1: [], excludes2: [], includes: [], commonUse: ["Anal wound"], documentation: ["Proctoscopy"] };
  codes["S31.5"] = { code: "S31.5", description: "Open wound of other specified parts of abdomen, lower back and pelvis", category: "S31", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal wound"], documentation: ["CT abdomen"] };
  codes["S31.6"] = { code: "S31.6", description: "Multiple open wounds of abdomen, lower back and pelvis", category: "S31", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple abdominal wounds"], documentation: ["CT abdomen"] };
  codes["S31.7"] = { code: "S31.7", description: "Open wound of abdomen, lower back and pelvis, part unspecified", category: "S31", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal wound NOS"], documentation: ["CT abdomen"] };
  codes["S32.0"] = { code: "S32.0", description: "Fracture of lumbar vertebra", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar fracture"], documentation: ["CT lumbar spine"] };
  codes["S32.1"] = { code: "S32.1", description: "Fracture of sacrum", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Sacral fracture"], documentation: ["CT pelvis"] };
  codes["S32.2"] = { code: "S32.2", description: "Fracture of coccyx", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Coccyx fracture"], documentation: ["X-ray sacrum/coccyx"] };
  codes["S32.3"] = { code: "S32.3", description: "Fracture of ilium", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Ilium fracture"], documentation: ["CT pelvis"] };
  codes["S32.4"] = { code: "S32.4", description: "Fracture of acetabulum", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Acetabular fracture"], documentation: ["CT pelvis"] };
  codes["S32.5"] = { code: "S32.5", description: "Fracture of pubis", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Pubic fracture"], documentation: ["CT pelvis"] };
  codes["S32.6"] = { code: "S32.6", description: "Fracture of other specified parts of pelvis", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic fracture"], documentation: ["CT pelvis"] };
  codes["S32.7"] = { code: "S32.7", description: "Multiple fractures of pelvis", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple pelvic fractures"], documentation: ["CT pelvis"] };
  codes["S32.8"] = { code: "S32.8", description: "Fracture of other specified parts of bony pelvis", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic fracture"], documentation: ["CT pelvis"] };
  codes["S32.9"] = { code: "S32.9", description: "Fracture of bony pelvis, unspecified", category: "S32", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic fracture NOS"], documentation: ["CT pelvis"] };
  codes["S33.0"] = { code: "S33.0", description: "Traumatic rupture of lumbar intervertebral disc", category: "S33", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar disc rupture"], documentation: ["MRI lumbar spine"] };
  codes["S33.1"] = { code: "S33.1", description: "Subluxation of lumbar vertebra", category: "S33", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar subluxation"], documentation: ["CT lumbar spine"] };
  codes["S33.2"] = { code: "S33.2", description: "Dislocation of lumbar vertebra", category: "S33", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar dislocation"], documentation: ["CT lumbar spine"] };
  codes["S33.3"] = { code: "S33.3", description: "Sprain of lumbar vertebra", category: "S33", excludes1: [], excludes2: [], includes: [], commonUse: ["Lumbar sprain"], documentation: ["X-ray lumbar spine"] };
  codes["S36.0"] = { code: "S36.0", description: "Injury of spleen", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Splenic injury"], documentation: ["CT abdomen"] };
  codes["S36.1"] = { code: "S36.1", description: "Injury of liver", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Liver injury"], documentation: ["CT abdomen", "LFTs"] };
  codes["S36.2"] = { code: "S36.2", description: "Injury of gallbladder", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Gallbladder injury"], documentation: ["CT abdomen"] };
  codes["S36.3"] = { code: "S36.3", description: "Injury of bile duct", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Bile duct injury"], documentation: ["CT abdomen", "HIDA scan"] };
  codes["S36.4"] = { code: "S36.4", description: "Injury of stomach", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Stomach injury"], documentation: ["CT abdomen", "EGD"] };
  codes["S36.5"] = { code: "S36.5", description: "Injury of small intestine", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Small bowel injury"], documentation: ["CT abdomen"] };
  codes["S36.6"] = { code: "S36.6", description: "Injury of large intestine", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Large bowel injury"], documentation: ["CT abdomen"] };
  codes["S36.7"] = { code: "S36.7", description: "Injury of multiple intra-abdominal organs", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple organ injury"], documentation: ["CT abdomen"] };
  codes["S36.8"] = { code: "S36.8", description: "Injury of other intra-abdominal organs", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Intra-abdominal organ injury"], documentation: ["CT abdomen"] };
  codes["S36.9"] = { code: "S36.9", description: "Injury of intra-abdominal organ, unspecified", category: "S36", excludes1: [], excludes2: [], includes: [], commonUse: ["Intra-abdominal organ injury NOS"], documentation: ["CT abdomen"] };
  codes["S37.0"] = { code: "S37.0", description: "Injury of kidney", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal injury"], documentation: ["CT abdomen", "Urinalysis"] };
  codes["S37.1"] = { code: "S37.1", description: "Injury of ureter", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Ureteral injury"], documentation: ["CT urogram"] };
  codes["S37.2"] = { code: "S37.2", description: "Injury of bladder", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Bladder injury"], documentation: ["CT pelvis", "Cystogram"] };
  codes["S37.3"] = { code: "S37.3", description: "Injury of urethra", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Urethral injury"], documentation: ["Retrograde urethrogram"] };
  codes["S37.4"] = { code: "S37.4", description: "Injury of ovary", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Ovarian injury"], documentation: ["Ultrasound pelvis"] };
  codes["S37.5"] = { code: "S37.5", description: "Injury of fallopian tube", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Fallopian tube injury"], documentation: ["CT pelvis"] };
  codes["S37.6"] = { code: "S37.6", description: "Injury of uterus", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Uterine injury"], documentation: ["CT pelvis"] };
  codes["S37.7"] = { code: "S37.7", description: "Injury of pelvic organs", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic organ injury"], documentation: ["CT pelvis"] };
  codes["S37.8"] = { code: "S37.8", description: "Injury of other pelvic organs", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic organ injury"], documentation: ["CT pelvis"] };
  codes["S37.9"] = { code: "S37.9", description: "Injury of pelvic organ, unspecified", category: "S37", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic organ injury NOS"], documentation: ["CT pelvis"] };
  codes["S39.0"] = { code: "S39.0", description: "Injury of muscle and tendon of abdomen, lower back and pelvis", category: "S39", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal muscle injury"], documentation: ["MRI"] };
  codes["S39.1"] = { code: "S39.1", description: "Injury of blood vessels of abdomen, lower back and pelvis", category: "S39", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal vessel injury"], documentation: ["CT angiography"] };
  codes["S39.2"] = { code: "S39.2", description: "Injury of intra-abdominal and pelvic nerves", category: "S39", excludes1: [], excludes2: [], includes: [], commonUse: ["Pelvic nerve injury"], documentation: ["EMG"] };
  codes["S39.7"] = { code: "S39.7", description: "Other specified injuries of abdomen, lower back and pelvis", category: "S39", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal injury"], documentation: ["CT abdomen"] };
  codes["S39.8"] = { code: "S39.8", description: "Other specified injuries of abdomen, lower back and pelvis", category: "S39", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal injury"], documentation: ["CT abdomen"] };
  codes["S39.9"] = { code: "S39.9", description: "Injury of abdomen, lower back and pelvis, unspecified", category: "S39", excludes1: [], excludes2: [], includes: [], commonUse: ["Abdominal injury NOS"], documentation: ["CT abdomen"] };
  codes["Z00.0"] = { code: "Z00.0", description: "Encounter for general adult medical examination without abnormal findings", category: "Z00", excludes1: [], excludes2: [], includes: [], commonUse: ["Annual physical", "Wellness visit"], documentation: ["Physical exam"] };
  codes["Z00.1"] = { code: "Z00.1", description: "Encounter for general adult medical examination with abnormal findings", category: "Z00", excludes1: [], excludes2: [], includes: [], commonUse: ["Physical with abnormal findings"], documentation: ["Physical exam"] };
  codes["Z00.11"] = { code: "Z00.11", description: "Encounter for routine child health examination without abnormal findings", category: "Z00", excludes1: [], excludes2: [], includes: [], commonUse: ["Well-child visit"], documentation: ["Growth chart"] };
  codes["Z00.12"] = { code: "Z00.12", description: "Encounter for routine child health examination with abnormal findings", category: "Z00", excludes1: [], excludes2: [], includes: [], commonUse: ["Well-child with abnormal finding"], documentation: ["Growth chart"] };
  codes["Z01.0"] = { code: "Z01.0", description: "Encounter for examination of eyes and vision", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["Eye exam"], documentation: ["Visual acuity"] };
  codes["Z01.1"] = { code: "Z01.1", description: "Encounter for examination of ears and hearing", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["Hearing exam"], documentation: ["Audiometry"] };
  codes["Z01.2"] = { code: "Z01.2", description: "Encounter for dental examination and cleaning", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["Dental checkup"], documentation: ["Dental exam"] };
  codes["Z01.3"] = { code: "Z01.3", description: "Encounter for examination of blood pressure", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["BP check"], documentation: ["BP measurement"] };
  codes["Z01.4"] = { code: "Z01.4", description: "Encounter for gynecological examination", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["GYN exam"], documentation: ["Pap smear"] };
  codes["Z01.5"] = { code: "Z01.5", description: "Encounter for diagnostic skin and sensitization tests", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["Allergy testing"], documentation: ["Skin testing"] };
  codes["Z01.6"] = { code: "Z01.6", description: "Encounter for radiological examination and imaging", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["Imaging study"], documentation: ["Various imaging"] };
  codes["Z01.7"] = { code: "Z01.7", description: "Encounter for laboratory examination", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["Lab testing"], documentation: ["Various labs"] };
  codes["Z01.8"] = { code: "Z01.8", description: "Encounter for other specified special examinations", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["Special examination"], documentation: ["Various"] };
  codes["Z01.81"] = { code: "Z01.81", description: "Encounter for allergy testing", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["Allergy testing"], documentation: ["Allergy panel"] };
  codes["Z01.89"] = { code: "Z01.89", description: "Encounter for other specified special examinations", category: "Z01", excludes1: [], excludes2: [], includes: [], commonUse: ["Special exam"], documentation: ["Various"] };
  codes["Z02.0"] = { code: "Z02.0", description: "Encounter for employment medical examination", category: "Z02", excludes1: [], excludes2: [], includes: [], commonUse: ["Employment physical"], documentation: ["Physical exam"] };
  codes["Z02.1"] = { code: "Z02.1", description: "Encounter for pre-employment medical examination", category: "Z02", excludes1: [], excludes2: [], includes: [], commonUse: ["Pre-employment physical"], documentation: ["Physical exam"] };
  codes["Z02.2"] = { code: "Z02.2", description: "Encounter for examination for admission to educational institution", category: "Z02", excludes1: [], excludes2: [], includes: [], commonUse: ["School physical"], documentation: ["Physical exam"] };
  codes["Z02.3"] = { code: "Z02.3", description: "Encounter for examination for admission to sports program", category: "Z02", excludes1: [], excludes2: [], includes: [], commonUse: ["Sports physical"], documentation: ["Physical exam"] };
  codes["Z02.4"] = { code: "Z02.4", description: "Encounter for examination for driving license", category: "Z02", excludes1: [], excludes2: [], includes: [], commonUse: ["Driving physical"], documentation: ["Physical exam"] };
  codes["Z02.6"] = { code: "Z02.6", description: "Encounter for examination for insurance purposes", category: "Z02", excludes1: [], excludes2: [], includes: [], commonUse: ["Insurance physical"], documentation: ["Physical exam"] };
  codes["Z03.0"] = { code: "Z03.0", description: "Encounter for observation and evaluation of newborn for suspected conditions ruled out", category: "Z03", excludes1: [], excludes2: [], includes: [], commonUse: ["Newborn observation"], documentation: ["Physical exam"] };
  codes["Z03.8"] = { code: "Z03.8", description: "Encounter for observation and evaluation of other suspected conditions ruled out", category: "Z03", excludes1: [], excludes2: [], includes: [], commonUse: ["Condition ruled out"], documentation: ["Various"] };
  codes["Z04.1"] = { code: "Z04.1", description: "Encounter for examination and observation following transport accident", category: "Z04", excludes1: [], excludes2: [], includes: [], commonUse: ["MVA follow-up"], documentation: ["Various"] };
  codes["Z04.3"] = { code: "Z04.3", description: "Encounter for examination and observation following alleged rape", category: "Z04", excludes1: [], excludes2: [], includes: [], commonUse: ["Sexual assault exam"], documentation: ["Rape kit"] };
  codes["Z04.4"] = { code: "Z04.4", description: "Encounter for examination and observation following alleged sexual abuse", category: "Z04", excludes1: [], excludes2: [], includes: [], commonUse: ["Sexual abuse exam"], documentation: ["Various"] };
  codes["Z04.8"] = { code: "Z04.8", description: "Encounter for examination and observation for other specified reasons", category: "Z04", excludes1: [], excludes2: [], includes: [], commonUse: ["Observation exam"], documentation: ["Various"] };
  codes["Z08"] = { code: "Z08", description: "Encounter for follow-up examination after completed treatment for malignant neoplasm", category: "Z08", excludes1: [], excludes2: [], includes: [], commonUse: ["Cancer follow-up"], documentation: ["Various imaging"] };
  codes["Z09"] = { code: "Z09", description: "Encounter for follow-up examination after completed treatment for conditions other than malignant neoplasm", category: "Z09", excludes1: [], excludes2: [], includes: [], commonUse: ["Treatment follow-up"], documentation: ["Various"] };
  codes["Z11.0"] = { code: "Z11.0", description: "Encounter for screening for infectious and parasitic diseases", category: "Z11", excludes1: [], excludes2: [], includes: [], commonUse: ["Infectious disease screening"], documentation: ["Various labs"] };
  codes["Z11.1"] = { code: "Z11.1", description: "Encounter for screening for respiratory tuberculosis", category: "Z11", excludes1: [], excludes2: [], includes: [], commonUse: ["TB screening"], documentation: ["PPD", "Chest X-ray"] };
  codes["Z11.3"] = { code: "Z11.3", description: "Encounter for screening for infections predominantly transmitted by sexual contact", category: "Z11", excludes1: [], excludes2: [], includes: [], commonUse: ["STI screening"], documentation: ["STI testing"] };
  codes["Z11.4"] = { code: "Z11.4", description: "Encounter for screening for human immunodeficiency virus [HIV]", category: "Z11", excludes1: [], excludes2: [], includes: [], commonUse: ["HIV screening"], documentation: ["HIV test"] };
  codes["Z11.5"] = { code: "Z11.5", description: "Encounter for screening for viral hepatitis", category: "Z11", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatitis screening"], documentation: ["Hepatitis panel"] };
  codes["Z11.8"] = { code: "Z11.8", description: "Encounter for screening for other infectious and parasitic diseases", category: "Z11", excludes1: [], excludes2: [], includes: [], commonUse: ["Infectious screening"], documentation: ["Various"] };
  codes["Z12.0"] = { code: "Z12.0", description: "Encounter for screening for malignant neoplasm of stomach", category: "Z12", excludes1: [], excludes2: [], includes: [], commonUse: ["Stomach cancer screening"], documentation: ["Endoscopy"] };
  codes["Z12.11"] = { code: "Z12.11", description: "Encounter for screening for malignant neoplasm of colon", category: "Z12", excludes1: [], excludes2: [], includes: [], commonUse: ["Colonoscopy screening"], documentation: ["Colonoscopy"] };
  codes["Z12.2"] = { code: "Z12.2", description: "Encounter for screening for malignant neoplasm of respiratory organs", category: "Z12", excludes1: [], excludes2: [], includes: [], commonUse: ["Lung cancer screening"], documentation: ["Low-dose CT chest"] };
  codes["Z12.31"] = { code: "Z12.31", description: "Encounter for screening mammogram for malignant neoplasm of breast", category: "Z12", excludes1: [], excludes2: [], includes: [], commonUse: ["Mammogram screening"], documentation: ["Mammogram"] };
  codes["Z12.4"] = { code: "Z12.4", description: "Encounter for screening for malignant neoplasm of cervix", category: "Z12", excludes1: [], excludes2: [], includes: [], commonUse: ["Cervical cancer screening"], documentation: ["Pap smear"] };
  codes["Z12.5"] = { code: "Z12.5", description: "Encounter for screening for malignant neoplasm of prostate", category: "Z12", excludes1: [], excludes2: [], includes: [], commonUse: ["Prostate cancer screening"], documentation: ["PSA"] };
  codes["Z12.81"] = { code: "Z12.81", description: "Encounter for screening for malignant neoplasm of oral cavity", category: "Z12", excludes1: [], excludes2: [], includes: [], commonUse: ["Oral cancer screening"], documentation: ["Oral exam"] };
  codes["Z13.1"] = { code: "Z13.1", description: "Encounter for screening for diabetes mellitus", category: "Z13", excludes1: [], excludes2: [], includes: [], commonUse: ["Diabetes screening"], documentation: ["Fasting glucose", "HbA1c"] };
  codes["Z13.3"] = { code: "Z13.3", description: "Encounter for screening for mental disorders and developmental disorders", category: "Z13", excludes1: [], excludes2: [], includes: [], commonUse: ["Mental health screening"], documentation: ["PHQ-9"] };
  codes["Z13.6"] = { code: "Z13.6", description: "Encounter for screening for cardiovascular disorders", category: "Z13", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiovascular screening"], documentation: ["Lipid panel", "ECG"] };
  codes["Z13.81"] = { code: "Z13.81", description: "Encounter for screening for neoplasm of lung", category: "Z13", excludes1: [], excludes2: [], includes: [], commonUse: ["Lung cancer screening"], documentation: ["Low-dose CT chest"] };
  codes["Z13.82"] = { code: "Z13.82", description: "Encounter for screening for lipid disorders", category: "Z13", excludes1: [], excludes2: [], includes: [], commonUse: ["Cholesterol screening"], documentation: ["Lipid panel"] };
  codes["Z20.0"] = { code: "Z20.0", description: "Contact with and exposure to communicable diseases", category: "Z20", excludes1: [], excludes2: [], includes: [], commonUse: ["Disease exposure"], documentation: ["Varies by disease"] };
  codes["Z20.1"] = { code: "Z20.1", description: "Contact with and exposure to tuberculosis", category: "Z20", excludes1: [], excludes2: [], includes: [], commonUse: ["TB exposure"], documentation: ["PPD", "Chest X-ray"] };
  codes["Z20.2"] = { code: "Z20.2", description: "Contact with and exposure to infections predominantly transmitted by sexual contact", category: "Z20", excludes1: [], excludes2: [], includes: [], commonUse: ["STI exposure"], documentation: ["STI testing"] };
  codes["Z20.3"] = { code: "Z20.3", description: "Contact with and exposure to hepatitis", category: "Z20", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatitis exposure"], documentation: ["Hepatitis panel"] };
  codes["Z20.6"] = { code: "Z20.6", description: "Contact with and exposure to human immunodeficiency virus [HIV]", category: "Z20", excludes1: [], excludes2: [], includes: [], commonUse: ["HIV exposure"], documentation: ["HIV test"] };
  codes["Z20.8"] = { code: "Z20.8", description: "Contact with and exposure to other communicable diseases", category: "Z20", excludes1: [], excludes2: [], includes: [], commonUse: ["Communicable disease exposure"], documentation: ["Various"] };
  codes["Z21"] = { code: "Z21", description: "Asymptomatic human immunodeficiency virus [HIV] infection", category: "Z21", excludes1: [], excludes2: [], includes: [], commonUse: ["HIV positive, asymptomatic"], documentation: ["CD4 count", "Viral load"] };
  codes["Z23.1"] = { code: "Z23.1", description: "Encounter for immunization against diphtheria-tetanus-pertussis", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["DTaP vaccine"], documentation: ["Vaccine record"] };
  codes["Z23.5"] = { code: "Z23.5", description: "Encounter for immunization against viral hepatitis", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["Hepatitis vaccine"], documentation: ["Vaccine record"] };
  codes["Z23.6"] = { code: "Z23.6", description: "Encounter for immunization against measles-mumps-rubella", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["MMR vaccine"], documentation: ["Vaccine record"] };
  codes["Z23.81"] = { code: "Z23.81", description: "Encounter for immunization for varicella", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["Varicella vaccine"], documentation: ["Vaccine record"] };
  codes["Z23.82"] = { code: "Z23.82", description: "Encounter for immunization for rotavirus", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["Rotavirus vaccine"], documentation: ["Vaccine record"] };
  codes["Z23.83"] = { code: "Z23.83", description: "Encounter for immunization for human papillomavirus (HPV)", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["HPV vaccine"], documentation: ["Vaccine record"] };
  codes["Z23.84"] = { code: "Z23.84", description: "Encounter for immunization for meningococcal", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningococcal vaccine"], documentation: ["Vaccine record"] };
  codes["Z23.85"] = { code: "Z23.85", description: "Encounter for immunization for zoster (shingles)", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["Shingles vaccine"], documentation: ["Vaccine record"] };
  codes["Z23.86"] = { code: "Z23.86", description: "Encounter for immunization for pneumococcal", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["Pneumococcal vaccine"], documentation: ["Vaccine record"] };
  codes["Z23.87"] = { code: "Z23.87", description: "Encounter for immunization for influenza", category: "Z23", excludes1: [], excludes2: [], includes: [], commonUse: ["Flu vaccine"], documentation: ["Vaccine record"] };
  codes["Z29.0"] = { code: "Z29.0", description: "Encounter for prophylactic immunotherapy", category: "Z29", excludes1: [], excludes2: [], includes: [], commonUse: ["Immunotherapy"], documentation: ["Various"] };
  codes["Z30.0"] = { code: "Z30.0", description: "Encounter for general counseling and advice on contraception", category: "Z30", excludes1: [], excludes2: [], includes: [], commonUse: ["Contraception counseling"], documentation: ["Clinical counseling"] };
  codes["Z30.1"] = { code: "Z30.1", description: "Encounter for insertion of intrauterine contraceptive device", category: "Z30", excludes1: [], excludes2: [], includes: [], commonUse: ["IUD insertion"], documentation: ["Procedure note"] };
  codes["Z30.2"] = { code: "Z30.2", description: "Encounter for removal of intrauterine contraceptive device", category: "Z30", excludes1: [], excludes2: [], includes: [], commonUse: ["IUD removal"], documentation: ["Procedure note"] };
  codes["Z30.3"] = { code: "Z30.3", description: "Encounter for extraction of contraceptive implant", category: "Z30", excludes1: [], excludes2: [], includes: [], commonUse: ["Implant removal"], documentation: ["Procedure note"] };
  codes["Z33.1"] = { code: "Z33.1", description: "Pregnant state, incidental", category: "Z33", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy incidental"], documentation: ["HCG", "Ultrasound"] };
  codes["Z34.0"] = { code: "Z34.0", description: "Encounter for supervision of normal first pregnancy", category: "Z34", excludes1: [], excludes2: [], includes: [], commonUse: ["Normal pregnancy supervision"], documentation: ["Prenatal visits"] };
  codes["Z34.8"] = { code: "Z34.8", description: "Encounter for supervision of other normal pregnancy", category: "Z34", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy supervision"], documentation: ["Prenatal visits"] };
  codes["Z35.0"] = { code: "Z35.0", description: "Encounter for supervision of high-risk pregnancy with history of infertility", category: "Z35", excludes1: [], excludes2: [], includes: [], commonUse: ["High-risk pregnancy - infertility"], documentation: ["Prenatal visits"] };
  codes["Z35.1"] = { code: "Z35.1", description: "Encounter for supervision of high-risk pregnancy with history of abortive outcome", category: "Z35", excludes1: [], excludes2: [], includes: [], commonUse: ["High-risk pregnancy - abortion hx"], documentation: ["Prenatal visits"] };
  codes["Z35.2"] = { code: "Z35.2", description: "Encounter for supervision of high-risk pregnancy with other poor reproductive history", category: "Z35", excludes1: [], excludes2: [], includes: [], commonUse: ["High-risk pregnancy - poor hx"], documentation: ["Prenatal visits"] };
  codes["Z35.5"] = { code: "Z35.5", description: "Encounter for supervision of high-risk pregnancy with older primigravida", category: "Z35", excludes1: [], excludes2: [], includes: [], commonUse: ["Advanced maternal age primip"], documentation: ["Prenatal visits"] };
  codes["Z35.6"] = { code: "Z35.6", description: "Encounter for supervision of high-risk pregnancy with very young age", category: "Z35", excludes1: [], excludes2: [], includes: [], commonUse: ["Young maternal age"], documentation: ["Prenatal visits"] };
  codes["Z35.7"] = { code: "Z35.7", description: "Encounter for supervision of high-risk pregnancy due to social problems", category: "Z35", excludes1: [], excludes2: [], includes: [], commonUse: ["Social risk pregnancy"], documentation: ["Prenatal visits"] };
  codes["Z36.0"] = { code: "Z36.0", description: "Antenatal screening for chromosomal anomalies", category: "Z36", excludes1: [], excludes2: [], includes: [], commonUse: ["Chromosomal screening"], documentation: ["Amniocentesis", "NIPT"] };
  codes["Z36.1"] = { code: "Z36.1", description: "Antenatal screening for raised alpha-fetoprotein level", category: "Z36", excludes1: [], excludes2: [], includes: [], commonUse: ["AFP screening"], documentation: ["AFP level"] };
  codes["Z36.3"] = { code: "Z36.3", description: "Antenatal screening for malformations using ultrasound", category: "Z36", excludes1: [], excludes2: [], includes: [], commonUse: ["Anatomy ultrasound"], documentation: ["Ultrasound"] };
  codes["Z36.5"] = { code: "Z36.5", description: "Antenatal screening for isoimmunization", category: "Z36", excludes1: [], excludes2: [], includes: [], commonUse: ["Rh screening"], documentation: ["Antibody screen"] };
  codes["Z37.0"] = { code: "Z37.0", description: "Live birth, single", category: "Z37", excludes1: [], excludes2: [], includes: [], commonUse: ["Single live birth"], documentation: ["Delivery record"] };
  codes["Z37.1"] = { code: "Z37.1", description: "Live birth, twin", category: "Z37", excludes1: [], excludes2: [], includes: [], commonUse: ["Twin live birth"], documentation: ["Delivery record"] };
  codes["Z37.2"] = { code: "Z37.2", description: "Live birth, other multiple", category: "Z37", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiple live birth"], documentation: ["Delivery record"] };
  codes["Z37.9"] = { code: "Z37.9", description: "Outcome of delivery, unspecified", category: "Z37", excludes1: [], excludes2: [], includes: [], commonUse: ["Delivery outcome NOS"], documentation: ["Delivery record"] };
  codes["Z38.0"] = { code: "Z38.0", description: "Liveborn infants according to place of birth, hospital", category: "Z38", excludes1: [], excludes2: [], includes: [], commonUse: ["Hospital birth"], documentation: ["Birth certificate"] };
  codes["Z38.2"] = { code: "Z38.2", description: "Liveborn infants according to place of birth, not in hospital", category: "Z38", excludes1: [], excludes2: [], includes: [], commonUse: ["Home birth"], documentation: ["Birth certificate"] };
  codes["Z39.0"] = { code: "Z39.0", description: "Encounter for care and examination immediately after delivery", category: "Z39", excludes1: [], excludes2: [], includes: [], commonUse: ["Postpartum care"], documentation: ["Physical exam"] };
  codes["Z39.2"] = { code: "Z39.2", description: "Encounter for routine postpartum follow-up", category: "Z39", excludes1: [], excludes2: [], includes: [], commonUse: ["Postpartum visit"], documentation: ["Physical exam"] };
  codes["Z40.0"] = { code: "Z40.0", description: "Encounter for prophylactic removal of breast", category: "Z40", excludes1: [], excludes2: [], includes: [], commonUse: ["Prophylactic mastectomy"], documentation: ["Genetic testing"] };
  codes["Z40.1"] = { code: "Z40.1", description: "Encounter for prophylactic removal of ovary", category: "Z40", excludes1: [], excludes2: [], includes: [], commonUse: ["Prophylactic oophorectomy"], documentation: ["Genetic testing"] };
  codes["Z41.0"] = { code: "Z41.0", description: "Encounter for hair replacement", category: "Z41", excludes1: [], excludes2: [], includes: [], commonUse: ["Hair replacement"], documentation: ["Dermatology consult"] };
  codes["Z41.1"] = { code: "Z41.1", description: "Encounter for plastic surgery for unacceptable cosmetic appearance", category: "Z41", excludes1: [], excludes2: [], includes: [], commonUse: ["Cosmetic surgery consult"], documentation: ["Consult note"] };
  codes["Z41.2"] = { code: "Z41.2", description: "Encounter for routine and ritual male circumcision", category: "Z41", excludes1: [], excludes2: [], includes: [], commonUse: ["Circumcision"], documentation: ["Procedure note"] };
  codes["Z42.0"] = { code: "Z42.0", description: "Encounter for care and treatment following reconstructed breast", category: "Z42", excludes1: [], excludes2: [], includes: [], commonUse: ["Breast reconstruction follow-up"], documentation: ["Plastic surgery consult"] };
  codes["Z42.8"] = { code: "Z42.8", description: "Encounter for other plastic and reconstructive surgery following medical procedure", category: "Z42", excludes1: [], excludes2: [], includes: [], commonUse: ["Reconstructive surgery follow-up"], documentation: ["Various"] };
  codes["Z43.0"] = { code: "Z43.0", description: "Encounter for colostomy management", category: "Z43", excludes1: [], excludes2: [], includes: [], commonUse: ["Colostomy care"], documentation: ["Wound care"] };
  codes["Z43.1"] = { code: "Z43.1", description: "Encounter for ileostomy management", category: "Z43", excludes1: [], excludes2: [], includes: [], commonUse: ["Ileostomy care"], documentation: ["Wound care"] };
  codes["Z43.3"] = { code: "Z43.3", description: "Encounter for gastrostomy management", category: "Z43", excludes1: [], excludes2: [], includes: [], commonUse: ["G-tube care"], documentation: ["Wound care"] };
  codes["Z44.0"] = { code: "Z44.0", description: "Encounter for fitting and adjustment of artificial arm", category: "Z44", excludes1: [], excludes2: [], includes: [], commonUse: ["Prosthetic arm fitting"], documentation: ["Rehabilitation consult"] };
  codes["Z44.1"] = { code: "Z44.1", description: "Encounter for fitting and adjustment of artificial leg", category: "Z44", excludes1: [], excludes2: [], includes: [], commonUse: ["Prosthetic leg fitting"], documentation: ["Rehabilitation consult"] };
  codes["Z45.0"] = { code: "Z45.0", description: "Encounter for adjustment and management of cardiac pacemaker", category: "Z45", excludes1: [], excludes2: [], includes: [], commonUse: ["Pacemaker check"], documentation: ["Pacemaker interrogation"] };
  codes["Z45.2"] = { code: "Z45.2", description: "Encounter for adjustment and management of vascular access device", category: "Z45", excludes1: [], excludes2: [], includes: [], commonUse: ["Port/catheter management"], documentation: ["Line check"] };
  codes["Z45.3"] = { code: "Z45.3", description: "Encounter for adjustment and management of implanted defibrillator", category: "Z45", excludes1: [], excludes2: [], includes: [], commonUse: ["ICD check"], documentation: ["Device interrogation"] };
  codes["Z46.0"] = { code: "Z46.0", description: "Encounter for fitting and adjustment of spectacles and contact lenses", category: "Z46", excludes1: [], excludes2: [], includes: [], commonUse: ["Glasses fitting"], documentation: ["Visual acuity"] };
  codes["Z46.1"] = { code: "Z46.1", description: "Encounter for fitting and adjustment of hearing aid", category: "Z46", excludes1: [], excludes2: [], includes: [], commonUse: ["Hearing aid fitting"], documentation: ["Audiometry"] };
  codes["Z47.0"] = { code: "Z47.0", description: "Encounter for removal of orthopedic internal fixation device", category: "Z47", excludes1: [], excludes2: [], includes: [], commonUse: ["Hardware removal"], documentation: ["X-ray", "Surgical note"] };
  codes["Z47.1"] = { code: "Z47.1", description: "Encounter for aftercare following joint replacement", category: "Z47", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint replacement follow-up"], documentation: ["X-ray"] };
  codes["Z48.0"] = { code: "Z48.0", description: "Encounter for attention to surgical dressings and sutures", category: "Z48", excludes1: [], excludes2: [], includes: [], commonUse: ["Wound care"], documentation: ["Wound assessment"] };
  codes["Z49.0"] = { code: "Z49.0", description: "Encounter for fitting and adjustment of extracorporeal dialysis catheter", category: "Z49", excludes1: [], excludes2: [], includes: [], commonUse: ["Dialysis catheter management"], documentation: ["Catheter check"] };
  codes["Z49.3"] = { code: "Z49.3", description: "Encounter for adequacy testing for dialysis", category: "Z49", excludes1: [], excludes2: [], includes: [], commonUse: ["Dialysis adequacy testing"], documentation: ["BUN", "Kt/V"] };
  codes["Z50.0"] = { code: "Z50.0", description: "Encounter for drug detoxification and rehabilitation", category: "Z50", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug rehab"], documentation: ["Various"] };
  codes["Z50.1"] = { code: "Z50.1", description: "Encounter for alcohol rehabilitation", category: "Z50", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcohol rehab"], documentation: ["Various"] };
  codes["Z50.2"] = { code: "Z50.2", description: "Encounter for rehabilitation for the restoration of respiratory function", category: "Z50", excludes1: [], excludes2: [], includes: [], commonUse: ["Pulmonary rehab"], documentation: ["Pulmonary function tests"] };
  codes["Z50.5"] = { code: "Z50.5", description: "Encounter for speech therapy", category: "Z50", excludes1: [], excludes2: [], includes: [], commonUse: ["Speech therapy"], documentation: ["Speech therapy eval"] };
  codes["Z50.7"] = { code: "Z50.7", description: "Encounter for occupational therapy and vocational rehabilitation", category: "Z50", excludes1: [], excludes2: [], includes: [], commonUse: ["Occupational therapy"], documentation: ["Various"] };
  codes["Z51.0"] = { code: "Z51.0", description: "Encounter for antineoplastic chemotherapy and immunotherapy", category: "Z51", excludes1: [], excludes2: [], includes: [], commonUse: ["Chemotherapy visit"], documentation: ["Various"] };
  codes["Z51.1"] = { code: "Z51.1", description: "Encounter for antineoplastic radiotherapy", category: "Z51", excludes1: [], excludes2: [], includes: [], commonUse: ["Radiation therapy visit"], documentation: ["Various"] };
  codes["Z51.5"] = { code: "Z51.5", description: "Encounter for palliative care", category: "Z51", excludes1: [], excludes2: [], includes: [], commonUse: ["Palliative care"], documentation: ["Various"] };
  codes["Z51.7"] = { code: "Z51.7", description: "Encounter for palliative care and hospice services", category: "Z51", excludes1: [], excludes2: [], includes: [], commonUse: ["Hospice care"], documentation: ["Various"] };
  codes["Z52.0"] = { code: "Z52.0", description: "Encounter for organ and tissue donor", category: "Z52", excludes1: [], excludes2: [], includes: [], commonUse: ["Organ donation"], documentation: ["Various"] };
  codes["Z52.1"] = { code: "Z52.1", description: "Encounter for blood donor", category: "Z52", excludes1: [], excludes2: [], includes: [], commonUse: ["Blood donation"], documentation: ["Blood donation form"] };
  codes["Z54.0"] = { code: "Z54.0", description: "Convalescence following surgery", category: "Z54", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-surgery recovery"], documentation: ["Various"] };
  codes["Z54.1"] = { code: "Z54.1", description: "Convalescence following radiotherapy", category: "Z54", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-radiation recovery"], documentation: ["Various"] };
  codes["Z54.2"] = { code: "Z54.2", description: "Convalescence following chemotherapy", category: "Z54", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-chemo recovery"], documentation: ["Various"] };
  codes["Z54.4"] = { code: "Z54.4", description: "Convalescence following treatment of fracture", category: "Z54", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-fracture recovery"], documentation: ["X-ray"] };
  codes["Z55.0"] = { code: "Z55.0", description: "Illiteracy and low-level literacy", category: "Z55", excludes1: [], excludes2: [], includes: [], commonUse: ["Illiteracy"], documentation: ["Educational assessment"] };
  codes["Z55.3"] = { code: "Z55.3", description: "Unemployment, unspecified", category: "Z55", excludes1: [], excludes2: [], includes: [], commonUse: ["Unemployment"], documentation: ["Various"] };
  codes["Z56.0"] = { code: "Z56.0", description: "Unemployment, unspecified", category: "Z56", excludes1: [], excludes2: [], includes: [], commonUse: ["Unemployment"], documentation: ["Various"] };
  codes["Z56.1"] = { code: "Z56.1", description: "Change of job", category: "Z56", excludes1: [], excludes2: [], includes: [], commonUse: ["Job change"], documentation: ["Various"] };
  codes["Z57.0"] = { code: "Z57.0", description: "Occupational exposure to noise", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Noise exposure"], documentation: ["Audiometry"] };
  codes["Z57.1"] = { code: "Z57.1", description: "Occupational exposure to dust", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Dust exposure"], documentation: ["Pulmonary function tests"] };
  codes["Z57.2"] = { code: "Z57.2", description: "Occupational exposure to dust (particulates)", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Dust exposure"], documentation: ["Pulmonary function tests"] };
  codes["Z57.3"] = { code: "Z57.3", description: "Occupational exposure to other air contaminants", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Air contaminant exposure"], documentation: ["Pulmonary function tests"] };
  codes["Z57.4"] = { code: "Z57.4", description: "Occupational exposure to toxic agents in agriculture", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Agricultural toxin exposure"], documentation: ["Various"] };
  codes["Z57.5"] = { code: "Z57.5", description: "Occupational exposure to radiation", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Radiation exposure"], documentation: ["CBC"] };
  codes["Z57.6"] = { code: "Z57.6", description: "Occupational exposure to extreme temperature", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Temperature exposure"], documentation: ["Various"] };
  codes["Z57.7"] = { code: "Z57.7", description: "Occupational exposure to vibration", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Vibration exposure"], documentation: ["Clinical exam"] };
  codes["Z57.8"] = { code: "Z57.8", description: "Occupational exposure to other risk factors", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Occupational exposure"], documentation: ["Various"] };
  codes["Z57.9"] = { code: "Z57.9", description: "Occupational exposure to unspecified risk factor", category: "Z57", excludes1: [], excludes2: [], includes: [], commonUse: ["Occupational exposure NOS"], documentation: ["Various"] };
  codes["Z58.0"] = { code: "Z58.0", description: "Exposure to noise", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Noise exposure"], documentation: ["Audiometry"] };
  codes["Z58.1"] = { code: "Z58.1", description: "Exposure to air pollution", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Air pollution exposure"], documentation: ["Various"] };
  codes["Z58.2"] = { code: "Z58.2", description: "Exposure to water pollution", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Water pollution exposure"], documentation: ["Various"] };
  codes["Z58.3"] = { code: "Z58.3", description: "Exposure to soil pollution", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Soil pollution exposure"], documentation: ["Various"] };
  codes["Z58.4"] = { code: "Z58.4", description: "Exposure to radiation", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Radiation exposure"], documentation: ["Various"] };
  codes["Z58.5"] = { code: "Z58.5", description: "Exposure to other environmental pollution", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Environmental pollution exposure"], documentation: ["Various"] };
  codes["Z58.6"] = { code: "Z58.6", description: "Inadequate drinking water", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Inadequate water"], documentation: ["Various"] };
  codes["Z58.7"] = { code: "Z58.7", description: "Exposure to second-hand tobacco smoke", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Secondhand smoke exposure"], documentation: ["Various"] };
  codes["Z58.8"] = { code: "Z58.8", description: "Exposure to other environmental factors", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Environmental exposure"], documentation: ["Various"] };
  codes["Z58.9"] = { code: "Z58.9", description: "Environmental exposure, unspecified", category: "Z58", excludes1: [], excludes2: [], includes: [], commonUse: ["Environmental exposure NOS"], documentation: ["Various"] };
  codes["Z59.0"] = { code: "Z59.0", description: "Homelessness", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Homelessness"], documentation: ["Various"] };
  codes["Z59.1"] = { code: "Z59.1", description: "Inadequate housing", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Inadequate housing"], documentation: ["Various"] };
  codes["Z59.2"] = { code: "Z59.2", description: "Discordant with neighbors,房东 and community", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Housing discord"], documentation: ["Various"] };
  codes["Z59.3"] = { code: "Z59.3", description: "Problems related to living in residential institution", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Institutional living issues"], documentation: ["Various"] };
  codes["Z59.4"] = { code: "Z59.4", description: "Lack of adequate food", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Food insecurity"], documentation: ["Various"] };
  codes["Z59.5"] = { code: "Z59.5", description: "Extreme poverty", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Poverty"], documentation: ["Various"] };
  codes["Z59.6"] = { code: "Z59.6", description: "Low income", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Low income"], documentation: ["Various"] };
  codes["Z59.7"] = { code: "Z59.7", description: "Insufficient social insurance and welfare support", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Insurance issues"], documentation: ["Various"] };
  codes["Z59.8"] = { code: "Z59.8", description: "Other problems related to housing and economic circumstances", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Housing/economic issue"], documentation: ["Various"] };
  codes["Z59.9"] = { code: "Z59.9", description: "Unspecified problem related to housing and economic circumstances", category: "Z59", excludes1: [], excludes2: [], includes: [], commonUse: ["Housing issue NOS"], documentation: ["Various"] };
  codes["Z60.0"] = { code: "Z60.0", description: "Problems of adjustment to life-cycle transitions", category: "Z60", excludes1: [], excludes2: [], includes: [], commonUse: ["Adjustment problem"], documentation: ["Psychiatric eval"] };
  codes["Z60.1"] = { code: "Z60.1", description: "Problems related to unusual living situation", category: "Z60", excludes1: [], excludes2: [], includes: [], commonUse: ["Living situation issue"], documentation: ["Various"] };
  codes["Z60.2"] = { code: "Z60.2", description: "Problems related to living alone", category: "Z60", excludes1: [], excludes2: [], includes: [], commonUse: ["Living alone issues"], documentation: ["Various"] };
  codes["Z60.3"] = { code: "Z60.3", description: "Problems related to acculturation", category: "Z60", excludes1: [], excludes2: [], includes: [], commonUse: ["Acculturation issues"], documentation: ["Various"] };
  codes["Z60.4"] = { code: "Z60.4", description: "Problems related to social exclusion and rejection", category: "Z60", excludes1: [], excludes2: [], includes: [], commonUse: ["Social exclusion"], documentation: ["Psychiatric eval"] };
  codes["Z60.5"] = { code: "Z60.5", description: "Problems related to discrimination and persecution", category: "Z60", excludes1: [], excludes2: [], includes: [], commonUse: ["Discrimination"], documentation: ["Various"] };
  codes["Z60.8"] = { code: "Z60.8", description: "Other problems related to social environment", category: "Z60", excludes1: [], excludes2: [], includes: [], commonUse: ["Social problem"], documentation: ["Various"] };
  codes["Z60.9"] = { code: "Z60.9", description: "Problem related to social environment, unspecified", category: "Z60", excludes1: [], excludes2: [], includes: [], commonUse: ["Social problem NOS"], documentation: ["Various"] };
  codes["Z61.0"] = { code: "Z61.0", description: "Loss of intimate relationship in childhood", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Childhood relationship loss"], documentation: ["Psychiatric eval"] };
  codes["Z61.1"] = { code: "Z61.1", description: "Removal from home in childhood", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Childhood removal"], documentation: ["Various"] };
  codes["Z61.2"] = { code: "Z61.2", description: "Altered pattern of personal relationship in childhood", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Relationship disruption childhood"], documentation: ["Various"] };
  codes["Z61.3"] = { code: "Z61.3", description: "Loss of self-esteem in childhood", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Childhood self-esteem loss"], documentation: ["Psychiatric eval"] };
  codes["Z61.4"] = { code: "Z61.4", description: "Problems related to alleged sexual abuse by person within primary support group", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Sexual abuse by family"], documentation: ["Various"] };
  codes["Z61.5"] = { code: "Z61.5", description: "Problems related to alleged sexual abuse by person outside primary support group", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Sexual abuse by outsider"], documentation: ["Various"] };
  codes["Z61.6"] = { code: "Z61.6", description: "Problems related to alleged physical abuse by person within primary support group", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Physical abuse by family"], documentation: ["Various"] };
  codes["Z61.7"] = { code: "Z61.7", description: "Problems related to alleged physical abuse by person outside primary support group", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Physical abuse by outsider"], documentation: ["Various"] };
  codes["Z61.8"] = { code: "Z61.8", description: "Problems related to other negative life events in childhood", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Childhood adversity"], documentation: ["Various"] };
  codes["Z61.9"] = { code: "Z61.9", description: "Problems related to unspecified negative life event in childhood", category: "Z61", excludes1: [], excludes2: [], includes: [], commonUse: ["Childhood event NOS"], documentation: ["Various"] };
  codes["Z62.0"] = { code: "Z62.0", description: "Inadequate parental supervision and control", category: "Z62", excludes1: [], excludes2: [], includes: [], commonUse: ["Parental supervision issue"], documentation: ["Various"] };
  codes["Z62.1"] = { code: "Z62.1", description: "Parental overprotection", category: "Z62", excludes1: [], excludes2: [], includes: [], commonUse: ["Overprotective parenting"], documentation: ["Various"] };
  codes["Z62.2"] = { code: "Z62.2", description: "Parent-child problems", category: "Z62", excludes1: [], excludes2: [], includes: [], commonUse: ["Parent-child conflict"], documentation: ["Psychiatric eval"] };
  codes["Z62.3"] = { code: "Z62.3", description: "Hostility towards and maltreatment of child", category: "Z62", excludes1: [], excludes2: [], includes: [], commonUse: ["Child maltreatment"], documentation: ["Various"] };
  codes["Z62.4"] = { code: "Z62.4", description: "Emotional neglect of child", category: "Z62", excludes1: [], excludes2: [], includes: [], commonUse: ["Emotional neglect"], documentation: ["Various"] };
  codes["Z62.5"] = { code: "Z62.5", description: "Other neglect of child", category: "Z62", excludes1: [], excludes2: [], includes: [], commonUse: ["Child neglect"], documentation: ["Various"] };
  codes["Z62.6"] = { code: "Z62.6", description: "Other problems related to neglect of child", category: "Z62", excludes1: [], excludes2: [], includes: [], commonUse: ["Child neglect"], documentation: ["Various"] };
  codes["Z62.8"] = { code: "Z62.8", description: "Other specified problems in upbringing", category: "Z62", excludes1: [], excludes2: [], includes: [], commonUse: ["Upbringing problem"], documentation: ["Various"] };
  codes["Z62.9"] = { code: "Z62.9", description: "Problem related to upbringing, unspecified", category: "Z62", excludes1: [], excludes2: [], includes: [], commonUse: ["Upbringing problem NOS"], documentation: ["Various"] };
  codes["Z63.0"] = { code: "Z63.0", description: "Problems in relationship with spouse or partner", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Marital problems"], documentation: ["Various"] };
  codes["Z63.1"] = { code: "Z63.1", description: "Problems in relationship with parents and in-laws", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Family relationship issues"], documentation: ["Various"] };
  codes["Z63.2"] = { code: "Z63.2", description: "Marital ill-treatment", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Spousal abuse"], documentation: ["Various"] };
  codes["Z63.3"] = { code: "Z63.3", description: "Absence of family member", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Family absence"], documentation: ["Various"] };
  codes["Z63.4"] = { code: "Z63.4", description: "Death of spouse or partner", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Bereavement"], documentation: ["Various"] };
  codes["Z63.5"] = { code: "Z63.5", description: "Disruption of family by separation", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Family separation"], documentation: ["Various"] };
  codes["Z63.6"] = { code: "Z63.6", description: "Dependent relative needing care at home", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Caregiver burden"], documentation: ["Various"] };
  codes["Z63.7"] = { code: "Z63.7", description: "Other stressful life events affecting family and household", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Family stress"], documentation: ["Various"] };
  codes["Z63.8"] = { code: "Z63.8", description: "Other problems related to primary support group", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Support group issue"], documentation: ["Various"] };
  codes["Z63.9"] = { code: "Z63.9", description: "Problem related to primary support group, unspecified", category: "Z63", excludes1: [], excludes2: [], includes: [], commonUse: ["Support issue NOS"], documentation: ["Various"] };
  codes["Z64.0"] = { code: "Z64.0", description: "Problems related to unwanted pregnancy", category: "Z64", excludes1: [], excludes2: [], includes: [], commonUse: ["Unwanted pregnancy"], documentation: ["Various"] };
  codes["Z64.1"] = { code: "Z64.1", description: "Problems related to multiparity", category: "Z64", excludes1: [], excludes2: [], includes: [], commonUse: ["Multiparity issues"], documentation: ["Various"] };
  codes["Z64.2"] = { code: "Z64.2", description: "Problems related to unwanted pregnancy, result of rape or incest", category: "Z64", excludes1: [], excludes2: [], includes: [], commonUse: ["Pregnancy after assault"], documentation: ["Various"] };
  codes["Z64.3"] = { code: "Z64.3", description: "Problems related to attitudes of family toward disabled or other chronic patient in household", category: "Z64", excludes1: [], excludes2: [], includes: [], commonUse: ["Family attitude toward disability"], documentation: ["Various"] };
  codes["Z64.4"] = { code: "Z64.4", description: "Disconcord with social worker, teacher and other authorities", category: "Z64", excludes1: [], excludes2: [], includes: [], commonUse: ["Authority discord"], documentation: ["Various"] };
  codes["Z64.5"] = { code: "Z64.5", description: "Problems related to participation in forced labor or sexual exploitation", category: "Z64", excludes1: [], excludes2: [], includes: [], commonUse: ["Forced labor/sexual exploitation"], documentation: ["Various"] };
  codes["Z65.0"] = { code: "Z65.0", description: "Conviction in civil proceedings without imprisonment", category: "Z65", excludes1: [], excludes2: [], includes: [], commonUse: ["Civil conviction"], documentation: ["Various"] };
  codes["Z65.1"] = { code: "Z65.1", description: "Imprisonment and other incarceration", category: "Z65", excludes1: [], excludes2: [], includes: [], commonUse: ["Incarceration"], documentation: ["Various"] };
  codes["Z65.2"] = { code: "Z65.2", description: "Problems related to release from prison", category: "Z65", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-release issues"], documentation: ["Various"] };
  codes["Z65.3"] = { code: "Z65.3", description: "Problems related to litigation", category: "Z65", excludes1: [], excludes2: [], includes: [], commonUse: ["Legal issues"], documentation: ["Various"] };
  codes["Z65.4"] = { code: "Z65.4", description: "Victim of crime", category: "Z65", excludes1: [], excludes2: [], includes: [], commonUse: ["Crime victim"], documentation: ["Various"] };
  codes["Z65.5"] = { code: "Z65.5", description: "Exposure to disaster, war and other hostilities", category: "Z65", excludes1: [], excludes2: [], includes: [], commonUse: ["Disaster/war exposure"], documentation: ["Various"] };
  codes["Z65.8"] = { code: "Z65.8", description: "Other specified problems related to psychosocial circumstances", category: "Z65", excludes1: [], excludes2: [], includes: [], commonUse: ["Psychosocial problem"], documentation: ["Various"] };
  codes["Z65.9"] = { code: "Z65.9", description: "Unspecified problem related to psychosocial circumstances", category: "Z65", excludes1: [], excludes2: [], includes: [], commonUse: ["Psychosocial issue NOS"], documentation: ["Various"] };
  codes["Z66"] = { code: "Z66", description: "Do not resuscitate", category: "Z66", excludes1: [], excludes2: [], includes: [], commonUse: ["DNR"], documentation: ["Advance directive"] };
  codes["Z67"] = { code: "Z67", description: "Relevant genetic family history and personal history", category: "Z67", excludes1: [], excludes2: [], includes: [], commonUse: ["Genetic family history"], documentation: ["Genetic testing"] };
  codes["Z68.0"] = { code: "Z68.0", description: "Body mass index (BMI) 19.9 or less, adult", category: "Z68", excludes1: [], excludes2: [], includes: [], commonUse: ["BMI underweight"], documentation: ["BMI calculation"] };
  codes["Z68.1"] = { code: "Z68.1", description: "Body mass index (BMI) 20.0-24.9, normal", category: "Z68", excludes1: [], excludes2: [], includes: [], commonUse: ["Normal BMI"], documentation: ["BMI calculation"] };
  codes["Z68.2"] = { code: "Z68.2", description: "Body mass index (BMI) 25.0-29.9, overweight", category: "Z68", excludes1: [], excludes2: [], includes: [], commonUse: ["Overweight BMI"], documentation: ["BMI calculation"] };
  codes["Z68.3"] = { code: "Z68.3", description: "Body mass index (BMI) 30.0-34.9, obesity class I", category: "Z68", excludes1: [], excludes2: [], includes: [], commonUse: ["Obese class I"], documentation: ["BMI calculation"] };
  codes["Z68.4"] = { code: "Z68.4", description: "Body mass index (BMI) 35.0-39.9, obesity class II", category: "Z68", excludes1: [], excludes2: [], includes: [], commonUse: ["Obese class II"], documentation: ["BMI calculation"] };
  codes["Z68.5"] = { code: "Z68.5", description: "Body mass index (BMI) 40.0 or greater, morbid obesity", category: "Z68", excludes1: [], excludes2: [], includes: [], commonUse: ["Morbid obesity"], documentation: ["BMI calculation"] };
  codes["Z69.0"] = { code: "Z69.0", description: "Encounter for mental health services for victim of spouse or partner abuse", category: "Z69", excludes1: [], excludes2: [], includes: [], commonUse: ["Domestic violence victim services"], documentation: ["Various"] };
  codes["Z69.01"] = { code: "Z69.01", description: "Encounter for mental health services for victim of spouse or partner physical abuse", category: "Z69", excludes1: [], excludes2: [], includes: [], commonUse: ["DV victim - physical"], documentation: ["Various"] };
  codes["Z69.02"] = { code: "Z69.02", description: "Encounter for mental health services for victim of spouse or partner sexual abuse", category: "Z69", excludes1: [], excludes2: [], includes: [], commonUse: ["DV victim - sexual"], documentation: ["Various"] };
  codes["Z69.1"] = { code: "Z69.1", description: "Encounter for mental health services for victim of child abuse", category: "Z69", excludes1: [], excludes2: [], includes: [], commonUse: ["Child abuse victim services"], documentation: ["Various"] };
  codes["Z69.11"] = { code: "Z69.11", description: "Encounter for mental health services for victim of child physical abuse", category: "Z69", excludes1: [], excludes2: [], includes: [], commonUse: ["Child physical abuse services"], documentation: ["Various"] };
  codes["Z69.12"] = { code: "Z69.12", description: "Encounter for mental health services for victim of child sexual abuse", category: "Z69", excludes1: [], excludes2: [], includes: [], commonUse: ["Child sexual abuse services"], documentation: ["Various"] };
  codes["Z69.8"] = { code: "Z69.8", description: "Encounter for mental health services for victim of other abuse", category: "Z69", excludes1: [], excludes2: [], includes: [], commonUse: ["Abuse victim services"], documentation: ["Various"] };
  codes["Z69.9"] = { code: "Z69.9", description: "Encounter for mental health services for victim of unspecified abuse", category: "Z69", excludes1: [], excludes2: [], includes: [], commonUse: ["Abuse victim services NOS"], documentation: ["Various"] };
  codes["Z70.0"] = { code: "Z70.0", description: "Counseling related to attitudes and behavior regarding sexuality", category: "Z70", excludes1: [], excludes2: [], includes: [], commonUse: ["Sexuality counseling"], documentation: ["Various"] };
  codes["Z70.1"] = { code: "Z70.1", description: "Counseling related to attitudes and behavior regarding homosexual relations", category: "Z70", excludes1: [], excludes2: [], includes: [], commonUse: ["Homosexual counseling"], documentation: ["Various"] };
  codes["Z70.2"] = { code: "Z70.2", description: "Counseling related to sexual behavior and orientation", category: "Z70", excludes1: [], excludes2: [], includes: [], commonUse: ["Sexual behavior counseling"], documentation: ["Various"] };
  codes["Z70.3"] = { code: "Z70.3", description: "Counseling related to psychosexual identity and lifestyle", category: "Z70", excludes1: [], excludes2: [], includes: [], commonUse: ["Psychosexual counseling"], documentation: ["Various"] };
  codes["Z70.8"] = { code: "Z70.8", description: "Other counseling related to sexual attitude, behavior and orientation", category: "Z70", excludes1: [], excludes2: [], includes: [], commonUse: ["Sexual counseling"], documentation: ["Various"] };
  codes["Z70.9"] = { code: "Z70.9", description: "Counseling related to sexual attitude, behavior and orientation, unspecified", category: "Z70", excludes1: [], excludes2: [], includes: [], commonUse: ["Sexual counseling NOS"], documentation: ["Various"] };
  codes["Z71.0"] = { code: "Z71.0", description: "Encounter for counseling related to contraception", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["Contraception counseling"], documentation: ["Various"] };
  codes["Z71.1"] = { code: "Z71.1", description: "Encounter for counseling related to use of alcohol", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcohol counseling"], documentation: ["AUDIT-C"] };
  codes["Z71.2"] = { code: "Z71.2", description: "Encounter for counseling related to dietary practices", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["Dietary counseling"], documentation: ["Various"] };
  codes["Z71.3"] = { code: "Z71.3", description: "Encounter for counseling related to underweight management", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["Weight counseling - underweight"], documentation: ["Various"] };
  codes["Z71.4"] = { code: "Z71.4", description: "Encounter for counseling related to obesity management", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["Weight counseling - obesity"], documentation: ["BMI"] };
  codes["Z71.5"] = { code: "Z71.5", description: "Encounter for counseling related to hypertension management", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["HTN counseling"], documentation: ["BP monitoring"] };
  codes["Z71.6"] = { code: "Z71.6", description: "Encounter for counseling related to tobacco use", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["Smoking cessation counseling"], documentation: ["Fagerstrom test"] };
  codes["Z71.7"] = { code: "Z71.7", description: "Encounter for counseling related to human immunodeficiency virus [HIV]", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["HIV counseling"], documentation: ["HIV test"] };
  codes["Z71.8"] = { code: "Z71.8", description: "Other specified counseling", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["Counseling NOS"], documentation: ["Various"] };
  codes["Z71.9"] = { code: "Z71.9", description: "Counseling, unspecified", category: "Z71", excludes1: [], excludes2: [], includes: [], commonUse: ["Counseling NOS"], documentation: ["Various"] };
  codes["Z72.0"] = { code: "Z72.0", description: "Tobacco use", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Smoking", "Tobacco use"], documentation: ["Various"] };
  codes["Z72.1"] = { code: "Z72.1", description: "Alcohol use", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Alcohol use"], documentation: ["AUDIT-C"] };
  codes["Z72.2"] = { code: "Z72.2", description: "Drug use", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug use"], documentation: ["Various"] };
  codes["Z72.3"] = { code: "Z72.3", description: "Lack of physical exercise", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Sedentary lifestyle"], documentation: ["Various"] };
  codes["Z72.4"] = { code: "Z72.4", description: "Inappropriate diet and eating habits", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Poor diet habits"], documentation: ["Various"] };
  codes["Z72.5"] = { code: "Z72.5", description: "High risk sexual behavior", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Unsafe sexual practices"], documentation: ["STI testing"] };
  codes["Z72.6"] = { code: "Z72.6", description: "Gambling and betting", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Gambling addiction"], documentation: ["Psychiatric eval"] };
  codes["Z72.7"] = { code: "Z72.7", description: "Tobacco use", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Tobacco use"], documentation: ["Various"] };
  codes["Z72.8"] = { code: "Z72.8", description: "Other problems related to lifestyle", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Lifestyle issue"], documentation: ["Various"] };
  codes["Z72.9"] = { code: "Z72.9", description: "Problem related to lifestyle, unspecified", category: "Z72", excludes1: [], excludes2: [], includes: [], commonUse: ["Lifestyle issue NOS"], documentation: ["Various"] };
  codes["Z73.0"] = { code: "Z73.0", description: "Burn-out", category: "Z73", excludes1: [], excludes2: [], includes: [], commonUse: ["Burnout"], documentation: ["Various"] };
  codes["Z73.1"] = { code: "Z73.1", description: "Personality type and disorder provoking consultation", category: "Z73", excludes1: [], excludes2: [], includes: [], commonUse: ["Personality type consultation"], documentation: ["Psychiatric eval"] };
  codes["Z73.2"] = { code: "Z73.2", description: "Lack of leisure and recreational activity", category: "Z73", excludes1: [], excludes2: [], includes: [], commonUse: ["No leisure activities"], documentation: ["Various"] };
  codes["Z73.3"] = { code: "Z73.3", description: "Stress, not elsewhere classified", category: "Z73", excludes1: [], excludes2: [], includes: [], commonUse: ["Stress NOS"], documentation: ["Various"] };
  codes["Z73.4"] = { code: "Z73.4", description: "Withdrawal from social life due to handicap or illness", category: "Z73", excludes1: [], excludes2: [], includes: [], commonUse: ["Social withdrawal"], documentation: ["Various"] };
  codes["Z73.5"] = { code: "Z73.5", description: "Role disruption", category: "Z73", excludes1: [], excludes2: [], includes: [], commonUse: ["Role disruption"], documentation: ["Various"] };
  codes["Z73.6"] = { code: "Z73.6", description: "Limitation of activities due to disability", category: "Z73", excludes1: [], excludes2: [], includes: [], commonUse: ["Disability limitation"], documentation: ["Various"] };
  codes["Z73.8"] = { code: "Z73.8", description: "Other problems related to lifestyle", category: "Z73", excludes1: [], excludes2: [], includes: [], commonUse: ["Lifestyle problem"], documentation: ["Various"] };
  codes["Z73.9"] = { code: "Z73.9", description: "Problem related to lifestyle, unspecified", category: "Z73", excludes1: [], excludes2: [], includes: [], commonUse: ["Lifestyle problem NOS"], documentation: ["Various"] };
  codes["Z74.0"] = { code: "Z74.0", description: "Bed confinement status", category: "Z74", excludes1: [], excludes2: [], includes: [], commonUse: ["Bed-bound"], documentation: ["Various"] };
  codes["Z74.1"] = { code: "Z74.1", description: "Dependency on enabling machine or device", category: "Z74", excludes1: [], excludes2: [], includes: [], commonUse: ["Machine dependency"], documentation: ["Various"] };
  codes["Z74.2"] = { code: "Z74.2", description: "Dependency on caregivers", category: "Z74", excludes1: [], excludes2: [], includes: [], commonUse: ["Caregiver dependency"], documentation: ["Various"] };
  codes["Z74.3"] = { code: "Z74.3", description: "Need for continuous supervision", category: "Z74", excludes1: [], excludes2: [], includes: [], commonUse: ["Supervision need"], documentation: ["Various"] };
  codes["Z74.8"] = { code: "Z74.8", description: "Other problems related to care-provider dependency", category: "Z74", excludes1: [], excludes2: [], includes: [], commonUse: ["Care dependency"], documentation: ["Various"] };
  codes["Z74.9"] = { code: "Z74.9", description: "Problem related to care-provider dependency, unspecified", category: "Z74", excludes1: [], excludes2: [], includes: [], commonUse: ["Care dependency NOS"], documentation: ["Various"] };
  codes["Z75.0"] = { code: "Z75.0", description: "Medical services not available in home", category: "Z75", excludes1: [], excludes2: [], includes: [], commonUse: ["No home medical services"], documentation: ["Various"] };
  codes["Z75.1"] = { code: "Z75.1", description: "Person awaiting admission to adequate facility elsewhere", category: "Z75", excludes1: [], excludes2: [], includes: [], commonUse: ["Awaiting admission"], documentation: ["Various"] };
  codes["Z75.2"] = { code: "Z75.2", description: "Person awaiting admission to unspecified facility", category: "Z75", excludes1: [], excludes2: [], includes: [], commonUse: ["Awaiting admission NOS"], documentation: ["Various"] };
  codes["Z75.3"] = { code: "Z75.3", description: "Unavailability and inaccessibility of health-care facilities", category: "Z75", excludes1: [], excludes2: [], includes: [], commonUse: ["Healthcare unavailable"], documentation: ["Various"] };
  codes["Z75.4"] = { code: "Z75.4", description: "Unavailability and inaccessibility of other helping agencies", category: "Z75", excludes1: [], excludes2: [], includes: [], commonUse: ["Agencies unavailable"], documentation: ["Various"] };
  codes["Z75.8"] = { code: "Z75.8", description: "Other specified problems related to medical facilities and other health care", category: "Z75", excludes1: [], excludes2: [], includes: [], commonUse: ["Healthcare access issue"], documentation: ["Various"] };
  codes["Z75.9"] = { code: "Z75.9", description: "Unspecified problem related to medical facilities and other health care", category: "Z75", excludes1: [], excludes2: [], includes: [], commonUse: ["Healthcare issue NOS"], documentation: ["Various"] };
  codes["Z76.0"] = { code: "Z76.0", description: "Encounter for routine and ritual male circumcision", category: "Z76", excludes1: [], excludes2: [], includes: [], commonUse: ["Circumcision"], documentation: ["Procedure note"] };
  codes["Z76.1"] = { code: "Z76.1", description: "Encounter for routine child health examination", category: "Z76", excludes1: [], excludes2: [], includes: [], commonUse: ["Well-child visit"], documentation: ["Growth chart"] };
  codes["Z76.2"] = { code: "Z76.2", description: "Encounter for care and supervision of healthy infant and child", category: "Z76", excludes1: [], excludes2: [], includes: [], commonUse: ["Well-baby visit"], documentation: ["Growth chart"] };
  codes["Z76.3"] = { code: "Z76.3", description: "Healthy person accompanying sick person", category: "Z76", excludes1: [], excludes2: [], includes: [], commonUse: ["Companion visit"], documentation: ["Various"] };
  codes["Z76.4"] = { code: "Z76.4", description: "Encounter for repair or removal of orthodontic device", category: "Z76", excludes1: [], excludes2: [], includes: [], commonUse: ["Orthodontic repair"], documentation: ["Dental exam"] };
  codes["Z76.5"] = { code: "Z76.5", description: "Encounter for counseling and examination for voluntary sterilization", category: "Z76", excludes1: [], excludes2: [], includes: [], commonUse: ["Sterilization counseling"], documentation: ["Various"] };
  codes["Z76.8"] = { code: "Z76.8", description: "Encounter for other specified special examinations and encounters", category: "Z76", excludes1: [], excludes2: [], includes: [], commonUse: ["Special encounter"], documentation: ["Various"] };
  codes["Z76.9"] = { code: "Z76.9", description: "Encounter for unspecified special examination or encounter", category: "Z76", excludes1: [], excludes2: [], includes: [], commonUse: ["Special encounter NOS"], documentation: ["Various"] };
  codes["Z77.0"] = { code: "Z77.0", description: "Contact with and exposure to other bacterial and viral infectious agents", category: "Z77", excludes1: [], excludes2: [], includes: [], commonUse: ["Infectious exposure"], documentation: ["Various"] };
  codes["Z77.01"] = { code: "Z77.01", description: "Contact with and exposure to meningococcus", category: "Z77", excludes1: [], excludes2: [], includes: [], commonUse: ["Meningococcal exposure"], documentation: ["Various"] };
  codes["Z77.02"] = { code: "Z77.02", description: "Contact with and exposure to tuberculosis", category: "Z77", excludes1: [], excludes2: [], includes: [], commonUse: ["TB exposure"], documentation: ["PPD", "Chest X-ray"] };
  codes["Z77.09"] = { code: "Z77.09", description: "Contact with and exposure to other infectious agents", category: "Z77", excludes1: [], excludes2: [], includes: [], commonUse: ["Infectious exposure"], documentation: ["Various"] };
  codes["Z77.1"] = { code: "Z77.1", description: "Contact with and exposure to environmental pollution", category: "Z77", excludes1: [], excludes2: [], includes: [], commonUse: ["Pollution exposure"], documentation: ["Various"] };
  codes["Z77.2"] = { code: "Z77.2", description: "Contact with and exposure to other chemical agents and hazardous substances", category: "Z77", excludes1: [], excludes2: [], includes: [], commonUse: ["Chemical exposure"], documentation: ["Various"] };
  codes["Z77.3"] = { code: "Z77.3", description: "Contact with and exposure to other hazardous and harmful substances", category: "Z77", excludes1: [], excludes2: [], includes: [], commonUse: ["Hazardous substance exposure"], documentation: ["Various"] };
  codes["Z77.8"] = { code: "Z77.8", description: "Contact with and exposure to other specified external agents", category: "Z77", excludes1: [], excludes2: [], includes: [], commonUse: ["External agent exposure"], documentation: ["Various"] };
  codes["Z77.9"] = { code: "Z77.9", description: "Contact with and exposure to unspecified external agent", category: "Z77", excludes1: [], excludes2: [], includes: [], commonUse: ["Exposure NOS"], documentation: ["Various"] };
  codes["Z78.0"] = { code: "Z78.0", description: "Person in good health", category: "Z78", excludes1: [], excludes2: [], includes: [], commonUse: ["Good health"], documentation: ["Various"] };
  codes["Z78.1"] = { code: "Z78.1", description: "Person in apparent good health following recent treatment for malignancy", category: "Z78", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-cancer good health"], documentation: ["Various"] };
  codes["Z78.2"] = { code: "Z78.2", description: "Person in apparent good health following other recent treatment", category: "Z78", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-treatment good health"], documentation: ["Various"] };
  codes["Z78.3"] = { code: "Z78.3", description: "Person in apparent good health following recovery from pathological condition", category: "Z78", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-recovery health"], documentation: ["Various"] };
  codes["Z78.8"] = { code: "Z78.8", description: "Other specified persons in apparent good health", category: "Z78", excludes1: [], excludes2: [], includes: [], commonUse: ["Good health"], documentation: ["Various"] };
  codes["Z78.9"] = { code: "Z78.9", description: "Unspecified person in apparent good health", category: "Z78", excludes1: [], excludes2: [], includes: [], commonUse: ["Good health NOS"], documentation: ["Various"] };
  codes["Z79.0"] = { code: "Z79.0", description: "Long term (current) use of anticoagulants and antithrombotics", category: "Z79", excludes1: [], excludes2: [], includes: [], commonUse: ["Long-term anticoagulation"], documentation: ["PT/INR"] };
  codes["Z79.1"] = { code: "Z79.1", description: "Long term (current) use of anti-inflammatories", category: "Z79", excludes1: [], excludes2: [], includes: [], commonUse: ["Long-term NSAID use"], documentation: ["Various"] };
  codes["Z79.2"] = { code: "Z79.2", description: "Long term (current) use of psychotherapeutic agents", category: "Z79", excludes1: [], excludes2: [], includes: [], commonUse: ["Long-term psych meds"], documentation: ["Various"] };
  codes["Z79.3"] = { code: "Z79.3", description: "Long term (current) use of oral contraceptives", category: "Z79", excludes1: [], excludes2: [], includes: [], commonUse: ["Long-term OCP use"], documentation: ["Various"] };
  codes["Z79.4"] = { code: "Z79.4", description: "Long term (current) use of insulin", category: "Z79", excludes1: [], excludes2: [], includes: [], commonUse: ["Insulin use"], documentation: ["HbA1c"] };
  codes["Z79.5"] = { code: "Z79.5", description: "Long term (current) use of hormones", category: "Z79", excludes1: [], excludes2: [], includes: [], commonUse: ["Hormone use"], documentation: ["Various"] };
  codes["Z79.8"] = { code: "Z79.8", description: "Long term (current) use of other medications", category: "Z79", excludes1: [], excludes2: [], includes: [], commonUse: ["Long-term medication use"], documentation: ["Various"] };
  codes["Z79.89"] = { code: "Z79.89", description: "Other long term (current) drug therapy", category: "Z79", excludes1: [], excludes2: [], includes: [], commonUse: ["Long-term drug therapy"], documentation: ["Various"] };
  codes["Z79.9"] = { code: "Z79.9", description: "Long term (current) use of unspecified medication", category: "Z79", excludes1: [], excludes2: [], includes: [], commonUse: ["Long-term medication NOS"], documentation: ["Various"] };
  codes["Z80.0"] = { code: "Z80.0", description: "Family history of malignant neoplasm of digestive organs", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx GI cancer"], documentation: ["Various"] };
  codes["Z80.1"] = { code: "Z80.1", description: "Family history of malignant neoplasm of trachea, bronchus and lung", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx lung cancer"], documentation: ["Various"] };
  codes["Z80.2"] = { code: "Z80.2", description: "Family history of malignant neoplasm of other respiratory and intrathoracic organs", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx respiratory cancer"], documentation: ["Various"] };
  codes["Z80.3"] = { code: "Z80.3", description: "Family history of malignant neoplasm of breast", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx breast cancer"], documentation: ["BRCA testing"] };
  codes["Z80.4"] = { code: "Z80.4", description: "Family history of malignant neoplasm of genital organs", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx reproductive cancer"], documentation: ["Various"] };
  codes["Z80.5"] = { code: "Z80.5", description: "Family history of malignant neoplasm of urinary tract", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx GU cancer"], documentation: ["Various"] };
  codes["Z80.6"] = { code: "Z80.6", description: "Family history of leukemia", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx leukemia"], documentation: ["Various"] };
  codes["Z80.7"] = { code: "Z80.7", description: "Family history of other and unspecified malignant neoplasm", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx cancer"], documentation: ["Various"] };
  codes["Z80.8"] = { code: "Z80.8", description: "Family history of other malignant neoplasm of specified sites", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx cancer"], documentation: ["Various"] };
  codes["Z80.9"] = { code: "Z80.9", description: "Family history of unspecified malignant neoplasm", category: "Z80", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx cancer NOS"], documentation: ["Various"] };
  codes["Z81.0"] = { code: "Z81.0", description: "Family history of mental and behavioral disorders", category: "Z81", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx mental illness"], documentation: ["Various"] };
  codes["Z81.1"] = { code: "Z81.1", description: "Family history of substance abuse", category: "Z81", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx substance abuse"], documentation: ["Various"] };
  codes["Z81.2"] = { code: "Z81.2", description: "Family history of tobacco dependence", category: "Z81", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx smoking"], documentation: ["Various"] };
  codes["Z81.3"] = { code: "Z81.3", description: "Family history of other mental or behavioral disorders", category: "Z81", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx mental disorder"], documentation: ["Various"] };
  codes["Z81.4"] = { code: "Z81.4", description: "Family history of substance abuse", category: "Z81", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx substance abuse"], documentation: ["Various"] };
  codes["Z81.8"] = { code: "Z81.8", description: "Family history of other mental and behavioral disorders", category: "Z81", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx mental disorder"], documentation: ["Various"] };
  codes["Z81.9"] = { code: "Z81.9", description: "Family history of unspecified mental or behavioral disorder", category: "Z81", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx mental disorder NOS"], documentation: ["Various"] };
  codes["Z82.0"] = { code: "Z82.0", description: "Family history of diabetes mellitus", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx diabetes"], documentation: ["Fasting glucose"] };
  codes["Z82.1"] = { code: "Z82.1", description: "Family history of deafness and hearing loss", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx hearing loss"], documentation: ["Audiometry"] };
  codes["Z82.2"] = { code: "Z82.2", description: "Family history of blindness and visual loss", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx blindness"], documentation: ["Eye exam"] };
  codes["Z82.3"] = { code: "Z82.3", description: "Family history of stroke (cerebrovascular disease)", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx stroke"], documentation: ["Various"] };
  codes["Z82.4"] = { code: "Z82.4", description: "Family history of ischemic heart disease", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx CAD"], documentation: ["Lipid panel", "ECG"] };
  codes["Z82.5"] = { code: "Z82.5", description: "Family history of sudden cardiac death", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx sudden death"], documentation: ["ECG", "Echocardiogram"] };
  codes["Z82.6"] = { code: "Z82.6", description: "Family history of arthritis", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx arthritis"], documentation: ["Various"] };
  codes["Z82.7"] = { code: "Z82.7", description: "Family history of other respiratory diseases", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx respiratory disease"], documentation: ["Various"] };
  codes["Z82.8"] = { code: "Z82.8", description: "Family history of other physical diseases", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx physical disease"], documentation: ["Various"] };
  codes["Z82.9"] = { code: "Z82.9", description: "Family history of unspecified physical disease", category: "Z82", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx disease NOS"], documentation: ["Various"] };
  codes["Z83.0"] = { code: "Z83.0", description: "Family history of human immunodeficiency virus [HIV] disease", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx HIV"], documentation: ["HIV test"] };
  codes["Z83.1"] = { code: "Z83.1", description: "Family history of other infectious and parasitic diseases", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx infection"], documentation: ["Various"] };
  codes["Z83.2"] = { code: "Z83.2", description: "Family history of diseases of the blood and blood-forming organs", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx blood disorder"], documentation: ["CBC"] };
  codes["Z83.3"] = { code: "Z83.3", description: "Family history of diabetes mellitus", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx diabetes"], documentation: ["Fasting glucose"] };
  codes["Z83.4"] = { code: "Z83.4", description: "Family history of other endocrine, nutritional and metabolic diseases", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx endocrine disease"], documentation: ["Various"] };
  codes["Z83.5"] = { code: "Z83.5", description: "Family history of eye, ear and mastoid process diseases", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx eye/ear disease"], documentation: ["Various"] };
  codes["Z83.6"] = { code: "Z83.6", description: "Family history of diseases of the respiratory system", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx respiratory disease"], documentation: ["Various"] };
  codes["Z83.7"] = { code: "Z83.7", description: "Family history of diseases of the digestive system", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx GI disease"], documentation: ["Various"] };
  codes["Z83.8"] = { code: "Z83.8", description: "Family history of other specified conditions", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx condition"], documentation: ["Various"] };
  codes["Z83.9"] = { code: "Z83.9", description: "Family history of unspecified condition", category: "Z83", excludes1: [], excludes2: [], includes: [], commonUse: ["Family hx condition NOS"], documentation: ["Various"] };
  codes["Z84.0"] = { code: "Z84.0", description: "Personal history of infection", category: "Z84", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior infection"], documentation: ["Various"] };
  codes["Z84.1"] = { code: "Z84.1", description: "Personal history of conditions arising in the perinatal period", category: "Z84", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior perinatal condition"], documentation: ["Various"] };
  codes["Z84.2"] = { code: "Z84.2", description: "Personal history of diseases of the skin and subcutaneous tissue", category: "Z84", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior skin disease"], documentation: ["Various"] };
  codes["Z84.3"] = { code: "Z84.3", description: "Personal history of congenital malformations", category: "Z84", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior congenital anomaly"], documentation: ["Various"] };
  codes["Z84.8"] = { code: "Z84.8", description: "Personal history of other specified conditions", category: "Z84", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior condition"], documentation: ["Various"] };
  codes["Z84.9"] = { code: "Z84.9", description: "Personal history of unspecified condition", category: "Z84", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior condition NOS"], documentation: ["Various"] };
  codes["Z85.0"] = { code: "Z85.0", description: "Personal history of malignant neoplasm of digestive organs", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior GI cancer"], documentation: ["Various"] };
  codes["Z85.1"] = { code: "Z85.1", description: "Personal history of malignant neoplasm of trachea, bronchus and lung", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior lung cancer"], documentation: ["Various"] };
  codes["Z85.2"] = { code: "Z85.2", description: "Personal history of malignant neoplasm of other respiratory and intrathoracic organs", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior respiratory cancer"], documentation: ["Various"] };
  codes["Z85.3"] = { code: "Z85.3", description: "Personal history of malignant neoplasm of breast", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior breast cancer"], documentation: ["Various"] };
  codes["Z85.4"] = { code: "Z85.4", description: "Personal history of malignant neoplasm of genital organs", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior reproductive cancer"], documentation: ["Various"] };
  codes["Z85.5"] = { code: "Z85.5", description: "Personal history of malignant neoplasm of urinary tract", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior GU cancer"], documentation: ["Various"] };
  codes["Z85.6"] = { code: "Z85.6", description: "Personal history of leukemia", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior leukemia"], documentation: ["Various"] };
  codes["Z85.7"] = { code: "Z85.7", description: "Personal history of other malignant neoplasm of lymphoid and hematopoietic tissues", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior lymphoma"], documentation: ["Various"] };
  codes["Z85.8"] = { code: "Z85.8", description: "Personal history of other malignant neoplasm", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior cancer"], documentation: ["Various"] };
  codes["Z85.9"] = { code: "Z85.9", description: "Personal history of unspecified malignant neoplasm", category: "Z85", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior cancer NOS"], documentation: ["Various"] };
  codes["Z86.0"] = { code: "Z86.0", description: "Personal history of non-malignant neoplasm", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior benign tumor"], documentation: ["Various"] };
  codes["Z86.1"] = { code: "Z86.1", description: "Personal history of infection and parasitic disease", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior infection"], documentation: ["Various"] };
  codes["Z86.2"] = { code: "Z86.2", description: "Personal history of diseases of the blood and blood-forming organs", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior blood disorder"], documentation: ["CBC"] };
  codes["Z86.3"] = { code: "Z86.3", description: "Personal history of endocrine, nutritional and metabolic diseases", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior endocrine disease"], documentation: ["Various"] };
  codes["Z86.4"] = { code: "Z86.4", description: "Personal history of substance abuse treatment", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior substance abuse tx"], documentation: ["Various"] };
  codes["Z86.5"] = { code: "Z86.5", description: "Personal history of certain other diseases", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior disease"], documentation: ["Various"] };
  codes["Z86.6"] = { code: "Z86.6", description: "Personal history of diseases of the nervous system and sense organs", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior neuro disease"], documentation: ["Various"] };
  codes["Z86.7"] = { code: "Z86.7", description: "Personal history of diseases of the circulatory system", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior cardiac disease"], documentation: ["ECG", "Echocardiogram"] };
  codes["Z86.71"] = { code: "Z86.71", description: "Personal history of myocardial infarction", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior MI"], documentation: ["ECG", "Echocardiogram"] };
  codes["Z86.72"] = { code: "Z86.72", description: "Personal history of ischemic stroke", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior stroke"], documentation: ["CT head", "MRI brain"] };
  codes["Z86.73"] = { code: "Z86.73", description: "Personal history of transient ischemic attack (TIA)", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior TIA"], documentation: ["CT head", "MRI brain"] };
  codes["Z86.74"] = { code: "Z86.74", description: "Personal history of certain other specified diseases of the circulatory system", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior CV disease"], documentation: ["Various"] };
  codes["Z86.79"] = { code: "Z86.79", description: "Personal history of other diseases of the circulatory system", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior CV disease"], documentation: ["Various"] };
  codes["Z86.8"] = { code: "Z86.8", description: "Personal history of other specified conditions", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior condition"], documentation: ["Various"] };
  codes["Z86.9"] = { code: "Z86.9", description: "Personal history of unspecified condition", category: "Z86", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior condition NOS"], documentation: ["Various"] };
  codes["Z87.0"] = { code: "Z87.0", description: "Personal history of certain conditions arising in the perinatal period", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior perinatal condition"], documentation: ["Various"] };
  codes["Z87.1"] = { code: "Z87.1", description: "Personal history of diseases of the nervous system and sense organs", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior neuro disease"], documentation: ["Various"] };
  codes["Z87.2"] = { code: "Z87.2", description: "Personal history of diseases of the circulatory system", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior cardiac disease"], documentation: ["ECG"] };
  codes["Z87.3"] = { code: "Z87.3", description: "Personal history of diseases of the musculoskeletal system and connective tissue", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior musculoskeletal disease"], documentation: ["Various"] };
  codes["Z87.39"] = { code: "Z87.39", description: "Personal history of other diseases of the musculoskeletal system and connective tissue", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior MSK disease"], documentation: ["Various"] };
  codes["Z87.4"] = { code: "Z87.4", description: "Personal history of diseases of the genitourinary system", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior GU disease"], documentation: ["Various"] };
  codes["Z87.5"] = { code: "Z87.5", description: "Personal history of complications of pregnancy, childbirth and the puerperium", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior pregnancy complication"], documentation: ["Various"] };
  codes["Z87.6"] = { code: "Z87.6", description: "Personal history of certain conditions arising in the perinatal period", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior perinatal condition"], documentation: ["Various"] };
  codes["Z87.7"] = { code: "Z87.7", description: "Personal history of neoplasm of uncertain behavior", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior uncertain neoplasm"], documentation: ["Various"] };
  codes["Z87.8"] = { code: "Z87.8", description: "Personal history of other specified conditions", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior condition"], documentation: ["Various"] };
  codes["Z87.89"] = { code: "Z87.89", description: "Personal history of other specified conditions", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior condition"], documentation: ["Various"] };
  codes["Z87.9"] = { code: "Z87.9", description: "Personal history of unspecified condition", category: "Z87", excludes1: [], excludes2: [], includes: [], commonUse: ["Prior condition NOS"], documentation: ["Various"] };
  codes["Z88.0"] = { code: "Z88.0", description: "Allergy status to penicillin", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Penicillin allergy"], documentation: ["Allergy documentation"] };
  codes["Z88.1"] = { code: "Z88.1", description: "Allergy status to other antibiotic agents", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Antibiotic allergy"], documentation: ["Allergy documentation"] };
  codes["Z88.2"] = { code: "Z88.2", description: "Allergy status to sulfonamides", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Sulfa allergy"], documentation: ["Allergy documentation"] };
  codes["Z88.3"] = { code: "Z88.3", description: "Allergy status to other anti-infective agents", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Anti-infective allergy"], documentation: ["Allergy documentation"] };
  codes["Z88.4"] = { code: "Z88.4", description: "Allergy status to anesthetic agents", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Anesthesia allergy"], documentation: ["Allergy documentation"] };
  codes["Z88.5"] = { code: "Z88.5", description: "Allergy status to narcotic agents", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Narcotic allergy"], documentation: ["Allergy documentation"] };
  codes["Z88.6"] = { code: "Z88.6", description: "Allergy status to analgesic agents", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Analgesic allergy"], documentation: ["Allergy documentation"] };
  codes["Z88.7"] = { code: "Z88.7", description: "Allergy status to serum and vaccine", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Serum/vaccine allergy"], documentation: ["Allergy documentation"] };
  codes["Z88.8"] = { code: "Z88.8", description: "Allergy status to other specified drugs, medicaments and biological substances", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug allergy"], documentation: ["Allergy documentation"] };
  codes["Z88.9"] = { code: "Z88.9", description: "Allergy status to unspecified drugs, medicaments and biological substances", category: "Z88", excludes1: [], excludes2: [], includes: [], commonUse: ["Drug allergy NOS"], documentation: ["Allergy documentation"] };
  codes["Z89.0"] = { code: "Z89.0", description: "Acquired absence of shoulder region", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Absent shoulder"], documentation: ["Various"] };
  codes["Z89.1"] = { code: "Z89.1", description: "Acquired absence of upper limb", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Absent upper limb"], documentation: ["Various"] };
  codes["Z89.2"] = { code: "Z89.2", description: "Acquired absence of lower limb", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Absent lower limb"], documentation: ["Various"] };
  codes["Z89.3"] = { code: "Z89.3", description: "Acquired absence of both upper limbs", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Absent both upper limbs"], documentation: ["Various"] };
  codes["Z89.4"] = { code: "Z89.4", description: "Acquired absence of both lower limbs", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Absent both lower limbs"], documentation: ["Various"] };
  codes["Z89.5"] = { code: "Z89.5", description: "Acquired absence of leg below knee", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Below knee amputation"], documentation: ["Various"] };
  codes["Z89.6"] = { code: "Z89.6", description: "Acquired absence of leg above knee", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Above knee amputation"], documentation: ["Various"] };
  codes["Z89.7"] = { code: "Z89.7", description: "Acquired absence of both lower limbs", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Bilateral lower limb amputation"], documentation: ["Various"] };
  codes["Z89.8"] = { code: "Z89.8", description: "Acquired absence of other parts of limb", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Limb absence"], documentation: ["Various"] };
  codes["Z89.9"] = { code: "Z89.9", description: "Acquired absence of unspecified limb", category: "Z89", excludes1: [], excludes2: [], includes: [], commonUse: ["Limb absence NOS"], documentation: ["Various"] };
  codes["Z90.0"] = { code: "Z90.0", description: "Acquired absence of part of head and neck", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["Head/neck tissue loss"], documentation: ["Various"] };
  codes["Z90.1"] = { code: "Z90.1", description: "Acquired absence of breast and nipple", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["Mastectomy status"], documentation: ["Various"] };
  codes["Z90.2"] = { code: "Z90.2", description: "Acquired absence of lung", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["Pneumonectomy status"], documentation: ["Various"] };
  codes["Z90.3"] = { code: "Z90.3", description: "Acquired absence of part of stomach", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["Partial gastrectomy status"], documentation: ["Various"] };
  codes["Z90.4"] = { code: "Z90.4", description: "Acquired absence of other parts of digestive tract", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["GI resection status"], documentation: ["Various"] };
  codes["Z90.5"] = { code: "Z90.5", description: "Acquired absence of kidney", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["Nephrectomy status"], documentation: ["Various"] };
  codes["Z90.6"] = { code: "Z90.6", description: "Acquired absence of other parts of urinary tract", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary tract removal"], documentation: ["Various"] };
  codes["Z90.7"] = { code: "Z90.7", description: "Acquired absence of female genital organs", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["Hysterectomy status"], documentation: ["Various"] };
  codes["Z90.8"] = { code: "Z90.8", description: "Acquired absence of other organs or parts of body", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["Organ absence"], documentation: ["Various"] };
  codes["Z90.9"] = { code: "Z90.9", description: "Acquired absence of unspecified organ or part of body", category: "Z90", excludes1: [], excludes2: [], includes: [], commonUse: ["Organ absence NOS"], documentation: ["Various"] };
  codes["Z91.0"] = { code: "Z91.0", description: "Allergy status not due to drugs, medicaments and biological substances", category: "Z91", excludes1: [], excludes2: [], includes: [], commonUse: ["Environmental allergy status"], documentation: ["Allergy testing"] };
  codes["Z91.1"] = { code: "Z91.1", description: "Patient's noncompliance with medical treatment and regimen", category: "Z91", excludes1: [], excludes2: [], includes: [], commonUse: ["Noncompliance"], documentation: ["Various"] };
  codes["Z91.2"] = { code: "Z91.2", description: "Patient's noncompliance with preventive measures", category: "Z91", excludes1: [], excludes2: [], includes: [], commonUse: ["Prevention noncompliance"], documentation: ["Various"] };
  codes["Z91.3"] = { code: "Z91.3", description: "Patient's noncompliance with diet", category: "Z91", excludes1: [], excludes2: [], includes: [], commonUse: ["Diet noncompliance"], documentation: ["Various"] };
  codes["Z91.4"] = { code: "Z91.4", description: "Patient's noncompliance with medication regimen", category: "Z91", excludes1: [], excludes2: [], includes: [], commonUse: ["Medication noncompliance"], documentation: ["Various"] };
  codes["Z91.5"] = { code: "Z91.5", description: "Patient's noncompliance with other medical treatment and regimen", category: "Z91", excludes1: [], excludes2: [], includes: [], commonUse: ["Treatment noncompliance"], documentation: ["Various"] };
  codes["Z91.8"] = { code: "Z91.8", description: "Other specified personal risk factors, not elsewhere classified", category: "Z91", excludes1: [], excludes2: [], includes: [], commonUse: ["Personal risk factor"], documentation: ["Various"] };
  codes["Z91.9"] = { code: "Z91.9", description: "Personal risk factor, unspecified", category: "Z91", excludes1: [], excludes2: [], includes: [], commonUse: ["Risk factor NOS"], documentation: ["Various"] };
  codes["Z92.0"] = { code: "Z92.0", description: "Status following cardiac surgery", category: "Z92", excludes1: [], excludes2: [], includes: [], commonUse: ["Post cardiac surgery"], documentation: ["ECG", "Echocardiogram"] };
  codes["Z92.1"] = { code: "Z92.1", description: "Status following cardiac bypass surgery", category: "Z92", excludes1: [], excludes2: [], includes: [], commonUse: ["Post CABG"], documentation: ["Various"] };
  codes["Z92.2"] = { code: "Z92.2", description: "Status following joint replacement", category: "Z92", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint replacement status"], documentation: ["X-ray"] };
  codes["Z92.3"] = { code: "Z92.3", description: "Status following radiation therapy", category: "Z92", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-radiation status"], documentation: ["Various"] };
  codes["Z92.4"] = { code: "Z92.4", description: "Status following chemotherapy", category: "Z92", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-chemo status"], documentation: ["Various"] };
  codes["Z92.5"] = { code: "Z92.5", description: "Status following rehabilitation", category: "Z92", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-rehab status"], documentation: ["Various"] };
  codes["Z92.6"] = { code: "Z92.6", description: "Status following genitourinary surgery", category: "Z92", excludes1: [], excludes2: [], includes: [], commonUse: ["Post GU surgery"], documentation: ["Various"] };
  codes["Z92.8"] = { code: "Z92.8", description: "Status following other medical treatment", category: "Z92", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-treatment status"], documentation: ["Various"] };
  codes["Z92.9"] = { code: "Z92.9", description: "Status following unspecified medical treatment", category: "Z92", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-treatment status NOS"], documentation: ["Various"] };
  codes["Z93.0"] = { code: "Z93.0", description: "Tracheostomy status", category: "Z93", excludes1: [], excludes2: [], includes: [], commonUse: ["Trach status"], documentation: ["Trach care"] };
  codes["Z93.1"] = { code: "Z93.1", description: "Gastrostomy status", category: "Z93", excludes1: [], excludes2: [], includes: [], commonUse: ["G-tube status"], documentation: ["G-tube care"] };
  codes["Z93.2"] = { code: "Z93.2", description: "Ileostomy status", category: "Z93", excludes1: [], excludes2: [], includes: [], commonUse: ["Ileostomy status"], documentation: ["Stoma care"] };
  codes["Z93.3"] = { code: "Z93.3", description: "Colostomy status", category: "Z93", excludes1: [], excludes2: [], includes: [], commonUse: ["Colostomy status"], documentation: ["Stoma care"] };
  codes["Z93.4"] = { code: "Z93.4", description: "Other artificial openings of gastrointestinal tract", category: "Z93", excludes1: [], excludes2: [], includes: [], commonUse: ["GI ostomy status"], documentation: ["Stoma care"] };
  codes["Z93.5"] = { code: "Z93.5", description: "Cystostomy status", category: "Z93", excludes1: [], excludes2: [], includes: [], commonUse: ["Cystostomy status"], documentation: ["Catheter care"] };
  codes["Z93.6"] = { code: "Z93.6", description: "Other urinary ostomy status", category: "Z93", excludes1: [], excludes2: [], includes: [], commonUse: ["Urinary ostomy status"], documentation: ["Stoma care"] };
  codes["Z93.8"] = { code: "Z93.8", description: "Other artificial opening status", category: "Z93", excludes1: [], excludes2: [], includes: [], commonUse: ["Ostomy status"], documentation: ["Stoma care"] };
  codes["Z93.9"] = { code: "Z93.9", description: "Artificial opening status, unspecified", category: "Z93", excludes1: [], excludes2: [], includes: [], commonUse: ["Ostomy status NOS"], documentation: ["Stoma care"] };
  codes["Z94.0"] = { code: "Z94.0", description: "Kidney transplant status", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Renal transplant status"], documentation: ["Creatinine", "Urinalysis"] };
  codes["Z94.1"] = { code: "Z94.1", description: "Heart transplant status", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Heart transplant status"], documentation: ["Echocardiogram"] };
  codes["Z94.2"] = { code: "Z94.2", description: "Lung transplant status", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Lung transplant status"], documentation: ["Pulmonary function tests"] };
  codes["Z94.3"] = { code: "Z94.3", description: "Heart and lungs transplant status", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Heart-lung transplant status"], documentation: ["Various"] };
  codes["Z94.4"] = { code: "Z94.4", description: "Liver transplant status", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Liver transplant status"], documentation: ["LFTs"] };
  codes["Z94.5"] = { code: "Z94.5", description: "Skin transplant status", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Skin graft status"], documentation: ["Wound assessment"] };
  codes["Z94.6"] = { code: "Z94.6", description: "Bone transplant status", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Bone graft status"], documentation: ["X-ray"] };
  codes["Z94.7"] = { code: "Z94.7", description: "Corneal transplant status", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Corneal transplant status"], documentation: ["Eye exam"] };
  codes["Z94.8"] = { code: "Z94.8", description: "Other organ transplant status", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Organ transplant status"], documentation: ["Various"] };
  codes["Z94.9"] = { code: "Z94.9", description: "Organ transplant status, unspecified", category: "Z94", excludes1: [], excludes2: [], includes: [], commonUse: ["Transplant status NOS"], documentation: ["Various"] };
  codes["Z95.0"] = { code: "Z95.0", description: "Presence of cardiac pacemaker", category: "Z95", excludes1: [], excludes2: [], includes: [], commonUse: ["Pacemaker in situ"], documentation: ["Pacemaker interrogation"] };
  codes["Z95.1"] = { code: "Z95.1", description: "Presence of aortocoronary bypass graft", category: "Z95", excludes1: [], excludes2: [], includes: [], commonUse: ["CABG status"], documentation: ["ECG", "Chest X-ray"] };
  codes["Z95.2"] = { code: "Z95.2", description: "Presence of prosthetic heart valve", category: "Z95", excludes1: [], excludes2: [], includes: [], commonUse: ["Mechanical valve status"], documentation: ["Echocardiogram"] };
  codes["Z95.3"] = { code: "Z95.3", description: "Presence of prosthetic heart valve, unspecified", category: "Z95", excludes1: [], excludes2: [], includes: [], commonUse: ["Prosthetic valve NOS"], documentation: ["Echocardiogram"] };
  codes["Z95.4"] = { code: "Z95.4", description: "Presence of coronary artery bypass graft", category: "Z95", excludes1: [], excludes2: [], includes: [], commonUse: ["CABG status"], documentation: ["ECG"] };
  codes["Z95.5"] = { code: "Z95.5", description: "Presence of coronary angioplasty implant", category: "Z95", excludes1: [], excludes2: [], includes: [], commonUse: ["Stent status"], documentation: ["Various"] };
  codes["Z95.8"] = { code: "Z95.8", description: "Presence of other cardiac and vascular implants and grafts", category: "Z95", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac implant status"], documentation: ["Various"] };
  codes["Z95.9"] = { code: "Z95.9", description: "Presence of cardiac and vascular implant and graft, unspecified", category: "Z95", excludes1: [], excludes2: [], includes: [], commonUse: ["Cardiac implant NOS"], documentation: ["Various"] };
  codes["Z96.0"] = { code: "Z96.0", description: "Presence of intraocular lens", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["IOL status"], documentation: ["Eye exam"] };
  codes["Z96.1"] = { code: "Z96.1", description: "Presence of intrauterine contraceptive device", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["IUD status"], documentation: ["Ultrasound pelvis"] };
  codes["Z96.2"] = { code: "Z96.2", description: "Presence of otological and audiological implants", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["Cochlear implant status"], documentation: ["Audiometry"] };
  codes["Z96.3"] = { code: "Z96.3", description: "Presence of artificial larynx", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["Laryngeal implant status"], documentation: ["Various"] };
  codes["Z96.4"] = { code: "Z96.4", description: "Presence of dental implants", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["Dental implant status"], documentation: ["Dental X-ray"] };
  codes["Z96.5"] = { code: "Z96.5", description: "Presence of tooth implant", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["Tooth implant status"], documentation: ["Dental X-ray"] };
  codes["Z96.6"] = { code: "Z96.6", description: "Presence of orthopedic joint implants", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint implant status"], documentation: ["X-ray"] };
  codes["Z96.7"] = { code: "Z96.7", description: "Presence of other orthopedic implants", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["Orthopedic implant status"], documentation: ["X-ray"] };
  codes["Z96.8"] = { code: "Z96.8", description: "Presence of other specified functional implants", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["Implant status"], documentation: ["Various"] };
  codes["Z96.9"] = { code: "Z96.9", description: "Presence of unspecified functional implant", category: "Z96", excludes1: [], excludes2: [], includes: [], commonUse: ["Implant status NOS"], documentation: ["Various"] };
  codes["Z97.0"] = { code: "Z97.0", description: "Presence of artificial eye", category: "Z97", excludes1: [], excludes2: [], includes: [], commonUse: ["Artificial eye status"], documentation: ["Eye exam"] };
  codes["Z97.1"] = { code: "Z97.1", description: "Presence of artificial limb (complete) (partial)", category: "Z97", excludes1: [], excludes2: [], includes: [], commonUse: ["Prosthetic limb status"], documentation: ["Various"] };
  codes["Z97.2"] = { code: "Z97.2", description: "Presence of dental device or implant", category: "Z97", excludes1: [], excludes2: [], includes: [], commonUse: ["Dental device status"], documentation: ["Dental exam"] };
  codes["Z97.3"] = { code: "Z97.3", description: "Presence of spectacles and contact lenses", category: "Z97", excludes1: [], excludes2: [], includes: [], commonUse: ["Glasses/contacts status"], documentation: ["Visual acuity"] };
  codes["Z97.4"] = { code: "Z97.4", description: "Presence of hearing aid", category: "Z97", excludes1: [], excludes2: [], includes: [], commonUse: ["Hearing aid status"], documentation: ["Audiometry"] };
  codes["Z97.5"] = { code: "Z97.5", description: "Presence of intrauterine contraceptive device", category: "Z97", excludes1: [], excludes2: [], includes: [], commonUse: ["IUD status"], documentation: ["Ultrasound pelvis"] };
  codes["Z97.8"] = { code: "Z97.8", description: "Presence of other specified mechanical devices", category: "Z97", excludes1: [], excludes2: [], includes: [], commonUse: ["Mechanical device status"], documentation: ["Various"] };
  codes["Z97.9"] = { code: "Z97.9", description: "Presence of unspecified mechanical device", category: "Z97", excludes1: [], excludes2: [], includes: [], commonUse: ["Device status NOS"], documentation: ["Various"] };
  codes["Z98.0"] = { code: "Z98.0", description: "Arthrodesis status", category: "Z98", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint fusion status"], documentation: ["X-ray"] };
  codes["Z98.1"] = { code: "Z98.1", description: "Arthroplasty status", category: "Z98", excludes1: [], excludes2: [], includes: [], commonUse: ["Joint replacement status"], documentation: ["X-ray"] };
  codes["Z98.2"] = { code: "Z98.2", description: "Presence of intraocular lens", category: "Z98", excludes1: [], excludes2: [], includes: [], commonUse: ["IOL status"], documentation: ["Eye exam"] };
  codes["Z98.8"] = { code: "Z98.8", description: "Other specified postprocedural states", category: "Z98", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-procedure status"], documentation: ["Various"] };
  codes["Z98.9"] = { code: "Z98.9", description: "Postprocedural state, unspecified", category: "Z98", excludes1: [], excludes2: [], includes: [], commonUse: ["Post-procedure NOS"], documentation: ["Various"] };
  codes["Z99.0"] = { code: "Z99.0", description: "Dependence on renal dialysis", category: "Z99", excludes1: [], excludes2: [], includes: [], commonUse: ["Dialysis dependent"], documentation: ["BUN", "Kt/V"] };
  codes["Z99.1"] = { code: "Z99.1", description: "Dependence on respirator and ventilator", category: "Z99", excludes1: [], excludes2: [], includes: [], commonUse: ["Ventilator dependent"], documentation: ["Various"] };
  codes["Z99.2"] = { code: "Z99.2", description: "Dependence on supplemental oxygen", category: "Z99", excludes1: [], excludes2: [], includes: [], commonUse: ["O2 dependent"], documentation: ["ABG", "Pulse oximetry"] };
  codes["Z99.3"] = { code: "Z99.3", description: "Dependence on wheelchair", category: "Z99", excludes1: [], excludes2: [], includes: [], commonUse: ["Wheelchair dependent"], documentation: ["Various"] };
  codes["Z99.8"] = { code: "Z99.8", description: "Dependence on other enabling machines and devices", category: "Z99", excludes1: [], excludes2: [], includes: [], commonUse: ["Machine dependent"], documentation: ["Various"] };
  codes["Z99.9"] = { code: "Z99.9", description: "Dependence on unspecified enabling machine or device", category: "Z99", excludes1: [], excludes2: [], includes: [], commonUse: ["Device dependent NOS"], documentation: ["Various"] };
  return { chapters: chapters, categories: categories, codes: codes };
})();
