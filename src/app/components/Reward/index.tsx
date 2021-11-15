import { CreateTypes as ConfettiType, Options as ConfettiOptions } from 'canvas-confetti';
import { Task } from 'model/Task';
import { TaskPriority } from 'model/Task/Priority';
import React from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

type CallbackSuccess = (success: boolean) => void;

/**
 * Defines a basic component that uses "ReactCanvasConfetti" to display confetti on screen
 */
export class Rewarder extends React.Component<never, never> {
    static MAX_PARTICLES = 1000;

    // defines the default general options for a confetti shot
    readonly defaultOptions: Required<
        Pick<ConfettiOptions, 'origin' | 'particleCount' | 'ticks'>
    > = {
        origin: { y: 0.7 },
        particleCount: 100,
        ticks: 150,
    };

    // options for the current fire
    currentFireOptions: Partial<ConfettiOptions> = {};

    confetti: ConfettiType | null = null;
    running = false;

    private getInstance = instance => {
        // saving the instance to an internal property
        this.confetti = instance;
    };

    private makeShot(particleRatio: number, opts: Partial<ConfettiOptions>): Promise<null> | null {
        if (this.confetti === null) return null;

        // compute final particle count
        const finalParticleCount = Math.min(
            Rewarder.MAX_PARTICLES,
            Math.ceil(
                this.currentFireOptions.particleCount ||
                    this.defaultOptions.particleCount * particleRatio,
            ),
        );

        return this.confetti({
            ...this.defaultOptions,
            ...this.currentFireOptions,
            ...opts,
            particleCount: finalParticleCount, // put that last to ensure it override the parameter !!!
        });
    }

    /**
     * Fire the default confetti animation
     * @returns array of promises for every shot made
     */
    private fire(): (Promise<null> | null)[] {
        const promises: (Promise<null> | null)[] = [];

        promises.push(
            this.makeShot(0.25, {
                spread: 26,
                startVelocity: 55,
            }),
        );

        promises.push(
            this.makeShot(0.2, {
                spread: 60,
            }),
        );

        promises.push(
            this.makeShot(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
            }),
        );

        promises.push(
            this.makeShot(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2,
            }),
        );

        promises.push(
            this.makeShot(0.1, {
                spread: 120,
                startVelocity: 45,
            }),
        );

        return promises;
    }

    /**
     * Start a fire of confetti
     * @param options Optional options to parameter the current fire (confetti count, ...)
     * @param callback Optionnal callback that will be fired at the end of the fire
     */
    handleFire = (options: Partial<ConfettiOptions> = {}, callback?: CallbackSuccess): void => {
        this.currentFireOptions = options;
        if (this.confetti !== null && !this.running) {
            this.running = true;
            Promise.all(this.fire()).finally(() => {
                this.running = false;
                if (callback) callback(true);
            });
        } else {
            if (callback) callback(false);
        }
    };

    render(): React.ReactElement {
        return (
            <>
                <ReactCanvasConfetti
                    // set the styles as for a usual react component
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                    // set the callback for getting instance. The callback will be called after initialization ReactCanvasConfetti component
                    refConfetti={this.getInstance}
                />
            </>
        );
    }
}

/**
 * @param task the task to evaluate
 * @returns the particle count for this task (based on priority, time to complete, ...)
 */
export function getParticleCountFromTask(task: Task): number {
    const ratio = task.priority / TaskPriority.EXTREME;
    const count = ratio * (MAX_PARTICLES - MIN_PARTICLES) + MIN_PARTICLES;
    return count;
}

const MIN_PARTICLES = 40;
const MAX_PARTICLES = 200;
