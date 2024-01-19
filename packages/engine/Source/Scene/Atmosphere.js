import Cartesian2 from "../Core/Cartesian2.js";
import Cartesian3 from "../Core/Cartesian3.js";
import DynamicAtmosphereLightingType from "./DynamicAtmosphereLightingType.js";

/**
 * Common atmosphere settings used by 3D Tiles and models for rendering sky atmosphere, ground atmosphere, and fog.
 *
 * <p>
 * This class is not to be confused with {@link SkyAtmosphere}, which is responsible for rendering the sky.
 * </p>
 * <p>
 * While the atmosphere settings affect the color of fog, see {@link Fog} to control how fog is rendered.
 * </p>
 *
 * @alias Atmosphere
 * @constructor
 *
 * @example
 * // Turn on dynamic atmosphere lighting using the sun direction
 * scene.atmosphere.dynamicLighting = Cesium.DynamicAtmosphereLightingType.SUNLIGHT;
 *
 * @example
 * // Turn on dynamic lighting using whatever light source is in the scene
 * scene.light = new Cesium.DirectionalLight({
 *   direction: new Cesium.Cartesian3(1, 0, 0)
 * });
 * scene.atmosphere.dynamicLighting = Cesium.DynamicAtmosphereLightingType.SCENE_LIGHT;
 *
 * @example
 * // Adjust the color of the atmosphere effects.
 * scene.atmosphere.hueShift = 0.4; // Cycle 40% around the color wheel
 * scene.atmosphere.brightnessShift = 0.25; // Increase the brightness
 * scene.atmosphere.saturationShift = -0.1; // Desaturate the colors
 *
 * @example
 * // Turn off ground atmosphere
 * scene.atmosphere.showGroundAtmosphere = false;
 *
 * @see SkyAtmosphere
 * @see Globe
 * @see Fog
 */
function Atmosphere() {
  /**
   * The intensity of the light that is used for computing the ground atmosphere color.
   *
   * @type {number}
   * @default 10.0
   */
  this.lightIntensity = 10.0;

  /**
   * The Rayleigh scattering coefficient used in the atmospheric scattering equations for the ground atmosphere.
   *
   * @type {Cartesian3}
   * @default Cartesian3(5.5e-6, 13.0e-6, 28.4e-6)
   */
  this.rayleighCoefficient = new Cartesian3(5.5e-6, 13.0e-6, 28.4e-6);

  /**
   * The Mie scattering coefficient used in the atmospheric scattering equations for the ground atmosphere.
   *
   * @type {Cartesian3}
   * @default Cartesian3(21e-6, 21e-6, 21e-6)
   */
  this.mieCoefficient = new Cartesian3(21e-6, 21e-6, 21e-6);

  /**
   * The Rayleigh scale height used in the atmospheric scattering equations for the ground atmosphere, in meters.
   *
   * @type {number}
   * @default 10000.0
   */
  this.rayleighScaleHeight = 10000.0;

  /**
   * The Mie scale height used in the atmospheric scattering equations for the ground atmosphere, in meters.
   *
   * @type {number}
   * @default 3200.0
   */
  this.mieScaleHeight = 3200.0;

  /**
   * The anisotropy of the medium to consider for Mie scattering.
   * <p>
   * Valid values are between -1.0 and 1.0.
   * </p>
   *
   * @type {number}
   * @default 0.9
   */
  this.mieAnisotropy = 0.9;

  /**
   * The hue shift to apply to the atmosphere. Defaults to 0.0 (no shift).
   * A hue shift of 1.0 indicates a complete rotation of the hues available.
   *
   * @type {number}
   * @default 0.0
   */
  this.hueShift = 0.0;

  /**
   * The saturation shift to apply to the atmosphere. Defaults to 0.0 (no shift).
   * A saturation shift of -1.0 is monochrome.
   *
   * @type {number}
   * @default 0.0
   */
  this.saturationShift = 0.0;

  /**
   * The brightness shift to apply to the atmosphere. Defaults to 0.0 (no shift).
   * A brightness shift of -1.0 is complete darkness, which will let space show through.
   *
   * @type {number}
   * @default 0.0
   */
  this.brightnessShift = 0.0;

  /**
   * When not {@link DynamicAtmosphereLightingType.NONE}, the selected light source will
   * be used for dynamically lighting all atmosphere-related rendering effects.
   *
   * @type {DynamicAtmosphereLightingType}
   * @default DynamicAtmosphereLightingType.NONE
   */
  this.dynamicLighting = DynamicAtmosphereLightingType.NONE;

  /**
   * The range of camera distances <code>[startDist, endDist]</code>
   * between which ground atmosphere lighting fades in. When the camera is at or
   * below startDist, no ground atmosphere lighting is applied. When the camera
   * is at or above endDist,the lighting is at maximum intensity.
   * <p>
   * Ground atmosphere lighting only applies when {@link Atmosphere#showGroundAtmosphere}
   * is <code>true.</code>
   * </p>
   * <p>
   * Camera distances are measured from the center of the earth in meters.
   * </p>
   *
   * @type {Cartesian2}
   * @default Cartesian2(1.0e7, 2.0e7)
   */
  this.lightingFadeRange = new Cartesian2(1.0e7, 2.0e7);
  /**
   * The range of camera distances <code>[startDist, endDist]</code>
   * between which nighttime shading fades in. When the camera is at or below
   * startDist, the entire globe is lit at full brightness. When the camera is
   * at or above endDist, the side of the globe facing away from the sun
   * will be in total darkness.
   * <p>
   * Nighttime shading only applies when {@link Atmosphere#showGroundAtmosphere}
   * is <code>true</code>, and {@link Atmosphere#dynamicLighting} is not {@link DynamicAtmosphereLightingType.NONE}.
   * </p>
   * <p>
   * Camera distances are measured from the center of the earth in meters.
   * </p>
   *
   * @type {Cartesian2}
   * @default Cartesian2(5.0e7, 1.0e7)
   */
  this.nightFadeRange = new Cartesian2(1.0e7, 5.0e7);

  /**
   * Enable the ground atmosphere for 3D Tiles and models. The ground atmosphere
   * is drawn over the globe when viewed from a distance between
   * <code>lightingFadeInDistance</code> and <code>lightingFadeOutDistance</code>.
   * The ground atmosphere makes the globe's surface appear brighter near the
   * edges when viewed from space.
   *
   * @type {boolean}
   * @default true
   */
  this.showGroundAtmosphere = true;
}

export default Atmosphere;
