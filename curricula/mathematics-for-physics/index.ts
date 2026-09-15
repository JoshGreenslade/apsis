import type { CurriculumPack, CurriculumTopic } from "@/types/curriculum";
import { choice } from "@/curriculum-support/authoring";
import { syllabus } from "./syllabus";
import { overview } from "./overview";
import { mathematicsPractice } from "./practice";
import chapter1 from "./chapters/01-quantities";
import chapter2 from "./chapters/02-functions";
import chapter3 from "./chapters/03-trigonometry";
import chapter4 from "./chapters/04-limits";
import chapter5 from "./chapters/05-derivatives";
import chapter6 from "./chapters/06-exponentials";
import chapter7 from "./chapters/07-integrals";
import chapter8 from "./chapters/08-integration-methods";
import chapter9 from "./chapters/09-series";
import chapter10 from "./chapters/10-vectors";
import chapter11 from "./chapters/11-linear-maps";
import chapter12 from "./chapters/12-eigenvectors";
import chapter13 from "./chapters/13-complex-numbers";
import chapter14 from "./chapters/14-first-order-odes";
import chapter15 from "./chapters/15-oscillators";
import chapter16 from "./chapters/16-multivariable";
import chapter17 from "./chapters/17-multiple-integrals";
import chapter18 from "./chapters/18-constraints";
import chapter19 from "./chapters/19-line-integrals";
import chapter20 from "./chapters/20-divergence";
import chapter21 from "./chapters/21-curl-stokes";
import chapter22 from "./chapters/22-coupled-modes";
import chapter23 from "./chapters/23-fourier";
import chapter24 from "./chapters/24-pdes";
import chapter25 from "./chapters/25-green-functions";
import chapter26 from "./chapters/26-probability";
import chapter27 from "./chapters/27-gaussian";
import chapter28 from "./chapters/28-variation";
import chapter29 from "./chapters/29-complex-analysis";
import chapter30 from "./chapters/30-quantum-vectors";
import chapter31 from "./chapters/31-tensors";
import chapter32 from "./chapters/32-metrics";
import chapter33 from "./chapters/33-symmetry";
import chapter34 from "./chapters/34-mechanics-synthesis";
import chapter35 from "./chapters/35-fields-synthesis";
import chapter36 from "./chapters/36-quantum-relativity-synthesis";
import trajectories from "./chapters/16a-trajectories";
import coordinateFields from "./chapters/21a-coordinate-fields";
import transportTrajectories from "./chapters/24a-transport-trajectories";
import twoBody from "./chapters/16b-two-body";
import perturbation from "./chapters/16c-perturbation";
import vibratingString from "./chapters/24b-vibrating-string";
import electrostaticBoundaries from "./chapters/25a-electrostatic-boundaries";
import randomWalkDiffusion from "./chapters/27a-random-walk-diffusion";
import leastSquares from "./chapters/27b-least-squares";
const chapters = [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11, chapter12, chapter13, chapter14, chapter15, chapter16, chapter17, chapter18, chapter19, chapter20, chapter21, chapter22, chapter23, chapter24, chapter25, chapter26, chapter27, chapter28, chapter29, chapter30, chapter31, chapter32, chapter33, chapter34, chapter35, chapter36];
type MathematicsMinimum = NonNullable<CurriculumTopic["theoreticalMinimum"]>;
type MathematicsMinimumOverrides = Pick<
  MathematicsMinimum,
  "invariant" | "limitingCase" | "counterexample" | "validity"
>;
const minimumOverrides: Record<string, MathematicsMinimumOverrides> = {
  quantities: { invariant: "Dimensions and units remain consistent under every valid rearrangement.", limitingCase: "A dimensionless ratio can vary while dimensional analysis remains silent about its numerical constant.", counterexample: "Matching dimensions does not prove two quantities have the same physical meaning.", validity: "Scaling predicts form, not the dimensionless constants or detailed dynamics." },
  functions: { invariant: "A function assigns one output to each allowed input; domain restrictions survive inversion and composition.", limitingCase: "A relation may have an inverse relation without having an inverse function on its full domain.", counterexample: "$y=x^2$ cannot be inverted to one-valued $x(y)$ without restricting the domain.", validity: "Graph and algebraic reasoning depend on the declared domain, codomain, and variables." },
  trigonometry: { invariant: "$\\sin^2\\theta+\\cos^2\\theta=1$ expresses the unit-circle geometry behind components and phase.", limitingCase: "As an angle tends to zero, radians make arc length proportional to angle and expose the small-angle model.", counterexample: "Degrees cannot be substituted into derivative or series formulas that assume radians.", validity: "Sine and cosine describe periodic geometry; their physical interpretation depends on the chosen phase and units." },
  limits: { invariant: "A limit describes the value approached by outputs, not necessarily the value assigned at the input.", limitingCase: "A removable hole can have a well-defined limit even when the function is undefined at that point.", counterexample: "A function can have finite one-sided limits that disagree, so its two-sided limit does not exist.", validity: "Limit reasoning requires a specified approach, and continuity adds the separate condition that the function is defined there." },
  derivatives: { invariant: "The derivative is the coefficient of the best local linear prediction, with the remaining error smaller than the displacement.", limitingCase: "At a stationary point the first-order term vanishes, so curvature or higher order controls the local behaviour.", counterexample: "A function can have partial-looking slopes or a cusp without being differentiable.", validity: "Product and chain rules require differentiability where they are applied; a symbolic expression alone does not guarantee it." },
  exponentials: { invariant: "$d(e^x)/dx=e^x$ makes exponential growth proportional to the quantity already present.", limitingCase: "As the growth rate tends to zero, exponential change approaches constant behaviour and logarithmic timescales diverge.", counterexample: "An argument of a logarithm or exponential must be dimensionless; writing $e^{3\\,\\mathrm{s}}$ is not meaningful.", validity: "Constant fractional growth is a model assumption, not a universal law of every changing system." },
  integrals: { invariant: "Accumulation differentiates back to the rate, with orientation and units preserved.", limitingCase: "As partition width tends to zero, a Riemann sum can converge to a finite total even though each rectangle becomes small.", counterexample: "Distance and signed displacement differ when velocity changes sign.", validity: "The fundamental theorem requires appropriate continuity or integrability hypotheses and correctly oriented bounds." },
  "integration-methods": { invariant: "Substitution preserves the differential relationship; integration by parts preserves the product rule with a boundary term.", limitingCase: "An improper integral can converge only in the limiting sense, even though its interval or integrand is unbounded.", counterexample: "A formally convenient antiderivative does not establish convergence at an improper endpoint.", validity: "Methods transform a problem but do not remove convergence conditions or boundary contributions." },
  series: { invariant: "A Taylor approximation matches local derivatives while its remainder controls what was discarded.", limitingCase: "The first nonzero omitted term controls small-parameter error only within a stated neighbourhood.", counterexample: "A convergent Taylor series is local and need not converge everywhere the original function is defined.", validity: "Approximation quality depends on expansion point, domain, remainder, and the scale of the neglected term." },
  vectors: { invariant: "A geometric vector is independent of its components; inner products preserve projection and orthogonality meaning.", limitingCase: "A zero projection can coexist with nonzero vectors when they are orthogonal.", counterexample: "Equal component lists in different bases do not imply equal geometric vectors.", validity: "Component formulas depend on a declared basis and metric convention." },
  "linear-maps": { invariant: "A linear map preserves addition and scalar multiplication, so its action is determined by its action on a basis.", limitingCase: "A zero determinant marks loss of invertibility and collapse of volume in the mapped directions.", counterexample: "A matrix product is not generally commutative, even when both factors represent familiar transformations.", validity: "Rank, nullspace, determinant, and inverse claims depend on finite-dimensional linear structure and the chosen bases." },
  eigenvectors: { invariant: "An eigenvector keeps its direction under a map and converts coupled action into scalar multiplication.", limitingCase: "Repeated eigenvalues need not provide enough independent eigenvectors to form a basis.", counterexample: "Not every real matrix has a real eigenbasis, and a defective matrix cannot be diagonalised merely by solving its characteristic equation.", validity: "Diagonalisation requires sufficient independent eigenvectors; symmetric cases provide stronger guarantees than general maps." },
  "complex-numbers": { invariant: "Multiplication by a complex number composes scaling and rotation while modulus multiplication and conjugation remain consistent.", limitingCase: "As the angle tends to zero, complex multiplication approaches an infinitesimal rotation and recovers the real tangent picture.", counterexample: "Taking only the real part of a complex amplitude loses phase information needed to reconstruct an oscillation.", validity: "Complex notation is a representation; physical observables and conventions still determine which part or norm is meaningful." },
  "first-order-odes": { invariant: "A rate law plus an initial condition selects a trajectory, while equilibria and uniqueness govern whether nearby states remain distinguishable.", limitingCase: "As the Euler timestep tends to zero, the discrete update approaches the differential equation only under stability and regularity conditions.", counterexample: "Dividing by a state variable can discard an equilibrium solution.", validity: "Existence, uniqueness, and numerical stability are separate questions from finding a formal antiderivative." },
  oscillators: { invariant: "Restoring, damping, and forcing terms determine energy exchange and frequency response.", limitingCase: "Zero damping gives sustained resonance in the ideal model; finite damping keeps the response bounded.", counterexample: "A stationary solution of the homogeneous equation is not the complete forced response.", validity: "Linear oscillator conclusions fail when restoring forces, damping, or forcing depend materially on amplitude." },
  multivariable: { invariant: "A total differential combines directional changes linearly through the gradient when the function is differentiable.", limitingCase: "At a critical point the first-order change vanishes, so the Hessian or higher structure becomes decisive.", counterexample: "Existing partial derivatives do not by themselves guarantee differentiability.", validity: "Gradient and chain-rule interpretations require a local linear approximation, not merely separately computed partials." },
  "multiple-integrals": { invariant: "A coordinate change preserves the physical integral when the Jacobian correctly converts local area or volume.", limitingCase: "At a coordinate singularity the chart may fail even though the underlying region and integral remain regular.", counterexample: "Forgetting the absolute Jacobian factor changes an area or volume rather than merely its notation.", validity: "Change-of-variable formulas require suitable maps, domains, orientation handling, and integrability." },
  constraints: { invariant: "At a regular constrained extremum, the allowed tangent directions cannot produce a first-order change.", limitingCase: "When the constraint gradient vanishes, the usual Lagrange-multiplier conclusion can fail.", counterexample: "A stationary point is not automatically a minimum; curvature and boundary behaviour still matter.", validity: "The multiplier method identifies candidates under regularity assumptions and does not replace classification." },
  "line-integrals": { invariant: "A conservative field has path-independent work because its line integral is the endpoint difference of a potential.", limitingCase: "For a closed path in a conservative field, the total work is zero.", counterexample: "A curl-free field on a punctured domain need not possess a single-valued global potential.", validity: "Potential arguments depend on domain topology and the sign convention relating force to potential energy." },
  divergence: { invariant: "Outward flux from a region equals accumulated local source strength when internal boundary contributions cancel.", limitingCase: "A uniform field has zero divergence even though it crosses a closed surface with nonzero local flux on parts of that surface.", counterexample: "Flux through one face is not the same as net flux through the closed boundary.", validity: "The divergence theorem requires suitable smoothness, orientation, and a properly closed region." },
  "curl-stokes": { invariant: "Circulation around a boundary equals the integrated local curl when orientations are matched.", limitingCase: "A constant field has zero curl and contributes no net circulation around a closed planar loop.", counterexample: "Curl-free does not guarantee a global potential on a domain with a puncture.", validity: "Stokes' theorem depends on orientation and surface regularity; local curl does not encode all global topology." },
  "coupled-modes": { invariant: "Eigenmodes evolve independently and their superposition reconstructs the coupled motion.", limitingCase: "Equal masses and symmetric springs split into symmetric and antisymmetric modes.", counterexample: "A coupled system cannot be treated as independent coordinates before its stiffness structure has been diagonalised.", validity: "Normal-mode decoupling requires the stated linearity and suitable symmetry or mass-weighted eigenproblem." },
  fourier: { invariant: "Orthogonal projection preserves enough coefficient information to reconstruct the represented signal within the stated convergence sense.", limitingCase: "Adding more square-wave modes sharpens edges but produces persistent Gibbs overshoot near discontinuities.", counterexample: "A finite Fourier sum is not the same thing as the original function at every point.", validity: "Convergence, normalization, and phase depend on the function space, boundary conditions, and transform convention." },
  pdes: { invariant: "Boundary data select allowable spatial modes, while the evolution law determines how each mode changes in time.", limitingCase: "A steady state removes time dependence but still must satisfy the spatial equation and boundary data.", counterexample: "A separated solution satisfying the differential equation but not the boundary conditions is not a solution to the physical problem.", validity: "Wave and heat equations encode ideal constitutive laws and boundary assumptions; separation is not universally complete." },
  "green-functions": { invariant: "A linear response to distributed forcing is the superposition of responses to localized inputs, with the boundary condition built into the Green function.", limitingCase: "A delta-like input is a limiting distribution, not an ordinary infinite-valued function.", counterexample: "Using the wrong causal or boundary Green function gives a formally plausible but physically incompatible response.", validity: "Green-function construction depends on linearity, operator domain, boundary conditions, and the permitted distributional interpretation." },
  probability: { invariant: "Probabilities normalize, expectations are linear, and conditional reasoning must respect the declared sample space.", limitingCase: "A continuous variable assigns probability through an interval integral; a single point can have zero probability without being impossible.", counterexample: "Uncorrelated variables need not be independent unless additional assumptions hold.", validity: "Probability conclusions depend on the modelled distribution, conditioning information, and independence assumptions." },
  gaussian: { invariant: "Standardisation preserves probability content while exposing the normal distribution's symmetry and scale.", limitingCase: "As sample size grows, properly scaled sums approach a Gaussian under broad conditions, not because every variable is itself Gaussian.", counterexample: "A bell-shaped histogram with a small sample does not establish normality or justify every Gaussian tail calculation.", validity: "Central-limit approximations require conditions on dependence, variance, and sample size; tails remain model-sensitive." },
  variation: { invariant: "A stationary action has vanishing first variation for admissible perturbations, yielding the Euler-Lagrange equation.", limitingCase: "For a quadratic Lagrangian, the variational equation reproduces the familiar linear oscillator equation.", counterexample: "Stationary action does not mean the path minimises the action; it may be a maximum or saddle.", validity: "The derivation depends on admissible variations, differentiability, boundary conditions, and the chosen Lagrangian model." },
  "complex-analysis": { invariant: "Complex differentiability imposes linked real and imaginary derivatives, making analytic functions far more rigid than real differentiable ones.", limitingCase: "A function can have a real derivative in one direction at a point while failing the direction-independent complex derivative.", counterexample: "Real differentiability of the component functions does not establish complex analyticity.", validity: "Cauchy-type results require analyticity and domain hypotheses that cannot be dropped for convenience." },
  "quantum-vectors": { invariant: "Inner products determine amplitudes, norms, orthogonality, and the probabilities of measurement outcomes.", limitingCase: "A one-dimensional state has only a global phase and a normalisation condition, leaving no nontrivial measurement basis choice.", counterexample: "A state vector's components depend on basis; they are not probabilities until amplitudes are projected and squared.", validity: "The vector formalism describes the stated finite-dimensional quantum model, not every physical detail of measurement or dynamics." },
  tensors: { invariant: "A tensor represents a multilinear object independently of coordinates, with components transforming to preserve its geometric meaning.", limitingCase: "A scalar is a rank-zero tensor and a vector is a rank-one special case.", counterexample: "An arbitrary array of numbers is not automatically a tensor; its transformation law matters.", validity: "Tensor identities require consistent index variance, basis transformations, and the underlying vector spaces." },
  metrics: { invariant: "A metric converts tangent vectors into inner products and lengths while its components transform with the coordinate basis.", limitingCase: "In Cartesian Euclidean coordinates the metric is constant and the connection coefficients vanish.", counterexample: "Vanishing Christoffel symbols at one point do not imply globally flat curvature.", validity: "Metric conclusions depend on signature, differentiability, coordinate chart, and whether curvature is actually computed." },
  symmetry: { invariant: "A continuous symmetry constrains the dynamics and, under the variational hypotheses, corresponds to a conserved quantity.", limitingCase: "A discrete symmetry can constrain selection or degeneracy without producing a continuous Noether charge in the same way.", counterexample: "A visual resemblance is not a symmetry unless the governing equations and action are unchanged.", validity: "Noether-style conclusions require a stated action, differentiable transformations, and suitable boundary conditions." },
  "mechanics-synthesis": { invariant: "Energy, phase-space structure, nondimensional groups, and numerical error provide independent checks on a nonlinear mechanical model.", limitingCase: "The small-angle limit recovers the linear oscillator, while the full energy integral remains available beyond that approximation.", counterexample: "A close numerical trajectory does not prove the integrator preserves the correct energy or that the force approximation is accurate.", validity: "The synthesis separates model, approximation, quadrature, and time-stepping errors; none can be inferred from one plot alone." },
  "fields-synthesis": { invariant: "Local differential laws, global integral balances, boundary data, and modal decompositions must agree on the same field solution.", limitingCase: "A uniform or steady field removes selected derivatives but still must satisfy sources and boundaries.", counterexample: "A field satisfying a local PDE can violate the global boundary or conservation condition.", validity: "The synthesis assumes the stated smoothness, constitutive laws, domain, and boundary conditions." },
  "quantum-relativity-synthesis": { invariant: "Representation changes preserve the underlying inner products, tensor contractions, or symmetry statements they are meant to describe.", limitingCase: "Classical or nonrelativistic limits should recover the corresponding earlier theory when the relevant parameter becomes small.", counterexample: "A formally covariant expression can still encode the wrong physical model or signature convention.", validity: "These are bridges across advanced theories; quoted results retain the scope and assumptions stated in their source theories." },
};
function mathematicsTheoreticalMinimum(plan: (typeof syllabus)[number]): MathematicsMinimum {
  const override = minimumOverrides[plan.id];
  if (!override) throw new Error(`Missing mathematical theoretical minimum for ${plan.id}`);
  return {
    coreIdea: plan.outcome,
    widerConnection: `This chapter's ${plan.scope} becomes a reusable structure for the later physics chapters and synthesis investigations.`,
    primitives: [plan.outcome, `Core structures: ${plan.scope}`, "A derivation, representation, or physical prediction that can be checked"],
    assumptions: ["Definitions and notation are fixed before manipulating the object.", "The stated physical or mathematical model is narrower than every possible application.", "Intermediate steps preserve the relevant units, domains, orientation, or transformation rules."],
    governingLaw: `The chapter's central structure is ${plan.scope}.`,
    derivation: "Start from the concrete question, define the objects, derive the central relation one consequential step at a time, and interpret what each assumption permits or rules out.",
    checks: ["Check dimensions, domains, signs, or transformation behaviour.", "Test a simple case and a limiting case.", "Ask which assumption would fail first in a new application."],
    ...override,
  };
}
const transferProblems: Record<
  string,
  NonNullable<CurriculumTopic["transferProblems"]>
> = {
  trigonometry: [
    choice(
      "transfer-scale-phase",
      "A pendulum's period scales as the square root of its length, while a sinusoidal phase advances uniformly in time. Which shared idea lets you compare these statements without confusing the quantities?",
      ["Keep dimensions and the dimensionless phase argument separate", "Treat every angle as a length", "Assume every proportionality has the same constant"],
      0,
      "Dimensions constrain the period, while the argument of sine must be dimensionless; separating those roles prevents a scaling law from being mistaken for a phase law.",
      "Ask which quantities carry units and which quantity is an angle inside a periodic function.",
    ),
    choice(
      "transfer-components",
      "A vector has components $(3,4)$ in an orthonormal basis. Which later mathematical idea is already present in the calculation of its length?",
      ["A projection and inner product", "A limit at infinity", "A probability density"],
      0,
      "The length comes from the inner product of the vector with itself, anticipating the vectors chapter.",
      "The Pythagorean formula is an inner-product statement in disguise.",
    ),
  ],
  exponentials: [
    choice(
      "transfer-growth-units",
      "A decay law has rate constant $k$ with units of inverse seconds. Which expression is dimensionally valid?",
      ["$e^{-kt}$", "$e^{-k}$", "$e^{-t/\\mathrm{s}^2}$"],
      0,
      "The exponent $kt$ is dimensionless, so the exponential can represent a physical decay factor.",
      "The argument of an exponential must carry no units.",
    ),
    choice(
      "transfer-logarithmic-slope",
      "A straight line on a plot of $\\ln y$ against $t$ most directly indicates what kind of original behaviour?",
      ["Constant fractional growth or decay", "Constant acceleration in position", "A periodic function with arbitrary phase"],
      0,
      "Taking a logarithm turns multiplicative exponential change into an additive linear slope.",
      "Ask which derivative is proportional to the quantity itself.",
    ),
  ],
  series: [
    choice(
      "transfer-small-angle",
      "The approximation $\\sin\\theta\\approx\\theta$ is used in a pendulum model. What must be tracked to know whether the approximation is adequate?",
      ["The size of the neglected terms and the angle range", "Only whether the formula is dimensionally consistent", "Whether the pendulum has an integer length"],
      0,
      "Dimensions cannot measure approximation error; the next terms in the series and the actual angle determine its adequacy.",
      "A correct form can still be inaccurate outside its controlled regime.",
    ),
    choice(
      "transfer-series-modes",
      "A Fourier sum and a Taylor polynomial both add terms. What is the crucial difference?",
      ["Fourier terms represent global modes, while Taylor terms are local around an expansion point", "Taylor terms always converge globally, while Fourier terms never do", "Fourier terms have units but Taylor terms cannot"],
      0,
      "The two expansions organise approximation around different structures: global orthogonal modes versus local derivative matching.",
      "Compare what determines each coefficient and where the approximation is anchored.",
    ),
  ],
  eigenvectors: [
    choice(
      "transfer-natural-modes",
      "Why do eigenvectors reappear when analysing coupled oscillators?",
      ["They identify patterns that evolve without mixing into one another", "They guarantee every force is conservative", "They remove all initial conditions"],
      0,
      "Diagonalising the coupling matrix turns the coupled equations into independent modal equations.",
      "Look for directions preserved by the linear map.",
    ),
    choice(
      "transfer-defective",
      "A repeated eigenvalue is found for a system. What remains necessary before claiming a complete normal-mode description?",
      ["Check for enough linearly independent eigenvectors", "Assume the matrix is automatically diagonal", "Replace the eigenvalue with its reciprocal"],
      0,
      "Repeated eigenvalues can produce too few eigenvectors, so diagonalisation must be checked rather than assumed.",
      "Eigenvalues alone do not guarantee an eigenbasis.",
    ),
  ],
  oscillators: [
    choice(
      "transfer-complex-decay",
      "A damped oscillator has complex characteristic roots. What do the real and imaginary parts control?",
      ["Exponential amplitude change and oscillation frequency", "Only the equilibrium position", "The units of the mass and spring constant"],
      0,
      "The real part sets exponential growth or decay, while the imaginary part sets oscillatory phase rate.",
      "Relate $e^{(\\alpha+i\\beta)t}$ to its magnitude and phase.",
    ),
    choice(
      "transfer-resonance-model",
      "A forced oscillator responds strongly near a natural frequency. Which earlier mathematical habit prevents overclaiming?",
      ["State the damping and linearity assumptions before extending the result", "Treat the resonance peak as infinitely sharp in every system", "Ignore the forcing frequency after solving once"],
      0,
      "The ideal resonance picture depends on the model; damping and nonlinearities change the response.",
      "A derived response is conditional on its governing equation.",
    ),
  ],
  constraints: [
    choice(
      "transfer-gradient-tangent",
      "At a regular constrained extremum, why are the constraint gradient and objective gradient parallel?",
      ["All allowed tangent directions give zero first-order change", "The objective is constant everywhere", "The Hessian must be the identity"],
      0,
      "The gradient is normal to level surfaces; if every allowed tangent direction is orthogonal to the objective gradient, the two normals are parallel.",
      "Translate the constraint into the geometry of allowed directions.",
    ),
    choice(
      "transfer-curvature",
      "A Hessian has one positive and one negative eigenvalue at a stationary point. What follows?",
      ["The point is a saddle, not a local minimum", "The point is necessarily a maximum", "The function is linear nearby"],
      0,
      "Opposite curvature signs give directions of increase and decrease, which is the signature of a saddle.",
      "Use the eigenvectors as independent curvature directions.",
    ),
  ],
  "curl-stokes": [
    choice(
      "transfer-local-global",
      "What common structure links the divergence theorem and Stokes' theorem?",
      ["Internal boundary contributions cancel, connecting local density to boundary measurement", "Both require the field to be constant", "Both measure only the value at the origin"],
      0,
      "Each theorem adds local contributions over small pieces; shared internal boundaries cancel, leaving the external boundary.",
      "Think about what happens when a region is tiled by smaller regions.",
    ),
    choice(
      "transfer-topology",
      "A field has zero curl everywhere on a punctured plane. What cannot be concluded without more information?",
      ["That it has a single-valued global potential", "That its local circulation density is zero", "That the domain has a missing point"],
      0,
      "The puncture can support nonzero circulation around a loop even though the local curl vanishes away from it.",
      "Distinguish local differential information from global domain topology.",
    ),
  ],
  pdes: [
    choice(
      "transfer-eigenmodes",
      "Why do Fourier modes solve many linear PDE problems so effectively?",
      ["The differential operator acts on each mode by a simple scalar factor", "Every boundary condition is automatically satisfied", "Modes eliminate the need for initial data"],
      0,
      "Modes are eigenfunctions of the relevant operator, so the PDE separates into simpler time or space equations; boundary data still matter.",
      "Connect eigenvectors of matrices with eigenfunctions of operators.",
    ),
    choice(
      "transfer-boundaries",
      "Two functions can satisfy the same heat equation but represent different physical solutions. What distinguishes them?",
      ["Initial and boundary conditions", "The font used to write the equation", "Whether the spatial coordinate is called x or r"],
      0,
      "The differential equation gives the local law; initial and boundary data select the physical solution.",
      "A local law does not specify the whole global problem.",
    ),
  ],
  gaussian: [
    choice(
      "transfer-error-propagation",
      "Why does linear error propagation use derivatives?",
      ["Derivatives describe how small input changes map to small output changes", "Derivatives make all errors independent", "Derivatives guarantee Gaussian noise"],
      0,
      "The local linear model maps input covariance into approximate output covariance; it does not create independence or Gaussianity.",
      "Connect the derivative as a local model to uncertainty in an output.",
    ),
    choice(
      "transfer-limit-noise",
      "Averaging independent measurements often reduces standard error like $1/\\sqrt N$. Which caveat matters most?",
      ["The measurements must have suitable variance and dependence assumptions", "The underlying quantity must be exactly zero", "The sample mean is always Gaussian for any N"],
      0,
      "The scaling and Gaussian approximation depend on variance, dependence, and sample-size conditions.",
      "Statistical limits are model-dependent, not automatic consequences of taking an average.",
    ),
  ],
  symmetry: [
    choice(
      "transfer-symmetry-invariant",
      "What makes a transformation a physical symmetry rather than merely a visual resemblance?",
      ["It leaves the governing equations or action unchanged", "It changes every coordinate value", "It has a matrix representation"],
      0,
      "A symmetry preserves the structure that defines the dynamics, not merely the appearance of one diagram.",
      "Ask what mathematical object must remain unchanged.",
    ),
    choice(
      "transfer-coordinate-invariant",
      "Why is tensor notation useful when changing coordinates?",
      ["Contractions can preserve the underlying geometric quantity despite component changes", "It makes every component numerically constant", "It removes the need to declare a metric"],
      0,
      "Tensor transformation laws let coordinate-dependent components represent coordinate-independent contractions and relations.",
      "Components can change while the represented object remains the same.",
    ),
  ],
  "quantum-relativity-synthesis": [
    choice(
      "transfer-invariants-worlds",
      "What is the safest shared lesson when comparing a quantum norm with a spacetime interval?",
      ["Identify the transformation and the quantity it preserves before interpreting components", "Treat both as ordinary Euclidean lengths", "Assume every coordinate change is a physical interaction"],
      0,
      "Both examples require distinguishing representation from invariant structure, while their metrics and physical meanings remain different.",
      "The analogy is about preserved structure, not about merging the theories.",
    ),
    choice(
      "transfer-limit-theories",
      "What is a useful test when a new theory is presented as a bridge from an earlier one?",
      ["Check the appropriate limit and recover the earlier predictions", "Assume the new symbols make the old theory obsolete", "Compare only the names of the variables"],
      0,
      "A controlled classical or nonrelativistic limit tests whether the new formalism contains the earlier regime where it should.",
      "A limiting case is a structural consistency check, not a slogan about similarity.",
    ),
  ],
};
const transferNotes: Record<string, { heading: string; body: string }> = {
  trigonometry: {
    heading: "A first bridge: scale and phase are different kinds of structure",
    body: "The pendulum scaling from the opening mathematics is about how a quantity with units changes when the physical scale changes. A sine or cosine argument is different: it must be dimensionless, and its value records phase around a circle. Keeping those roles separate will matter when derivatives turn phase into angular frequency, and again when vectors turn sine and cosine into geometric components. The same symbols can participate in several structures, but the units and operation tell you which structure is active.",
  },
  exponentials: {
    heading: "The same derivative will govern many kinds of change",
    body: "Constant fractional growth is not just a special graph. It is the first example of a rate law whose derivative is proportional to the quantity itself, which is why exponentials return in decay, oscillators, Fourier modes and differential equations. The logarithm reverses that representation: it turns multiplication into addition and exposes a fractional rate as a slope. Later, when a physical system is modelled, ask whether the exponential came from an actual rate law or was merely used as a convenient fit.",
  },
  series: {
    heading: "Approximation is a relationship between a model and its error",
    body: "The small-angle pendulum and a Fourier reconstruction may both be written as sums of familiar terms, but they answer different questions. Taylor terms match local derivatives near one point; Fourier modes describe a function through global orthogonal patterns. In both cases, understanding means knowing what controls the remainder and where the representation is trustworthy. That distinction will become essential when numerical error and physical model error appear together in the synthesis investigations.",
  },
  eigenvectors: {
    heading: "Natural coordinates are a reusable idea, not a matrix trick",
    body: "An eigenvector is a direction in which a transformation becomes simple. In the next unit, the same idea turns coupled differential equations into independent modes: the matrix is replaced by an operator, and eigenvectors become mode shapes. The important transfer is therefore not memorising diagonalisation, but learning to search for patterns that evolve without mixing and then reconstruct the original state from them.",
  },
  oscillators: {
    heading: "One model can contain transient, steady and resonant behaviour",
    body: "The oscillator makes a useful distinction that will recur throughout physics: initial data create a transient, forcing creates a particular response, and damping decides which part survives. Complex exponentials package amplitude and phase, while energy supplies an independent check on the force law. Coupled oscillators will reuse this structure in several coordinates, and Fourier analysis will treat arbitrary signals as superpositions of similarly simple responses.",
  },
  constraints: {
    heading: "Curvature becomes a coordinate-free question through eigenvectors",
    body: "The Hessian is not merely a table of second derivatives. Its eigenvectors identify the directions in which the local quadratic model separates, and its eigenvalues tell you the curvature along those directions. This is the same natural-coordinate idea used for linear maps and coupled modes. Constraints then ask a further question: which of those directions are physically allowed? A stationary equation is useful only after both the geometry of the space and the allowed variations are made explicit.",
  },
  "curl-stokes": {
    heading: "Local laws become global only after the boundary is accounted for",
    body: "The divergence theorem and Stokes' theorem teach one of the most reusable habits in mathematical physics: tile a region with small pieces, track what happens on each internal boundary, and see what survives on the outside. This is why a local derivative can determine a global flux or circulation, but only with orientation and topology kept visible. The next field chapters will use the same local-to-global bridge for conservation, waves and diffusion.",
  },
  pdes: {
    heading: "Boundary data select which mathematical possibilities are physical",
    body: "A partial differential equation supplies a local evolution law, but it does not by itself choose one global field. Boundary and initial data select the admissible combination of modes. This is the operator version of the eigenvector idea: spatial eigenfunctions provide natural patterns, and their amplitudes carry the particular initial condition. When a separated solution looks convincing, ask which boundary conditions make it legitimate and which data remain to be fitted.",
  },
  gaussian: {
    heading: "Uncertainty is another place where local models meet global conclusions",
    body: "Error propagation uses derivatives because a differentiable map gives a local linear model for how small input changes affect an output. Averaging uses a different structural claim: many suitably independent contributions can approach a stable distribution after rescaling. Neither result says that every uncertainty is Gaussian or independent. The recurring discipline is to state the approximation, identify the covariance or dependence structure, and say which conclusion the data actually support.",
  },
  symmetry: {
    heading: "An invariant is more important than the coordinates used to display it",
    body: "The course has met this idea in several forms: a vector is not its component list, a tensor is not an arbitrary array, and an eigenvalue describes a map through a special direction. Symmetry pushes the idea further by asking which transformation leaves the governing structure unchanged. The conserved quantity is the shadow of that invariance. In the final synthesis, quantum norms and spacetime intervals will look different, but both require separating representation from what the transformation preserves.",
  },
  "quantum-relativity-synthesis": {
    heading: "The final comparison is about method, not unification",
    body: "The quantum and spacetime investigations are deliberately separate. Their useful common lesson is methodological: declare the transformation, identify the invariant, check the limiting or inverse case, and do not confuse a changed representation with a changed physical state. A positive probability norm and an indefinite spacetime interval are not the same object. The analogy earns its place only because it sharpens how to recognise preserved structure without erasing the theories' different assumptions.",
  },
};
const synthesisChapters = [trajectories, coordinateFields, transportTrajectories, twoBody, perturbation, vibratingString, electrostaticBoundaries, randomWalkDiffusion, leastSquares];
const synthesisIds = new Set(synthesisChapters.map(chapter => chapter.id));
const chaptersById = new Map([...chapters, ...synthesisChapters].map(chapter => [chapter.id, chapter]));
const topics = syllabus.map((plan, i) => {
  const chapter = chaptersById.get(plan.id);
  if (!chapter) throw new Error("Missing mathematics chapter: " + plan.id);
  const depth = transferNotes[plan.id];
  // These bridges are part of the chapter's teaching sequence, rather than
  // overview metadata: learners meet the connection immediately after the
  // chapter's core theory and can test whether they can transfer it.
  const chapterWithDepth = depth
    ? {
        ...chapter,
        theory: [
          ...chapter.theory,
          { heading: depth.heading, body: depth.body },
        ],
        teaching: chapter.teaching
          ? {
              ...chapter.teaching,
              checkpoints: [
                ...chapter.teaching.checkpoints,
                {
                  bridge: "Carry the chapter's structure into the next physical setting.",
                  meaning: "A chapter idea becomes more useful when you can recognise the same structure in a new physical setting.",
                  question: `What is the main transfer lesson in the section “${depth.heading}”?`,
                  answer: "The section makes the chapter's central structure explicit, then shows how the same structure reappears in a later physical model.",
                  further: [
                    {
                      question: "Which assumption makes this transfer valid?",
                      answer: "The transfer is conditional on the chapter's stated model, definitions, and validity checks; it is a structural analogy, not a license to ignore those assumptions.",
                    },
                    {
                      question: "What should you check before using the idea in a new problem?",
                      answer: "Check the objects, units or domains, boundary or initial data, and the limiting case that defines the approximation.",
                    },
                    {
                      question: "Why is this connection worth remembering?",
                      answer: "It turns an isolated technique into a reusable way of organising a derivation and testing whether its conclusion is trustworthy.",
                    },
                  ],
                },
              ],
            }
          : chapter.teaching,
      }
    : chapter;
  return {
    ...chapterWithDepth,
    practiceTemplates: mathematicsPractice[plan.id] ?? chapter.practiceTemplates,
    title: plan.title, description: plan.outcome, domain: "Mathematics for physics",
    unit: plan.unit, prerequisites: plan.prerequisites,
    minutes: i < 3 ? 45 : plan.unit.startsWith("12") || synthesisIds.has(plan.id) ? 90 : 60,
    theoreticalMinimum: chapter.theoreticalMinimum ?? mathematicsTheoreticalMinimum(plan),
    transferProblems: transferProblems[plan.id],
    sidebars: transferNotes[plan.id]
      ? [...chapter.sidebars, transferNotes[plan.id]]
      : chapter.sidebars,
  };
});
const pack: CurriculumPack = {
  id: "mathematics-for-physics", version: "1.0.0",
  title: "Mathematics for physics",
  description: "Understand the mathematical ideas behind mechanics, fields, quantum states and spacetime.",
  conventions: "Start with the algebra and trigonometry refreshers, or use their optional questions to check readiness. Angles are in radians unless stated otherwise. Enter unit 1 for dimensionless numerical answers. Work in metres, seconds and kilograms when a problem specifies SI units. Complex inner products conjugate the first argument; spacetime uses coordinates (ct,x,y,z) and signature (−,+,+,+). Allow several sittings for demanding chapters: time estimates include practice, not just reading. Automated checks assess selected answers; written reasoning and investigations have solutions for self-assessment.",
  overview, topics,
};
export default pack;
