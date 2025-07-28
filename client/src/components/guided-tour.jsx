import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const useDisableMouseScroll = (isDisabled) => {
  useEffect(() => {
    if (isDisabled) {
      const preventMouseScroll = (e) => {
        e.preventDefault();
      };
      window.addEventListener('wheel', preventMouseScroll, { passive: false });

      return () => {
        window.removeEventListener('wheel', preventMouseScroll);
      };
    }
  }, [isDisabled]);
};

const TourContext = createContext(null);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

const TourOverlay = () => {
  const { isActive, currentStepId } = useTour();
  const [highlightRect, setHighlightRect] = useState(null);

  useDisableMouseScroll(isActive);

  useEffect(() => {
    if (isActive && currentStepId) {
      const stepElement = document.querySelector(`[data-tour-step="${currentStepId}"]`);
      if (stepElement) {
        const updateHighlight = () => {
          const rect = stepElement.getBoundingClientRect();
          setHighlightRect(rect);
        };

        updateHighlight();

        const handleUpdate = () => updateHighlight();
        window.addEventListener('scroll', handleUpdate, true);
        window.addEventListener('resize', handleUpdate);

        return () => {
          window.removeEventListener('scroll', handleUpdate, true);
          window.removeEventListener('resize', handleUpdate);
        };
      }
    } else {
      setHighlightRect(null);
    }
  }, [isActive, currentStepId]);

  if (!isActive || !highlightRect) {
    return null;
  }

  const padding = 8;

  return (
    (<div className="fixed inset-0 z-[10000] pointer-events-auto">
      <div
        className="fixed inset-0 bg-black/30 z-[10001] backdrop-blur-sm pointer-events-auto" />
      <div
        className="absolute rounded-xl pointer-events-none"
        style={{
          left: highlightRect.left - padding,
          top: highlightRect.top - padding,
          width: highlightRect.width + padding * 2,
          height: highlightRect.height + padding * 2,
          transition: 'all 0.3s ease'
        }} />
    </div>)
  );
};

const GlobalTourPopover = () => {
  const {
    isActive,
    currentStepId,
    currentStepIndex,
    totalSteps,
    nextStep,
    prevStep,
    stopTour
  } = useTour();

  const [currentStepData, setCurrentStepData] = useState(null);
  const [targetElement, setTargetElement] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0, position: 'bottom' });
  const popoverRef = useRef(null);

  const calculateOptimalPosition = useCallback((targetRect, preferredPosition = 'bottom') => {
    const popoverWidth = popoverRef.current?.offsetWidth || 320;
    const popoverHeight = popoverRef.current?.offsetHeight || 200;
    const margin = 16;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isMobile = viewportWidth < 768;

    const spaceTop = targetRect.top;
    const spaceBottom = viewportHeight - targetRect.bottom;

    let position = preferredPosition;
    let top = 0;
    let left = 0;

    if (isMobile) {
      left = (viewportWidth - popoverWidth) / 2;

      const positionsToTry = ['bottom', 'top'];
      if (preferredPosition === 'top') {
        positionsToTry.reverse();
      }

      let placed = false;
      for (const pos of positionsToTry) {
        if (pos === 'bottom' && spaceBottom >= popoverHeight + margin) {
          top = targetRect.bottom + margin;
          position = 'bottom';
          placed = true;
          break;
        }
        if (pos === 'top' && spaceTop >= popoverHeight + margin) {
          top = targetRect.top - popoverHeight - margin;
          position = 'top';
          placed = true;
          break;
        }
      }

      if (!placed) {
        position = 'bottom';
        top = viewportHeight - popoverHeight - margin;
      }
    } else {
      const spaceLeft = targetRect.left;
      const spaceRight = viewportWidth - targetRect.right;
      const positionsToTry = [preferredPosition, 'bottom', 'top', 'right', 'left'];
      const uniquePositions = [...new Set(positionsToTry)];

      let placed = false;
      for (const p of uniquePositions) {
        if (p === 'bottom' && spaceBottom >= popoverHeight + margin) {
          position = 'bottom';
          top = targetRect.bottom + margin;
          left = targetRect.left + (targetRect.width / 2) - (popoverWidth / 2);
          placed = true;
          break;
        }
        if (p === 'top' && spaceTop >= popoverHeight + margin) {
          position = 'top';
          top = targetRect.top - popoverHeight - margin;
          left = targetRect.left + (targetRect.width / 2) - (popoverWidth / 2);
          placed = true;
          break;
        }
        if (p === 'right' && spaceRight >= popoverWidth + margin) {
          position = 'right';
          top = targetRect.top + (targetRect.height / 2) - (popoverHeight / 2);
          left = targetRect.right + margin;
          placed = true;
          break;
        }
        if (p === 'left' && spaceLeft >= popoverWidth + margin) {
          position = 'left';
          top = targetRect.top + (targetRect.height / 2) - (popoverHeight / 2);
          left = targetRect.left - popoverWidth - margin;
          placed = true;
          break;
        }
      }

      if (!placed) {
        top = (viewportHeight - popoverHeight) / 2;
        left = (viewportWidth - popoverWidth) / 2;
      }
    }

    top = Math.max(margin, Math.min(top, viewportHeight - popoverHeight - margin));
    left = Math.max(margin, Math.min(left, viewportWidth - popoverWidth - margin));

    return { top, left, position };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (isActive && currentStepId) {
        const stepElement = document.querySelector(`[data-tour-step="${currentStepId}"]`);
        if (stepElement) {
          const rect = stepElement.getBoundingClientRect();
          const stepData = JSON.parse(stepElement.getAttribute('data-tour-config') || '{}');
          const newPosition = calculateOptimalPosition(rect, stepData.position);
          setPopoverPosition(newPosition);
        }
      }
    };

    if (isActive && currentStepId) {
      const stepElement = document.querySelector(`[data-tour-step="${currentStepId}"]`);
      if (stepElement) {
        const stepData = JSON.parse(stepElement.getAttribute('data-tour-config') || 'null');
        setCurrentStepData(stepData);
        setTargetElement(stepElement);

        stepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });

        setTimeout(() => {
          updatePosition();
        }, 300);

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
          window.removeEventListener('resize', updatePosition);
          window.removeEventListener('scroll', updatePosition, true);
        };
      }
    } else {
      setCurrentStepData(null);
      setTargetElement(null);
    }
  }, [isActive, currentStepId, calculateOptimalPosition]);

  if (!currentStepData || !targetElement) {
    return null;
  }

  const isLastStep = currentStepIndex === totalSteps - 1;
  const isFirstStep = currentStepIndex === 0;

  return (
    (<div
      ref={popoverRef}
      className="fixed z-[10003] w-80"
      style={{
        top: `${popoverPosition.top}px`,
        left: `${popoverPosition.left}px`,
        transition: 'all 0.3s ease'
      }}>
      <Card className="border-2 border-primary/20 backdrop-blur-sm shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                {currentStepIndex + 1}
              </div>
              <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={stopTour}
              className="h-6 w-6 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }} />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm leading-relaxed mb-4">
            {currentStepData.content}
          </CardDescription>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={stopTour}
                className="text-muted-foreground hover:text-foreground">
                Skip Tour
              </Button>
              {!isFirstStep && (
                <Button variant="outline" size="sm" onClick={prevStep}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              <Button size="sm" onClick={nextStep}>
                {isLastStep ? 'Finish' : 'Next'}
                {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
};

export const TourProvider = ({
  children,
  autoStart = false,
  ranOnce = true,
  storageKey = 'rigidui-tour-completed',
  shouldStart = true,
  onTourComplete,
  onTourSkip
}) => {
  const [steps, setSteps] = useState(new Map());
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeSteps, setActiveSteps] = useState([]);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);

  const registerStep = useCallback((stepConfig, element) => {
    setSteps(prev => {
      const newSteps = new Map(prev);
      newSteps.set(stepConfig.id, { ...stepConfig, element });
      return newSteps;
    });
  }, []);

  const unregisterStep = useCallback((id) => {
    setSteps(prev => {
      const newSteps = new Map(prev);
      newSteps.delete(id);
      return newSteps;
    });
  }, []);

  useEffect(() => {
    if (autoStart && !hasAutoStarted && steps.size > 0 && shouldStart) {
      const tourCompleted = ranOnce ? localStorage.getItem(storageKey) === 'true' : false;

      if (!tourCompleted) {
        const timer = setTimeout(() => {
          const filteredSteps = Array.from(steps.values())
            .sort((a, b) => a.order - b.order);

          if (filteredSteps.length > 0) {
            setActiveSteps(filteredSteps);
            setCurrentStep(0);
            setIsActive(true);
          }
          setHasAutoStarted(true);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        setHasAutoStarted(true);
      }
    }
  }, [autoStart, hasAutoStarted, steps, ranOnce, storageKey, shouldStart]);

  const startTour = () => {
    const filteredSteps = Array.from(steps.values())
      .sort((a, b) => a.order - b.order);

    if (filteredSteps.length > 0) {
      setActiveSteps(filteredSteps);
      setCurrentStep(0);
      setIsActive(true);
    }
  };

  const stopTour = (completed = false) => {
    const wasActive = isActive;

    setIsActive(false);
    setCurrentStep(0);
    setActiveSteps([]);

    if (wasActive) {
      if (completed) {
        if (ranOnce) {
          localStorage.setItem(storageKey, 'true');
        }
        if (onTourComplete) {
          onTourComplete();
        }
        window.dispatchEvent(new CustomEvent('tourCompleted', { detail: { storageKey } }));
      } else if (!completed && onTourSkip) {
        onTourSkip();
      }
    }
  };

  const nextStep = () => {
    if (currentStep < activeSteps.length - 1) {
      const newStepIndex = currentStep + 1;
      setCurrentStep(newStepIndex);
    } else {
      stopTour(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStepIndex = currentStep - 1;
      setCurrentStep(newStepIndex);
    }
  };

  const resetTourCompletion = () => {
    if (ranOnce) {
      localStorage.removeItem(storageKey);
      setHasAutoStarted(false);
      window.dispatchEvent(new CustomEvent('tourReset', { detail: { storageKey } }));
    }
  };

  return (
    (<TourContext.Provider
      value={{
        registerStep,
        unregisterStep,
        startTour,
        stopTour: () => stopTour(false),
        nextStep,
        prevStep,
        resetTourCompletion,
        isActive,
        currentStepId: activeSteps[currentStep]?.id || null,
        currentStepIndex: currentStep,
        totalSteps: activeSteps.length
      }}>
      {children}
      <TourOverlay />
      <GlobalTourPopover />
    </TourContext.Provider>)
  );
};

export const TourStep = ({ children, id, title, content, order, position }) => {
  const {
    registerStep,
    unregisterStep,
    isActive,
    currentStepId
  } = useTour();
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const stepConfig = { id, title, content, order, position };
      registerStep(stepConfig, elementRef.current);
    }

    return () => {
      unregisterStep(id);
    };
  }, [id, title, content, order, position, registerStep, unregisterStep]);

  const isCurrentStep = isActive && currentStepId === id;

  return (
    (<div
      ref={elementRef}
      data-tour-step={id}
      data-tour-config={JSON.stringify({ id, title, content, order, position })}
      className={isCurrentStep ? "relative z-[10002]" : "relative"}>
      {children}
    </div>)
  );
};

export const TourTrigger = ({ children, className, hideAfterComplete = false, storageKey = 'rigidui-tour-completed' }) => {
  const { startTour } = useTour();
  const [tourCompleted, setTourCompleted] = useState(false);

  useEffect(() => {
    if (hideAfterComplete) {
      const completed = localStorage.getItem(storageKey) === 'true';
      setTourCompleted(completed);

      const handleTourComplete = (event) => {
        const customEvent = event;
        const eventStorageKey = customEvent.detail?.storageKey || 'rigidui-tour-completed';
        if (eventStorageKey === storageKey) {
          localStorage.setItem(storageKey, 'true');
          setTourCompleted(true);
        }
      };

      const handleTourReset = (event) => {
        const customEvent = event;
        const eventStorageKey = customEvent.detail?.storageKey || 'rigidui-tour-completed';
        if (eventStorageKey === storageKey) {
          setTourCompleted(false);
        }
      };

      window.addEventListener('tourCompleted', handleTourComplete);
      window.addEventListener('tourReset', handleTourReset);

      return () => {
        window.removeEventListener('tourCompleted', handleTourComplete);
        window.removeEventListener('tourReset', handleTourReset);
      };
    }
  }, [hideAfterComplete, storageKey]);

  const handleClick = (e) => {
    e.preventDefault();
    startTour();
  };

  if (hideAfterComplete && tourCompleted) {
    return null;
  }

  return (
    (<div onClick={handleClick} className={className}>
      {children}
    </div>)
  );
};

export default TourProvider;
