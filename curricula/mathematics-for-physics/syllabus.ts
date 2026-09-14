export type LessonPlan = { id: string; title: string; unit: string; prerequisites: string[]; outcome: string; scope: string };
export const syllabus: LessonPlan[] = [
  {
    "id": "quantities",
    "title": "Quantities, units and scaling",
    "unit": "01 · Recover the essentials",
    "prerequisites": [],
    "outcome": "Predict how a physical quantity changes when a scale changes; separate units, dimensions and dimensionless ratios.",
    "scope": "Explain proportionality, dimensions, dimensionless groups; pendulum scaling without calculus; dimensions do not fix constants."
  },
  {
    "id": "functions",
    "title": "Functions, graphs and algebra",
    "unit": "01 · Recover the essentials",
    "prerequisites": [
      "quantities"
    ],
    "outcome": "Read an equation as a relationship, invert it carefully, and connect algebra to a graph.",
    "scope": "Domains, inverse relations versus inverse functions, compositions, powers, roots, equation vs identity, counterexample; no assumed calculus."
  },
  {
    "id": "trigonometry",
    "title": "Angles, circles and oscillations",
    "unit": "01 · Recover the essentials",
    "prerequisites": [
      "functions"
    ],
    "outcome": "Build trigonometry from the unit circle and interpret phase, amplitude and radians.",
    "scope": "Radians arc/radius, sine cosine coordinates, Pythagorean relation, phase/frequency, vector components only as geometric projections; derivative not yet."
  },
  {
    "id": "limits",
    "title": "Limits and continuity",
    "unit": "02 · Learn to describe change",
    "prerequisites": [
      "functions"
    ],
    "outcome": "Explain a limiting process without pretending that a small quantity is zero.",
    "scope": "Secants approaching tangent, removable holes, one-sided limits, continuity and failures. Intuitive precise reasoning, optional epsilon explanation only."
  },
  {
    "id": "derivatives",
    "title": "Derivatives as local models",
    "unit": "02 · Learn to describe change",
    "prerequisites": [
      "limits",
      "trigonometry"
    ],
    "outcome": "Reconstruct a derivative, use its local linear model and explain chain and product rules.",
    "scope": "Slope from quadratic displacement; local linear approximation; product/chain rule via small increments with error; differentiability caveats; derivative trig radianreason."
  },
  {
    "id": "exponentials",
    "title": "Exponentials and logarithms",
    "unit": "02 · Learn to describe change",
    "prerequisites": [
      "derivatives"
    ],
    "outcome": "Connect constant fractional growth, exponential functions and logarithmic measurement.",
    "scope": "e from continuous growth, derivative exp, inverse ln, dimensionless arguments, logarithmic derivatives and half life; do not assume complex numbers."
  },
  {
    "id": "integrals",
    "title": "Accumulation and the fundamental theorem",
    "unit": "03 · Accumulate and approximate",
    "prerequisites": [
      "derivatives",
      "exponentials"
    ],
    "outcome": "Explain why an accumulated quantity has a derivative and recover totals from rates.",
    "scope": "Signed Riemann sums, integrability basic, accumulation function squeeze reasoning FTC, boundsorientationandunits; distancevsdisplacement."
  },
  {
    "id": "integration-methods",
    "title": "Integration as changing the problem",
    "unit": "03 · Accumulate and approximate",
    "prerequisites": [
      "integrals"
    ],
    "outcome": "Choose substitution or integration by parts and explain what the transformation preserves.",
    "scope": "Substitution reverseschainrule withbounds; parts reversesproductrule boundary terms; improper integrals and convergence; one carefullyworkedphysical integral."
  },
  {
    "id": "series",
    "title": "Taylor expansions and controlled approximation",
    "unit": "03 · Accumulate and approximate",
    "prerequisites": [
      "integration-methods"
    ],
    "outcome": "Construct a useful local approximation and state when its error is under control.",
    "scope": "Taylor from matching derivatives; remainder bound; geometric series and radius; local finite approximation vs convergent infinite representation; smallangle pendulum."
  },
  {
    "id": "vectors",
    "title": "Vectors, projections and inner products",
    "unit": "04 · Find structure in many quantities",
    "prerequisites": [
      "trigonometry",
      "quantities"
    ],
    "outcome": "Separate a geometric vector from its components and interpret projection and orthogonality.",
    "scope": "Vectors, basis independence, dotproduct asprojection, norm, CauchySchwarz intuitivegeometry, orthonormalbasis no matrices assumption."
  },
  {
    "id": "linear-maps",
    "title": "Linear maps and systems of equations",
    "unit": "04 · Find structure in many quantities",
    "prerequisites": [
      "vectors",
      "functions"
    ],
    "outcome": "Interpret a matrix through what it does to a basis and solve a linear system geometrically.",
    "scope": "Linearity columns basis, composition, invertibility nullspace/rank, elimination, determinant oriented area and changebasis inverseconvention."
  },
  {
    "id": "eigenvectors",
    "title": "Eigenvectors and natural coordinates",
    "unit": "04 · Find structure in many quantities",
    "prerequisites": [
      "linear-maps"
    ],
    "outcome": "Find directions a map preserves and explain when an eigenbasis simplifies a problem.",
    "scope": "2x2 symmetric example, characteristic equation, orthogonal eigenvectors distinct eigenvalues shortwhy, repeatedvalues/symmetricdiagonalization scope, defectivecounterexample; real only."
  },
  {
    "id": "complex-numbers",
    "title": "Complex numbers as rotations",
    "unit": "05 · Describe evolving systems",
    "prerequisites": [
      "trigonometry",
      "series"
    ],
    "outcome": "Use complex numbers to represent rotation and connect exponentials to oscillations.",
    "scope": "Cartesian/polar, conjugate/modulus, Euler via series or ODE motivation fullystate; complex division; phase and realpart; no contour calculus."
  },
  {
    "id": "first-order-odes",
    "title": "Differential equations and initial conditions",
    "unit": "05 · Describe evolving systems",
    "prerequisites": [
      "integration-methods",
      "exponentials"
    ],
    "outcome": "Turn a rate law into a trajectory and explain the role of initial conditions.",
    "scope": "Separable equilibriumlostdivision, linear integratingfactor why, slopefields uniqueness withnonLipschitzexampleoptional, Euler timesteps anderror; exponentialdecay."
  },
  {
    "id": "oscillators",
    "title": "Oscillators, damping and resonance",
    "unit": "05 · Describe evolving systems",
    "prerequisites": [
      "first-order-odes",
      "complex-numbers"
    ],
    "outcome": "Explain a second-order system through restoring force, damping and response to forcing.",
    "scope": "SHO derived from explicitforce, complexroots, initialpositionvelocity, energy, dampingregimes, harmonicforcingresonanceandfinite damping qualifications."
  },
  {
    "id": "multivariable",
    "title": "Derivatives in several directions",
    "unit": "06 · Work in several dimensions",
    "prerequisites": [
      "derivatives",
      "vectors"
    ],
    "outcome": "Use a total differential and a gradient to distinguish a path change from a partial change.",
    "scope": "Partial derivatives, directional derivative gradient dot direction, differentiabilitynotguaranteedbypartials, multivarchainrule, Hessian preview."
  },
  {
    "id": "multiple-integrals",
    "title": "Integration and coordinates in several dimensions",
    "unit": "06 · Work in several dimensions",
    "prerequisites": [
      "multivariable",
      "integration-methods",
      "linear-maps"
    ],
    "outcome": "Explain how a coordinate transformation changes area or volume before evaluating an integral.",
    "scope": "Iterated integrals bounds, Jacobian determinant localarea, polar/cylindrical/spherical measures derivepolar, transformationdomains and absolutevalues."
  },
  {
    "id": "constraints",
    "title": "Extrema, curvature and constraints",
    "unit": "06 · Work in several dimensions",
    "prerequisites": [
      "multivariable",
      "eigenvectors"
    ],
    "outcome": "Distinguish a stationary point from a minimum and reason about constrained variation.",
    "scope": "Hessian quadraticmodel, eigenvalues curvature, Lagrangemultiplier parallelgradients explained withtangentdirections, regularitycaveats physicalenergy."
  },
  {
    "id": "line-integrals",
    "title": "Work, paths and potentials",
    "unit": "07 · Connect local fields to whole regions",
    "prerequisites": [
      "multiple-integrals",
      "vectors"
    ],
    "outcome": "Compute a path integral and identify when only the endpoints matter.",
    "scope": "Parameterizedcurves, work F dotdr, gradientfundamentaltheorem, pathindependence, conservative potentialsign convention physicalforce=-gradU."
  },
  {
    "id": "divergence",
    "title": "Flux, divergence and conservation",
    "unit": "07 · Connect local fields to whole regions",
    "prerequisites": [
      "line-integrals",
      "multivariable"
    ],
    "outcome": "Connect outward flux from a small box to a local source density and a global balance.",
    "scope": "Surfaceorientation flux, divergence fromoppositefaces cancelling, divergencetheorem internalfacescancel, simplecube independentcheck, continuityequationwithphysicalassumptions."
  },
  {
    "id": "curl-stokes",
    "title": "Circulation, curl and Stokes' theorem",
    "unit": "07 · Connect local fields to whole regions",
    "prerequisites": [
      "divergence"
    ],
    "outcome": "Interpret curl as circulation density and explain why internal boundaries cancel.",
    "scope": "Smallrectangle derivecurl, orientationright-handrule, Stokes and Greenplanar, curl-free notglobalpotential puncturedplane example; no singularsurface misuse."
  },
  {
    "id": "coupled-modes",
    "title": "Coupled oscillators and normal modes",
    "unit": "08 · Let patterns do the work",
    "prerequisites": [
      "oscillators",
      "eigenvectors"
    ],
    "outcome": "Replace a coupled motion by independent patterns and reconstruct arbitrary initial motion.",
    "scope": "Twoequalmasses springs stiffnessmatrix positive; massweightedgeneralizationquotedwith explanation; symmetric/antisymmetric, superpositionenergy."
  },
  {
    "id": "fourier",
    "title": "Fourier analysis: functions as superpositions",
    "unit": "08 · Let patterns do the work",
    "prerequisites": [
      "coupled-modes",
      "integration-methods",
      "complex-numbers"
    ],
    "outcome": "Find mode amplitudes by projection and distinguish a signal from one representation of it.",
    "scope": "Orthogonalfunctions innerproduct coefficients derived, squarewave firstterms, convergence/Gibbs, transform convention exp(-ikx), inverse1/(2pi), Parsevalwithscope."
  },
  {
    "id": "pdes",
    "title": "Waves, diffusion and boundary conditions",
    "unit": "08 · Let patterns do the work",
    "prerequisites": [
      "fourier",
      "multivariable"
    ],
    "outcome": "Use separation of variables and boundary data to explain how spatial patterns evolve.",
    "scope": "Derivewavefromstringforce smallslope andheatfromconservationconstitutivelaw, separationeigenmodes, Dirichlet examples, initialdata heatone/wavetwo; Laplace stationarybridge."
  },
  {
    "id": "green-functions",
    "title": "Convolution, impulses and Green functions",
    "unit": "09 · Responses and uncertainty",
    "prerequisites": [
      "pdes",
      "first-order-odes"
    ],
    "outcome": "Build a response to distributed forcing from responses to simple localized inputs.",
    "scope": "Convolution derive via impulseresponse, delta as distribution notinfiniteordinaryfunction, causalfirstorderGreen, boundaryoperatorandconditionsdetermineGreen; no productofdelta."
  },
  {
    "id": "probability",
    "title": "Probability as weighted reasoning",
    "unit": "09 · Responses and uncertainty",
    "prerequisites": [
      "integrals"
    ],
    "outcome": "Distinguish density from probability and compute expectations, variance and conditional probabilities.",
    "scope": "Sampleeventsdiscretecontinuousnormalization, conditional independence, expectationlinear, variancesumcovariance; physicsrule forprob given notquantum assumed."
  },
  {
    "id": "gaussian",
    "title": "Gaussian uncertainty and many small contributions",
    "unit": "09 · Responses and uncertainty",
    "prerequisites": [
      "probability",
      "multiple-integrals",
      "series"
    ],
    "outcome": "Explain Gaussian normalization, error propagation and when averaging reduces uncertainty.",
    "scope": "Gaussianintegralsquarepolar, moments, CLTconditionsfinitevarianceindependence qualifications; linearerrorpropagation covariance, correlations vs1/sqrtN; notuniversalityallnoise."
  },
  {
    "id": "variation",
    "title": "Varying a path: the calculus of variations",
    "unit": "10 · Bridges into theoretical physics",
    "prerequisites": [
      "constraints",
      "integration-methods",
      "oscillators"
    ],
    "outcome": "Derive the Euler–Lagrange equation by varying a path and keeping boundary terms visible.",
    "scope": "Functionvsfunctional, fixedendpointvariation, integrationbypartsandfundamentallemmaintuitive, stationaritynotminimum, freeparticle/SHO explicitLagrangian physicalpostulatestated."
  },
  {
    "id": "complex-analysis",
    "title": "Complex differentiation and contour reasoning",
    "unit": "10 · Bridges into theoretical physics",
    "prerequisites": [
      "complex-numbers",
      "curl-stokes"
    ],
    "outcome": "Explain the strong constraint of complex differentiability and evaluate a simple contour integral.",
    "scope": "Derivative independentdirectionCRassumptions, contourintegration, Cauchytheoremwithholesqualification, integral1/z circle andresidue simplepole; deepresultsmarkedquotednotproofcatalog."
  },
  {
    "id": "quantum-vectors",
    "title": "Complex vector spaces and quantum notation",
    "unit": "10 · Bridges into theoretical physics",
    "prerequisites": [
      "eigenvectors",
      "complex-numbers",
      "probability"
    ],
    "outcome": "Read state vectors, inner products and Hermitian operators with their assumptions explicit.",
    "scope": "Conjugateinnerproduct physicalpostulatesseparate, finite2stateprojectors Bornprobabilities, unitarynorm preservation, Hermitianeigenvaluesargument, commutatorincompatibility no fullQMclaim."
  },
  {
    "id": "tensors",
    "title": "Tensors: objects beyond their components",
    "unit": "11 · Coordinates, geometry and symmetry",
    "prerequisites": [
      "linear-maps",
      "multivariable"
    ],
    "outcome": "Distinguish a vector, covector and bilinear form through how they act and transform.",
    "scope": "Dualbasis linearfunctional, changebasis e'=eS v'=S^-1v covectorrow'=rowS metric'=S^TgS, indexsummation explicit repeatedonceupdown, nontensorarraycounter."
  },
  {
    "id": "metrics",
    "title": "Metrics and a first look at spacetime",
    "unit": "11 · Coordinates, geometry and symmetry",
    "prerequisites": [
      "tensors",
      "multiple-integrals"
    ],
    "outcome": "Use a metric to measure displacement and distinguish coordinate effects from geometry.",
    "scope": "Euclideanpolar metric derive, tangentlocal curvedsphereintrinsic no curvaturetensorderivation claim; Minkowski signature -+++ ctcoordinate, interval classification, Lorentzboost invariant derivation."
  },
  {
    "id": "symmetry",
    "title": "Symmetry, generators and conserved quantities",
    "unit": "11 · Coordinates, geometry and symmetry",
    "prerequisites": [
      "variation",
      "metrics",
      "quantum-vectors"
    ],
    "outcome": "Connect a continuous transformation to its infinitesimal generator and a simple conserved quantity.",
    "scope": "Rotationmatrix derivativegenerator, noncommutingoperations via2x2simple, Noethercyclic coordinate derivation no generaltheoremproof, conservedmomentum/energy conditions; Lie groupsbridge honest."
  },
  {
    "id": "mechanics-synthesis",
    "title": "Bring it together: a pendulum beyond its simplest model",
    "unit": "12 · Reconstruct the physics",
    "prerequisites": [
      "variation",
      "series",
      "oscillators"
    ],
    "outcome": "Construct a pendulum model, explain its approximation and assess its limits.",
    "scope": "Extended capstone actualfull nonlinearODEfromL, smallangle, energy integralperiod leadingcorrection optionalderived, dimensionless amplitude; guided numericproject clear workedreview notrequirescode."
  },
  {
    "id": "fields-synthesis",
    "title": "Bring it together: heat on a finite rod",
    "unit": "12 · Reconstruct the physics",
    "prerequisites": [
      "pdes",
      "divergence",
      "green-functions"
    ],
    "outcome": "Build and test a diffusion solution from conservation, boundary conditions and mode amplitudes.",
    "scope": "Explicitrod BCinitialsinecombo solution, physicalpositivity qualifications energydecayverify unitsandtime scale, numericalorhandproject referencesprior solidselfcontainedrubric."
  },
  {
    "id": "quantum-relativity-synthesis",
    "title": "Bring it together: invariants in two mathematical worlds",
    "unit": "12 · Reconstruct the physics",
    "prerequisites": [
      "quantum-vectors",
      "metrics",
      "symmetry"
    ],
    "outcome": "Compare preserved structures in a two-state quantum model and a spacetime coordinate change.",
    "scope": "Two separate worked miniinvestigations unitary2x2rotation norms Bornprob versus Lorentzboost Minkowskiinterval. ExplicitnotunificationnotEuclideannormboost. Capstoneindependenttasksandhonestreadiness nextphysics."
  }
];

