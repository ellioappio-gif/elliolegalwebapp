/**
 * Ad Blocker Detection Utility
 * 
 * Detects if user has an ad blocker enabled with multiple fallback methods
 * Provides polite messaging for conversion rather than blocking content
 */

export interface AdBlockerDetectionResult {
  isBlocked: boolean;
  method: 'bait' | 'adsense' | 'request' | 'majority' | 'unknown';
  confidence: number; // 0-1, how confident we are in the result
}

class AdBlockerDetector {
  private static instance: AdBlockerDetector;
  private detectionResult: AdBlockerDetectionResult | null = null;
  private detectionPromise: Promise<AdBlockerDetectionResult> | null = null;

  static getInstance(): AdBlockerDetector {
    if (!AdBlockerDetector.instance) {
      AdBlockerDetector.instance = new AdBlockerDetector();
    }
    return AdBlockerDetector.instance;
  }

  /**
   * Main detection method - tries multiple approaches
   */
  async detect(): Promise<AdBlockerDetectionResult> {
    // Return cached result if available
    if (this.detectionResult) {
      return this.detectionResult;
    }

    // Return existing promise if detection is in progress
    if (this.detectionPromise) {
      return this.detectionPromise;
    }

    this.detectionPromise = this.performDetection();
    this.detectionResult = await this.detectionPromise;
    
    return this.detectionResult;
  }

  /**
   * Perform actual detection using multiple methods
   */
  private async performDetection(): Promise<AdBlockerDetectionResult> {
    const results: AdBlockerDetectionResult[] = [];

    // Method 1: Bait element test (most reliable)
    try {
      const baitResult = await this.baitElementTest();
      results.push(baitResult);
    } catch (error) {
      console.debug('Bait element test failed:', error);
    }

    // Method 2: AdSense script test
    try {
      const adsenseResult = await this.adsenseScriptTest();
      results.push(adsenseResult);
    } catch (error) {
      console.debug('AdSense script test failed:', error);
    }

    // Method 3: Network request test
    try {
      const requestResult = await this.networkRequestTest();
      results.push(requestResult);
    } catch (error) {
      console.debug('Network request test failed:', error);
    }

    // Analyze results and return most confident detection
    return this.analyzeResults(results);
  }

  /**
   * Bait element test - creates elements commonly blocked by ad blockers
   */
  private baitElementTest(): Promise<AdBlockerDetectionResult> {
    return new Promise((resolve) => {
      const baitClass = 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links';
      const baitStyle = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;';
      
      const bait = document.createElement('div');
      bait.setAttribute('class', baitClass);
      bait.setAttribute('style', baitStyle);
      bait.innerHTML = '&nbsp;';
      
      document.body.appendChild(bait);

      // Check after a short delay
      setTimeout(() => {
        const isBlocked = bait.offsetParent === null || 
                         bait.offsetHeight === 0 || 
                         bait.offsetLeft === 0 || 
                         bait.offsetTop === 0 || 
                         bait.offsetWidth === 0 ||
                         bait.clientHeight === 0 ||
                         bait.clientWidth === 0;

        // Clean up
        document.body.removeChild(bait);

        resolve({
          isBlocked,
          method: 'bait',
          confidence: 0.9
        });
      }, 100);
    });
  }

  /**
   * Test if AdSense script loads properly
   */
  private adsenseScriptTest(): Promise<AdBlockerDetectionResult> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.style.display = 'none';
      
      let resolved = false;
      
      script.onload = () => {
        if (!resolved) {
          resolved = true;
          document.head.removeChild(script);
          resolve({
            isBlocked: false,
            method: 'adsense',
            confidence: 0.8
          });
        }
      };

      script.onerror = () => {
        if (!resolved) {
          resolved = true;
          document.head.removeChild(script);
          resolve({
            isBlocked: true,
            method: 'adsense',
            confidence: 0.8
          });
        }
      };

      // Timeout fallback
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          try {
            document.head.removeChild(script);
          } catch (e) {
            // Script might not have been added
          }
          resolve({
            isBlocked: true,
            method: 'adsense',
            confidence: 0.6
          });
        }
      }, 3000);

      document.head.appendChild(script);
    });
  }

  /**
   * Test network request to known ad server
   */
  private networkRequestTest(): Promise<AdBlockerDetectionResult> {
    return new Promise((resolve) => {
      const testUrls = [
        'https://googleads.g.doubleclick.net/pagead/id',
        'https://tpc.googlesyndication.com/sodar/sodar2.js'
      ];

      const promises = testUrls.map(url => {
        return fetch(url, { 
          method: 'HEAD', 
          mode: 'no-cors',
          cache: 'no-cache'
        }).then(
          () => false, // Request succeeded, not blocked
          () => true   // Request failed, likely blocked
        );
      });

      Promise.all(promises).then(results => {
        const blockedCount = results.filter(blocked => blocked).length;
        const isBlocked = blockedCount > results.length / 2;
        
        resolve({
          isBlocked,
          method: 'request',
          confidence: 0.7
        });
      }).catch(() => {
        resolve({
          isBlocked: false,
          method: 'request',
          confidence: 0.3
        });
      });
    });
  }

  /**
   * Analyze multiple detection results and return most confident
   */
  private analyzeResults(results: AdBlockerDetectionResult[]): AdBlockerDetectionResult {
    if (results.length === 0) {
      return {
        isBlocked: false,
        method: 'unknown',
        confidence: 0
      };
    }

    // Sort by confidence
    results.sort((a, b) => b.confidence - a.confidence);

    // If highest confidence result shows blocking, return it
    const highestConfidence = results[0];
    if (highestConfidence.isBlocked) {
      return highestConfidence;
    }

    // Check if majority of results indicate blocking
    const blockedResults = results.filter(r => r.isBlocked);
    const totalConfidence = results.reduce((sum, r) => sum + r.confidence, 0);
    const blockedConfidence = blockedResults.reduce((sum, r) => sum + r.confidence, 0);

    if (blockedConfidence / totalConfidence > 0.6) {
      return {
        isBlocked: true,
        method: 'majority',
        confidence: blockedConfidence / totalConfidence
      };
    }

    // Default to not blocked
    return highestConfidence;
  }

  /**
   * Clear cached detection result (for testing)
   */
  clearCache(): void {
    this.detectionResult = null;
    this.detectionPromise = null;
  }
}

// Export singleton methods
const detector = AdBlockerDetector.getInstance();

export const detectAdBlocker = (): Promise<AdBlockerDetectionResult> => {
  return detector.detect();
};

export const clearAdBlockerCache = (): void => {
  detector.clearCache();
};

// Quick check method for synchronous use (less reliable)
export const quickAdBlockerCheck = (): boolean => {
  try {
    // Simple check for common ad blocker modifications
    const testElement = document.createElement('div');
    testElement.innerHTML = '&nbsp;';
    testElement.className = 'adsbox';
    testElement.style.position = 'absolute';
    testElement.style.left = '-10000px';
    testElement.style.width = '1px';
    testElement.style.height = '1px';
    
    document.body.appendChild(testElement);
    
    const isBlocked = testElement.offsetHeight === 0;
    
    document.body.removeChild(testElement);
    
    return isBlocked;
  } catch {
    return false;
  }
};

export default detector;