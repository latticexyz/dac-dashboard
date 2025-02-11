import { customType } from "drizzle-orm/pg-core";
import {
  Address,
  ByteArray,
  bytesToHex,
  getAddress,
  Hex,
  hexToBytes,
} from "viem";

export const asNumber = (name: string, columnType: string) =>
  customType<{ data: number; driverData: string }>({
    dataType() {
      return columnType;
    },
    toDriver(data: number): string {
      return String(data);
    },
    fromDriver(driverData: string): number {
      return Number(driverData);
    },
  })(name);

export const asBigInt = (name: string, columnType: string) =>
  customType<{ data: bigint; driverData: string }>({
    dataType() {
      return columnType;
    },
    toDriver(data: bigint): string {
      return String(data);
    },
    fromDriver(driverData: string): bigint {
      return BigInt(driverData);
    },
  })(name);

export const asHex = (name: string) =>
  customType<{ data: Hex; driverData: ByteArray }>({
    dataType() {
      return "bytea";
    },
    toDriver(data: Hex): ByteArray {
      return hexToBytes(data);
    },
    fromDriver(driverData: ByteArray | string): Hex {
      // Sometimes drizzle returns a ByteArray or \x prefixed string. Might have something to do with joins/relationships.
      return typeof driverData === "string"
        ? (driverData.replace(/^\\x/, "0x") as Hex)
        : bytesToHex(driverData);
    },
  })(name);

export const asAddress = (name: string) =>
  customType<{ data: Address; driverData: ByteArray }>({
    dataType() {
      return "bytea";
    },
    toDriver(data: Address): ByteArray {
      return hexToBytes(data);
    },
    fromDriver(driverData: ByteArray | string): Address {
      return getAddress(
        // Sometimes drizzle returns a ByteArray or \x prefixed string. Might have something to do with joins/relationships.
        typeof driverData === "string"
          ? (driverData.replace(/^\\x/, "0x") as Hex)
          : bytesToHex(driverData)
      );
    },
  })(name);
