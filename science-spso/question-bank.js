var QUESTION_TOPICS = [];

function q(prompt, options, answer, explanation) {
  return { prompt: prompt, options: options, answer: answer, explanation: explanation };
}

function topic(slug, label, title, questions) {
  QUESTION_TOPICS.push({ slug: slug, label: label, title: title, questions: questions });
}

topic("week-01-introduction-to-science-olympiad", "Week 01", "Introduction to Science Olympiad", [
  q(
    "A student observes that a plant bends toward a window and concludes that plants can think. Which response best applies scientific reasoning?",
    ["Accept it because the observation is direct.", "Reject it because plants do not have brains.", "Form a testable hypothesis about light direction and compare plants under controlled light conditions.", "Compare only plants that already grew beside the same window."],
    2,
    "The observation is real, but the explanation needs a testable mechanism. A controlled light experiment can separate phototropism from unsupported claims about thought."
  ),
  q(
    "A model solar system uses a basketball for the Sun and peas for planets, but places all planets on a classroom table. What is the main limitation of the model?",
    ["It cannot show that planets are spherical.", "It misrepresents the enormous distance scale between objects.", "It cannot show that the Sun is larger than Earth.", "It proves that planets do not move."],
    1,
    "Models simplify reality. This model may show relative size roughly, but classroom spacing badly compresses astronomical distances."
  ),
  q(
    "Four groups test the same paper airplane design. One group changes paper type, launch angle, and wing length at the same time. Why is their result weak evidence?",
    ["They measured flight distance instead of speed.", "They changed too many variables to identify the cause of any difference.", "Paper airplanes cannot be tested scientifically.", "They did not record the color of the paper."],
    1,
    "A fair test changes one independent variable at a time. Multiple changes create confounding, so the cause of the result is unclear."
  ),
  q(
    "Which statement best distinguishes a scientific law from a scientific theory?",
    ["A law describes a repeated pattern; a theory explains why or how the pattern occurs.", "A theory becomes a law after it is proven.", "A law is a guess; a theory is a fact.", "A theory cannot make predictions."],
    0,
    "Laws summarize patterns, while theories provide explanatory frameworks. A well-supported theory does not simply graduate into a law."
  ),
  q(
    "A class notices that metal benches feel colder than wooden benches at the same air temperature. Which is the best next scientific question?",
    ["Does bench color alone explain the cold feeling?", "Does material type affect the rate of heat transfer from skin?", "Why are metal benches always colder than all other objects?", "Should schools remove metal benches?"],
    1,
    "The observation suggests a testable physical mechanism. Conductivity and heat-transfer rate can be measured under controlled conditions."
  ),
  q(
    "A hypothesis predicts that fertilizer X increases plant mass. The average mass rises, but the error bars strongly overlap with the control. What is the best interpretation?",
    ["The hypothesis is certainly true.", "The fertilizer is poisonous.", "The data give weak evidence, so more trials or better controls are needed.", "The higher average alone is enough even if variation overlaps."],
    2,
    "Overlapping uncertainty means the apparent difference may be due to variation. The claim needs stronger statistical or experimental support."
  ),
  q(
    "Which example is mainly inductive reasoning?",
    ["All mammals have hair; whales are mammals; therefore whales have hair at some stage.", "After observing many metals expand when heated, a student proposes that metals generally expand on heating.", "If the circuit is open, the bulb will not light; the circuit is open; therefore the bulb will not light.", "The textbook says oxygen supports combustion, so a glowing splint relights in oxygen."],
    1,
    "Induction moves from many specific observations to a broader generalization. Deduction applies a general rule to a specific case."
  ),
  q(
    "A new explanation fits all old observations but predicts a rare event that has not been seen. What would most strengthen the explanation?",
    ["Repeating the old observations only.", "Observing the predicted rare event under conditions specified before the test.", "Changing the prediction after collecting data.", "Saying the explanation is too elegant to be false."],
    1,
    "A risky prediction made before testing is powerful evidence when confirmed. It shows the explanation has predictive value beyond old data."
  ),
  q(
    "A student claims that a medicine works because five friends recovered after taking it. What is the biggest missing comparison?",
    ["Whether the friends liked the taste.", "Whether similar patients recovered without the medicine or with a placebo.", "Whether the medicine had a colorful package.", "Whether the friends were all the same height."],
    1,
    "Recovery after treatment does not prove causation. A control or placebo group shows the background recovery rate."
  ),
  q(
    "A scientist changes her conclusion after new evidence contradicts her favorite idea. What does this show about science?",
    ["Scientific knowledge is unreliable because it can change.", "Scientific explanations are revised when better evidence appears.", "Scientists should never trust earlier data.", "Only brand-new ideas can be scientific."],
    1,
    "Science is self-correcting. Revising an explanation in response to evidence is a strength, not a weakness."
  )
]);

topic("week-02-matter-and-elements", "Week 02", "Matter and Elements", [
  q(
    "A sealed syringe contains air. When the plunger is pushed in, the air volume decreases greatly while mass stays the same. Which particle explanation is best?",
    ["Air particles shrink.", "Air particles are pushed closer together because gas particles have large spaces between them.", "Air changes into liquid water.", "The number of air particles increases."],
    1,
    "Gas is compressible because particles are far apart. Compression reduces spacing, not particle size or particle number."
  ),
  q(
    "Salt dissolves in water and the solution looks uniform. Which classification is most accurate?",
    ["Element, because it has one appearance.", "Compound, because salt and water are chemically bonded.", "Mixture, because salt and water are physically combined and can be separated.", "Molecule, because it is wet."],
    2,
    "A solution is a homogeneous mixture. Its components are not newly chemically bonded and can be separated by physical methods such as evaporation."
  ),
  q(
    "Two clear liquids are mixed and the container becomes warmer, producing a new gas. What evidence best suggests a chemical reaction rather than simple mixing?",
    ["Both liquids were clear.", "The total volume changed slightly.", "A new gas and heat were produced.", "The mixture was stirred."],
    2,
    "Gas formation and heat release indicate new substances and energy change. Clear appearance alone says little."
  ),
  q(
    "A pure substance decomposes by electrolysis into hydrogen and oxygen. What must the original substance be?",
    ["An element.", "A compound.", "A mixture of gases.", "An alloy."],
    1,
    "If a pure substance can be chemically broken into different elements, it is a compound. Water is the classic example."
  ),
  q(
    "A balloon filled with helium slowly loses volume even when tied. Which particle idea explains this best?",
    ["Helium atoms disappear.", "Helium atoms are small and move through tiny gaps in the balloon material.", "Helium changes into oxygen.", "The balloon absorbs gravity."],
    1,
    "Diffusion through microscopic pores can let small gas particles escape. The atoms do not vanish or transform into another element."
  ),
  q(
    "Which observation would best support the idea that particles in a liquid are moving?",
    ["A stone keeps its shape in water.", "A drop of ink spreads through still water over time.", "A glass of water has a flat surface.", "Water is transparent."],
    1,
    "Ink spreads by diffusion because particles move randomly. The process occurs even without stirring."
  ),
  q(
    "A student says steam is not matter because it is invisible. What is the best correction?",
    ["Steam is not matter, but water vapor is.", "Water vapor is matter because it has mass and occupies space even when it cannot be seen.", "Only solids are matter.", "Matter must be colored."],
    1,
    "Visibility is not the definition of matter. Gases, including water vapor, have mass and volume."
  ),
  q(
    "A diagram shows two oxygen atoms chemically bonded together. What does it represent?",
    ["An oxygen molecule and an elemental substance.", "A compound because two atoms are bonded.", "A mixture because there are two atoms.", "An ion because oxygen is present."],
    0,
    "O2 is a molecule made of one element only. A compound requires atoms of different elements chemically combined."
  ),
  q(
    "Why does heating usually help a solid dissolve faster in a liquid?",
    ["The solute particles become elements.", "Particles move faster and collide more often with the solute surface.", "The solvent loses all mass.", "The solution becomes a compound."],
    1,
    "Higher temperature increases particle motion, which speeds up collisions and dispersal of solute particles."
  ),
  q(
    "A sample contains iron filings and sulfur powder. After heating strongly, it forms a black solid that is no longer separated by a magnet. What changed?",
    ["A mixture became a compound.", "An element became a mixture.", "A compound became two elements.", "A gas became a solid without reaction."],
    0,
    "Iron and sulfur can physically mix at first. Heating can form iron sulfide, a compound with different properties."
  )
]);

topic("week-03-living-things", "Week 03", "Living Things", [
  q(
    "A crystal grows larger in a jar, but it does not use energy in cells or reproduce using genetic information. Why is growth alone not enough to classify it as living?",
    ["Growth can occur in nonliving systems through particle deposition.", "Crystals are too small to study.", "All growing things are alive.", "Crystals have organs but no tissues."],
    0,
    "Nonliving structures can increase in size by adding material. Life requires a coordinated set of features such as cells, metabolism, response, and reproduction."
  ),
  q(
    "A dormant seed shows almost no visible activity for months. Which evidence would best show it is alive?",
    ["It is brown.", "It can germinate and resume metabolism under suitable conditions.", "It is smaller than a stone.", "It falls downward when dropped."],
    1,
    "Dormancy is low activity, not absence of life. Germination shows stored biological organization and metabolic capacity."
  ),
  q(
    "A robot senses light, moves toward a charger, and repairs small scratches. Why is it still not classified as an organism?",
    ["It cannot move.", "It lacks cellular organization and inherited biological reproduction.", "It responds too slowly.", "It uses energy."],
    1,
    "Robots can mimic some life processes, but living things are cellular and reproduce through biological information systems."
  ),
  q(
    "Why are viruses difficult to place in simple living/nonliving categories?",
    ["They are always visible to the naked eye.", "They contain genetic material and evolve, but they cannot reproduce independently outside host cells.", "They are made only of water.", "They perform photosynthesis."],
    1,
    "Viruses have genetic information and can evolve, yet they depend on host machinery for replication and lack full cellular metabolism."
  ),
  q(
    "An organism survives drought because individuals with deeper roots leave more offspring over many generations. Which concept is illustrated?",
    ["Individual evolution during one lifetime.", "Natural selection changing a population.", "Random growth of crystals.", "Immediate inheritance of learned behavior."],
    1,
    "Natural selection changes trait frequencies in populations across generations. Individuals do not evolve during their lifetime."
  ),
  q(
    "Which observation most directly shows response to stimulus?",
    ["A plant contains chlorophyll.", "A woodlouse moves from a dry area into a moist area.", "A fossil is found in rock.", "A salt crystal forms in solution."],
    1,
    "Movement toward moisture is a response to an environmental stimulus. It can improve survival by reducing water loss."
  ),
  q(
    "Early Earth origin-of-life experiments are useful even if they do not prove exactly how life began because they can",
    ["show that some biological building blocks can form under plausible conditions.", "prove that modern humans appeared first.", "replace all field evidence.", "show that all hypotheses are equally correct."],
    0,
    "Such experiments test chemical plausibility. They support or weaken specific mechanisms rather than proving the full historical path."
  ),
  q(
    "A single-celled organism divides every hour in a nutrient-rich culture, then slows when waste accumulates. Which life process is most clearly limited by the environment?",
    ["Reproduction and growth.", "Gravity.", "Transparency.", "Magnetism."],
    0,
    "Cell division requires energy and materials. Resource depletion and waste buildup can slow reproduction and growth."
  ),
  q(
    "A plant bends toward light. Which explanation connects structure and function best?",
    ["Cells on one side elongate more, changing organ shape to improve light capture.", "The plant chooses the brightest view.", "The stem is pulled by the Sun's gravity.", "Leaves become nonliving in darkness."],
    0,
    "Phototropism involves differential growth, often controlled by plant hormones. The result improves photosynthetic light capture."
  ),
  q(
    "Which set best represents a robust test for classifying an unknown sample as living?",
    ["Color, smell, and size.", "Cells, metabolism, response, growth, reproduction, and genetic information.", "Whether it is found outdoors.", "Whether it moves quickly."],
    1,
    "No single feature is enough. A cluster of biological properties gives a stronger classification."
  )
]);

topic("week-04-biodiversity", "Week 04", "Biodiversity", [
  q(
    "Two animals look similar but DNA evidence shows they are not close relatives. What does this suggest?",
    ["Appearance is always more reliable than DNA.", "Similar environments can produce similar adaptations in unrelated groups.", "They must be the same species.", "Classification should ignore evidence."],
    1,
    "Convergent evolution can produce similar forms. Classification should use multiple evidence sources, including genetic data."
  ),
  q(
    "A forest loses one pollinator species, but many other pollinators can visit the same flowers. Why might high biodiversity increase ecosystem resilience?",
    ["It prevents all environmental change.", "Different species can partly replace lost functions.", "It removes competition completely.", "It makes every organism identical."],
    1,
    "Functional overlap can buffer ecosystems. Biodiversity does not stop change, but it can reduce collapse after disturbance."
  ),
  q(
    "A dichotomous key asks whether an insect has wings, then whether wings are covered by hard cases. What makes this tool useful?",
    ["It uses paired observable choices to narrow identification step by step.", "It guesses the animal's age.", "It replaces all measurements.", "It classifies organisms by personal preference."],
    0,
    "A dichotomous key works through clear paired traits. Each choice reduces the possible identities."
  ),
  q(
    "A new island has many bird species with different beaks, all descended from one ancestral species. Which process best explains this pattern?",
    ["Adaptive radiation after populations adapted to different food sources.", "All birds changing deliberately to match food.", "No mutation occurring.", "A single individual evolving into many species at once."],
    0,
    "Variation plus selection in different niches can split populations into multiple species. This is adaptive radiation."
  ),
  q(
    "Why can extinction of a small, unattractive insect matter to humans?",
    ["Only large mammals affect ecosystems.", "It may pollinate plants, recycle nutrients, feed other species, or carry useful genetic traits.", "All insects are harmful.", "Extinction always increases crop yield."],
    1,
    "Ecological value is not based on appearance. Small species can support food webs and ecosystem services."
  ),
  q(
    "A Venn diagram comparing mammals and birds places warm-blooded in the overlap. What does the overlap mean?",
    ["Only mammals are warm-blooded.", "The trait is shared by both groups.", "The trait belongs to neither group.", "Birds are a type of mammal."],
    1,
    "The overlap in a Venn diagram shows shared characteristics. Unique traits belong in non-overlapping regions."
  ),
  q(
    "A population passes through a severe bottleneck, leaving only a few survivors. What is a likely long-term risk?",
    ["Increased genetic diversity.", "Reduced genetic variation and higher vulnerability to disease or environmental change.", "Immediate formation of all possible species.", "No inheritance in offspring."],
    1,
    "A bottleneck can remove alleles by chance. Low diversity reduces adaptive potential."
  ),
  q(
    "Why do scientists avoid defining species only by the ability to interbreed?",
    ["Interbreeding is never useful.", "Asexual organisms, fossils, hybrids, and geographically separated populations complicate the rule.", "All organisms interbreed with all others.", "Species are imaginary."],
    1,
    "The biological species concept is useful but limited. Other evidence is needed for many organisms and situations."
  ),
  q(
    "A conservation plan protects only one famous animal but not its habitat. What is the main weakness?",
    ["Habitat is unrelated to survival.", "The species depends on food webs, nesting sites, water, and interactions in the habitat.", "Famous species never need protection.", "Protecting land always harms biodiversity."],
    1,
    "Species conservation usually requires habitat conservation. Organisms depend on ecological networks, not isolated labels."
  ),
  q(
    "A phylogenetic tree shows species A and B sharing a recent common ancestor. Which conclusion is best?",
    ["A evolved from B directly.", "A and B are more closely related to each other than to species with older branching points.", "A and B must look identical.", "The tree shows which species is better."],
    1,
    "Phylogenetic trees show relationships through common ancestry. Sister groups share a more recent ancestor; one living species is not usually the direct ancestor of another."
  )
]);

topic("week-05-chemical-methods-and-bonds", "Week 05", "Chemicals, Separation Methods, and Bonds", [
  q(
    "A mixture contains sand, salt, and iron filings. Which sequence best separates all three?",
    ["Filter, then magnet, then evaporate.", "Use a magnet, add water and filter, then evaporate the filtrate.", "Evaporate first, then use a magnet, then filter.", "Heat until everything reacts."],
    1,
    "A magnet removes iron, water dissolves salt but not sand, filtration removes sand, and evaporation recovers salt."
  ),
  q(
    "Diamond and graphite are both carbon, but diamond is hard and graphite conducts electricity. What explains the difference?",
    ["Different isotopes only.", "Different arrangements and bonding of carbon atoms.", "Graphite contains no carbon.", "Diamond is a mixture."],
    1,
    "Allotropes are different structural forms of the same element. Bonding arrangement strongly affects properties."
  ),
  q(
    "A compound has high melting point, conducts when molten, and forms crystals. Which bonding is most likely?",
    ["Ionic bonding.", "Metallic bonding only.", "Covalent molecules with weak intermolecular forces.", "No bonding."],
    0,
    "Ionic compounds often have high melting points and conduct electricity when molten because ions can move."
  ),
  q(
    "Why can chromatography separate dyes in ink?",
    ["Different dyes have different attractions to the paper and solvent, so they move different distances.", "All dyes become elements.", "Paper turns dyes into gases.", "Only black substances move."],
    0,
    "Chromatography separates components by different solubilities and attractions to the stationary and mobile phases."
  ),
  q(
    "An isotope of chlorine has the same chemical behavior as another chlorine isotope but a different mass. Why?",
    ["It has a different number of protons.", "It has a different number of neutrons but the same electron arrangement.", "It has no electrons.", "It is a different element."],
    1,
    "Isotopes of an element have the same proton number and usually the same electron arrangement, so chemistry is similar. Neutron number changes mass."
  ),
  q(
    "A metal is mixed with a small amount of carbon to make steel. Why does this often improve strength?",
    ["Carbon atoms disrupt the regular metal layers, making sliding more difficult.", "Carbon removes all electrons.", "The mixture becomes pure iron.", "The alloy becomes a gas."],
    0,
    "Alloying changes the regular metal lattice. Distorted layers cannot slide as easily, increasing hardness or strength."
  ),
  q(
    "Which observation best indicates a pure substance rather than a mixture?",
    ["It has a sharp fixed melting point under the same pressure.", "It has a pleasant smell.", "It can be poured.", "It is found in a bottle."],
    0,
    "Pure substances have characteristic fixed melting or boiling points. Mixtures often melt or boil over a range."
  ),
  q(
    "A student tries to separate ethanol and water using filtration. Why will this fail?",
    ["Both are liquids that pass through the filter, so filtration cannot separate dissolved miscible liquids.", "Ethanol is magnetic.", "Water cannot flow.", "The mixture is an element."],
    0,
    "Filtration separates insoluble solids from fluids. Miscible liquids require methods such as fractional distillation."
  ),
  q(
    "Why do metals usually conduct electricity as solids?",
    ["Their atoms are fixed and cannot move.", "They contain mobile delocalized electrons.", "They contain only negative ions.", "Their nuclei flow through wires."],
    1,
    "Metallic bonding includes delocalized electrons that can move through the lattice and carry charge."
  ),
  q(
    "A molecular compound has low melting point and does not conduct electricity. What is the best explanation?",
    ["Strong covalent bonds are broken easily.", "Small molecules are held together by weak intermolecular forces and lack mobile charged particles.", "It must be an ionic solid.", "It contains only metals."],
    1,
    "Many simple molecular substances melt when intermolecular forces are overcome. They do not conduct because they lack mobile ions or electrons."
  )
]);

topic("week-06-periodic-table", "Week 06", "Periodic Table", [
  q(
    "An unknown element forms a +1 ion and reacts vigorously with water. Which periodic table group is most likely?",
    ["Noble gases.", "Alkali metals.", "Halogens.", "Transition metals only."],
    1,
    "Alkali metals have one valence electron, often form +1 ions, and can react strongly with water."
  ),
  q(
    "Why are noble gases generally unreactive?",
    ["They have full outer electron shells.", "They have no protons.", "They are all solids.", "They repel gravity."],
    0,
    "Full valence shells are stable, so noble gases have little tendency to gain, lose, or share electrons."
  ),
  q(
    "Across a period from left to right, atoms generally become less metallic. Which particle-level reason is most useful?",
    ["Outer electrons are held more strongly as nuclear charge increases across the period.", "Neutrons disappear.", "Atoms become mixtures.", "All elements become gases."],
    0,
    "Increasing nuclear charge across a period tends to attract valence electrons more strongly, reducing the tendency to lose them."
  ),
  q(
    "A semiconductor conducts better when heated, unlike a metal. Why is silicon useful in electronics?",
    ["Its conductivity can be controlled by impurities, temperature, and light.", "It is always a perfect insulator.", "It has no electrons.", "It reacts explosively with every gas."],
    0,
    "Semiconductors are valuable because their conductivity is tunable. Doping and external conditions control charge carriers."
  ),
  q(
    "Element X has atomic number 17. What can be inferred directly?",
    ["It has 17 protons.", "It has 17 neutrons in every isotope.", "It has mass number 17.", "It is always a metal."],
    0,
    "Atomic number equals proton number. Neutron number can vary among isotopes."
  ),
  q(
    "Two elements are in the same group. Why do they often have similar chemical properties?",
    ["They have the same number of electron shells.", "They have the same number of valence electrons.", "They have identical masses.", "They are always the same color."],
    1,
    "Valence electrons control many bonding and reaction patterns. Elements in a group share similar outer-shell arrangements."
  ),
  q(
    "Why is fluorine more reactive than iodine among the halogens?",
    ["Fluorine atoms gain electrons more strongly because the outer shell is closer to the nucleus.", "Fluorine has fewer protons than hydrogen.", "Iodine is not a halogen.", "Iodine cannot form ions."],
    0,
    "Halogens react by gaining electrons. Smaller fluorine atoms attract an incoming electron strongly."
  ),
  q(
    "A student predicts that magnesium forms Mg2+ rather than Mg+ because",
    ["it has two valence electrons and reaches a stable arrangement by losing both.", "it has two nuclei.", "it is a noble gas.", "it gains six protons."],
    0,
    "Magnesium is in Group 2 and tends to lose two valence electrons, forming a +2 ion with a stable outer shell."
  ),
  q(
    "Why are transition metals often useful as catalysts?",
    ["They can have variable oxidation states and provide surfaces for reactions.", "They never react with anything.", "They are all liquids at room temperature.", "They have no d electrons."],
    0,
    "Variable electron arrangements and surface adsorption can help transition metals lower activation energy in reactions."
  ),
  q(
    "Which comparison best uses the periodic table for prediction?",
    ["Sodium and potassium both react with water because they are in Group 1.", "Carbon and neon react the same because both have symbols.", "Chlorine and argon form the same ions because they are beside each other.", "All elements in one period have identical properties."],
    0,
    "Group membership is a strong predictor of similar valence behavior. Period neighbors can be very different."
  )
]);

topic("week-07-ecology", "Week 07", "Ecology", [
  q(
    "If a pesticide removes many insects from a field, which effect is most likely to spread through the food web?",
    ["Only insects change; predators and plants cannot be affected.", "Insect-eating birds may decline and some plants may increase or decrease depending on pollination and herbivory.", "All species increase equally.", "Energy flow stops obeying conservation laws."],
    1,
    "Food webs are connected. Removing insects can affect predators, pollination, plant damage, and competition."
  ),
  q(
    "Why is energy transfer between trophic levels inefficient?",
    ["Organisms use energy for respiration, movement, heat loss, and waste, so only part becomes biomass for consumers.", "Energy is destroyed by eating.", "Producers do not store energy.", "Consumers create sunlight."],
    0,
    "Energy is conserved but dispersed through life processes. Only a fraction of consumed energy becomes new biomass."
  ),
  q(
    "A predator population rises after prey becomes abundant, then later the prey population falls. What does this suggest?",
    ["Predator and prey populations can show delayed linked cycles.", "Predators never depend on prey.", "Prey choose to disappear.", "Ecosystems contain no feedback."],
    0,
    "Predator-prey interactions often involve time lags. More prey can support more predators, which can later reduce prey."
  ),
  q(
    "Why can an invasive species grow rapidly in a new habitat?",
    ["It may lack natural predators or competitors and find unused resources.", "It always photosynthesizes faster than native plants.", "It is not affected by carrying capacity.", "It has no genes."],
    0,
    "Invasive species can escape controls from their original ecosystem. They still face limits, but may initially grow quickly."
  ),
  q(
    "A lichen can be used as an air-pollution indicator because it absorbs substances from air and has different tolerance levels. What ecological idea is being applied?",
    ["Bioindicators reveal environmental conditions through organism presence or health.", "All organisms prefer pollution.", "Lichens are machines.", "Pollution cannot affect living things."],
    0,
    "Bioindicator species respond detectably to environmental conditions. Their distribution can give evidence about pollution."
  ),
  q(
    "A pond receives excess fertilizer and algae bloom. Later, fish die. Which sequence is most plausible?",
    ["Algae bloom, decomposers increase, dissolved oxygen falls, fish suffocate.", "Fertilizer removes all water.", "Fish turn into algae.", "Oxygen becomes a solid."],
    0,
    "Eutrophication often causes algal growth followed by decomposition that consumes oxygen, stressing fish."
  ),
  q(
    "What is the best example of a population?",
    ["All organisms in a forest.", "All frogs of the same species in one pond.", "One frog and one dragonfly.", "All habitats on Earth."],
    1,
    "A population is members of the same species living in the same area. A community includes multiple species."
  ),
  q(
    "Which adaptation best fits a desert plant and why?",
    ["Broad thin leaves to lose water rapidly.", "Thick waxy cuticle and reduced leaves to reduce water loss.", "No roots, because water is absent.", "Bright flowers guarantee survival without pollinators."],
    1,
    "Desert plants often conserve water using waxy surfaces, reduced leaf area, water storage, or deep roots."
  ),
  q(
    "A food web is more realistic than a food chain because",
    ["organisms often have multiple food sources and predators.", "energy moves backward from decomposers to the Sun.", "only one species eats in real ecosystems.", "food chains are never useful."],
    0,
    "Food webs show multiple feeding relationships. Food chains simplify the system for study."
  ),
  q(
    "Why can decomposers be considered essential even though they are often left out of simple food chains?",
    ["They recycle nutrients from dead material back into the ecosystem.", "They create new atoms from nothing.", "They are always top predators.", "They remove the need for producers."],
    0,
    "Decomposers break down dead organisms and waste, returning nutrients for producers and maintaining material cycles."
  )
]);

topic("week-08-chemical-reactions", "Week 08", "Chemical Reactions", [
  q(
    "A student adds magnesium to acid and observes bubbles. Which test best supports that the gas is hydrogen?",
    ["A glowing splint relights.", "A lighted splint gives a squeaky pop.", "Limewater turns milky.", "Blue litmus turns red."],
    1,
    "Hydrogen burns with a squeaky pop. Oxygen relights a glowing splint, and carbon dioxide turns limewater milky."
  ),
  q(
    "Why must chemical equations be balanced?",
    ["Atoms are conserved in ordinary chemical reactions.", "Products should always have larger numbers.", "Reactants disappear completely from the universe.", "Balanced equations are shorter."],
    0,
    "Balancing reflects conservation of atoms. Chemical reactions rearrange atoms; they do not create or destroy them."
  ),
  q(
    "A metal carbonate reacts with acid. Which products are expected?",
    ["Salt, water, and carbon dioxide.", "Only hydrogen and oxygen.", "Metal, oxygen, and nitrogen.", "A polymer and ethanol."],
    0,
    "Acid plus carbonate typically forms a salt, water, and carbon dioxide. CO2 can be tested with limewater."
  ),
  q(
    "Iron rusts faster in salty water than in dry air. Which explanation is best?",
    ["Water and ions help electrochemical oxidation of iron.", "Salt changes iron into plastic.", "Dry air contains no atoms.", "Rusting does not involve oxygen."],
    0,
    "Rusting is an oxidation process needing oxygen and water. Dissolved ions improve electrical conduction and can speed corrosion."
  ),
  q(
    "In a redox reaction, one substance loses electrons. What must happen to another substance?",
    ["It must gain electrons.", "It must lose protons.", "It must become a gas.", "It must stop existing."],
    0,
    "Oxidation and reduction occur together. Electrons lost by one species are gained by another."
  ),
  q(
    "A reaction rate increases when powdered calcium carbonate is used instead of chips. Why?",
    ["Powder has greater surface area for collisions with acid.", "Powder has no mass.", "Chips are elements but powder is a compound.", "The acid becomes neutral before contact."],
    0,
    "Greater surface area exposes more particles to reactant collisions, increasing reaction rate."
  ),
  q(
    "Which pH change best shows neutralization when acid is added to alkali?",
    ["pH moves from 12 toward 7.", "pH moves from 7 to 14 only.", "pH stays at 1 forever.", "pH has no relation to acidity."],
    0,
    "Neutralization reduces excess alkali as H+ and OH- form water. The pH moves toward neutral if amounts are appropriate."
  ),
  q(
    "A catalyst speeds a reaction but is recovered unchanged at the end. What does it change?",
    ["The activation energy pathway.", "The total number of atoms.", "The identity of all products in every case.", "The law of conservation of mass."],
    0,
    "Catalysts provide an alternative pathway with lower activation energy. They are not consumed in the overall reaction."
  ),
  q(
    "A hydrocarbon burns completely in excess oxygen. Which products should form?",
    ["Carbon dioxide and water.", "Carbon monoxide only.", "Hydrogen and chlorine.", "Salt and nitrogen."],
    0,
    "Complete combustion of hydrocarbons produces CO2 and H2O. Limited oxygen can produce carbon monoxide or soot."
  ),
  q(
    "A student says increasing temperature always increases product yield. What is the better statement?",
    ["Temperature often increases rate, but equilibrium yield may increase or decrease depending on reaction energetics.", "Temperature never affects reactions.", "Yield and rate are identical.", "Heating removes the need for reactants."],
    0,
    "Higher temperature usually increases rate, but yield in reversible reactions depends on thermodynamics and equilibrium shifts."
  )
]);

topic("week-09-human-digestive-system", "Week 09", "Human Digestive System", [
  q(
    "A person eats rice, fish, and oil. Which statement best matches digestion and absorption?",
    ["All nutrients are absorbed unchanged in the stomach.", "Starch, protein, and fat are digested into smaller molecules before most absorption in the small intestine.", "Only water is absorbed by the small intestine.", "Digestion is complete only after egestion."],
    1,
    "Large food molecules must be hydrolyzed into smaller soluble molecules. Most nutrient absorption occurs through the small intestine."
  ),
  q(
    "Why does the small intestine have villi and microvilli?",
    ["To reduce surface area so absorption is slower.", "To increase surface area and shorten diffusion distance for absorption.", "To grind food mechanically.", "To make bile."],
    1,
    "Villi and microvilli increase absorptive surface. Thin walls and rich blood supply support rapid transport."
  ),
  q(
    "A patient has blocked bile ducts. Which digestion problem is most likely?",
    ["Reduced fat emulsification and slower lipase action.", "No starch digestion in the mouth.", "No protein digestion anywhere.", "Too much oxygen absorbed by villi."],
    0,
    "Bile emulsifies fats, increasing surface area for lipase. Without bile flow, fat digestion and absorption are impaired."
  ),
  q(
    "Why is the stomach acidic?",
    ["Acid denatures amylase only and has no other role.", "Acid helps activate pepsin and kills many microorganisms.", "Acid digests cellulose completely.", "Acid changes fats into glucose."],
    1,
    "Stomach acid creates conditions for pepsin activity and helps reduce pathogens. It does not directly convert fat to glucose."
  ),
  q(
    "A food test with iodine stays brown. What does that imply?",
    ["Starch was not detected.", "Protein was not detected.", "Glucose was definitely high.", "Fat was definitely present."],
    0,
    "Iodine turns blue-black with starch. If it remains brown, starch is absent or below detectable levels."
  ),
  q(
    "Which change would most likely reduce the rate of enzyme digestion in the small intestine?",
    ["Keeping temperature near body temperature.", "Changing pH far from the enzyme's optimum.", "Increasing substrate until active sites are usually occupied.", "Mixing food with intestinal fluid."],
    1,
    "Enzymes depend on shape and charge at the active site. Extreme pH can reduce activity or denature the protein."
  ),
  q(
    "Why is assimilation different from absorption?",
    ["Absorption moves digested molecules into blood or lymph; assimilation uses them in cells and tissues.", "Assimilation happens only in the mouth.", "Absorption means removing feces.", "They are exactly identical terms."],
    0,
    "Absorption is transport across the gut wall. Assimilation is incorporation or use of nutrients after transport."
  ),
  q(
    "A person has severe diarrhea. Which immediate risk connects digestion to homeostasis?",
    ["Loss of water and ions can disturb blood volume and nerve or muscle function.", "The lungs stop exchanging gases.", "Bones stop containing calcium instantly.", "All enzymes become DNA."],
    0,
    "Diarrhea can cause dehydration and electrolyte imbalance. This affects circulation, cells, nerves, and muscles."
  ),
  q(
    "A protease breaks protein into amino acids. What makes the enzyme specific?",
    ["The active site shape and chemical properties fit particular substrates.", "The enzyme is used up after one reaction.", "The enzyme chooses substrates consciously.", "All enzymes have identical active sites."],
    0,
    "Enzyme specificity comes from the active site's shape and interactions with the substrate."
  ),
  q(
    "Why can humans get energy from starch but not from cellulose, even though both are glucose polymers?",
    ["Humans have enzymes for starch bonds but not cellulase for cellulose bonds.", "Cellulose contains no atoms.", "Starch is always an element.", "Cellulose is absorbed in the stomach unchanged."],
    0,
    "Different bonds require different enzymes. Humans digest starch with amylase but lack cellulase for cellulose."
  )
]);

topic("week-10-heat-and-thermodynamics", "Week 10", "Heat and Thermodynamics", [
  q(
    "A metal spoon feels colder than a wooden spoon at the same room temperature. Why?",
    ["The metal is actually at a lower temperature.", "Metal conducts heat away from skin faster than wood.", "Wood contains no particles.", "Temperature cannot be measured in solids."],
    1,
    "Both spoons can be at room temperature. Metal has higher thermal conductivity, so heat leaves skin faster."
  ),
  q(
    "A sea breeze blows from sea to land during the day. Which explanation is best?",
    ["Land heats faster, warm air over land rises, and cooler air from the sea moves in.", "Sea water has no heat capacity.", "Air moves only because of tides.", "The Sun pulls air sideways."],
    0,
    "Different heating rates create pressure differences. Warmer rising air over land draws cooler sea air inland."
  ),
  q(
    "Why does sweating cool the body most effectively when sweat evaporates?",
    ["Evaporation removes high-energy molecules from the skin surface.", "Sweat becomes colder because it gains mass.", "Evaporation creates new cold particles.", "Sweat cools only if it stays on the skin forever."],
    0,
    "Evaporation requires energy. Faster molecules escape, carrying thermal energy away from the skin."
  ),
  q(
    "A cup of hot tea cools faster when stirred. Which process is increased?",
    ["Convection and mixing that bring warmer liquid to the surface.", "Nuclear fission.", "Freezing point depression only.", "Photosynthesis."],
    0,
    "Stirring mixes the liquid and renews warm fluid at surfaces, increasing heat transfer to the surroundings."
  ),
  q(
    "Why is water useful for moderating climate near coasts?",
    ["It has a relatively high specific heat capacity, so it warms and cools slowly.", "It has no thermal energy.", "It boils at room temperature.", "It blocks all sunlight."],
    0,
    "Water stores much energy per degree of temperature change. This reduces temperature swings near large bodies of water."
  ),
  q(
    "During melting, a solid absorbs heat but temperature remains constant. Where does the energy go?",
    ["Into weakening or overcoming forces between particles rather than increasing average kinetic energy.", "Into destroying atoms.", "Into lowering particle motion to zero.", "Into making the thermometer stop working."],
    0,
    "Latent heat changes particle arrangement and potential energy. Temperature stays constant because average kinetic energy does not rise during the phase change."
  ),
  q(
    "A vacuum flask has silvered walls and a vacuum gap. Which heat-transfer paths are reduced?",
    ["Radiation by reflection and conduction/convection by the vacuum.", "Only evaporation.", "Only chemical reaction.", "Only gravity."],
    0,
    "Silvered walls reduce radiation. A vacuum reduces conduction and convection because few particles are present."
  ),
  q(
    "Why does black asphalt become hotter than light concrete in sunlight?",
    ["Black surfaces absorb more visible radiation and convert more of it to thermal energy.", "Black surfaces have more mass always.", "Light concrete creates coldness.", "Color has no effect on radiation."],
    0,
    "Dark surfaces tend to absorb more radiation, while lighter surfaces reflect more. Absorbed radiation raises thermal energy."
  ),
  q(
    "A gas in a sealed rigid can is heated. What happens to pressure and why?",
    ["Pressure increases because particles move faster and collide harder with the walls.", "Pressure decreases because particles shrink.", "Pressure stays zero because gases have no mass.", "Pressure turns into temperature."],
    0,
    "Heating raises average kinetic energy. In a fixed volume, faster particles cause more forceful collisions, increasing pressure."
  ),
  q(
    "Why can adding salt to icy roads help melt ice near 0 degrees C?",
    ["Dissolved salt lowers the freezing point of water.", "Salt releases sunlight.", "Salt changes water into an element.", "Salt makes ice hotter than fire."],
    0,
    "Solutes can depress freezing point, so the ice-water mixture can remain liquid at temperatures where pure water would freeze."
  )
]);

topic("week-11-human-circulatory-system", "Week 11", "Human Circulatory System", [
  q(
    "Why does the left ventricle have a thicker muscular wall than the right ventricle?",
    ["It pumps blood to the whole body at higher pressure.", "It contains only deoxygenated blood.", "It digests proteins.", "It stores urine."],
    0,
    "The left ventricle drives systemic circulation, which requires higher pressure than the shorter pulmonary circuit."
  ),
  q(
    "A blocked coronary artery can damage heart muscle. Why?",
    ["Heart muscle needs its own oxygen and glucose supply from coronary vessels.", "The heart does not use respiration.", "Coronary arteries only carry air.", "Blocked vessels make blood blue."],
    0,
    "Cardiac muscle cells respire continuously. Reduced coronary blood flow can cause oxygen shortage and tissue damage."
  ),
  q(
    "Which blood vessel feature best matches capillary function?",
    ["One-cell-thick walls for short diffusion distance.", "Very thick elastic walls to withstand highest pressure.", "Valves every few millimeters.", "No contact with tissues."],
    0,
    "Capillaries exchange substances with cells, so thin walls and large networks support diffusion."
  ),
  q(
    "Why do veins often contain valves?",
    ["To prevent backflow of low-pressure blood returning to the heart.", "To add oxygen to blood.", "To digest old red blood cells.", "To make blood flow away from the heart faster than arteries."],
    0,
    "Venous blood pressure is low, especially in limbs. Valves help maintain one-way flow back to the heart."
  ),
  q(
    "A person's red blood cell count is very low. Which symptom is most directly expected?",
    ["Fatigue due to reduced oxygen transport.", "Higher starch digestion.", "Immediate blindness from no lens.", "More bile production."],
    0,
    "Red blood cells carry oxygen using hemoglobin. Low red cell count can reduce aerobic respiration in tissues."
  ),
  q(
    "Why is double circulation useful in mammals?",
    ["It separates pulmonary and systemic circuits, allowing oxygenated blood to reach the body at high pressure.", "It mixes all blood completely before leaving the heart.", "It eliminates the need for lungs.", "It makes blood flow only once through the heart."],
    0,
    "Double circulation sends blood through heart-lung-heart-body pathways. This supports efficient oxygenation and high systemic pressure."
  ),
  q(
    "A person stands still for a long time and feels faint. Which circulatory factor contributes?",
    ["Less muscle contraction reduces venous return from the legs, lowering blood flow to the brain.", "Standing stops the heart from beating.", "Blood becomes a gas.", "Arteries close permanently."],
    0,
    "Leg muscle contractions help push venous blood upward. Without movement, pooling can reduce return and blood pressure."
  ),
  q(
    "What is the best reason blood pressure is higher in arteries than veins?",
    ["Arteries receive blood directly from ventricular contraction.", "Veins contain more oxygen always.", "Arteries have no walls.", "Veins carry no blood."],
    0,
    "Arterial pressure reflects force from the heart's pumping. Pressure drops as blood passes through the circulation."
  ),
  q(
    "Why can carbon monoxide poisoning be dangerous even when air contains oxygen?",
    ["Carbon monoxide binds hemoglobin strongly, reducing oxygen transport.", "It makes lungs bigger.", "It turns oxygen into glucose.", "It blocks bile ducts only."],
    0,
    "Carbon monoxide competes with oxygen for hemoglobin and binds strongly. Tissues may become oxygen-starved."
  ),
  q(
    "A wound becomes red, warm, and swollen. Which circulatory process is involved?",
    ["Increased blood flow and immune-cell movement during inflammation.", "Complete loss of capillaries.", "Photosynthesis in skin.", "Conversion of blood to lymph only."],
    0,
    "Inflammation includes vasodilation and increased permeability, allowing immune responses but causing redness, heat, and swelling."
  )
]);

topic("week-12-respiration-and-excretion", "Week 12", "Respiration and Excretion", [
  q(
    "During vigorous exercise, breathing rate and heart rate both increase. What shared need explains this?",
    ["Muscles need more oxygen and glucose delivery and faster carbon dioxide removal.", "Muscles stop respiring.", "The kidneys stop filtering forever.", "The lungs digest lactic acid directly."],
    0,
    "Exercise increases cellular respiration demand. Circulation and ventilation rise to supply reactants and remove wastes."
  ),
  q(
    "Why do alveoli have many tiny air sacs instead of one large sac?",
    ["They provide large surface area and short diffusion distance for gas exchange.", "They store food.", "They prevent all water loss.", "They create blood cells."],
    0,
    "Many alveoli maximize surface area. Thin moist walls and capillaries support rapid oxygen and carbon dioxide diffusion."
  ),
  q(
    "A person has emphysema, which destroys alveolar walls. Which effect is most likely?",
    ["Reduced gas exchange surface area and poorer oxygen uptake.", "Improved oxygen diffusion.", "More digestive enzymes in lungs.", "No effect because only volume matters."],
    0,
    "Damaged alveoli reduce surface area and elastic function, making gas exchange less efficient."
  ),
  q(
    "Which statement best connects cellular respiration and breathing?",
    ["Breathing brings oxygen for cellular respiration and removes carbon dioxide produced by cells.", "Breathing is the same chemical reaction as respiration.", "Respiration happens only in the lungs.", "Cells inhale air directly."],
    0,
    "Breathing is ventilation. Cellular respiration is a biochemical process in cells that uses oxygen to release energy from food."
  ),
  q(
    "Why does the body excrete urea?",
    ["Urea is a nitrogenous waste from amino acid breakdown and can be toxic if accumulated.", "Urea is the main oxygen carrier.", "Urea digests fats.", "Urea stores genetic information."],
    0,
    "Excess amino acids are deaminated, producing nitrogen waste converted to urea. Kidneys remove it from blood."
  ),
  q(
    "A kidney tubule reabsorbs glucose from filtrate into blood. Why is this important?",
    ["Glucose is useful fuel and should not normally be lost in urine.", "Glucose is a toxic waste in all amounts.", "Glucose cannot dissolve in blood.", "Reabsorption creates red blood cells."],
    0,
    "Filtration is not perfectly selective, so useful small molecules are reabsorbed. Glucose is normally conserved."
  ),
  q(
    "Why does urine become more concentrated when a person is dehydrated?",
    ["More water is reabsorbed into blood under hormonal control.", "The kidney creates extra atoms of salt.", "The bladder digests water.", "All urea disappears."],
    0,
    "Antidiuretic hormone increases water reabsorption in kidney tubules and collecting ducts, conserving water."
  ),
  q(
    "A dialysis machine removes urea but keeps most blood cells and proteins in the blood. Which principle is used?",
    ["Selective diffusion across a partially permeable membrane.", "Photosynthesis.", "Magnetic attraction of oxygen.", "Evaporation of red blood cells."],
    0,
    "Dialysis uses membranes that let small wastes diffuse while retaining larger cells and proteins."
  ),
  q(
    "Why does carbon dioxide diffuse from blood into alveoli?",
    ["Its concentration is higher in deoxygenated blood than in alveolar air.", "It is pulled by gravity only.", "It is too large to cross membranes.", "It becomes oxygen at the membrane."],
    0,
    "Diffusion follows concentration gradients. Cells produce CO2, raising its concentration in blood arriving at the lungs."
  ),
  q(
    "A smoker has damaged cilia in the airways. What is a likely consequence?",
    ["Mucus and trapped particles are cleared less effectively, increasing infection risk.", "More oxygen is made in the trachea.", "The diaphragm stops being a muscle.", "Food moves into the stomach faster."],
    0,
    "Cilia normally move mucus and trapped particles away from lungs. Damage reduces airway cleaning."
  )
]);

topic("week-13-cell-biology", "Week 13", "Cell Biology", [
  q(
    "A cell has a nucleus, mitochondria, chloroplasts, a cell wall, and a large vacuole. What is it most likely?",
    ["A plant cell.", "An animal muscle cell.", "A bacterial cell.", "A virus."],
    0,
    "Chloroplasts, a cellulose cell wall, and a large central vacuole are typical plant-cell features."
  ),
  q(
    "Why do active cells often contain many mitochondria?",
    ["They need high ATP production from aerobic respiration.", "Mitochondria store all genetic traits in humans.", "Mitochondria make the cell wall.", "Mitochondria are air sacs."],
    0,
    "Mitochondria are major sites of aerobic respiration. Cells with high energy demand often have many."
  ),
  q(
    "A red blood cell lacks a nucleus when mature. How does this support its function?",
    ["It creates more space for hemoglobin and helps flexibility.", "It lets the cell divide faster in blood.", "It makes the cell photosynthesize.", "It gives the cell a cell wall."],
    0,
    "Mature mammalian red blood cells sacrifice nucleus and organelles to carry more hemoglobin and squeeze through capillaries."
  ),
  q(
    "Why are stem cells important in development and medicine?",
    ["They can divide and differentiate into specialized cell types.", "They are dead cells used for support.", "They contain no DNA.", "They can only become one exact cell type in all cases."],
    0,
    "Stem cells combine self-renewal with differentiation potential. Different stem-cell types vary in potency."
  ),
  q(
    "A bacterial cell and an animal cell both have which structure?",
    ["Cell membrane.", "Nucleus.", "Chloroplast.", "Large central vacuole."],
    0,
    "All cells have a membrane. Bacteria lack a nucleus and membrane-bound organelles."
  ),
  q(
    "Why does a root hair cell have a long projection?",
    ["It increases surface area for water and mineral absorption.", "It stores light for photosynthesis underground.", "It pumps blood.", "It protects the nucleus from oxygen."],
    0,
    "Root hairs increase contact with soil solution, improving uptake of water and dissolved ions."
  ),
  q(
    "A cell placed in very dilute water swells. Which process explains the water movement?",
    ["Osmosis into the cell down a water potential gradient.", "Active transport of starch.", "Diffusion of DNA outward.", "Combustion."],
    0,
    "Osmosis is water movement across a partially permeable membrane from higher to lower water potential."
  ),
  q(
    "Why are enzymes inside lysosomes useful but potentially dangerous if released into the cytoplasm?",
    ["They digest biological molecules and could damage cell components.", "They produce sunlight.", "They are made of glass.", "They stop all diffusion."],
    0,
    "Lysosomal enzymes break down macromolecules. If uncontrolled, they can damage the cell's own structures."
  ),
  q(
    "A microscope image shows cells with no visible nucleus but with circular DNA. Which group fits best?",
    ["Prokaryotes.", "Fungi only.", "Animal nerve cells.", "Plant leaf cells."],
    0,
    "Prokaryotes lack a membrane-bound nucleus and often have circular DNA in the cytoplasm."
  ),
  q(
    "Which argument best explains why cell specialization improves multicellular life?",
    ["Different cells can optimize structures for different functions, increasing overall efficiency.", "Every cell becomes identical.", "Specialization removes the need for communication.", "Specialized cells contain no proteins."],
    0,
    "Division of labor allows tissues and organs to perform complex tasks more efficiently than identical cells could."
  )
]);

topic("week-14-light-shadow-and-sound", "Week 14", "Light, Shadow, and Sound", [
  q(
    "A pencil appears bent in water. Which explanation is best?",
    ["Light refracts because it changes speed when passing between air and water.", "The pencil physically breaks at the surface.", "Water emits black light.", "Sound waves push the image."],
    0,
    "Refraction occurs when light changes speed at a boundary, bending the ray and shifting the apparent position."
  ),
  q(
    "Why can sound not travel through a vacuum while light can?",
    ["Sound needs particles to vibrate, but light is an electromagnetic wave.", "Light needs air but sound does not.", "Sound is faster than all waves.", "Vacuum contains too many particles."],
    0,
    "Sound is mechanical and requires a medium. Light can propagate through empty space as electromagnetic radiation."
  ),
  q(
    "A student sees lightning before hearing thunder. What does this show?",
    ["Light travels much faster than sound in air.", "Thunder is created before lightning.", "Sound cannot reflect.", "Lightning is silent."],
    0,
    "Both events occur nearly together, but light reaches the observer much sooner because its speed is far greater."
  ),
  q(
    "A shadow becomes larger when an object moves closer to a lamp. Why?",
    ["The object blocks a wider cone of light reaching the screen.", "The object gains mass.", "The lamp becomes dimmer automatically.", "Light bends around the object completely."],
    0,
    "With a nearby light source, geometry matters. Closer objects intercept a larger angular spread of rays."
  ),
  q(
    "Which change increases pitch of a sound from a vibrating string?",
    ["Increasing vibration frequency.", "Increasing amplitude only.", "Making the room darker.", "Reflecting the sound once."],
    0,
    "Pitch depends mainly on frequency. Amplitude affects loudness."
  ),
  q(
    "Why does a mirror form a clear image while a rough wall does not?",
    ["A smooth mirror gives regular reflection; a rough wall scatters light diffusely.", "Walls absorb all atoms.", "Mirrors slow light to zero.", "Rough walls produce sound instead of light."],
    0,
    "Specular reflection preserves ray order and forms images. Diffuse reflection scatters rays in many directions."
  ),
  q(
    "A convex mirror is used at a road bend. What is the main advantage?",
    ["It gives a wider field of view, although images are smaller.", "It always magnifies distant cars.", "It blocks glare by absorbing all light.", "It shows only objects behind the mirror."],
    0,
    "Convex mirrors diverge reflected rays, allowing drivers to see a wider area. Images are reduced and virtual."
  ),
  q(
    "Why does a red apple look red under white light?",
    ["It reflects mostly red wavelengths and absorbs many others.", "It emits only X-rays.", "It turns all light into sound.", "It has no interaction with light."],
    0,
    "Object color depends on wavelengths reflected to the eye. White light contains many wavelengths."
  ),
  q(
    "A sound gets quieter as distance increases mainly because",
    ["the wave energy spreads over a larger area and some energy is absorbed.", "frequency always becomes zero.", "air stops containing particles after one meter.", "sound changes into visible light."],
    0,
    "Sound intensity decreases as energy spreads out and is absorbed by the medium and surfaces."
  ),
  q(
    "Which observation best supports that light travels in straight lines in a uniform medium?",
    ["Sharp shadows form when an opaque object blocks a small light source.", "Echoes occur in a hall.", "Hot air rises above a candle.", "Salt dissolves in water."],
    0,
    "Sharp shadows are explained by rectilinear propagation of light. Sound echoes and convection are different phenomena."
  )
]);

topic("week-15-reproductive-system", "Week 15", "Reproductive System", [
  q(
    "Why does sexual reproduction usually produce more genetic variation than asexual reproduction?",
    ["It combines genetic material from two parents and involves meiosis.", "It always creates identical clones.", "It uses no DNA.", "It prevents mutation."],
    0,
    "Meiosis reshuffles alleles and fertilization combines two gametes. This increases variation among offspring."
  ),
  q(
    "A plant can reproduce by runners and by seeds. What is an advantage of runners?",
    ["Rapid production of genetically similar offspring in a suitable environment.", "Maximum genetic variation every time.", "No need for cell division.", "Offspring can never compete with the parent."],
    0,
    "Asexual reproduction can quickly copy successful genotypes where conditions are stable, but it reduces variation."
  ),
  q(
    "Why are gametes haploid?",
    ["So fertilization restores the diploid chromosome number instead of doubling it each generation.", "So they contain no genes.", "So they are larger than all body cells.", "So mitosis cannot occur in organisms."],
    0,
    "Meiosis halves chromosome number. Fusion of two haploid gametes restores the species' diploid number."
  ),
  q(
    "Identical twins form when",
    ["one fertilized egg splits into two embryos.", "two different eggs are fertilized by two sperm.", "two adults have identical diets.", "one sperm fertilizes two unrelated eggs."],
    0,
    "Identical twins come from the same zygote splitting early, so they have nearly identical nuclear DNA."
  ),
  q(
    "Why is the placenta important in human development?",
    ["It allows exchange of gases, nutrients, and wastes between mother and fetus without direct mixing of most blood.", "It makes sperm.", "It stores bile.", "It pumps air into fetal lungs."],
    0,
    "The placenta supports exchange and hormone production while maintaining a barrier between maternal and fetal circulation."
  ),
  q(
    "A menstrual cycle becomes irregular under severe stress or poor nutrition. What does this show?",
    ["Reproduction is influenced by hormonal and body-condition signals.", "Egg cells have disappeared permanently in all cases.", "The digestive system controls no nutrients.", "Hormones are unrelated to reproduction."],
    0,
    "Reproductive cycles depend on hormone regulation and energy status. The body can alter reproductive timing under stress."
  ),
  q(
    "Why do flowering plants often attract pollinators with color or scent?",
    ["To increase the chance of pollen transfer between flowers.", "To perform photosynthesis in petals only.", "To keep all pollen inside one flower forever.", "To turn nectar into seeds directly."],
    0,
    "Animal pollinators can carry pollen to stigmas. Floral signals and rewards improve transfer success."
  ),
  q(
    "What is a key disadvantage of asexual reproduction in a changing environment?",
    ["Low genetic variation can make a population vulnerable to new diseases or conditions.", "It always requires two mates.", "It cannot produce many offspring.", "It uses more energy than all sexual reproduction."],
    0,
    "Clonal populations may perform well in stable environments but can lack variation needed for adaptation to change."
  ),
  q(
    "Why does puberty involve changes in many organs, not only reproductive organs?",
    ["Sex hormones circulate in blood and affect growth, body composition, skin, hair, and behavior.", "Hormones act only where they are made.", "All organs become gametes.", "Puberty is unrelated to endocrine signals."],
    0,
    "Hormones travel through the bloodstream and act on target tissues across the body."
  ),
  q(
    "A mutation occurs in a skin cell. Why is it usually not passed to offspring?",
    ["Only mutations in cells that form gametes can be inherited by offspring.", "Skin cells have no DNA.", "All mutations are passed to offspring.", "Skin cells immediately become sperm or eggs."],
    0,
    "Somatic mutations affect the individual tissue lineage. Heritable mutations must be present in germ-line cells or gametes."
  )
]);

topic("week-16-senses", "Week 16", "Senses", [
  q(
    "A person touches a hot pan and withdraws the hand before feeling conscious pain. What explains the quick response?",
    ["A reflex arc through the spinal cord produces rapid action before full conscious processing.", "The brain is not involved in any later feeling.", "Heat travels through nerves as fire.", "Muscles decide independently without nerves."],
    0,
    "Reflex pathways reduce response time by routing signals through the spinal cord, while the brain receives information for conscious awareness."
  ),
  q(
    "Why does the pupil become smaller in bright light?",
    ["To reduce light entering the eye and protect the retina from excessive stimulation.", "To focus sound waves.", "To increase blood pressure.", "To make the lens disappear."],
    0,
    "Iris muscles adjust pupil size. Constriction limits incoming light and helps maintain suitable retinal stimulation."
  ),
  q(
    "A person cannot focus clearly on near objects because the lens has become less flexible. Which condition is most related?",
    ["Presbyopia.", "Color blindness only.", "Deafness.", "Osmosis."],
    0,
    "Near focusing requires lens shape change. With age, reduced lens flexibility causes presbyopia."
  ),
  q(
    "Why is the retina rich in photoreceptors?",
    ["It converts light stimuli into nerve impulses.", "It pumps blood to the lungs.", "It digests proteins.", "It bends the eyeball mechanically."],
    0,
    "Rods and cones detect light and initiate electrical signals that travel through neurons to the brain."
  ),
  q(
    "A loud sound damages hair cells in the cochlea. Why can hearing loss be permanent?",
    ["Mammalian cochlear hair cells have limited ability to regenerate.", "Sound destroys the outer ear shape only.", "Hair cells are not involved in hearing.", "The eardrum always regrows all inner structures."],
    0,
    "Hair cells transduce vibrations into nerve signals. In humans, severe hair-cell damage is often irreversible."
  ),
  q(
    "Why can humans detect smell only when molecules reach receptors in the nose?",
    ["Smell depends on chemical molecules binding to receptor proteins.", "Smell is a form of X-ray vision.", "The nose detects only pressure, not chemicals.", "Odor molecules must become light first."],
    0,
    "Olfaction is chemical sensing. Volatile molecules bind receptor proteins and trigger nerve signals."
  ),
  q(
    "Which statement best explains sensory adaptation?",
    ["Receptors or neural pathways may reduce response to a constant stimulus over time.", "The stimulus disappears from the universe.", "All receptors die after one use.", "Adaptation means no stimulus was present."],
    0,
    "Constant stimuli may produce decreasing signal intensity, helping the nervous system notice changes."
  ),
  q(
    "A drug slows synaptic transmission. Which process is most directly affected?",
    ["Communication between neurons through neurotransmitters.", "Light entering the cornea.", "Bone growth only.", "Filtration in kidney capsules only."],
    0,
    "Signals often cross synapses by chemical neurotransmitters. Slower synaptic action can delay neural processing."
  ),
  q(
    "Why do the two eyes help judge distance?",
    ["The brain compares slightly different images from each eye to estimate depth.", "Each eye sees a different color universe.", "One eye measures sound while the other measures light.", "Depth perception requires no brain processing."],
    0,
    "Binocular vision gives two viewpoints. The brain uses disparity between images to infer distance."
  ),
  q(
    "A person with a damaged sensory neuron can still move muscles voluntarily but cannot feel touch in one area. What does this imply?",
    ["Motor pathways may work while sensory input from that region is impaired.", "All neurons have the same function.", "Muscles create touch signals.", "The skin contains no receptors."],
    0,
    "Sensory and motor pathways have different roles. Damage can affect input while output remains partly functional."
  )
]);

topic("week-17-change-of-state-and-water-cycle", "Week 17", "Change of State and Water Cycle", [
  q(
    "A wet shirt dries faster on a windy day. Which explanation is best?",
    ["Wind removes humid air near the fabric, maintaining a steep evaporation gradient.", "Wind changes water into hydrogen.", "Wind lowers all temperatures to freezing.", "Wind creates new water molecules."],
    0,
    "Evaporation is faster when water vapor near the surface is removed. This keeps the air unsaturated and supports continued escape of molecules."
  ),
  q(
    "Why does water have an unusually high specific heat capacity compared with many liquids?",
    ["Hydrogen bonding between water molecules absorbs energy during temperature change.", "Water has no intermolecular forces.", "Water molecules contain metal atoms.", "Water cannot store thermal energy."],
    0,
    "Hydrogen bonds require energy to disrupt, so water temperature changes relatively slowly for a given energy input."
  ),
  q(
    "Clouds form when moist air rises. Which sequence is most accurate?",
    ["Air rises, expands, cools, water vapor condenses on particles.", "Air rises, heats to plasma, becomes salt.", "Water vapor freezes only at 100 degrees C.", "Clouds form because oxygen condenses first."],
    0,
    "Rising air expands under lower pressure and cools. If it reaches saturation, water vapor condenses onto aerosols."
  ),
  q(
    "Why does adding impurities often change the boiling or freezing point of water?",
    ["Dissolved particles affect the tendency of water molecules to escape or join the solid phase.", "Impurities destroy all water atoms.", "Impurities remove gravity.", "Water stops being a mixture."],
    0,
    "Solutes change colligative properties, including boiling point elevation and freezing point depression."
  ),
  q(
    "On a heating curve, temperature stays constant during boiling even though heat is added. What is happening microscopically?",
    ["Energy is separating molecules into gas rather than increasing average kinetic energy.", "Molecules stop moving.", "Atoms are converted into electrons.", "The thermometer absorbs all heat forever."],
    0,
    "During boiling, latent heat overcomes attractions between molecules. Average kinetic energy, and therefore temperature, stays constant."
  ),
  q(
    "A sealed plastic bottle partly collapses when cooled. Which gas-law idea explains this?",
    ["Lower temperature reduces gas pressure inside if volume can change.", "Cooling creates more gas particles.", "Plastic becomes magnetic.", "Air gains mass from nothing."],
    0,
    "Cooling reduces particle kinetic energy and collision pressure. External air pressure can then push the flexible bottle inward."
  ),
  q(
    "Why can evaporation occur below the boiling point?",
    ["Some surface molecules have enough kinetic energy to escape even when average temperature is below boiling.", "All molecules are at the same speed.", "Boiling point is the same as freezing point.", "Evaporation requires fire."],
    0,
    "Particle speeds vary. The highest-energy surface molecules can escape at temperatures below the boiling point."
  ),
  q(
    "Deforestation can reduce local rainfall partly because",
    ["less transpiration returns water vapor to the atmosphere.", "trees absorb all clouds permanently.", "roots create gravity.", "forests stop condensation."],
    0,
    "Plants release water vapor through transpiration. Large vegetation areas can influence humidity and regional water cycling."
  ),
  q(
    "Why does ice float on liquid water?",
    ["Ice has an open crystal structure that is less dense than liquid water.", "Ice has more metal atoms.", "Solid water has no mass.", "Liquid water is always below 0 degrees C."],
    0,
    "Hydrogen bonding forms an open lattice in ice, making it less dense. Floating ice insulates aquatic environments."
  ),
  q(
    "A puddle disappears after several sunny days with no boiling. What is the best explanation?",
    ["Evaporation transferred water molecules into the air.", "The water became oxygen and vanished.", "The ground destroyed the atoms.", "Condensation removed water from air to ground."],
    0,
    "Liquid water can evaporate at ordinary temperatures. Molecules enter the gas phase and disperse in air."
  )
]);

topic("week-18-homeostasis", "Week 18", "Homeostasis", [
  q(
    "A runner's body temperature rises, then sweating and skin blood flow increase. Which feedback idea is shown?",
    ["Negative feedback that opposes the temperature increase.", "Positive feedback that always increases temperature.", "No feedback because sweating uses water.", "Digestive feedback only."],
    0,
    "Negative feedback detects deviation from a set range and activates responses that reduce the deviation."
  ),
  q(
    "Blood glucose rises after a meal. Which response is most appropriate?",
    ["Insulin promotes glucose uptake and storage.", "Adrenaline lowers all metabolism permanently.", "ADH digests glucose.", "The kidneys stop filtering blood."],
    0,
    "Insulin helps cells take up glucose and promotes glycogen formation, lowering blood glucose toward normal."
  ),
  q(
    "A person drinks very little water. How should ADH secretion change and why?",
    ["ADH increases to promote water reabsorption in the kidneys.", "ADH decreases to make more dilute urine.", "ADH turns glucose into protein.", "ADH stops the heart."],
    0,
    "When water is scarce, more ADH increases kidney water reabsorption, producing smaller volumes of concentrated urine."
  ),
  q(
    "Why is positive feedback useful in childbirth but dangerous for body temperature regulation?",
    ["Positive feedback amplifies change; useful for completing birth, but runaway temperature change could be harmful.", "Positive feedback always restores normal ranges.", "Childbirth needs no hormones.", "Temperature has no set range."],
    0,
    "Positive feedback reinforces a process until an endpoint. Homeostatic variables usually need stabilizing negative feedback."
  ),
  q(
    "A diabetic patient has high blood glucose and glucose in urine. Why does glucose appear in urine?",
    ["Filtered glucose exceeds the kidney tubules' reabsorption capacity.", "Glucose is supposed to be fully excreted.", "The bladder makes glucose.", "Insulin is filtered directly into urine as sugar."],
    0,
    "When blood glucose is too high, transporters can be saturated and glucose remains in filtrate."
  ),
  q(
    "Why does shivering help in cold conditions?",
    ["Rapid muscle contractions increase respiration and heat production.", "It evaporates sweat faster.", "It stops all blood flow.", "It turns fat into bone."],
    0,
    "Muscle activity releases heat as a by-product of respiration, helping raise body temperature."
  ),
  q(
    "A person in a hot desert has skin blood vessels dilated. What is the benefit?",
    ["More warm blood flows near the skin surface, increasing heat loss.", "Less heat can leave the body.", "Blood avoids the skin completely.", "The lungs absorb water through skin."],
    0,
    "Vasodilation increases heat transfer from core blood to the skin, where heat can be lost to the environment."
  ),
  q(
    "Why must blood pH be tightly controlled?",
    ["Protein shape and enzyme activity depend strongly on pH.", "pH affects only color.", "Blood pH has no chemical meaning.", "Cells work equally well at any pH."],
    0,
    "Enzymes and proteins have pH-sensitive structures. Large pH changes can disrupt metabolism and cell function."
  ),
  q(
    "Adrenaline is released during sudden danger. Which response combination is most coherent?",
    ["Increased heart rate, increased blood glucose availability, and redirected blood flow to muscles.", "Slower heart rate and lower glucose delivery to muscles.", "Immediate digestion of all proteins.", "Permanent shutdown of the nervous system."],
    0,
    "Adrenaline prepares the body for rapid action by increasing circulation, fuel availability, and alertness."
  ),
  q(
    "Which statement best distinguishes homeostasis from keeping conditions perfectly constant?",
    ["Homeostasis maintains variables within tolerable ranges using feedback, not exact unchanging values.", "Homeostasis means every number is fixed forever.", "Homeostasis happens only in plants.", "Homeostasis prevents all environmental change."],
    0,
    "Living systems fluctuate around set ranges. Feedback responses reduce harmful deviations rather than freezing conditions."
  )
]);

topic("week-19-forces", "Week 19", "Forces", [
  q(
    "A book rests on a table. Which force pair is a Newton's third-law pair?",
    ["Earth pulls book downward and book pulls Earth upward.", "Weight of book and normal force on book.", "Friction and air resistance on the book.", "Mass and weight of the book."],
    0,
    "Third-law pairs act on different objects and are equal and opposite. Weight and normal force both act on the book, so they are not a third-law pair."
  ),
  q(
    "A car moves at constant velocity on a straight road. What can be inferred about the net force?",
    ["It is zero.", "It must point forward.", "It must point backward.", "It equals the car's weight only."],
    0,
    "Constant velocity means no acceleration. By Newton's first law, the resultant force is zero."
  ),
  q(
    "Why does a parachute reduce a skydiver's acceleration?",
    ["It increases air resistance upward, reducing the net downward force.", "It removes gravity.", "It increases mass to zero.", "It changes weight into magnetism."],
    0,
    "A parachute greatly increases drag. As drag approaches weight, net force and acceleration decrease."
  ),
  q(
    "A spring extends 4 cm under 2 N and 8 cm under 4 N. What does this suggest?",
    ["Extension is proportional to force within the elastic limit.", "The spring has no elastic behavior.", "Force is independent of extension.", "The spring is melting."],
    0,
    "The data fit Hooke's law in the tested range: extension is directly proportional to applied force."
  ),
  q(
    "Why is it easier to push a box once it is already sliding than to start it moving?",
    ["Maximum static friction is often greater than kinetic friction.", "Moving objects have no mass.", "Gravity turns off during sliding.", "Friction only acts upward."],
    0,
    "Starting motion requires overcoming static friction. Once sliding, kinetic friction may be lower."
  ),
  q(
    "A ship made of steel floats. Which explanation is best?",
    ["Its overall shape displaces enough water so the upward buoyant force balances weight.", "Steel has no weight in water.", "Water repels all metals magnetically.", "The ship floats because steel is less dense than air."],
    0,
    "Floating depends on average density and displaced water. A hollow steel ship can displace water equal to its weight before sinking."
  ),
  q(
    "A small insect can stand on water. Which force is mainly responsible?",
    ["Surface tension from cohesive forces between water molecules.", "Nuclear force between insect legs.", "Gravity pulling upward.", "Static electricity only."],
    0,
    "Water molecules cohere at the surface, creating surface tension that can support small forces when the surface is not broken."
  ),
  q(
    "A heavier and lighter ball fall together in a vacuum. Why?",
    ["Without air resistance, all objects near Earth have the same gravitational acceleration.", "The heavier ball has no weight.", "The lighter ball produces more gravity.", "Vacuum reverses mass."],
    0,
    "Gravitational force is larger on larger mass, but inertia is also larger in the same proportion, giving the same acceleration."
  ),
  q(
    "A force-time graph for a collision has the same area but a longer contact time when padding is used. What changes?",
    ["Average force decreases because impulse is spread over more time.", "Momentum change becomes impossible.", "Mass disappears.", "The collision has no force."],
    0,
    "Impulse equals change in momentum. If the same impulse occurs over longer time, average force is lower."
  ),
  q(
    "Why does reducing contact area increase pressure for the same force?",
    ["Pressure equals force divided by area.", "Pressure equals area divided by mass.", "Smaller area creates more atoms.", "Force disappears on large areas."],
    0,
    "The same force concentrated over a smaller area gives a larger force per unit area, increasing pressure."
  )
]);

topic("week-20-biochemistry-and-polymers", "Week 20", "Biochemistry and Polymers", [
  q(
    "A person eats excess carbohydrates. After glycogen stores are filled, what can happen to some excess energy?",
    ["It can be converted to fat for long-term storage.", "It must leave the body as oxygen.", "It turns directly into DNA in every cell.", "It cannot be stored in any form."],
    0,
    "The body can store limited glycogen. Sustained excess energy can be converted into fat storage."
  ),
  q(
    "Why do enzymes that digest starch not digest proteins?",
    ["Their active sites fit specific substrates and bonds.", "Proteins contain no atoms.", "Starch enzymes are used only in the lungs.", "All enzymes digest all polymers equally."],
    0,
    "Enzymes are specific to molecular shapes and bond types. Amylase acts on starch, not peptide bonds."
  ),
  q(
    "Which food-test result best indicates reducing sugar?",
    ["Benedict's solution changes from blue toward orange or brick red after heating.", "Iodine stays brown.", "Biuret reagent stays blue.", "Paper becomes translucent only."],
    0,
    "Benedict's test detects reducing sugars when heated, producing a color change depending on concentration."
  ),
  q(
    "Why are proteins called polymers?",
    ["They are long chains of amino acid monomers linked by peptide bonds.", "They are made only of glucose.", "They cannot fold.", "They contain no carbon."],
    0,
    "Proteins are polymers built from amino acid monomers. Sequence and folding determine function."
  ),
  q(
    "A lack of vitamin C can weaken connective tissue. What does this show about micronutrients?",
    ["Small amounts can be essential for specific biochemical pathways.", "Only macronutrients affect health.", "Vitamins are energy-rich fuels like fats.", "Micronutrients are not needed by cells."],
    0,
    "Micronutrients are required in small quantities but can be crucial cofactors or pathway components."
  ),
  q(
    "Why do unsaturated fats usually have lower melting points than saturated fats?",
    ["Double bonds create kinks that prevent tight packing.", "They have no carbon atoms.", "They are all ionic solids.", "They are made of amino acids only."],
    0,
    "Kinked unsaturated chains pack less tightly, weakening intermolecular forces and lowering melting point."
  ),
  q(
    "DNA and proteins are both polymers, but they store different information. What is the key difference?",
    ["DNA uses nucleotide sequences; proteins use amino acid sequences that fold into functional shapes.", "DNA contains no sequence.", "Proteins are copied by base pairing exactly like DNA.", "Both are made of identical monomers."],
    0,
    "DNA stores genetic information in bases. Proteins use amino acid sequences to create structures and functions."
  ),
  q(
    "Why can heating denature an enzyme?",
    ["Heat disrupts bonds maintaining the enzyme's three-dimensional shape.", "Heat removes all atoms from the enzyme.", "Heat turns protein into starch.", "Heat makes the active site more specific forever."],
    0,
    "High temperature disrupts weak interactions that maintain folding, changing the active site and reducing activity."
  ),
  q(
    "A biodegradable polymer breaks down faster in compost than a conventional plastic. Which implication is most scientifically careful?",
    ["Biodegradability depends on polymer chemistry and environmental conditions, not just the label.", "All biodegradable plastics vanish instantly anywhere.", "Conventional plastics contain no polymers.", "Compost has no microorganisms."],
    0,
    "Breakdown requires suitable chemistry, microbes, moisture, oxygen, and temperature. Labels alone do not guarantee rapid degradation in all environments."
  ),
  q(
    "Why is dietary fiber useful even though humans cannot digest cellulose for energy?",
    ["It supports gut movement and can influence microbiome activity and glucose absorption.", "It is absorbed unchanged as protein.", "It provides all essential amino acids.", "It prevents all diseases completely."],
    0,
    "Fiber is not a major human energy source, but it affects digestion, stool bulk, gut microbes, and nutrient absorption patterns."
  )
]);

topic("p5-week-01-electricity", "P5 Week 01", "Electrical Energy", [
  q(
    "Two identical bulbs are connected in series to one battery. One bulb is removed. What happens to the other bulb?",
    ["It goes out because the circuit path is broken.", "It becomes twice as bright.", "It stays unchanged because bulbs are independent in series.", "It turns into a battery."],
    0,
    "Series components share one path. Removing one bulb opens the circuit, so current stops everywhere."
  ),
  q(
    "Two identical bulbs are connected in parallel. One bulb burns out. What happens to the other?",
    ["It usually stays lit because it has its own complete branch.", "It must go out because all circuits are series.", "It becomes a resistor with zero resistance.", "The battery voltage becomes zero instantly."],
    0,
    "Parallel branches provide separate paths. Failure in one branch does not necessarily open the other branch."
  ),
  q(
    "Why can a very thick copper wire have lower resistance than a thin copper wire of the same length?",
    ["It has more cross-sectional area for charge flow.", "It has fewer atoms.", "It contains no electrons.", "It is colder in every situation."],
    0,
    "Greater cross-sectional area reduces resistance because more charge carriers can move through in parallel paths."
  ),
  q(
    "A resistor obeys Ohm's law. If voltage doubles and temperature stays constant, current",
    ["doubles.", "halves.", "becomes zero.", "is unchanged always."],
    0,
    "For an ohmic resistor, V = IR with constant R. Doubling V doubles I."
  ),
  q(
    "Why is a fuse placed in series with an appliance?",
    ["It must carry the appliance current so it melts and opens the circuit if current is too high.", "It must be hidden from current.", "It increases dangerous current.", "It works only when disconnected."],
    0,
    "A fuse protects by heating and melting when excessive current flows. It must be in the current path."
  ),
  q(
    "Rubbing a balloon on hair can make the balloon attract small paper pieces. What is the best explanation?",
    ["Charge transfer creates static charge that polarizes or attracts nearby objects.", "The balloon becomes a magnet for all materials.", "Hair creates gravity.", "Paper becomes alive."],
    0,
    "Friction can transfer electrons. Charged objects attract opposite charges and can polarize neutral objects."
  ),
  q(
    "Why do household circuits normally use parallel wiring?",
    ["Appliances receive the same supply voltage and can operate independently.", "Parallel wiring makes every appliance share one current path.", "It prevents any switch from working.", "It removes the need for insulation."],
    0,
    "Parallel connections allow independent switching and near-full supply voltage across each appliance."
  ),
  q(
    "A voltmeter should be connected across a component because",
    ["it measures potential difference between two points.", "it measures current only when in series.", "it must block the circuit.", "it supplies all electrons."],
    0,
    "Voltage is a difference between two points, so voltmeters are connected in parallel across components."
  ),
  q(
    "An ammeter has very low resistance. Why is it connected in series?",
    ["So the same current through the component passes through the meter with minimal disturbance.", "So it can short-circuit the battery in parallel.", "So it measures voltage directly.", "So it prevents all current."],
    0,
    "An ammeter measures current in a branch. Its low resistance minimizes change when placed in series."
  ),
  q(
    "A non-ohmic lamp's resistance increases as it gets hotter. What happens to the current-voltage graph?",
    ["It curves because current increases less steeply at higher voltage.", "It remains a straight line through the origin with constant gradient.", "It becomes a horizontal line at all voltages.", "It shows negative current only."],
    0,
    "As filament temperature rises, resistance increases. The graph is nonlinear, with decreasing gradient at higher voltage."
  )
]);

topic("p5-week-02-fundamental-botany", "P5 Week 02", "Fundamental Botany", [
  q(
    "Why are most leaves broad and thin?",
    ["They maximize light capture and shorten diffusion distances for gases.", "They reduce all surface area.", "They store all plant minerals.", "They make roots unnecessary."],
    0,
    "Broad leaves capture light; thin tissues help carbon dioxide and oxygen diffuse efficiently."
  ),
  q(
    "A plant wilts on a hot day but recovers after watering. What changed in the cells?",
    ["Turgor pressure fell as water was lost, then rose after water uptake.", "Cell walls dissolved and reformed.", "Chlorophyll became DNA.", "Xylem turned into phloem."],
    0,
    "Water loss reduces vacuole pressure against cell walls, causing wilting. Rehydration restores turgor."
  ),
  q(
    "Why are stomata often more numerous on the lower leaf surface?",
    ["It can reduce water loss while still allowing gas exchange.", "The lower surface receives no gases.", "Photosynthesis only happens underneath.", "Stomata are roots."],
    0,
    "Lower surfaces are usually cooler and less exposed to direct sunlight and wind, reducing transpiration."
  ),
  q(
    "What is the main function of xylem?",
    ["Transport water and mineral ions upward and provide support.", "Transport sugars from leaves only.", "Make pollen.", "Store genetic code outside cells."],
    0,
    "Xylem vessels carry water and minerals from roots and also strengthen the plant."
  ),
  q(
    "What evidence best shows translocation in phloem rather than xylem transport?",
    ["Sugars move from leaves to growing roots and fruits.", "Water rises from roots to leaves.", "Minerals dissolve in soil.", "Leaves contain air spaces."],
    0,
    "Phloem transports sucrose and other assimilates from sources to sinks, such as fruits, roots, and young shoots."
  ),
  q(
    "Why does a plant kept in darkness eventually lose mass even if watered?",
    ["Respiration continues but photosynthesis cannot replace stored food.", "Water has no atoms.", "Darkness stops all cellular activity instantly.", "Roots begin photosynthesis."],
    0,
    "In darkness, plants still respire and use stored carbohydrates. Without photosynthesis, reserves decline."
  ),
  q(
    "A variegated leaf is tested for starch after light exposure. Only green areas turn blue-black with iodine. What does this show?",
    ["Chlorophyll-containing areas photosynthesize to produce starch.", "White areas contain more starch.", "Iodine tests for protein.", "Light destroys starch in green tissue."],
    0,
    "Green areas contain chlorophyll needed to capture light for photosynthesis, producing glucose that can be stored as starch."
  ),
  q(
    "Why do root hairs improve mineral uptake?",
    ["They increase surface area and contact with soil solution.", "They contain lenses for focusing light.", "They reduce diffusion to zero.", "They produce seeds."],
    0,
    "Root hairs extend into soil spaces, increasing absorbing surface for water and ions."
  ),
  q(
    "Which condition most directly limits photosynthesis if carbon dioxide is scarce?",
    ["The Calvin cycle lacks carbon input for sugar production.", "Light cannot travel in air.", "Roots cannot absorb gravity.", "Chlorophyll becomes a mineral."],
    0,
    "CO2 supplies carbon for carbohydrate synthesis. Even with light and water, low CO2 can limit photosynthetic rate."
  ),
  q(
    "Why are guard cells important for balancing plant needs?",
    ["They regulate stomatal opening, trading off CO2 uptake against water loss.", "They pump blood through leaves.", "They digest cellulose.", "They make all plant hormones in flowers."],
    0,
    "Open stomata allow CO2 entry but increase transpiration. Guard cells adjust pore size according to conditions."
  )
]);

topic("p5-week-03-electrical-systems-and-magnetism", "P5 Week 03", "Electrical Systems and Magnetism", [
  q(
    "A wire carrying current deflects a compass needle. What does this show?",
    ["An electric current produces a magnetic field.", "Only permanent magnets create fields.", "Compass needles respond to light.", "Current destroys magnetism."],
    0,
    "Moving charges create magnetic fields. A compass can detect the field around a current-carrying wire."
  ),
  q(
    "How can an electromagnet be made stronger?",
    ["Increase current, add more coil turns, or use a soft iron core.", "Remove all coils.", "Use plastic as a core for maximum magnetism.", "Open the circuit."],
    0,
    "Stronger current and more turns increase field strength. A soft iron core concentrates the magnetic field."
  ),
  q(
    "Why is soft iron often used as an electromagnet core?",
    ["It magnetizes strongly and loses magnetism easily when current stops.", "It is permanently magnetic forever.", "It has no atoms.", "It blocks all current by magic."],
    0,
    "Soft iron is magnetically soft, so it is useful when magnetism must be switched on and off."
  ),
  q(
    "A generator produces current when a coil rotates in a magnetic field. What principle is involved?",
    ["Electromagnetic induction.", "Neutralization.", "Osmosis.", "Evaporation."],
    0,
    "Changing magnetic flux through a coil induces an electromotive force. This is the basis of generators."
  ),
  q(
    "Why is alternating current useful for power transmission?",
    ["Its voltage can be changed efficiently with transformers.", "It has no energy.", "It travels only through air.", "It cannot heat wires."],
    0,
    "Transformers work with changing currents, allowing high-voltage low-current transmission that reduces energy loss."
  ),
  q(
    "In a simple motor, why must current direction reverse every half-turn or the coil use a split-ring commutator?",
    ["To keep torque acting in a direction that sustains rotation.", "To stop all magnetic forces.", "To make the coil a resistor only.", "To remove the magnetic field."],
    0,
    "Without current reversal at the right time, the torque would reverse and the coil could stall or oscillate."
  ),
  q(
    "Why are copper wires used in many electrical systems?",
    ["Copper is a good conductor and can be drawn into flexible wires.", "Copper is a perfect insulator.", "Copper has no resistance in all conditions.", "Copper creates energy from nothing."],
    0,
    "Copper has low resistance and is ductile, making it practical for wiring."
  ),
  q(
    "A semiconductor diode allows current mainly one way. Which application follows?",
    ["Rectifying AC into DC.", "Storing water pressure.", "Increasing plant transpiration.", "Measuring blood oxygen directly."],
    0,
    "Diodes conduct preferentially in one direction, so they can convert alternating current to pulsating direct current."
  ),
  q(
    "Why is electrical power transmitted at high voltage?",
    ["For the same power, higher voltage means lower current and less heating loss in cables.", "High voltage removes resistance.", "High voltage makes current zero power.", "Low voltage cannot move at all."],
    0,
    "Power loss in wires is I^2R. Reducing current greatly reduces heating losses."
  ),
  q(
    "A magnet falls through a copper pipe more slowly than through air. Why?",
    ["Changing magnetic fields induce currents that create opposing magnetic effects.", "Copper is sticky glue.", "Gravity is weaker inside copper.", "The magnet loses all mass."],
    0,
    "The falling magnet induces eddy currents in the conductor. Their magnetic fields oppose the motion, slowing the fall."
  )
]);

topic("p5-week-04-plant-reproduction", "P5 Week 04", "Plant Reproduction", [
  q(
    "Why does cross-pollination usually increase genetic variation compared with self-pollination?",
    ["It combines alleles from different plants.", "It prevents fertilization.", "It makes pollen nonliving.", "It produces only clones."],
    0,
    "Cross-pollination mixes genetic material from different individuals, increasing variation among offspring."
  ),
  q(
    "A wind-pollinated flower usually has small petals and exposed anthers. Why?",
    ["It relies on air movement rather than animal attraction.", "It must store nectar in petals.", "It is unable to make pollen.", "It pollinates only underwater."],
    0,
    "Wind-pollinated flowers often invest less in showy petals and more in exposed pollen release and feathery stigmas."
  ),
  q(
    "Why do fruits often become sweet and colorful when ripe?",
    ["To attract animals that disperse seeds after eating the fruit.", "To stop all seed movement.", "To digest the embryo.", "To increase photosynthesis in seeds only."],
    0,
    "Animal-dispersed fruits often advertise ripeness and provide rewards, improving seed dispersal."
  ),
  q(
    "A burr seed has hooks that attach to animal fur. Which dispersal method is this?",
    ["Animal external dispersal.", "Wind parachute dispersal.", "Explosive dispersal.", "Water flotation only."],
    0,
    "Hooks help seeds hitchhike on animals before falling off elsewhere."
  ),
  q(
    "Why is double fertilization important in flowering plants?",
    ["One fertilization forms the embryo and another forms nutrient-rich endosperm.", "Two sperm fertilize the same egg to make twins.", "It prevents seed formation.", "It happens only in animals."],
    0,
    "In angiosperms, one sperm fertilizes the egg and another contributes to endosperm, which nourishes the embryo."
  ),
  q(
    "A farmer grows plants from cuttings. What is a likely advantage?",
    ["Desired traits of the parent can be copied quickly.", "All offspring become genetically unique.", "No cells divide.", "The plants no longer need water."],
    0,
    "Vegetative propagation produces clones, preserving useful traits such as fruit quality or flower color."
  ),
  q(
    "What is the main risk of relying on one cloned crop variety over a large area?",
    ["A disease that affects that genotype could spread widely.", "Clones cannot grow leaves.", "All clones are immune to pests.", "Clones contain no DNA."],
    0,
    "Low genetic diversity increases vulnerability. A pathogen suited to the clone can damage the whole crop."
  ),
  q(
    "Why must pollen land on a compatible stigma?",
    ["Recognition between pollen and stigma helps ensure successful germination and fertilization.", "Any dust can fertilize any plant.", "The stigma digests all pollen.", "Pollen fertilizes roots directly."],
    0,
    "Species compatibility and pollen-stigma signaling affect pollen tube growth and fertilization."
  ),
  q(
    "A monocot seedling has one seed leaf and parallel leaf veins. Which feature supports its classification?",
    ["One cotyledon and parallel venation.", "Two cotyledons and netted veins.", "No embryo.", "Flowers only in groups of five always."],
    0,
    "Monocots typically have one cotyledon and parallel venation, although classification uses multiple traits."
  ),
  q(
    "Why might seed dormancy be adaptive?",
    ["It delays germination until conditions are more favorable for survival.", "It permanently kills the embryo.", "It removes the need for dispersal.", "It makes seeds photosynthesize without light."],
    0,
    "Dormancy helps seeds avoid germinating during short or unsuitable conditions, improving survival chances."
  )
]);

topic("p5-week-05-energy", "P5 Week 05", "Energy and Work", [
  q(
    "A cyclist brakes while moving downhill. Which energy transfer is most accurate?",
    ["Gravitational potential and kinetic energy are partly transferred to thermal energy in brakes and surroundings.", "Energy is destroyed by friction.", "Thermal energy becomes massless gravity.", "The bicycle stops because energy disappears."],
    0,
    "Energy is conserved but transferred and dissipated. Braking converts organized motion into thermal energy."
  ),
  q(
    "Why does a more efficient electric motor waste less energy?",
    ["A larger fraction of input electrical energy becomes useful mechanical output.", "It creates energy from nothing.", "It uses no current.", "It has zero parts and no interactions."],
    0,
    "Efficiency compares useful output energy to input energy. Less waste means less heating, sound, or unwanted transfer."
  ),
  q(
    "A crane lifts a 200 N load by 3 m. How much work is done on the load?",
    ["600 J.", "67 J.", "203 J.", "0 J."],
    0,
    "Work done against weight is force times distance: 200 N x 3 m = 600 J."
  ),
  q(
    "Two machines do the same work, but one takes half the time. What is true about its power?",
    ["It has twice the power.", "It has half the power.", "It does no work.", "Its energy must be zero."],
    0,
    "Power is work done per unit time. Same work in half the time means double the power."
  ),
  q(
    "Why are fossil fuels considered non-renewable on human timescales?",
    ["They form over millions of years from ancient biomass.", "They cannot release energy.", "They are made only of metal.", "They are replenished daily by rainfall."],
    0,
    "Fossil-fuel formation is extremely slow compared with human consumption rates."
  ),
  q(
    "A rechargeable battery stores energy when charged. What kind of energy storage is mainly involved?",
    ["Chemical potential energy.", "Sound energy.", "Gravitational energy only.", "Nuclear fusion in every cell."],
    0,
    "Charging drives chemical changes that store energy. Discharging converts chemical energy back into electrical energy."
  ),
  q(
    "Why does a stretched rubber band have elastic potential energy?",
    ["Work was done to deform it, and its structure can return energy when released.", "It contains more atoms after stretching.", "It becomes a fuel.", "It stops obeying forces."],
    0,
    "Elastic materials store energy when deformed within their elastic range. Release converts stored energy to motion and heat."
  ),
  q(
    "Which statement about nuclear energy is most scientifically balanced?",
    ["It has high energy density and low direct CO2 emissions, but radioactive waste and safety require careful management.", "It is completely risk-free.", "It is identical to burning coal.", "It cannot generate electricity."],
    0,
    "Nuclear power has major advantages and serious engineering and waste challenges. A balanced answer considers both."
  ),
  q(
    "An appliance rated 2 kW runs for 3 hours. How much energy does it use?",
    ["6 kWh.", "1.5 kWh.", "5 kWh.", "2003 kWh."],
    0,
    "Energy in kilowatt-hours equals power in kilowatts times time in hours: 2 x 3 = 6 kWh."
  ),
  q(
    "Why can energy be conserved but still become less useful?",
    ["Energy can spread into low-temperature thermal energy that is hard to convert fully into work.", "Conservation means energy quality never changes.", "Wasted energy vanishes.", "Useful energy is not real energy."],
    0,
    "The first law says energy is conserved. The second-law idea explains why dispersed thermal energy is less available for useful work."
  )
]);

topic("p5-week-06-science-process-skills", "P5 Week 06", "Science Process Skills", [
  q(
    "A student tests fertilizer by giving Plant A fertilizer and Plant B none, but Plant A also gets more sunlight. What is the flaw?",
    ["Sunlight is a confounding variable.", "There is no dependent variable.", "Plants cannot be used in experiments.", "Fertilizer is not matter."],
    0,
    "A confounder changes with the independent variable and may explain the result. Sunlight should be controlled."
  ),
  q(
    "Which experimental design best tests whether light color affects plant growth?",
    ["Use identical plants, equal water and soil, different light colors, and measure height over time.", "Use different plant species with different fertilizers and different light colors.", "Ask which color students like best.", "Measure plant height once before treatment only."],
    0,
    "A fair test changes light color while controlling other variables and repeatedly measuring the dependent variable."
  ),
  q(
    "Why are repeated trials important?",
    ["They reduce the influence of random error and reveal consistency.", "They guarantee a hypothesis is true.", "They replace the need for controls.", "They make all data identical."],
    0,
    "Repeats improve reliability and help detect variation or mistakes. They do not guarantee truth."
  ),
  q(
    "In a drug trial, neither patients nor doctors know who receives the placebo. What bias is reduced?",
    ["Expectation and observer bias.", "Gravity.", "Molecular mass.", "Electrical resistance."],
    0,
    "Double-blind designs reduce placebo effects and biased assessment by participants or researchers."
  ),
  q(
    "A graph shows plant height against days after germination. Which graph type is usually best?",
    ["Line graph.", "Pie chart.", "Map only.", "Dichotomous key."],
    0,
    "A line graph is suited for continuous change over time and helps show trends."
  ),
  q(
    "A conclusion says, the plant grew taller because fertilizer helped, but gives no data. What is missing?",
    ["Evidence linking the claim to measured results.", "A comparison between fertilized and unfertilized plants.", "A graph scale that hides variation.", "A definition of fertilizer without the plant data."],
    0,
    "Scientific conclusions need claim, evidence, and reasoning. Unsupported statements are weak."
  ),
  q(
    "Which is an inference rather than an observation?",
    ["The liquid is blue.", "The thermometer reads 35 degrees C.", "The plant is wilting because it lacks water.", "The beaker contains 50 mL."],
    2,
    "An inference explains observations. Wilting due to lack of water is an interpretation that should be tested."
  ),
  q(
    "Why should units be included in data tables?",
    ["They define measurement scale and prevent ambiguity.", "They make numbers larger.", "They replace the method.", "They are only decorative."],
    0,
    "Units tell what was measured and allow comparison, calculation, and replication."
  ),
  q(
    "A thermometer marked every 1 degree C is used to detect a 0.2 degree C change. What is the issue?",
    ["Instrument precision may be insufficient for the claimed change.", "Temperature cannot be measured.", "The independent variable is missing by definition.", "The thermometer changes mass into heat."],
    0,
    "The instrument resolution is too coarse for reliable detection of a small difference."
  ),
  q(
    "A student changes the hypothesis after seeing the data and presents it as the original prediction. Why is this poor science?",
    ["It hides whether the prediction truly had testable power before the result.", "It makes the graph too short.", "It changes the dependent variable into a constant.", "It is required in all experiments."],
    0,
    "Predictions are strongest when made before data collection. Changing them afterward can turn explanation into hindsight."
  )
]);

topic("p5-week-07-mechanics", "P5 Week 07", "Mechanics", [
  q(
    "A longer spanner makes it easier to loosen a nut. Why?",
    ["It increases the moment for the same applied force.", "It reduces the force to zero.", "It changes torque into mass.", "It removes friction from the nut completely."],
    0,
    "Moment equals force times perpendicular distance from pivot. A longer spanner increases turning effect."
  ),
  q(
    "A seesaw balances with a heavier child closer to the pivot and a lighter child farther away. What is equal?",
    ["Clockwise and anticlockwise moments.", "Their masses.", "Their distances only.", "Their heights above sea level."],
    0,
    "Balance occurs when opposing moments about the pivot are equal."
  ),
  q(
    "Why is a low center of gravity useful for stability?",
    ["The line of action of weight is less likely to fall outside the base during tilting.", "It removes the object's weight.", "It makes friction zero.", "It stops all rotation by law."],
    0,
    "An object topples when the line of action of weight passes outside its base. Lower center of gravity improves stability."
  ),
  q(
    "A pendulum clock runs slow if its pendulum length is increased. Why?",
    ["A longer pendulum has a longer period.", "A longer pendulum has no gravity.", "Length affects only color.", "The bob stops having mass."],
    0,
    "For small swings, pendulum period increases with length. Longer period means fewer swings per minute."
  ),
  q(
    "A single fixed pulley changes",
    ["direction of force but not ideal mechanical advantage.", "the load's mass to zero.", "work required to zero.", "gravity into electricity."],
    0,
    "A fixed pulley lets you pull down to lift up. Ideally it does not reduce the force needed, ignoring friction."
  ),
  q(
    "Why can hydraulic brakes multiply force?",
    ["Pressure applied to an enclosed fluid is transmitted throughout the fluid.", "Liquids are always compressible to zero volume.", "Pressure disappears in fluids.", "Fluids create energy from nothing."],
    0,
    "Pascal's principle explains hydraulic force multiplication: same pressure over a larger area gives larger force."
  ),
  q(
    "A sharp knife cuts better than a blunt knife because",
    ["the same force is applied over a smaller area, producing greater pressure.", "sharp edges have no friction.", "blunt knives have no atoms.", "cutting requires no force."],
    0,
    "Pressure equals force divided by area. A sharp edge concentrates force."
  ),
  q(
    "Why do snowshoes help a person walk on snow?",
    ["They increase contact area and reduce pressure on the snow.", "They increase weight.", "They make gravity weaker.", "They melt all snow instantly."],
    0,
    "Spreading the person's weight over a larger area lowers pressure, reducing sinking."
  ),
  q(
    "A lever has effort farther from the pivot than the load. What is the likely advantage?",
    ["A smaller effort can move a larger load, though over a greater distance.", "No work is required.", "The load becomes weightless.", "The pivot stores electricity."],
    0,
    "Levers trade force for distance. Work is not eliminated; mechanical advantage changes force and motion."
  ),
  q(
    "A suction cup sticks poorly on a rough wall. Why?",
    ["Air leaks in, so atmospheric pressure cannot maintain a strong pressure difference.", "Rough walls have no air pressure.", "Suction cups use magnetism only.", "Gravity acts upward on rough surfaces."],
    0,
    "Suction cups work by excluding air and using external air pressure. Rough surfaces prevent a good seal."
  )
]);

topic("p5-week-08-chemistry-and-environment", "P5 Week 08", "Chemistry and the Environment", [
  q(
    "Why does increasing temperature often increase reaction rate?",
    ["Particles collide more frequently and with greater energy, so more exceed activation energy.", "Particles stop moving.", "Atoms become larger elements.", "Temperature removes the need for collisions."],
    0,
    "Higher temperature increases kinetic energy and collision frequency, raising the proportion of successful collisions."
  ),
  q(
    "During electrolysis of molten ionic compound, why can ions move but in solid form they cannot?",
    ["Molten ions are mobile, while solid ions are fixed in a lattice.", "Solid compounds contain no ions.", "Molten compounds have no charge.", "Electrolysis uses only neutral atoms."],
    0,
    "Electrical conduction in ionic substances requires mobile ions. Melting frees ions from fixed lattice positions."
  ),
  q(
    "Why is acid rain harmful to lakes?",
    ["It lowers pH, affecting enzymes, fish reproduction, and metal ion solubility.", "It increases pH to 14 always.", "It turns water into oil.", "It removes all dissolved oxygen instantly."],
    0,
    "Acidification can stress aquatic life and mobilize toxic ions, disrupting ecosystems."
  ),
  q(
    "The greenhouse effect is necessary for life, but enhanced greenhouse effect is concerning because",
    ["extra greenhouse gases can trap more outgoing infrared radiation and warm climate.", "greenhouse gases block all sunlight from entering.", "greenhouse gases contain no atoms.", "the natural greenhouse effect is always harmful."],
    0,
    "Natural greenhouse warming makes Earth habitable. Increased greenhouse gases can shift the energy balance and climate."
  ),
  q(
    "Why does ozone in the stratosphere protect life?",
    ["It absorbs much harmful ultraviolet radiation.", "It stores all oxygen used in breathing.", "It causes all acid rain.", "It prevents gravity."],
    0,
    "Stratospheric ozone absorbs UV radiation that can damage DNA and tissues."
  ),
  q(
    "What is the main environmental concern with excess nitrate fertilizer entering rivers?",
    ["Eutrophication from algal blooms and oxygen depletion.", "Immediate conversion of rivers to glass.", "Removal of all bacteria.", "Increase in oxygen forever."],
    0,
    "Nitrates can overfertilize aquatic systems, causing blooms and oxygen depletion after decomposition."
  ),
  q(
    "A simple electric cell works because",
    ["a redox reaction separates charge and drives electrons through an external circuit.", "salt water creates energy without chemical change.", "electrons flow through the electrolyte only as metal atoms.", "both electrodes must be identical for voltage."],
    0,
    "Cells convert chemical energy into electrical energy through oxidation and reduction at different electrodes."
  ),
  q(
    "Why is carbon central to organic chemistry?",
    ["It forms four covalent bonds and can make chains, rings, and complex structures.", "It cannot bond to itself.", "It is always a noble gas.", "It contains no electrons."],
    0,
    "Carbon's tetravalency and C-C bonding allow diverse stable molecules."
  ),
  q(
    "Which action most directly reduces net CO2 increase from electricity generation?",
    ["Replacing coal power with wind, solar, hydro, nuclear, or other low-carbon sources where appropriate.", "Burning more coal but painting chimneys green.", "Removing all transformers.", "Using inefficient appliances longer."],
    0,
    "Electricity sources with low lifecycle carbon emissions reduce CO2 output compared with fossil-fuel combustion."
  ),
  q(
    "Why must a chemical equation for environmental nitrogen fixation conserve atoms?",
    ["Nitrogen atoms are rearranged into compounds but not created or destroyed.", "Balancing is optional in nature.", "Nitrogen becomes energy.", "Atoms vanish in soil."],
    0,
    "Conservation of matter applies to environmental reactions as well as laboratory reactions."
  )
]);

topic("p5-week-09-astronomy", "P5 Week 09", "Astronomy", [
  q(
    "Distant galaxies show redshift. What is the strongest interpretation in modern cosmology?",
    ["Space is expanding, so light from distant galaxies is stretched to longer wavelengths.", "All galaxies are cooling into red paint.", "Earth is the center of all motion.", "Light cannot travel through space."],
    0,
    "Cosmological redshift supports expansion of space. It is a major line of evidence for the Big Bang model."
  ),
  q(
    "Why do massive stars have shorter lifetimes than low-mass stars?",
    ["They burn nuclear fuel much faster despite having more fuel.", "They contain no hydrogen.", "They do not undergo fusion.", "They are colder than planets."],
    0,
    "Massive stars have very high core pressures and fusion rates, so they use fuel rapidly."
  ),
  q(
    "A nearby star shows a larger parallax angle than another star. What does that mean?",
    ["It is closer to Earth.", "It is always larger.", "It is moving faster than light.", "It is not a star."],
    0,
    "Parallax angle decreases with distance. Larger parallax indicates a nearer object."
  ),
  q(
    "Why do lunar eclipses not happen every full Moon?",
    ["The Moon's orbit is tilted, so alignment with Earth's shadow is not exact every month.", "Earth has no shadow.", "The Moon emits its own sunlight.", "Full Moon happens only once a decade."],
    0,
    "Eclipses require near-perfect alignment at orbital nodes. Most full Moons pass above or below Earth's shadow."
  ),
  q(
    "What distinguishes a meteor from a meteorite?",
    ["A meteor is the streak of light in the atmosphere; a meteorite is material that reaches the ground.", "A meteorite is always a comet tail.", "A meteor is a planet.", "They are identical terms."],
    0,
    "Terminology depends on location and event: meteoroid in space, meteor in atmosphere, meteorite on the ground."
  ),
  q(
    "Why does the Moon show phases?",
    ["We see different fractions of its sunlit half as it orbits Earth.", "Earth's shadow causes every phase.", "The Moon changes shape physically every month.", "Clouds carve the Moon."],
    0,
    "Moon phases are viewing geometry, not usually Earth's shadow. Earth's shadow is involved in lunar eclipses."
  ),
  q(
    "Why is Pluto classified as a dwarf planet rather than a major planet?",
    ["It has not cleared its orbital neighborhood.", "It does not orbit the Sun.", "It is not round enough in any way.", "It is larger than Jupiter."],
    0,
    "The IAU planet definition includes orbiting the Sun, being nearly round, and clearing the neighborhood. Pluto fails the third criterion."
  ),
  q(
    "A blue star and red star have the same size. Which is likely hotter?",
    ["The blue star.", "The red star.", "They must have identical temperature.", "Color gives no information about star temperature."],
    0,
    "Hotter stars emit more strongly at shorter wavelengths, appearing blue-white. Cooler stars appear redder."
  ),
  q(
    "Why do astronauts in orbit feel weightless even though gravity acts on them?",
    ["They and the spacecraft are in continuous free fall around Earth.", "Gravity is zero in low Earth orbit.", "Their mass becomes zero.", "Air pressure pushes them upward."],
    0,
    "Orbital weightlessness is free fall. Gravity provides centripetal acceleration, but there is no supporting normal force."
  ),
  q(
    "What evidence best supports that the early universe was hot and dense?",
    ["Cosmic microwave background radiation.", "The color of Earth's oceans.", "Daily tides.", "Lightning during storms."],
    0,
    "The cosmic microwave background is relic radiation from the early hot universe, now cooled by expansion."
  )
]);

topic("p5-week-10-genetics-and-heredity", "P5 Week 10", "Genetics and Heredity", [
  q(
    "A DNA strand has sequence A T G C. What is the complementary DNA sequence?",
    ["T A C G.", "A T G C.", "U A C G.", "G C A T."],
    0,
    "DNA base pairing is A with T and C with G. RNA would use U instead of T."
  ),
  q(
    "Why can a mutation in one DNA base change a protein?",
    ["It may change a codon, altering an amino acid or stop signal.", "Proteins contain no sequence.", "DNA bases are unrelated to proteins.", "Mutations always improve proteins."],
    0,
    "The genetic code is read in codons. A base change can alter the codon and affect protein sequence or expression."
  ),
  q(
    "A child has blood type O. Which parental genotype pair could produce this child?",
    ["AO and BO.", "AA and BB only.", "AB and AB only.", "OO and AB cannot produce any child."],
    0,
    "Blood type O requires genotype OO. An AO parent and a BO parent can each pass O."
  ),
  q(
    "Why does meiosis produce genetic variation?",
    ["Crossing over, independent assortment, and random fertilization create new allele combinations.", "It makes identical body cells.", "It doubles chromosome number every generation.", "It removes all mutations."],
    0,
    "Meiosis shuffles chromosomes and alleles, and fertilization combines gametes randomly."
  ),
  q(
    "A dominant disease allele causes illness in heterozygotes. What pattern may appear in a pedigree?",
    ["Affected individuals often appear in every generation.", "Only males can ever be affected.", "Unaffected homozygous recessive parents usually have all affected children.", "The trait cannot be inherited."],
    0,
    "Dominant traits often show vertical transmission, though penetrance and family size can complicate patterns."
  ),
  q(
    "Why are mitochondrial traits usually inherited from the mother?",
    ["The egg contributes most cytoplasm and mitochondria to the zygote.", "Sperm have no nuclear DNA.", "Fathers contribute all mitochondria.", "Mitochondria are not inherited."],
    0,
    "In most humans, mitochondria in the embryo come mainly from the egg cytoplasm."
  ),
  q(
    "What distinguishes genotype from phenotype?",
    ["Genotype is allele combination; phenotype is observable trait or function.", "Phenotype is always hidden DNA only.", "Genotype means body weight.", "They are identical in all environments."],
    0,
    "Phenotype results from genotype plus environmental and developmental influences."
  ),
  q(
    "Why can genetic engineering produce insulin in bacteria?",
    ["A human insulin gene can be inserted so bacteria express the protein using shared genetic code principles.", "Bacteria naturally contain every human organ.", "Insulin is made from cellulose only.", "Genes cannot move between organisms."],
    0,
    "Because the genetic code is broadly shared, inserted genes can be transcribed and translated in host cells with proper control sequences."
  ),
  q(
    "A cancer cell divides despite DNA damage. Which normal control has likely failed?",
    ["Cell-cycle checkpoints and apoptosis pathways.", "Osmosis in xylem.", "Stomatal opening.", "Bile emulsification."],
    0,
    "Cancer often involves mutations that disrupt growth control, DNA repair, checkpoint signaling, or programmed cell death."
  ),
  q(
    "Why can selective breeding reduce genetic diversity?",
    ["Humans repeatedly choose a narrow set of parents with desired traits.", "It creates all possible alleles.", "It prevents inheritance.", "It requires no reproduction."],
    0,
    "Selection for specific traits can reduce variation by favoring a limited genetic pool."
  )
]);

topic("p5-week-11-earth-science", "P5 Week 11", "Earth Science", [
  q(
    "Why do earthquakes often occur near plate boundaries?",
    ["Plate motion builds stress that is released suddenly along faults.", "Earthquakes require no rock movement.", "Only oceans can shake.", "The core pulls buildings directly."],
    0,
    "Tectonic plates interact at boundaries. Stress accumulates until rocks slip, releasing seismic energy."
  ),
  q(
    "A rock contains rounded grains cemented together. Which origin is most likely?",
    ["Sedimentary.", "Igneous from rapid cooling only.", "Metamorphic from complete melting.", "Biological tissue."],
    0,
    "Rounded grains and cementation suggest deposition, compaction, and cementation, typical of sedimentary rocks."
  ),
  q(
    "Why do ocean tides occur mainly twice daily in many places?",
    ["Earth rotates through tidal bulges caused mostly by the Moon's gravity.", "Fish pull water toward coasts.", "Tides are caused only by wind.", "The Sun disappears twice per day."],
    0,
    "The Moon's gravitational effect and Earth's rotation create tidal patterns, modified by coastline and seafloor shape."
  ),
  q(
    "Why is weather harder to predict exactly than climate averages?",
    ["Weather depends on chaotic short-term atmospheric conditions; climate is long-term statistical pattern.", "Weather has no variables.", "Climate changes every second only.", "Weather is not scientific."],
    0,
    "Small initial differences can affect weather forecasts. Climate describes long-term distributions and averages."
  ),
  q(
    "A glacier retreats for decades. What is a scientifically careful conclusion?",
    ["It suggests sustained negative mass balance, often linked to temperature and snowfall changes.", "It proves one hot day caused all retreat.", "It means ice has no mass.", "It proves climate cannot change."],
    0,
    "Glacier retreat reflects long-term accumulation versus melting. Attribution requires climate and local data."
  ),
  q(
    "Why does Earth's axial tilt cause seasons?",
    ["It changes Sun angle and day length during Earth's orbit.", "Earth moves much closer to the Sun every summer in both hemispheres.", "The Sun becomes colder in winter.", "The Moon blocks sunlight every winter."],
    0,
    "Tilt changes solar intensity and daylight duration by hemisphere. Distance from the Sun is not the main cause of seasons."
  ),
  q(
    "What does a fossil in a rock layer help scientists infer?",
    ["Past life, relative age, and ancient environmental conditions.", "The exact future climate.", "That all rocks are igneous.", "That no erosion occurred."],
    0,
    "Fossils provide evidence about organisms, depositional environments, and relative dating when combined with stratigraphy."
  ),
  q(
    "Why can deforestation increase flood risk?",
    ["Less interception and root uptake can increase surface runoff.", "Trees create all rainfall.", "Roots make rivers flow uphill.", "Leaves absorb gravity."],
    0,
    "Vegetation intercepts rain, increases infiltration, and stabilizes soil. Removing it can increase runoff and erosion."
  ),
  q(
    "A cold ocean current flows along a coast. What climate effect is likely?",
    ["Cooler coastal air and often reduced evaporation and rainfall.", "Guaranteed tropical rainforest everywhere.", "No effect on air temperature.", "The current turns land into magma."],
    0,
    "Ocean currents transfer heat. Cold currents can cool nearby air and influence humidity and precipitation."
  ),
  q(
    "Why does Earth's magnetic field matter for life and technology?",
    ["It helps deflect charged solar particles and affects navigation and space-weather impacts.", "It creates all oxygen.", "It prevents all earthquakes.", "It replaces the atmosphere."],
    0,
    "The magnetosphere reduces some charged-particle impacts. It also influences compasses, satellites, and power-grid risks during storms."
  )
]);

topic("p5-week-12-microbiology-and-immunology", "P5 Week 12", "Microbiology and Immunology", [
  q(
    "Why did Pasteur's swan-neck flask experiment support germ theory?",
    ["Sterile broth stayed clear unless microbes from dust could enter, showing microbes came from contamination.", "It proved microbes appear from nothing.", "It showed air has no particles.", "It made bacteria visible to the naked eye."],
    0,
    "The curved neck allowed air in but trapped dust and microbes. Growth occurred when contamination reached the broth."
  ),
  q(
    "Why do antibiotics usually not work against viruses?",
    ["Viruses lack many bacterial targets such as cell-wall synthesis and independent ribosomes.", "Viruses are larger than all bacteria.", "Viruses are killed only by sugar.", "Antibiotics are not chemicals."],
    0,
    "Antibiotics target bacterial structures or processes. Viruses use host-cell machinery and have different biology."
  ),
  q(
    "A bacterial culture enters stationary phase. What is happening overall?",
    ["Cell division rate roughly equals death rate because nutrients and waste limit growth.", "All cells divide infinitely fast.", "All cells are dead immediately.", "Nutrients become unlimited."],
    0,
    "Stationary phase reflects balance between reproduction and death under resource limitation and waste accumulation."
  ),
  q(
    "Why does vaccination protect against future infection?",
    ["It exposes the immune system to antigens safely, producing memory cells.", "It kills all microbes in the world.", "It replaces white blood cells with antibiotics.", "It prevents mutation in every pathogen."],
    0,
    "Vaccines train adaptive immunity. Memory cells support faster, stronger responses after later exposure."
  ),
  q(
    "What is the key difference between innate and adaptive immunity?",
    ["Innate is rapid and broad; adaptive is specific and can form memory.", "Innate requires antibodies only; adaptive has no cells.", "Adaptive works before birth only.", "They are identical."],
    0,
    "Innate defenses respond generally and quickly. Adaptive immunity targets specific antigens and remembers them."
  ),
  q(
    "Why can overuse of antibiotics promote resistant bacteria?",
    ["Susceptible bacteria die while resistant variants survive and reproduce.", "Antibiotics intentionally create stronger humans.", "Resistance means bacteria become viruses.", "No genetic variation exists in bacteria."],
    0,
    "Antibiotics impose selection pressure. Resistant bacteria have a survival advantage and can spread."
  ),
  q(
    "A rapid antigen test is positive. What does the test most directly detect?",
    ["Specific pathogen proteins or antigens.", "The patient's entire genome.", "All antibodies ever made.", "Only fever temperature."],
    0,
    "Antigen tests detect pathogen molecules, commonly proteins, using specific binding reagents."
  ),
  q(
    "Why is inflammation useful even though it causes pain and swelling?",
    ["It brings blood flow, immune cells, and signaling molecules to damaged or infected tissue.", "It proves tissue is always healing perfectly.", "It prevents all immune action.", "It is unrelated to defense."],
    0,
    "Inflammation supports defense and repair, but excessive or chronic inflammation can be harmful."
  ),
  q(
    "Why does pasteurization reduce disease risk but not necessarily sterilize food?",
    ["It heats food enough to reduce many harmful microbes while preserving quality, but some organisms or spores may remain.", "It removes all atoms from milk.", "It makes antibiotics.", "It only changes the color of bottles."],
    0,
    "Pasteurization lowers microbial load and pathogens but is not always complete sterilization."
  ),
  q(
    "A microscope with higher magnification but poor resolution shows a bigger blur. What does this teach?",
    ["Resolution, the ability to distinguish close details, is as important as magnification.", "Magnification always improves detail.", "Microscopes do not use lenses.", "Microbes cannot be observed."],
    0,
    "Magnification enlarges an image; resolution determines whether details can be separated. Useful microscopy needs both."
  )
]);

var QUESTION_BANK = [];

function promptHasStory(prompt) {
  return /^(Case|Scenario|A |An |The |During |In |When |After |Before |On |At |Students |A student |A class |A person |A team |A farmer |A runner |A patient |A plant |A sealed |Two |Four |One )/i.test(prompt);
}

function storyFrame(topicItem, questionIndex) {
  var frames = [
    "During an SPSO training discussion on {topic}, students analyze a real classroom case.",
    "In a lab-planning meeting about {topic}, a group must justify its answer with evidence.",
    "A teacher gives an applied {topic} scenario and asks the class to avoid pure memorization.",
    "At a science club practice on {topic}, students compare a tempting shortcut with a causal explanation.",
    "In a field-note review about {topic}, a student must connect the observation to a testable mechanism.",
    "During a mock olympiad debrief on {topic}, the team checks whether the claim follows from evidence."
  ];
  return frames[questionIndex % frames.length].replace("{topic}", topicItem.title.toLowerCase());
}

function withStoryPrompt(topicItem, question, questionIndex) {
  if (promptHasStory(question.prompt)) {
    return question.prompt;
  }
  return storyFrame(topicItem, questionIndex) + " " + question.prompt;
}

function balancedOptions(question, targetAnswer) {
  var optionCount = question.options.length;
  var target = targetAnswer % optionCount;
  var shift = (question.answer - target + optionCount) % optionCount;
  return {
    options: question.options.slice(shift).concat(question.options.slice(0, shift)),
    answer: target
  };
}

function rebuildQuestionBank() {
  var number = 0;
  QUESTION_BANK = QUESTION_TOPICS.flatMap(function (topicItem) {
    return topicItem.questions.map(function (question, questionIndex) {
      number += 1;
      var balanced = balancedOptions(question, number - 1);
      return {
        id: topicItem.slug + "-" + String(questionIndex + 1).padStart(4, "0"),
        number: number,
        topicSlug: topicItem.slug,
        topicLabel: topicItem.label,
        topicTitle: topicItem.title,
        prompt: withStoryPrompt(topicItem, question, questionIndex),
        options: balanced.options,
        answer: balanced.answer,
        explanation: question.explanation
      };
    });
  });
}

rebuildQuestionBank();
