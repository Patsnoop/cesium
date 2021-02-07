import Check from "../Core/Check.js";
import clone from "../Core/clone.js";
import MetadataClass from "./MetadataClass.js";
import MetadataEnum from "./MetadataEnum.js";

/**
 * A schema containing classes and enums.
 *
 * @param {Object} schema The schema JSON object.
 *
 * @alias MetadataSchema
 * @constructor
 *
 * @private
 */
function MetadataSchema(schema) {
  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.object("schema", schema);
  //>>includeEnd('debug');

  var enums = {};
  for (var enumId in schema.enums) {
    if (schema.enums.hasOwnProperty(enumId)) {
      enums[enumId] = new MetadataEnum({
        id: enumId,
        enum: schema.enums[enumId],
      });
    }
  }

  var classes = {};
  for (var classId in schema.classes) {
    if (schema.classes.hasOwnProperty(classId)) {
      classes[classId] = new MetadataClass({
        id: classId,
        class: schema.classes[classId],
        enums: enums,
      });
    }
  }

  this._classes = classes;
  this._enums = enums;
  this._name = schema.name;
  this._description = schema.description;
  this._extras = clone(schema.extras, true); // Clone so that this object doesn't hold on to a reference to the JSON
}

Object.defineProperties(MetadataSchema.prototype, {
  /**
   * Classes defined in the schema.
   *
   * @memberof MetadataSchema.prototype
   * @type {Object.<String, MetadataClass>}
   * @readonly
   * @private
   */
  classes: {
    get: function () {
      return this._classes;
    },
  },

  /**
   * Enums defined in the schema.
   *
   * @memberof MetadataSchema.prototype
   * @type {Object.<String, MetadataEnum}
   * @readonly
   * @private
   */
  enums: {
    get: function () {
      return this._enums;
    },
  },

  /**
   * The name of the schema.
   *
   * @memberof MetadataSchema.prototype
   * @type {String}
   * @readonly
   * @private
   */
  name: {
    get: function () {
      return this._name;
    },
  },

  /**
   * The description of the schema.
   *
   * @memberof MetadataSchema.prototype
   * @type {String}
   * @readonly
   * @private
   */
  description: {
    get: function () {
      return this._description;
    },
  },

  /**
   * Extras in the JSON object.
   *
   * @memberof MetadataSchema.prototype
   * @type {*}
   * @readonly
   * @private
   */
  extras: {
    get: function () {
      return this._extras;
    },
  },
});

export default MetadataSchema;