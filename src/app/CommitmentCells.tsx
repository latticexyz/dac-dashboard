"use client";

import {
  Challenge,
  ChallengeStatus,
  InputCommitment,
  secondsPerBlock,
} from "@/common";
import { ChallengeConfig } from "@/getChallengeConfig";
import { useLatestBlockNumber } from "@/useLatestBlockNumber";
import { LabeledCell } from "./LabeledCell";
import { ShortTimestamp } from "./ShortTimestamp";
import { getChallengeStatus } from "@/getChallengeStatus";
import { bigIntMax } from "@latticexyz/common/utils";
import { TruncatedAddress } from "./TruncatedAddress";
import { ChallengeStatusCell } from "./ChallengeStatusCell";
import { CommitmentAddresses } from "./CommitmentAddresses";
import { CommitmentButtons } from "./CommitmentButtons";

type Props = {
  latestBlockNumber: bigint;
  challengeConfig: ChallengeConfig;
  commitment: InputCommitment;
};

export function CommitmentCells({
  latestBlockNumber,
  challengeConfig,
  commitment,
}: Props) {
  const blockNumber = useLatestBlockNumber(latestBlockNumber);
  const challenge = commitment.challenges[0];
  const status = getChallengeStatus(challenge, challengeConfig, blockNumber);

  if (!challenge || status === ChallengeStatus.Unchallenged) {
    const blocksElapsed = blockNumber - commitment.blockNumber;
    const blocksLeft = bigIntMax(
      0n,
      challengeConfig.challengeWindowBlocks - blocksElapsed
    );
    return (
      <>
        <ChallengeStatusCell status={status} />
        <LabeledCell label="Challenge window">
          <span className="text-white">{blocksLeft.toString()}</span> blocks
        </LabeledCell>
        <LabeledCell label="Ends (est.)">
          <span className="text-white">
            <ShortTimestamp
              timestamp={
                Math.floor(Date.now() / 1000) +
                Number(blocksLeft) * secondsPerBlock
              }
            />
          </span>
        </LabeledCell>
        <CommitmentAddresses commitment={commitment} />
        <CommitmentButtons commitment={commitment} status={status} />
      </>
    );
  }

  const blocksElapsed = blockNumber - challenge.blockNumber;
  const blocksLeft = challengeConfig.resolveWindowBlocks - blocksElapsed;
  const deadline =
    Math.floor(Date.now() / 1000) + Number(blocksLeft) * secondsPerBlock;

  if (status === ChallengeStatus.Challenged) {
    return (
      <>
        <ChallengeStatusCell status={status} />
        <LabeledCell label="Resolve window">
          <span className="text-white">
            {bigIntMax(0n, blocksLeft).toString()}
          </span>{" "}
          blocks
        </LabeledCell>
        <LabeledCell label="Ends (est.)">
          <span className="text-white">
            <ShortTimestamp timestamp={deadline} />
          </span>
        </LabeledCell>
        <CommitmentAddresses commitment={commitment} />
        <CommitmentButtons commitment={commitment} status={status} />
      </>
    );
  }

  if (status === ChallengeStatus.Resolved) {
    return (
      <>
        <ChallengeStatusCell status={status} />
        <LabeledCell label="Resolved by">
          <span className="text-white">
            <TruncatedAddress address={challenge.txFrom} />
          </span>
        </LabeledCell>
        <LabeledCell label="Ended">
          <span className="text-white">
            <ShortTimestamp timestamp={challenge.blockTimestamp} />
          </span>
        </LabeledCell>
        <CommitmentAddresses commitment={commitment} />
        <CommitmentButtons commitment={commitment} status={status} />
      </>
    );
  }

  if (
    status === ChallengeStatus.Expiring ||
    status === ChallengeStatus.Expired
  ) {
    return (
      <>
        <ChallengeStatusCell status={status} />
        <LabeledCell label="Resolve window">
          <span className="text-white">
            <span className="text-white">0</span> blocks
          </span>
        </LabeledCell>
        <LabeledCell
          label={status === ChallengeStatus.Expired ? "Ended" : "Ended (est)."}
        >
          <span className="text-white">
            <ShortTimestamp timestamp={deadline} />
          </span>
        </LabeledCell>
        <CommitmentAddresses commitment={commitment} />
        <CommitmentButtons commitment={commitment} status={status} />
      </>
    );
  }

  // TODO: return something different for an unknown/unspecified status type?
  return (
    <>
      {/* <ChallengeStatusCell status={status} />
      <LabeledCell label="Challenge window">
        <span className="text-white">42</span> blocks
      </LabeledCell>
      <LabeledCell label="Ends (est.)">
        <span className="text-white">
          <ShortTimestamp
            timestamp={
              commitment.blockTimestamp + challengeConfig.challengeWindowSeconds
            }
          />
        </span>
      </LabeledCell> */}
    </>
  );
}
