/* Copyright(C) 2017-2020, HJD (https://github.com/hjdhjd). All rights reserved.
 *
 * myq-accessory.ts: Base class for all myQ accessories.
 */
import {
  API,
  HAP,
  Logging,
  PlatformAccessory
} from "homebridge";

import { myQ } from "./myq";
import { myQPlatform } from "./myq-platform";

export abstract class myQAccessory {
  protected readonly accessory: PlatformAccessory;
  protected readonly api: API;
  protected readonly hap: HAP;
  protected readonly log: Logging;
  protected readonly myQ: myQ;
  protected readonly platform: myQPlatform;

  // The constructor initializes key variables and calls configureDevice().
  constructor(platform: myQPlatform, accessory: PlatformAccessory) {
    this.accessory = accessory;
    this.api = platform.api;
    this.hap = this.api.hap;
    this.log = platform.log;
    this.myQ = platform.myQ;
    this.platform = platform;

    this.configureDevice();
  }

  // All accessories require a configureDevice function. This is where all the
  // accessory-specific configuration and setup happens.
  protected abstract configureDevice(): void;

  // All accessories require an updateState function. This function gets called every
  // few seconds to refresh the accessory state based on the latest information from the
  // myQ API.
  abstract async updateState(): Promise<boolean>;
}