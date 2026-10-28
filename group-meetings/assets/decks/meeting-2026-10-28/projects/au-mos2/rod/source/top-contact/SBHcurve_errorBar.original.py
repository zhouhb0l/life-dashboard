import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
from pathlib import Path

# -------------------------
# Input data
# -------------------------
distance_to_interface_ang = np.array([6.3 * 5, 6.3 * 4, 6.3 * 3, 6.3 * 2, 6.3, 0.0])
distance_to_interface = distance_to_interface_ang / 10.0

# Fixed A values
A_au_fixed = 0.11
A_ti_fixed = 0.135
LAMBDA_FIXED = 1.1

# -------------------------
# Error ranges
# -------------------------
# Ti
ti_phi0s = np.array([0.135, 0.56, 0.37, 0.26, 0.19, 0.17, 0.14])
ti_phi1s = np.array([0.195, 0.60, 0.40, 0.30, 0.23, 0.22, 0.20])

# Au
au_phi0s = np.array([0.15, 0.65, 0.40, 0.28, 0.18, 0.14, 0.13])
au_phi1s = np.array([0.15, 0.70, 0.45, 0.31, 0.22, 0.18, 0.20])

# Pristine values are the first entries in phi arrays
au_pristine = 0.5 * (au_phi0s[0] + au_phi1s[0])
ti_pristine = 0.5 * (ti_phi0s[0] + ti_phi1s[0])
au_pristine_err = 0.5 * (au_phi1s[0] - au_phi0s[0])
ti_pristine_err = 0.5 * (ti_phi1s[0] - ti_phi0s[0])

# -------------------------
# Align 6-point data to 6 distances
# (skip first element, then reverse for distance order)
# -------------------------
ti_low = ti_phi0s[1:][::-1]
ti_high = ti_phi1s[1:][::-1]

au_low = au_phi0s[1:][::-1]
au_high = au_phi1s[1:][::-1]

# Midpoint and half-range uncertainty
sbh_ti = 0.5 * (ti_low + ti_high)
err_ti = 0.5 * (ti_high - ti_low)

sbh_au = 0.5 * (au_low + au_high)
err_au = 0.5 * (au_high - au_low)


# -------------------------
# Model with fixed A and fixed lambda:
# SBH(x) = A_fixed + B * exp(-x/lambda_fixed)
# -------------------------
def model_fixed_A_lambda(x, B, A_fixed):
    return A_fixed + B * np.exp(-x / LAMBDA_FIXED)


def model_au(x, B):
    return model_fixed_A_lambda(x, B, A_au_fixed)


def model_ti(x, B):
    return model_fixed_A_lambda(x, B, A_ti_fixed)


# -------------------------
# Weighted fit (using midpoint SBH), with lambda fixed
# -------------------------
(B_au,), cov_au = curve_fit(
    model_au,
    distance_to_interface,
    sbh_au,
    p0=[0.5],
    sigma=err_au,
    absolute_sigma=True,
    bounds=([0.0], [2.0]),
)
(B_ti,), cov_ti = curve_fit(
    model_ti,
    distance_to_interface,
    sbh_ti,
    p0=[0.5],
    sigma=err_ti,
    absolute_sigma=True,
    bounds=([0.0], [2.0]),
)

B_au_err = np.sqrt(np.diag(cov_au))[0]
B_ti_err = np.sqrt(np.diag(cov_ti))[0]

print("Au (A fixed = 0.11 eV):")
print(f"  B = {B_au:.6f} +/- {B_au_err:.6f} eV")
print(f"  lambda (fixed) = {LAMBDA_FIXED:.6f} nm")

print("\nTi (A fixed = 0.135 eV):")
print(f"  B = {B_ti:.6f} +/- {B_ti_err:.6f} eV")
print(f"  lambda (fixed) = {LAMBDA_FIXED:.6f} nm")


# -------------------------
# Publication-style plot
# -------------------------
plt.rcParams.update(
    {
        "font.family": "DejaVu Sans",
        "font.size": 9,
        "axes.labelsize": 10,
        "axes.linewidth": 1.0,
        "xtick.labelsize": 9,
        "ytick.labelsize": 9,
        "xtick.direction": "in",
        "ytick.direction": "in",
        "xtick.major.width": 1.0,
        "ytick.major.width": 1.0,
        "xtick.minor.width": 0.8,
        "ytick.minor.width": 0.8,
        "legend.frameon": False,
    }
)

x_fit = np.linspace(0, 3.5, 400)
fig, ax = plt.subplots(figsize=(3.45, 2.65), constrained_layout=True)
output_dir = Path(__file__).resolve().parents[1] / "outputs"
output_dir.mkdir(exist_ok=True)

au_color = "#1f77b4"
ti_color = "#d62728"

# Error-bar data
ax.errorbar(
    distance_to_interface,
    sbh_au,
    yerr=err_au,
    fmt="o",
    ms=4.6,
    mfc="white",
    mec=au_color,
    mew=1.0,
    color=au_color,
    ecolor=au_color,
    elinewidth=1.0,
    capsize=2.8,
    label="Au (DFT)",
    zorder=3,
)
ax.errorbar(
    distance_to_interface,
    sbh_ti,
    yerr=err_ti,
    fmt="s",
    ms=4.2,
    mfc="white",
    mec=ti_color,
    mew=1.0,
    color=ti_color,
    ecolor=ti_color,
    elinewidth=1.0,
    capsize=2.8,
    label="Ti (DFT)",
    zorder=3,
)

# Electrostatic model curves
ax.plot(
    x_fit,
    model_au(x_fit, B_au),
    color=au_color,
    lw=1.8,
    label="Au (model)",
)
ax.plot(
    x_fit,
    model_ti(x_fit, B_ti),
    color=ti_color,
    lw=1.8,
    label="Ti (model)",
)

# Pristine reference points at x=0
ax.errorbar(
    0,
    au_pristine,
    yerr=au_pristine_err,
    fmt="D",
    ms=5.0,
    mfc=au_color,
    mec=au_color,
    mew=1.0,
    color=au_color,
    ecolor=au_color,
    elinewidth=1.0,
    capsize=2.5,
    zorder=4,
)
ax.errorbar(
    0,
    ti_pristine,
    yerr=ti_pristine_err,
    fmt="D",
    ms=5.0,
    mfc=ti_color,
    mec=ti_color,
    mew=1.0,
    color=ti_color,
    ecolor=ti_color,
    elinewidth=1.0,
    capsize=2.5,
    zorder=4,
)
ax.annotate(
    "Au pristine",
    xy=(0, au_pristine),
    xytext=(0.18, au_pristine - 0.05),
    color=au_color,
    fontsize=8,
)
ax.annotate(
    "Ti pristine",
    xy=(0, ti_pristine),
    xytext=(0.18, ti_pristine + 0.03),
    color=ti_color,
    fontsize=8,
)

ax.set_xlabel(r"$x_d$ (nm)")
ax.set_ylabel("Schottky barrier height (eV)")
ax.set_xlim(-0.08, 3.35)
ax.set_xticks(np.arange(0, 3.1, 0.6))
ax.minorticks_on()

ymax = max(np.max(sbh_au + err_au), np.max(sbh_ti + err_ti)) + 0.02
ax.set_ylim(0.0, ymax)

handles, labels = ax.get_legend_handles_labels()
desired_order = ["Ti (model)", "Au (model)", "Ti (DFT)", "Au (DFT)"]
label_to_handle = dict(zip(labels, handles))
ordered_handles = [label_to_handle[label] for label in desired_order if label in label_to_handle]
ordered_labels = [label for label in desired_order if label in label_to_handle]
ax.legend(
    ordered_handles,
    ordered_labels,
    loc="upper right",
    handlelength=2.1,
    borderaxespad=0.3,
)

fig.savefig(output_dir / "SBHcurve_errorBar_publication.png", dpi=600)
fig.savefig(output_dir / "SBHcurve_errorBar_publication.pdf")
fig.savefig(output_dir / "SBHcurve_errorBar_publication.svg")

plt.close(fig)
